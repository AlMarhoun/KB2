/**
 * SmartInput — controlled numeric input with:
 *   1. Optional live thousands-separator formatting (cursor-safe).
 *   2. Inline help tooltip.
 *   3. Unit suffix display (e.g. KD, fils, %, shares).
 *   4. Focus highlighting via brand-primary color.
 *
 * Internal contract:
 *   - `value` is the formatted string the user sees (e.g. "1,234.5").
 *   - `onChange` always receives the formatted string.
 *   - Consumers should run `stripCommas(value)` before any math.
 */
import { HelpCircle } from 'lucide-react';
import { useState, useRef, type ChangeEvent } from 'react';
import { formatWithCommas, restoreCursorAfterFormat } from '../../lib/format';

interface Props {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  unit?: string;
  help?: string;
  /** Apply live thousands-separator formatting while typing. Default: true. */
  withFormatting?: boolean;
  /** HTML input step attribute (only meaningful if withFormatting is false). */
  step?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export default function SmartInput({
  label,
  value,
  onChange,
  placeholder,
  unit,
  help,
  withFormatting = true,
  step = '0.001',
  disabled,
  min,
  max,
}: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const oldValue = el.value;
    const oldCursor = el.selectionStart ?? oldValue.length;

    if (!withFormatting) {
      onChange(oldValue);
      return;
    }

    // Apply live comma formatting and keep cursor in the right spot.
    const formatted = formatWithCommas(oldValue);
    onChange(formatted);
    // Restore cursor after React applies the new value (next frame).
    restoreCursorAfterFormat(el, oldValue, oldCursor, formatted);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label
          className="text-sm font-bold flex items-center gap-1.5"
          style={{ color: 'var(--text)' }}
        >
          {label}
          {help && (
            <button
              type="button"
              onClick={() => setShowHelp((s) => !s)}
              className="opacity-60 hover:opacity-100 transition-opacity min-w-7 min-h-7 inline-flex items-center justify-center rounded-lg"
              aria-label="Help"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </label>
        {unit && (
          <span
            className="text-xs font-bold opacity-60"
            style={{ color: 'var(--text-3)' }}
          >
            {unit}
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        // Keep type="text" so we have full control of the displayed string
        // (commas would otherwise be rejected by type="number").
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder ?? '0'}
        disabled={disabled}
        step={step}
        min={min}
        max={max}
        autoComplete="off"
        className="input-field text-lg sm:text-xl font-extrabold"
        style={{
          borderColor: focused ? 'var(--brand-primary)' : 'var(--border)',
        }}
      />

      {help && showHelp && (
        <p
          className="text-xs leading-relaxed p-3 rounded-lg"
          style={{
            background: 'color-mix(in srgb, var(--brand-primary) 8%, transparent)',
            color: 'var(--text-2)',
          }}
        >
          💡 {help}
        </p>
      )}
    </div>
  );
}
