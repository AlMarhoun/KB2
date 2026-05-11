/**
 * Fils / Dinar segmented toggle.
 * Sits at the top of every calculator. Persists globally via useUnit().
 */
import type { Unit } from '../../lib/units';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';
import { haptic } from '../../lib/utils';

interface Props {
  unit: Unit;
  onChange: (next: Unit) => void;
  language: Lang;
}

export default function UnitToggle({ unit, onChange, language }: Props) {
  const t = useT(language);

  const helpText = unit === 'fils' ? t.unit.helpFils : t.unit.helpDinar;

  const renderOption = (value: Unit, label: string) => {
    const isActive = unit === value;
    return (
      <button
        type="button"
        onClick={() => {
          if (isActive) return;
          haptic(8);
          onChange(value);
        }}
        className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all flex-1 min-h-11"
        style={
          isActive
            ? {
                background: 'linear-gradient(135deg, #0A84FF, #6366F1)',
                color: '#fff',
                boxShadow: '0 6px 16px rgba(10,132,255,.25)',
              }
            : {
                background: 'transparent',
                color: 'var(--text-2)',
              }
        }
        aria-pressed={isActive}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className="card p-3 flex flex-col sm:flex-row sm:items-center gap-3"
      style={{ background: 'var(--surface)' }}
    >
      <div className="flex items-center gap-2 sm:flex-shrink-0 justify-between sm:justify-start">
        <span
          className="text-xs font-bold uppercase tracking-wider px-2"
          style={{ color: 'var(--text-3)' }}
        >
          {t.unit.label}
        </span>
        <div
          className="flex p-1 rounded-xl gap-1"
          style={{ background: 'var(--surface-2)' }}
        >
          {renderOption('fils', t.unit.fils)}
          {renderOption('dinar', t.unit.dinar)}
        </div>
      </div>
      <p
        className="text-xs leading-relaxed sm:flex-1 sm:text-end opacity-70"
        style={{ color: 'var(--text-2)' }}
      >
        💡 {helpText}
      </p>
    </div>
  );
}
