import { motion } from 'framer-motion';
import { Copy, Share2, Info, RefreshCw } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import CountUpNumber from './CountUpNumber';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';
import { haptic, shareLink } from '../../lib/utils';
import { toast } from 'sonner';

interface Props {
  language: Lang;
  /** Big main number (animated count-up) */
  value: number;
  decimals?: number;
  unit?: string;
  /** Caption above the big number */
  caption: string;
  /** Optional formula text shown in expandable info */
  formula?: string;
  /** Secondary stats grid (label/value pairs) */
  secondaryStats?: Array<{ label: string; value: string; highlight?: 'gold' | 'green' | 'red' }>;
  /** Children rendered below (e.g. chart) */
  children?: ReactNode;
  /** Callbacks */
  onCopy: () => string; // returns text to copy
  onShare: () => string; // returns shareable URL
  onReset: () => void;
}

export default function ResultCard({
  language,
  value,
  decimals = 3,
  unit,
  caption,
  formula,
  secondaryStats,
  children,
  onCopy,
  onShare,
  onReset,
}: Props) {
  const t = useT(language);
  const [showFormula, setShowFormula] = useState(false);

  const handleCopy = async () => {
    haptic(8);
    try {
      await navigator.clipboard.writeText(onCopy());
      toast.success(t.common.copied);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleShare = async () => {
    haptic(8);
    const url = onShare();
    const result = await shareLink(url, t.brand, caption);
    if (result === 'copied') toast.success(t.common.copied);
  };

  const handleReset = () => {
    haptic(12);
    onReset();
  };

  const highlightColor = (h?: 'gold' | 'green' | 'red') => {
    if (h === 'green') return 'var(--brand-success)';
    if (h === 'red') return 'var(--brand-danger)';
    if (h === 'gold') return 'var(--brand-accent)';
    return 'var(--text)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="card p-7 md:p-9 relative overflow-hidden result-card"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--brand-accent) 6%, var(--surface)), var(--surface))',
        borderColor: 'color-mix(in srgb, var(--brand-accent) 25%, var(--border))',
      }}
    >
      {/* Top accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'linear-gradient(90deg, var(--brand-accent), var(--brand-primary))' }}
      />

      {/* Caption */}
      <div
        className="text-xs font-bold uppercase tracking-wider mb-3 opacity-70"
        style={{ color: 'var(--text-3)' }}
      >
        {caption}
      </div>

      {/* Main number — count-up animation */}
      <div className="flex items-baseline gap-3 mb-2">
        <div
          className="text-5xl md:text-6xl font-black gradient-text-gold leading-none result-number"
          style={{ letterSpacing: '-0.03em' }}
        >
          <CountUpNumber value={value} decimals={decimals} duration={0.9} />
        </div>
        {unit && (
          <span
            className="text-lg md:text-xl font-extrabold opacity-70"
            style={{ color: 'var(--brand-accent)' }}
          >
            {unit}
          </span>
        )}
      </div>

      {/* Glow pulse beneath number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '50%',
          width: '300px',
          height: '60px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(255,183,3,.4), transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Secondary stats */}
      {secondaryStats && secondaryStats.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {secondaryStats.map((s, i) => (
            <div key={i}>
              <div
                className="text-xs font-bold uppercase tracking-wide mb-1 opacity-70"
                style={{ color: 'var(--text-3)' }}
              >
                {s.label}
              </div>
              <div
                className="text-lg font-extrabold num-tabular"
                style={{ color: highlightColor(s.highlight) }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Children (charts etc.) */}
      {children && <div className="mt-6">{children}</div>}

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t result-actions" style={{ borderColor: 'var(--border)' }}>
        <button onClick={handleCopy} className="btn btn-ghost text-sm">
          <Copy className="w-4 h-4" />
          {t.common.copy}
        </button>
        <button onClick={handleShare} className="btn btn-ghost text-sm">
          <Share2 className="w-4 h-4" />
          {t.common.share}
        </button>
        <button onClick={handleReset} className="btn btn-ghost text-sm">
          <RefreshCw className="w-4 h-4" />
          {t.common.reset}
        </button>
        {formula && (
          <button
            onClick={() => setShowFormula((s) => !s)}
            className="btn btn-ghost text-sm ml-auto rtl:ml-0 rtl:mr-auto"
          >
            <Info className="w-4 h-4" />
            {t.common.showFormula}
          </button>
        )}
      </div>

      {showFormula && formula && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-4 rounded-xl text-sm font-mono leading-relaxed whitespace-pre-line"
          style={{
            background: 'color-mix(in srgb, var(--brand-primary) 6%, transparent)',
            color: 'var(--text-2)',
          }}
          dir="ltr"
        >
          {formula}
        </motion.div>
      )}
    </motion.div>
  );
}
