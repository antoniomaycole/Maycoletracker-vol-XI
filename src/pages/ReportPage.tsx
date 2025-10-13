import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems, generateReport } from '../services/inventoryService';
import type { Item } from '../models/Item';
import Layout from '../components/Layout';

function downloadCSV(items: Item[]) {
  const header = ['id', 'name', 'quantity', 'purchasePrice', 'location'];
  const rows = items.map((it) => [it.id, it.name, String(it.quantity), String(it.purchasePrice ?? ''), it.location || '']);
  const csv = [header.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `maycole-inventory-report-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ReportPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<{ totalItems?: number; totalValue?: number }>({});

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchItems(), generateReport()])
      .then(([it, s]) => {
        if (!mounted) return;
        setItems(it);
        setSummary(s as any);
      })
      .catch((err) => console.error(err))
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  // Very small inline bar representation (no external chart lib)
  const top = [...items].sort((a,b) => b.quantity - a.quantity).slice(0,8);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Inventory Report</h2>
            <p className="text-sm text-gray-600">Snapshot of your current inventory and value</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/home')} className="px-3 py-2 bg-white text-blue-700 rounded">Back</button>
            <button onClick={() => downloadCSV(items)} className="px-3 py-2 bg-blue-700 text-white rounded">Download CSV</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Items</div>
            <div className="text-2xl font-bold">{summary.totalItems ?? '—'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Inventory Value</div>
            <div className="text-2xl font-bold">${(summary.totalValue ?? 0).toFixed(2)}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Distinct SKUs</div>
            <div className="text-2xl font-bold">{items.length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">Top items (by quantity)</h3>
          {loading ? (
            <div className="text-gray-500">Loading chart...</div>
          ) : (
            <div className="space-y-2">
              {top.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <div className="w-36 text-sm">{it.name}</div>
                  <div className="flex-1 bg-gray-100 rounded h-4">
                    <div style={{ width: Math.min(100, (it.quantity / (top[0]?.quantity || 1)) * 100) + '%' }} className="h-4 bg-blue-600 rounded"></div>
                  </div>
                  <div className="w-12 text-right text-sm">{it.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Inventory Table</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Qty</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-t">
                    <td className="py-2">{it.name}</td>
                    <td className="py-2">{it.quantity}</td>
                    <td className="py-2">${(it.purchasePrice ?? 0).toFixed(2)}</td>
                    <td className="py-2">{it.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
