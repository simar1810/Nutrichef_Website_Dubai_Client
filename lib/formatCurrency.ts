const DEFAULT_LOCALE =
  typeof navigator !== "undefined" && navigator.language ? navigator.language : "en";

function normalizeCurrency(currency: string): string {
  return currency.trim().toUpperCase();
}

export function formatMinorUnits(amountMinor: number, currency: string): string {
  const code = normalizeCurrency(currency);
  const major = amountMinor / 100;
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: code,
  }).format(major);
}

export interface FormatMajorUnitsOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function formatMajorUnits(
  amountMajor: number,
  currency: string,
  options?: FormatMajorUnitsOptions
): string {
  const code = normalizeCurrency(currency);
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: code,
    minimumFractionDigits: options?.minimumFractionDigits ?? 0,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
  }).format(amountMajor);
}
