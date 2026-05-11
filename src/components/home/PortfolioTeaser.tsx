/**
 * "Smart Portfolio" coming-soon teaser card on HomePage.
 * Builds anticipation for future paid feature without committing to scope.
 */
import { motion } from 'framer-motion';
import { Lock, Briefcase, Sparkles } from 'lucide-react';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';

interface Props {
  language: Lang;
}

export default function PortfolioTeaser({ language }: Props) {
  const t = useT(language);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card relative overflow-hidden p-6 md:p-8"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 8%, var(--surface)), var(--surface))',
        borderColor: 'color-mix(in srgb, var(--brand-primary) 25%, var(--border))',
      }}
    >
      {/* Decorative corner glow */}
      <div
        className="absolute -top-20 -end-20 w-60 h-60 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(10,132,255,.18), transparent 60%)',
        }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-5">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A84FF, #6366F1)',
            boxShadow: '0 12px 28px rgba(10,132,255,.35)',
          }}
        >
          <Briefcase className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl md:text-2xl font-black" style={{ color: 'var(--text)' }}>
              {t.portfolio.title}
            </h3>
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
              style={{
                background: 'color-mix(in srgb, #FFB703 18%, transparent)',
                color: '#FFB703',
                border: '1px solid color-mix(in srgb, #FFB703 35%, transparent)',
              }}
            >
              <Sparkles className="w-3 h-3" />
              {language === 'ar' ? 'جديد' : 'New'}
            </span>
          </div>
          <p
            className="text-sm md:text-base leading-relaxed mb-1"
            style={{ color: 'var(--text-2)' }}
          >
            {t.portfolio.desc}
          </p>
          <p className="text-xs opacity-70" style={{ color: 'var(--text-3)' }}>
            {t.portfolio.lockHint}
          </p>
        </div>

        {/* CTA */}
        <button
          disabled
          className="btn flex-shrink-0 cursor-not-allowed opacity-90"
          style={{
            background: 'color-mix(in srgb, var(--brand-primary) 14%, transparent)',
            color: 'var(--brand-primary)',
            border: '1px solid color-mix(in srgb, var(--brand-primary) 30%, transparent)',
          }}
          aria-disabled="true"
        >
          <Lock className="w-4 h-4" />
          {t.portfolio.cta}
        </button>
      </div>
    </motion.div>
  );
}
