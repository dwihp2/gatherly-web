/**
 * Currency utilities for Indonesian Rupiah (IDR)
 */

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatIDRCompact(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    notation: 'compact',
  }).format(amount);
}

export function parseIDR(value: string): number {
  // Remove currency symbols and spaces, keep only numbers
  const numericValue = value.replace(/[^\d]/g, '');
  return parseInt(numericValue, 10) || 0;
}
