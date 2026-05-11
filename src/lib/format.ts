/**
 * Live number formatting utilities.
 * Adds thousands separators while typing, strips them before calculation.
 *
 * Examples:
 *   formatWithCommas("1000")       → "1,000"
 *   formatWithCommas("100000.5")   → "100,000.5"
 *   stripCommas("1,234.56")        → 1234.56
 */

/**
 * Format a raw input string with thousands separators.
 * Preserves a single decimal point and limits decimals to 6 places.
 * Empty / invalid → "".
 */
export function formatWithCommas(raw: string): string {
  if (raw === null || raw === undefined || raw === '') return '';

  // Keep digits and at most one dot
  let cleaned = String(raw).replace(/[^\d.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned =
      cleaned.slice(0, firstDot + 1) +
      cleaned.slice(firstDot + 1).replace(/\./g, '');
  }

  const [intRaw, decRaw = ''] = cleaned.split('.');
  // Drop leading zeros in integer (but keep "0" if all zeros)
  const intTrimmed = intRaw.replace(/^0+(?=\d)/, '') || (intRaw ? '0' : '');
  const intFormatted = intTrimmed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const dec = decRaw.slice(0, 6); // cap at 6 decimal places

  if (cleaned.includes('.')) return `${intFormatted}.${dec}`;
  return intFormatted;
}

/**
 * Convert a formatted display string back to a number.
 * Returns 0 for empty / invalid input.
 */
export function stripCommas(formatted: string): number {
  if (!formatted) return 0;
  const n = parseFloat(String(formatted).replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

/**
 * After re-formatting an input value, restore the cursor so it stays
 * at the same logical digit position (commas added/removed don't jump it).
 *
 *   oldValue:  "1,234|5"       (cursor after the 4)
 *   newValue:  "12,345"
 *   → cursor lands after the 4 again: "12,34|5"
 */
export function restoreCursorAfterFormat(
  el: HTMLInputElement,
  oldValue: string,
  oldCursor: number,
  newValue: string,
): void {
  // Count digits up to (but not including) the old cursor
  const digitsBefore = (oldValue.slice(0, oldCursor).match(/\d/g) || []).length;

  if (digitsBefore === 0) {
    requestAnimationFrame(() => el.setSelectionRange(0, 0));
    return;
  }

  // Walk forward through new value and stop after we've seen N digits
  let count = 0;
  let pos = newValue.length;
  for (let i = 0; i < newValue.length; i++) {
    if (/\d/.test(newValue[i])) count++;
    if (count === digitsBefore) {
      pos = i + 1;
      break;
    }
  }

  requestAnimationFrame(() => el.setSelectionRange(pos, pos));
}

/**
 * Format a number for display (output-only, not for inputs).
 *   formatDisplay(150000)         → "150,000"
 *   formatDisplay(0.591, 3)       → "0.591"
 */
export function formatDisplay(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
