// Basic arithmetic utilities for Inventory calculations.
export function add(a: number, b: number): number {
  if (!isFinite(a) || !isFinite(b)) throw new TypeError('add: inputs must be finite numbers');
  return a + b;
}

export function multiply(a: number, b: number): number {
  if (!isFinite(a) || !isFinite(b)) throw new TypeError('multiply: inputs must be finite numbers');
  return a * b;
}

export function divide(a: number, b: number): number {
  if (!isFinite(a) || !isFinite(b)) throw new TypeError('divide: inputs must be finite numbers');
  if (b === 0) throw new Error('divide: division by zero');
  return a / b;
}
