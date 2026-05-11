/**
 * Fils / Dinar unit system.
 *
 * Internal convention (canonical):
 *   All calculator math runs in **KD** (decimal).
 *   This keeps the existing formulas untouched.
 *
 * UI convention:
 *   - User picks how to ENTER and READ prices: 'fils' (integer) or 'dinar' (decimal).
 *   - On input:  parsePriceInput(userInput, unit) → KD number
 *   - On output: formatPriceOutput(kdValue, unit) → display string
 *   - 1 KD = 1000 fils
 */

import { stripCommas, formatDisplay } from './format';

export type Unit = 'fils' | 'dinar';

const STORAGE_KEY = 'kb-unit-preference-v2';
const EVENT_NAME = 'kb-unit-change';

// ---------- Persistence ----------

export function getStoredUnit(): Unit {
  if (typeof window === 'undefined') return 'fils';
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'dinar' ? 'dinar' : 'fils';
}

export function setStoredUnit(unit: Unit): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, unit);
  // Broadcast so all calculator instances stay in sync
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: unit }));
}

export const UNIT_EVENT = EVENT_NAME;

// ---------- Conversion: input ↔ canonical KD ----------

/**
 * Parse a price input string into KD (canonical).
 *   parsePriceInput("620", "fils")      → 0.620
 *   parsePriceInput("0.620", "dinar")   → 0.620
 *   parsePriceInput("1,234", "fils")    → 1.234
 */
export function parsePriceInput(input: string, unit: Unit): number {
  const n = stripCommas(input);
  return unit === 'fils' ? n / 1000 : n;
}

/**
 * Format a KD value into a display string in the chosen unit.
 *   formatPriceOutput(0.591, "fils")    → "591"
 *   formatPriceOutput(0.591, "dinar")   → "0.591"
 *   formatPriceOutput(1.234, "fils")    → "1,234"
 */
export function formatPriceOutput(kd: number, unit: Unit, decimalsForKD = 3): string {
  if (unit === 'fils') {
    return formatDisplay(Math.round(kd * 1000));
  }
  return formatDisplay(kd, decimalsForKD);
}

/**
 * Convert a price field's text value when user toggles units, so the
 * underlying value stays the same but the displayed format changes.
 *
 *   convertPriceText("620", "fils", "dinar")   → "0.620"
 *   convertPriceText("0.620", "dinar", "fils") → "620"
 */
export function convertPriceText(text: string, from: Unit, to: Unit): string {
  if (from === to || !text) return text;
  const kd = parsePriceInput(text, from);
  if (kd === 0) return '';
  return formatPriceOutput(kd, to);
}

// ---------- Localized labels ----------

export function unitLabel(unit: Unit, lang: 'ar' | 'en'): string {
  if (unit === 'fils') return lang === 'ar' ? 'فلس' : 'fils';
  return lang === 'ar' ? 'د.ك' : 'KD';
}

export function unitHelpText(unit: Unit, lang: 'ar' | 'en'): string {
  if (lang === 'ar') {
    return unit === 'fils'
      ? 'أدخل السعر بالفلس (مثال: 520 = 520 فلس)'
      : 'أدخل السعر بالدينار (مثال: 0.520 = 520 فلس)';
  }
  return unit === 'fils'
    ? 'Enter price in fils (e.g. 520 = 520 fils)'
    : 'Enter price in dinar (e.g. 0.520 = 520 fils)';
}
