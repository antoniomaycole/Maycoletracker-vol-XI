export interface Item {
  id: string;
  name: string;
  quantity: number;
  purchasePrice?: number; // per-unit purchase price
  location?: string;
}
