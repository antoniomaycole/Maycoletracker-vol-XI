import type { Item } from '../models/Item';

const mockItems: Item[] = [
  { id: 'itm-1', name: 'Sample Item A', quantity: 10, purchasePrice: 2.5, location: 'Shelf A' },
  { id: 'itm-2', name: 'Sample Item B', quantity: 4, purchasePrice: 5.0, location: 'Shelf B' }
];

let itemsStore: Item[] = [...mockItems];

export async function fetchItems(): Promise<Item[]> {
  return new Promise((res) => setTimeout(() => res([...itemsStore]), 120));
}

export async function addItem(item: Item): Promise<Item> {
  const newItem = { ...item, id: item.id || `itm-${Date.now()}` };
  itemsStore = [newItem, ...itemsStore];
  return new Promise((res) => setTimeout(() => res(newItem), 80));
}

export async function generateReport(): Promise<{ totalItems: number; totalValue: number }> {
  const totalItems = itemsStore.reduce((s, it) => s + it.quantity, 0);
  const totalValue = itemsStore.reduce((s, it) => s + (it.purchasePrice ?? 0) * it.quantity, 0);
  return { totalItems, totalValue };
}

export async function importItemsFromCSV(_csv: string): Promise<{ success: boolean }> {
  // placeholder
  return { success: true };
}
