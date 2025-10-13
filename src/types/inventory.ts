export type MTInventoryStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired'

export interface MTInventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit?: string
  unitPrice?: number
  totalValue: number
  location?: string
  supplier?: string
  dateAdded?: string
  lastUpdated?: string
  expiryDate?: string
  status: MTInventoryStatus
  industry?: string
  barcode?: string
  description?: string
  minStockLevel?: number
  // legacy-friendly aliases
  lowStockThreshold?: number
  qrCode?: string
}

export type MTNewInventoryItem = Partial<Omit<MTInventoryItem, 'id' | 'totalValue' | 'lastUpdated'>> & {
  name: string
  category: string
  quantity: number
  lastUpdated?: string
}

// A simple transaction / usage log type used by LogUsage and related components
export interface Transaction {
  id: string
  itemId: string
  itemName: string
  action: 'Used' | 'Received' | string
  quantity: number
  notes?: string
  date: string
}

