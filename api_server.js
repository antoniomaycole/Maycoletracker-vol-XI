const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Serve built frontend if available
const path = require('path');
const distPath = path.join(__dirname, 'dist');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('/_app/*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.get('/', (req, res) => {
  res.json({ status: '✅ Vol XI backend sealed', timestamp: new Date().toISOString() });
});

// Simple health endpoint
app.get('/health', (req, res) => res.json({ healthy: true, time: new Date().toISOString() }));

// Inventory API proxy placeholders (forwarding should be configured if using an external API)
const INVENTORY_API = process.env.VITE_INVENTORY_API_URL || process.env.INVENTORY_API_URL || '';
const INVENTORY_TOKEN = process.env.VITE_INVENTORY_API_TOKEN || process.env.INVENTORY_API_TOKEN || '';
// Prefer global fetch (Node 18+). If not available, try to require 'node-fetch'.
let fetchFn = global.fetch;
if (!fetchFn) {
  try {
    fetchFn = require('node-fetch');
  } catch (e) {
    fetchFn = null;
  }
}
// In-memory fallback inventory store (used when no external INVENTORY_API configured)
let inMemoryItems = [
  { id: 'p1', name: 'Red Peppers', quantity: 8, unit: 'lbs' },
  { id: 'p2', name: 'Pain Killers', quantity: 25, unit: 'units' },
  { id: 'p3', name: 'N95 Masks', quantity: 12, unit: 'units' }
];

// Helper to proxy if external API is configured, otherwise use in-memory
const proxyOrLocal = async (path, method = 'GET', body) => {
  if (INVENTORY_API) {
    const url = `${INVENTORY_API.replace(/\/$/, '')}${path}`;
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (INVENTORY_TOKEN) opts.headers.Authorization = `Bearer ${INVENTORY_TOKEN}`;
    if (body) opts.body = JSON.stringify(body);
    if (!fetchFn) throw new Error('No fetch available to proxy inventory requests');
    const r = await fetchFn(url, opts);
    return await r.json();
  }
  // Local handling
  if (path === '/items' && method === 'GET') return inMemoryItems;
  return null;
};

app.get('/api/items', async (req, res) => {
  try {
    if (INVENTORY_API) {
      const data = await proxyOrLocal('/items');
      return res.json(data);
    }
    return res.json(inMemoryItems);
  } catch (err) {
    return res.status(500).json({ error: 'Inventory read error', detail: String(err) });
  }
});

app.get('/api/items/:id', (req, res) => {
  const id = req.params.id;
  if (INVENTORY_API) {
    // let the proxy handle — simple redirect
    return res.redirect(307, `${INVENTORY_API.replace(/\/$/, '')}/items/${id}`);
  }
  const item = inMemoryItems.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  return res.json(item);
});

app.post('/api/items', (req, res) => {
  const payload = req.body;
  if (!payload || !payload.name) return res.status(400).json({ error: 'Invalid payload' });
  const id = payload.id || `p${Date.now()}`;
  const item = { id, name: payload.name, quantity: payload.quantity || 0, unit: payload.unit || 'units' };
  inMemoryItems.push(item);
  return res.status(201).json(item);
});

app.put('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const idx = inMemoryItems.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  inMemoryItems[idx] = { ...inMemoryItems[idx], ...payload };
  return res.json(inMemoryItems[idx]);
});

app.delete('/api/items/:id', (req, res) => {
  const id = req.params.id;
  const idx = inMemoryItems.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const deleted = inMemoryItems.splice(idx, 1)[0];
  return res.json({ deleted });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Vol XI backend running on port ${PORT}`);
});