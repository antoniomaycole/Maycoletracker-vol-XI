import React from 'react';
import type { Item } from '../models/Item';

interface Props {
  items?: Item[];
}

const InventoryTable: React.FC<Props> = ({ items = [] }) => {
  return (
    <div className="inventory-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>{it.name}</td>
              <td>{it.quantity}</td>
              <td>{it.location ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
