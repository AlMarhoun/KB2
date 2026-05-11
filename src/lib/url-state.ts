/**
 * Encode/decode calculator state to/from URL query params.
 * Enables shareable links — paste the URL and get the same calculation.
 */

import type { CalcType } from './storage';

export const URL_PARAMS_KEY = 'q';

// ── Security: whitelist of allowed param keys per calculator type ──────────
// Only these keys are decoded from the URL. Any unknown key is silently dropped.
// This prevents URL-crafted params from polluting app state or localStorage.
const ALLOWED_KEYS: Record<CalcType, ReadonlySet<string>> = {
  'ex-price':     new Set(['cp', 'b', 'ci', 'cr', 'sp', 'u', 'type']),
  'dividend':     new Set(['shares', 'cash', 'b', 'u', 'type']),
  'average-cost': new Set(['q1', 'p1', 'q2', 'p2', 'u', 'type']),
};

// Max character length per param value. Prices in Kuwait are never longer than
// ~12 chars (e.g. "1,000,000.000"). 30 gives comfortable headroom while
// blocking unreasonably large payloads.
const MAX_PARAM_LENGTH = 30;

/**
 * Encode inputs as a compact URL: /?type=ex-price&cp=0.620&b=5
 */
export function encodeStateToUrl(
  type: CalcType,
  inputs: Record<string, number | string | undefined>,
): string {
  const params = new URLSearchParams();
  params.set('type', type);
  for (const [k, v] of Object.entries(inputs)) {
    if (v !== undefined && v !== '' && v !== 0) {
      params.set(k, String(v));
    }
  }
  return `${window.location.origin}/?${params.toString()}`;
}

/**
 * Read calculator state from current URL.
 * Returns null if no valid state found.
 * Unknown keys and oversized values are silently dropped.
 */
export function decodeStateFromUrl(): {
  type: CalcType;
  inputs: Record<string, string>;
} | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') as CalcType | null;
  if (!type || !['ex-price', 'dividend', 'average-cost'].includes(type)) {
    return null;
  }
  const allowed = ALLOWED_KEYS[type];
  const inputs: Record<string, string> = {};
  params.forEach((v, k) => {
    if (k === 'type') return;
    // Drop unknown keys and values that exceed the max length.
    if (allowed.has(k) && v.length <= MAX_PARAM_LENGTH) {
      inputs[k] = v;
    }
  });
  return { type, inputs };
}

/**
 * Push state to URL without page reload.
 */
export function pushUrlState(
  type: CalcType,
  inputs: Record<string, number | string | undefined>,
): void {
  if (typeof window === 'undefined') return;
  const url = encodeStateToUrl(type, inputs);
  window.history.replaceState({}, '', url);
}

export function clearUrlState(): void {
  if (typeof window === 'undefined') return;
  window.history.replaceState({}, '', window.location.pathname);
}
