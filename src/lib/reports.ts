export type InventoryRecord = {
  id: string;
  timestamp: string; // ISO date string
  item: string;
  quantity: number;
  unitPrice?: number;
};

export type ReportAggregate = {
  period: string; // e.g., 2025-10-11 or 2025-W41 or 2025-10
  totalItems: number;
  totalValue?: number;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function isoMonth(date: Date) {
  return date.toISOString().slice(0, 7);
}

function isoWeekYear(date: Date) {
  // Simple ISO week number implementation (returns YYYY-Www). Good enough for reports.
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

export function aggregateByPeriod(records: InventoryRecord[], period: 'daily' | 'weekly' | 'monthly'): ReportAggregate[] {
  const map = new Map<string, { totalItems: number; totalValue: number }>();

  for (const r of records) {
    const d = new Date(r.timestamp);
    if (Number.isNaN(d.getTime())) continue; // skip invalid
    const key = period === 'daily' ? isoDate(d) : period === 'weekly' ? isoWeekYear(d) : isoMonth(d);
    const entry = map.get(key) || { totalItems: 0, totalValue: 0 };
    entry.totalItems += r.quantity;
    if (typeof r.unitPrice === 'number') entry.totalValue += r.quantity * r.unitPrice;
    map.set(key, entry);
  }

  const out: ReportAggregate[] = [];
  for (const [periodKey, v] of map.entries()) {
    out.push({ period: periodKey, totalItems: v.totalItems, totalValue: Number(v.totalValue.toFixed(2)) });
  }

  // Sort chronologically
  out.sort((a, b) => (a.period > b.period ? 1 : -1));
  return out;
}
