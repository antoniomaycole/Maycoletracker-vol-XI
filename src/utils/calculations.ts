/**
 * MaycoleTracker™ Calculation Utilities
 * Simple inventory calculations and analytics
 */

// Simple types for calculations
interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  minStock: number;
  price: number;
  category?: string;
  supplier?: string;
}

export interface InventoryMetrics {
  totalValue: number;
  totalItems: number;
  lowStockValue: number;
  averageCostPerItem: number;
  topValueItems: InventoryItem[];
  categoryBreakdown: { category: string; value: number; count: number }[];
}

/**
 * Calculate comprehensive inventory metrics
 */
export function calculateInventoryMetrics(items: InventoryItem[]): InventoryMetrics {
  const totalValue = items.reduce((sum, item) => {
    const itemValue = (item.price || 0) * item.quantity;
    return sum + itemValue;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const lowStockItems = items.filter(item => item.quantity <= item.minStock);
  const lowStockValue = lowStockItems.reduce((sum, item) => {
    return sum + ((item.price || 0) * item.quantity);
  }, 0);

  const averageCostPerItem = totalItems > 0 ? totalValue / totalItems : 0;

  // Top 5 most valuable items
  const topValueItems = [...items]
    .sort((a, b) => {
      const aValue = (a.price || 0) * a.quantity;
      const bValue = (b.price || 0) * b.quantity;
      return bValue - aValue;
    })
    .slice(0, 5);

  // Category breakdown
  const categoryMap = new Map<string, { value: number; count: number }>();
  items.forEach(item => {
    const category = item.category || 'Uncategorized';
    const existing = categoryMap.get(category) || { value: 0, count: 0 };
    const itemValue = (item.price || 0) * item.quantity;
    categoryMap.set(category, {
      value: existing.value + itemValue,
      count: existing.count + item.quantity
    });
  });

  const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, data]) => ({
    category,
    value: data.value,
    count: data.count
  }));

  return {
    totalValue,
    totalItems,
    lowStockValue,
    averageCostPerItem,
    topValueItems,
    categoryBreakdown
  };
}

/**
 * Utility function to format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Utility function to calculate percentage change
 */
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}