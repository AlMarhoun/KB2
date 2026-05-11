/**
 * useUnit — React hook for the global fils/dinar preference.
 *
 * - Reads from localStorage on mount.
 * - Listens to `kb-unit-change` event so all calculator instances
 *   on the page stay in sync when the user toggles in any one of them.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getStoredUnit,
  setStoredUnit,
  UNIT_EVENT,
  type Unit,
} from '../lib/units';

export function useUnit(): readonly [Unit, (u: Unit) => void] {
  const [unit, setUnit] = useState<Unit>(() => getStoredUnit());

  useEffect(() => {
    const handler = (e: Event) => {
      const next = (e as CustomEvent<Unit>).detail;
      if (next && next !== unit) setUnit(next);
    };
    window.addEventListener(UNIT_EVENT, handler);
    return () => window.removeEventListener(UNIT_EVENT, handler);
  }, [unit]);

  const update = useCallback((next: Unit) => {
    setUnit(next);
    setStoredUnit(next);
  }, []);

  return [unit, update] as const;
}
