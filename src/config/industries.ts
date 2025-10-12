export type IndustryConfig = {
  id: string;
  name: string;
  commonItems: Array<{ sku: string; name: string; unit?: string }>;
};

export const industries: IndustryConfig[] = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    commonItems: [
      { sku: 'RICE-001', name: 'Rice (50 lb)', unit: 'bag' },
      { sku: 'TOMATO-001', name: 'Tomato', unit: 'kg' },
      { sku: 'OIL-001', name: 'Cooking Oil', unit: 'litre' },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    commonItems: [
      { sku: 'MED-001', name: 'Medication (assorted)', unit: 'box' },
      { sku: 'BAND-001', name: 'Bandages', unit: 'pack' },
      { sku: 'GLOVE-001', name: 'Disposable Gloves', unit: 'box' },
    ],
  },
  {
    id: 'construction',
    name: 'Construction',
    commonItems: [
      { sku: 'HAM-001', name: 'Hammer', unit: 'unit' },
      { sku: 'BOOT-001', name: 'Safety Boots', unit: 'pair' },
      { sku: 'HELM-001', name: 'Safety Helmet', unit: 'unit' },
    ],
  },
  {
    id: 'retail',
    name: 'Retail',
    commonItems: [
      { sku: 'SKU-001', name: 'Generic SKU 1', unit: 'unit' },
      { sku: 'SKU-002', name: 'Generic SKU 2', unit: 'unit' },
    ],
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    commonItems: [
      { sku: 'RAW-001', name: 'Raw Material A', unit: 'kg' },
      { sku: 'COMP-001', name: 'Component X', unit: 'unit' },
      { sku: 'PACK-001', name: 'Packaging Box', unit: 'unit' },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    commonItems: [
      { sku: 'LINEN-001', name: 'Bed Linen Set', unit: 'set' },
      { sku: 'TOILET-001', name: 'Toiletries Kit', unit: 'unit' },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    commonItems: [
      { sku: 'BOOK-001', name: 'Textbook (single)', unit: 'unit' },
      { sku: 'STAP-001', name: 'Stationery Pack', unit: 'pack' },
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    commonItems: [
      { sku: 'OIL-ENG-001', name: 'Engine Oil', unit: 'litre' },
      { sku: 'FILTER-001', name: 'Air Filter', unit: 'unit' },
    ],
  },
  {
    id: 'government',
    name: 'Government',
    commonItems: [
      { sku: 'GOV-STD-001', name: 'Standard Office Chair', unit: 'unit' },
      { sku: 'GOV-STD-002', name: 'Filing Cabinet', unit: 'unit' },
      { sku: 'GOV-MED-001', name: 'Emergency Medical Kit', unit: 'kit' },
      { sku: 'GOV-SUP-001', name: 'Personal Protective Equipment (PPE)', unit: 'set' },
    ],
  },
];

export function getIndustryById(id: string) {
  return industries.find((i) => i.id === id) || industries[0];
}
