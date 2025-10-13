import React, { useState } from 'react';
import type { Item } from '../models/Item';

interface Props {
  onAdd: (item: Item) => Promise<void>;
  onClose?: () => void;
}

const AddProduct: React.FC<Props> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number | ''>('');

  const submit = async () => {
    if (!name) return;
    await onAdd({ id: '', name, quantity: qty, purchasePrice: typeof price === 'number' ? price : undefined });
    setName(''); setQty(1); setPrice('');
    onClose?.();
  };

  return (
    <div className="add-product-modal" role="dialog" aria-modal="true">
      <div className="modal-inner">
        <h3>Add Product</h3>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Quantity
          <input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
        </label>
        <label>
          Purchase Price
          <input type="number" step="0.01" value={price as any} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} />
        </label>
        <div className="modal-actions">
          <button onClick={submit} className="btn btn-primary">Add</button>
          <button onClick={() => onClose?.()} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
