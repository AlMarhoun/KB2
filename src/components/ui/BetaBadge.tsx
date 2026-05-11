/**
 * Subtle "Beta" badge — sits next to the logo.
 * Minimal, not distracting.
 */
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';

interface Props {
  language: Lang;
}

export default function BetaBadge({ language }: Props) {
  const t = useT(language);
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider align-middle"
      style={{
        background: 'color-mix(in srgb, #0A84FF 14%, transparent)',
        color: '#3FA1FF',
        border: '1px solid color-mix(in srgb, #0A84FF 30%, transparent)',
        letterSpacing: '0.08em',
        lineHeight: 1.3,
      }}
      aria-label="Beta"
      title={t.beta}
    >
      {t.beta}
    </span>
  );
}
