/**
 * PriceRangeChart — "what-if" closing price scenarios.
 *
 * Given the user's actual closing price X (in fils) and a `pairs` array of
 * 11 (closingFils, adjustedFils) tuples (computed by the parent with the
 * same ex-price formula but varying the closing price by ±k fils, step=1),
 * render each scenario on its own row:
 *
 *   إذا أغلق على {closing} فلس → السعر المتوقّع عند الافتتاح: {adjusted} فلس
 *
 * The center row (closingFils === X) is visually highlighted.
 *
 * Numbers are rendered LTR even in Arabic mode (Western digits), so the
 * "closing → adjusted" mental model reads consistently in both languages.
 */
import type { Lang } from '../../lib/translations';
import type { Unit } from '../../lib/units';

export interface RangePair {
  closingFils: number;
  adjustedFils: number;
}

interface Props {
  closingFils: number;     // user's actual X
  pairs: RangePair[];      // 11 (closing, adjusted) pairs around X (step = 1 fils)
  language: Lang;
  /** kept for API compat with older callers */
  prices?: number[];
  target?: number;
  unit?: Unit;
}

export default function PriceRangeChart({ closingFils, pairs, language }: Props) {
  const filsLabel = language === 'ar' ? 'فلس' : 'fils';

  const helperText =
    language === 'ar'
      ? `إذا أغلق السهم على ${closingFils} فلس، هذا نطاق الأسعار المتوقّع عند الافتتاح.`
      : `If the stock closes at ${closingFils} fils, this is the expected opening range.`;

  const colClosingHeader = language === 'ar' ? 'سعر الإغلاق' : 'Closing price';
  const colOpeningHeader = language === 'ar' ? 'الافتتاح المتوقّع' : 'Expected opening';

  // Empty state safety
  if (!pairs?.length) return null;

  return (
    <div className="space-y-4">
      {/* Helper banner */}
      <p
        className="text-xs leading-relaxed p-3 rounded-lg flex items-start gap-2"
        style={{
          background: 'color-mix(in srgb, var(--brand-primary) 8%, transparent)',
          color: 'var(--text-2)',
        }}
      >
        <span aria-hidden>💡</span>
        <span>{helperText}</span>
      </p>

      {/* Two-column header */}
      <div
        dir="ltr"
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 pb-2 text-[11px] font-bold uppercase tracking-wider"
        style={{ color: 'var(--text-3)' }}
      >
        <span className="text-left">{colClosingHeader}</span>
        <span className="opacity-0">→</span>
        <span className="text-right">{colOpeningHeader}</span>
      </div>

      {/* Rows */}
      <ul dir="ltr" className="space-y-1.5">
        {pairs.map((p) => {
          const isCenter = p.closingFils === closingFils;
          return (
            <li
              key={p.closingFils}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 rounded-xl num-tabular transition-all"
              style={
                isCenter
                  ? {
                      background:
                        'linear-gradient(90deg, color-mix(in srgb, #FFB703 22%, transparent), color-mix(in srgb, #FFB703 6%, transparent))',
                      border: '1.5px solid color-mix(in srgb, #FFB703 55%, transparent)',
                      color: 'var(--text)',
                      boxShadow: '0 4px 14px rgba(255,183,3,.18)',
                    }
                  : {
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-2)',
                    }
              }
            >
              {/* Left: closing price */}
              <span className="flex items-center gap-2 text-left">
                {isCenter && (
                  <span
                    aria-label="current closing"
                    className="text-base"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,183,3,.6))' }}
                  >
                    ⭐
                  </span>
                )}
                <span
                  className={isCenter ? 'text-base font-extrabold' : 'text-sm font-bold'}
                  style={{ color: isCenter ? 'var(--brand-accent)' : 'var(--text-2)' }}
                >
                  {p.closingFils}
                </span>
                <span className="text-[11px] opacity-60">{filsLabel}</span>
              </span>

              {/* Center: arrow */}
              <span
                className="text-sm select-none"
                aria-hidden
                style={{
                  color: isCenter ? 'var(--brand-accent)' : 'var(--text-4)',
                  fontWeight: isCenter ? 800 : 500,
                }}
              >
                →
              </span>

              {/* Right: adjusted opening */}
              <span className="flex items-center justify-end gap-2 text-right">
                <span
                  className={isCenter ? 'text-lg font-black' : 'text-sm font-bold'}
                  style={{
                    color: isCenter ? 'var(--brand-accent)' : 'var(--text)',
                  }}
                >
                  {p.adjustedFils}
                </span>
                <span className="text-[11px] opacity-60">{filsLabel}</span>
              </span>
            </li>
          );
        })}
      </ul>

      {/* Footnote */}
      <p
        className="text-[11px] text-center mt-3 opacity-60"
        style={{ color: 'var(--text-3)' }}
      >
        {language === 'ar'
          ? 'الخطوة بين كلّ صفّ = 1 فلس · النجمة تشير لإغلاقك الفعليّ'
          : 'Step between each row = 1 fils · ⭐ marks your actual closing'}
      </p>
    </div>
  );
}
