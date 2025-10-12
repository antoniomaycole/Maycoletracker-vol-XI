// Canonical TypeScript data model contract for MaycoleTracker Vol XI

export type UUID = string;

export type Unit = string; // e.g., 'kg', 'g', 'litre', 'unit', 'pair'

export interface InventoryItem {
  id: UUID;
  sku: string;
  name: string;
  description?: string;
  unit: Unit; // canonical unit
  reorderPoint?: number; // threshold to trigger reorder suggestions
  leadTimeDays?: number; // supplier lead time
  industryId?: string; // reference to IndustryConfig.id
  active?: boolean;
}

export interface LotInfo {
  lotId: string;
  manufactureDate?: string; // ISO date
  expiryDate?: string; // ISO date
}

export interface StockEntry {
  id: UUID;
  itemId: UUID;
  quantity: number;
  unit: Unit;
  lot?: LotInfo;
  locationId?: UUID; // warehouse/location
  receivedAt: string; // ISO datetime
  unitCost?: number;
  source?: string; // supplier or intake note
}

export type TransactionType = 'receipt' | 'consumption' | 'adjustment' | 'transfer';

export interface Transaction {
  id: UUID;
  type: TransactionType;
  itemId: UUID;
  quantity: number;
  unit: Unit;
  timestamp: string; // ISO datetime
  performedBy?: string; // user id
  reference?: string; // PO number, invoice, etc.
  note?: string;
}

export interface Warehouse {
  id: UUID;
  name: string;
  address?: string;
}

export interface Supplier {
  id: UUID;
  name: string;
  contact?: string;
}

export interface IndustryConfig {
  id: string;
  name: string;
  commonItems: Array<{ sku: string; name: string; unit?: Unit }>; 
}

export type UserRole = 'viewer' | 'editor' | 'admin';

export interface User {
  id: UUID;
  email: string;
  name?: string;
  role: UserRole;
}

export interface AuditRecord {
  id: UUID;
  entity: string; // e.g., 'StockEntry'
  entityId: UUID;
  action: string; // e.g., 'create', 'update', 'delete'
  performedBy?: string;
  timestamp: string;
  before?: any;
  after?: any;
  reason?: string;
}

// Response shapes
export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}
