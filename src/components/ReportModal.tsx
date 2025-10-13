import React from 'react';
import type { Item } from '../models/Item';

interface Props {
  items: Item[];
  onClose: () => void;
}

function toCsv(items: Item[]) {
  const header = ['id', 'name', 'quantity', 'purchasePrice', 'location'];
  const rows = items.map((i) => [i.id, i.name, String(i.quantity), String(i.purchasePrice ?? ''), i.location ?? '']);
  return [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
}

const ReportModal: React.FC<Props> = ({ items, onClose }) => {
  const totalItems = items.reduce((s, it) => s + it.quantity, 0);
  const totalValue = items.reduce((s, it) => s + (it.purchasePrice ?? 0) * it.quantity, 0);

  const downloadCsv = () => {
    const csv = toCsv(items);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inventory-report-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="report-modal" role="dialog" aria-modal="true">
      <div className="modal-inner">
        <h3>Inventory Report</h3>
        <p>Total items: {totalItems}</p>
        <p>Total value: ${totalValue.toFixed(2)}</p>
        <div style={{ maxHeight: 240, overflow: 'auto' }}>
          <table>
            <thead>
              <tr><th>Name</th><th>Qty</th><th>Price</th><th>Location</th></tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id}><td>{it.name}</td><td>{it.quantity}</td><td>{it.purchasePrice ?? '-'}</td><td>{it.location ?? '-'}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="modal-actions">
          <button onClick={downloadCsv} className="btn btn-primary">Download CSV</button>
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
