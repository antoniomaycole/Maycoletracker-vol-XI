import React from 'react';
import { useToast } from './ui/ToastProvider';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import type { MTInventoryItem as InventoryItem } from '@/types/inventory';

// Simple inline SVG bar chart (dependency-free)
function BarChart({ items }: { items: InventoryItem[] }) {
  const sorted = [...items].sort((a, b) => b.quantity - a.quantity).slice(0, 8);
  const max = Math.max(...sorted.map((s) => s.quantity), 1);
  const bars = sorted.map((s, idx) => ({ label: s.name, value: s.quantity, pct: (s.quantity / max) * 100 }));

  return (
    <svg width="100%" height={200} viewBox="0 0 100 40" preserveAspectRatio="none" role="img" aria-label="Inventory levels bar chart">
      {bars.map((b, i) => {
        const x = 5 + i * (90 / bars.length);
        const w = 90 / bars.length - 2;
        const h = (b.pct / 100) * 36;
        return (
          <g key={b.label} transform={`translate(${x}, ${40 - h})`}>
            <rect x={0} y={0} width={w} height={h} fill="#4A9BFF" rx={1} />
            <text x={w / 2} y={h + 2} fontSize={2.4} textAnchor="middle" fill="#111" fillOpacity={0.9}>
              {b.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function downloadCSV(items: InventoryItem[]) {
  const header = ['SKU/ID', 'Name', 'Category', 'Quantity', 'Unit Price', 'Total Value', 'Location', 'Supplier'];
  const rows = items.map((it) => [it.id, it.name, it.category, it.quantity, it.unitPrice, it.totalValue, it.location, it.supplier]);
  const csv = [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'inventory-export.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function summarizeNLP(items: InventoryItem[]) {
  if (items.length === 0) return 'No inventory data available.';
  const totalItems = items.length;
  const totalValue = items.reduce((s, i) => s + (i.totalValue || i.quantity * (i.unitPrice || 0)), 0);
  const low = items.filter((i) => i.quantity <= (i.minStockLevel || 0)).length;
  const topCost = [...items].sort((a, b) => (b.unitPrice || 0) - (a.unitPrice || 0))[0];
  const lowProfit = [...items].sort((a, b) => ((a.unitPrice || 0) - (a.unitPrice || 0)) - ((b.unitPrice || 0) - (b.unitPrice || 0))).slice(0, 3);

  const lines = [
    `Inventory contains ${totalItems} items with an estimated value of $${totalValue.toFixed(2)}.`,
    `${low} items are at or below their minimum stock level.`,
  ];
  if (topCost) lines.push(`The most expensive product is ${topCost.name} at $${(topCost.unitPrice || 0).toFixed(2)} per unit.`);
  return lines.join(' ');
}

function verbalize(text: string, toast?: { push: (m: React.ReactNode) => void }) {
  if (!('speechSynthesis' in window)) {
    try { toast?.push('Speech synthesis not available in this browser.'); } catch { console.warn('Speech synthesis not available in this browser.'); }
    return;
  }
  const s = new SpeechSynthesisUtterance(text);
  s.rate = 1;
  s.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(s);
}

export default function AnalyticsPanel({ items }: { items: InventoryItem[] }) {
  const toast = useToast();
  const totalValue = items.reduce((s, i) => s + (i.totalValue || i.quantity * (i.unitPrice || 0)), 0);
  const avgPrice = items.length ? items.reduce((s, i) => s + (i.unitPrice || 0), 0) / items.length : 0;

  const costliest = [...items].sort((a, b) => (b.unitPrice || 0) - (a.unitPrice || 0)).slice(0, 3);
  const lowStock = items.filter((i) => i.quantity <= (i.minStockLevel || 0)).slice(0, 10);

  return (
    <Card className="bg-white/10 border-white/20">
      <CardHeader>
        <CardTitle>Inventory Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-white/70">Total inventory value</div>
          <div className="text-2xl font-bold text-white">${totalValue.toFixed(2)}</div>
          <div className="text-white/70">Average unit price: ${avgPrice.toFixed(2)}</div>
        </div>

        <div className="mb-6">
          <BarChart items={items} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Top cost items</h4>
            <ul className="list-disc pl-6 text-white/80">
              {costliest.map((c) => (
                <li key={c.id}>{c.name} — ${c.unitPrice?.toFixed(2)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Low stock items</h4>
            <ul className="list-disc pl-6 text-white/80">
              {lowStock.length ? lowStock.map((l) => <li key={l.id}>{l.name} — {l.quantity}</li>) : <li className="text-white/70">All good</li>}
            </ul>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => downloadCSV(items)} className="btn-on-dark">Export CSV</Button>
          <Button onClick={() => { const txt = summarizeNLP(items); verbalize(txt, toast); }} className="btn-primary">Verbalize Report</Button>
          <Button onClick={() => { const txt = summarizeNLP(items); navigator.clipboard?.writeText(txt); try { toast.push('Summary copied to clipboard'); } catch { console.info('Summary copied to clipboard'); } }} className="btn-on-dark">Copy Summary</Button>
        </div>
      </CardContent>
    </Card>
  );
}
