import { industries, getIndustryById } from '../config/industries';

export type InventoryUnit = string;

export type InventoryItem = {
  id: string; // UUID-like
  sku: string;
  name: string;
  unit: InventoryUnit;
  quantity: number;
  location?: string; // optional location or department
  metadata?: Record<string, any>;
};

export type InventoryAdjustment = {
  itemId: string;
  delta: number; // positive to increase, negative to decrease
  reason?: string;
  timestamp?: string;
};

// Small deterministic id generator for demo/seeding purposes
function makeId(prefix = 'itm') {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Seed items from an industry config (non-destructive, returns new array)
export function seedItemsForIndustry(industryId: string, qty = 10): InventoryItem[] {
  const industry = getIndustryById(industryId);
  const items: InventoryItem[] = [];
  const common = industry.commonItems;

  for (let i = 0; i < Math.max(3, Math.min(common.length, qty)); i += 1) {
    const entry = common[i % common.length];
    items.push({
      id: makeId('itm'),
      sku: entry.sku,
      name: entry.name,
      unit: entry.unit || 'unit',
      quantity: Math.floor(Math.random() * 100) + 1,
    });
  }

  // if qty larger than common entries, append generated placeholders
  while (items.length < qty) {
    items.push({
      id: makeId('itm'),
      sku: `GEN-${items.length + 1}`,
      name: `Generated Item ${items.length + 1}`,
      unit: 'unit',
      quantity: Math.floor(Math.random() * 200),
    });
  }

  return items;
}

// Core pure functions for inventory operations that return new state
export function receiveStock(items: InventoryItem[], itemId: string, amount: number, location?: string): InventoryItem[] {
  if (amount <= 0) return items;
  return items.map((it) =>
    it.id === itemId
      ? { ...it, quantity: it.quantity + amount, location: location ?? it.location }
      : it
  );
}

export function consumeStock(items: InventoryItem[], itemId: string, amount: number): InventoryItem[] {
  if (amount <= 0) return items;
  return items.map((it) => (it.id === itemId ? { ...it, quantity: Math.max(0, it.quantity - amount) } : it));
}

export function adjustInventory(items: InventoryItem[], adjustment: InventoryAdjustment): InventoryItem[] {
  const { itemId, delta } = adjustment;
  if (delta === 0) return items;
  return items.map((it) => (it.id === itemId ? { ...it, quantity: Math.max(0, it.quantity + delta) } : it));
}

export function transferStock(items: InventoryItem[], fromId: string, toId: string, amount: number): InventoryItem[] {
  if (amount <= 0) return items;
  return items.map((it) => {
    if (it.id === fromId) return { ...it, quantity: Math.max(0, it.quantity - amount) };
    if (it.id === toId) return { ...it, quantity: it.quantity + amount };
    return it;
  });
}

export function calculateInventoryValue(items: InventoryItem[], priceLookup: (sku: string) => number | undefined) {
  let total = 0;
  for (const it of items) {
    const price = priceLookup(it.sku) ?? 0;
    total += price * it.quantity;
  }
  return total;
}

// Convenience: fetch government seed quickly
export function seedGovernmentSample(qty = 8) {
  return seedItemsForIndustry('government', qty);
}

// Expose industries for UI selection
export const availableIndustries = industries.map((i) => ({ id: i.id, name: i.name }));

export default {
  seedItemsForIndustry,
  receiveStock,
  consumeStock,
  adjustInventory,
  transferStock,
  calculateInventoryValue,
  seedGovernmentSample,
  availableIndustries,
};
