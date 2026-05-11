/**
 * localStorage-backed history of calculations.
 * Privacy-first: nothing leaves the device.
 */

export type CalcType = 'ex-price' | 'dividend' | 'average-cost';

export interface HistoryEntry {
  id: string;
  type: CalcType;
  inputs: Record<string, number | string>;
  resultPreview: string; // short label like "0.620 → 0.590"
  timestamp: number;
}

const KEY = 'kb-history-v2';
const MAX_ENTRIES = 50;

export const loadHistory = (): HistoryEntry[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Guard against corrupted data (non-array stored under the key).
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveEntry = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>): HistoryEntry => {
  const newEntry: HistoryEntry = {
    ...entry,
    id: `${entry.type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
  };
  const list = [newEntry, ...loadHistory()].slice(0, MAX_ENTRIES);
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* quota exceeded — silently ignore */
  }
  return newEntry;
};

export const deleteEntry = (id: string): void => {
  try {
    const list = loadHistory().filter((e) => e.id !== id);
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* localStorage unavailable (private browsing, quota) — silently ignore */
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* localStorage unavailable — silently ignore */
  }
};

// ====== THEME / LANG persistence ======
export const KEYS = {
  theme: 'kb-theme',
  lang: 'kb-lang',
};

export const getStoredTheme = (): 'dark' | 'light' => {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(KEYS.theme);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

export const getStoredLang = (): 'ar' | 'en' => {
  if (typeof window === 'undefined') return 'ar';
  const stored = localStorage.getItem(KEYS.lang);
  return stored === 'en' ? 'en' : 'ar';
};

export const setStoredTheme = (theme: 'dark' | 'light') =>
  localStorage.setItem(KEYS.theme, theme);

export const setStoredLang = (lang: 'ar' | 'en') =>
  localStorage.setItem(KEYS.lang, lang);
