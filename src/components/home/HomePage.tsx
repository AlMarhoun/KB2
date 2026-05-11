/**
 * HomePage
 *
 * Sections (top → bottom):
 *   1. Hero (eyebrow, title, subtitle, CTAs, stats)
 *   2. Tools bento (3 calculator cards)
 *   3. Portfolio Teaser (coming-soon)
 *   4. Live Examples (3 quick-start scenarios — fils by default, dynamic per unit)
 *   5. FAQ (collapsible, practical questions)
 *   6. About (developer story + socials)
 */
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calculator,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Smartphone,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';
import type { Module } from '../layout/BottomNav';
import PortfolioTeaser from './PortfolioTeaser';
import { useUnit } from '../../hooks/useUnit';
import { formatPriceOutput, unitLabel, type Unit } from '../../lib/units';

interface Props {
  language: Lang;
  onNavigate: (m: Module) => void;
  onLoadExample: (
    type: Exclude<Module, 'home'>,
    inputs: Record<string, string>,
  ) => void;
}

const TOOLS_META = [
  {
    id: 'ex-price' as const,
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #0A84FF, #6366F1)',
    glow: 'rgba(10,132,255,.35)',
  },
  {
    id: 'dividend' as const,
    icon: Calculator,
    gradient: 'linear-gradient(135deg, #22C55E, #10B981)',
    glow: 'rgba(34,197,94,.35)',
  },
  {
    id: 'average-cost' as const,
    icon: BarChart3,
    gradient: 'linear-gradient(135deg, #F59E0B, #FB923C)',
    glow: 'rgba(245,158,11,.35)',
  },
];

/**
 * Live examples are stored in CANONICAL KD so they can be displayed and
 * loaded in either fils or dinar mode without arithmetic ambiguity.
 */
const LIVE_EXAMPLES: Array<{
  type: Exclude<Module, 'home'>;
  /** Price-field values stored as KD; non-price fields stored verbatim. */
  pricesKD: Record<string, number>;
  rawFields: Record<string, string>;
  resultKD: number;
  /** Builds the human-readable example text per language + unit. */
  describe: (lang: Lang, unit: Unit, fmtPrice: (kd: number) => string, unitTxt: string) => {
    title: string;
    result: string;
  };
}> = [
  {
    type: 'ex-price',
    pricesKD: { cp: 0.620 },
    rawFields: { b: '5', type: 'bonus' },
    resultKD: 0.5905,
    describe: (lang, _u, fmt, unitTxt) => ({
      title:
        lang === 'ar'
          ? `سهم بسعر ${fmt(0.62)} ${unitTxt} + منحة 5%`
          : `Stock at ${fmt(0.62)} ${unitTxt} + 5% bonus`,
      result:
        lang === 'ar'
          ? `السعر بعد التفسيخ: ${fmt(0.5905)} ${unitTxt}`
          : `Adjusted: ${fmt(0.5905)} ${unitTxt}`,
    }),
  },
  {
    type: 'dividend',
    pricesKD: { cash: 0.012 }, // 12 fils per share
    rawFields: { shares: '100,000', b: '8' },
    resultKD: 1.2,
    describe: (lang, _u, fmt, unitTxt) => ({
      title:
        lang === 'ar'
          ? `100,000 سهم × ${fmt(0.012)} ${unitTxt} + منحة 8%`
          : `100,000 shares × ${fmt(0.012)} ${unitTxt} + 8% bonus`,
      result:
        lang === 'ar'
          ? `النقد: ${fmt(1.2)} ${unitTxt} + 8,000 سهم منحة`
          : `Cash: ${fmt(1.2)} ${unitTxt} + 8,000 bonus shares`,
    }),
  },
  {
    type: 'average-cost',
    pricesKD: { p1: 0.5, p2: 0.6 },
    rawFields: { q1: '5,000', q2: '5,000' },
    resultKD: 0.55,
    describe: (lang, _u, fmt, unitTxt) => ({
      title:
        lang === 'ar'
          ? `5,000 سهم × ${fmt(0.5)} + 5,000 سهم × ${fmt(0.6)} ${unitTxt}`
          : `5,000 × ${fmt(0.5)} + 5,000 × ${fmt(0.6)} ${unitTxt}`,
      result:
        lang === 'ar'
          ? `المتوسّط الجديد: ${fmt(0.55)} ${unitTxt}`
          : `New avg: ${fmt(0.55)} ${unitTxt}`,
    }),
  },
];

export default function HomePage({ language, onNavigate, onLoadExample }: Props) {
  const t = useT(language);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [unit] = useUnit();

  const fmt = (kd: number) => formatPriceOutput(kd, unit, 3);
  const unitTxt = unitLabel(unit, language);

  const tools = [
    { ...TOOLS_META[0], ...t.tools.exPrice },
    { ...TOOLS_META[1], ...t.tools.dividend },
    { ...TOOLS_META[2], ...t.tools.averageCost },
  ];

  const handleExampleClick = (
    ex: (typeof LIVE_EXAMPLES)[number],
  ) => {
    // Convert price fields from KD → display string in current unit; other
    // fields pass through verbatim. Add a `u` flag so the calculator opens
    // in the matching unit even if the user later toggles.
    const inputs: Record<string, string> = { ...ex.rawFields, u: unit };
    for (const [key, kdValue] of Object.entries(ex.pricesKD)) {
      inputs[key] = formatPriceOutput(kdValue, unit, 3);
    }
    onLoadExample(ex.type, inputs);
  };

  return (
    <div className="space-y-10 md:space-y-24 mobile-home">
      {/* ==================== HERO ==================== */}
      <section className="text-center pt-3 md:pt-12 mobile-hero">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6 backdrop-blur-md"
          style={{
            background: 'color-mix(in srgb, var(--brand-primary) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--brand-primary) 30%, transparent)',
            color: 'var(--brand-primary)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t.hero.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
          style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
        >
          {t.hero.title1}
          <br />
          <span className="gradient-text-brand">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 font-medium"
          style={{ color: 'var(--text-2)' }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mobile-hero-actions"
        >
          <button
            onClick={() => onNavigate('ex-price')}
            className="btn btn-primary px-6 py-3.5 text-base"
          >
            <Zap className="w-4 h-4" />
            {t.hero.ctaPrimary}
          </button>
          <a href="#tools" className="btn btn-ghost px-6 py-3.5 text-base">
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Stats row — updated social proof: +20,000 uses */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto mt-12 mobile-stats"
        >
          {[
            { big: t.hero.stat1, sub: t.hero.stat1Sub },
            { big: t.hero.stat2, sub: t.hero.stat2Sub },
            { big: t.hero.stat3, sub: t.hero.stat3Sub },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-black gradient-text-gold num-tabular leading-none mb-1"
                dir="ltr"
              >
                {s.big}
              </div>
              <div className="text-xs font-semibold opacity-70" style={{ color: 'var(--text-3)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.7 }}
          className="card install-note max-w-2xl mx-auto mt-4 p-4 text-start flex items-center gap-3"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'color-mix(in srgb, var(--brand-primary) 14%, transparent)',
              color: 'var(--brand-primary)',
            }}
          >
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-extrabold" style={{ color: 'var(--text)' }}>
              {language === 'ar' ? 'جاهزة للحفظ على الشاشة الرئيسية' : 'Ready for your Home Screen'}
            </div>
            <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--text-2)' }}>
              {language === 'ar'
                ? 'تفتح كتطبيق مستقل وتحافظ على الحاسبات والسجل على جهازك.'
                : 'Launches standalone and keeps calculators plus history on your device.'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ==================== TOOLS BENTO ==================== */}
      <section id="tools" className="scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black mb-3" style={{ color: 'var(--text)' }}>
            {t.tools.title}
          </h2>
          <p className="text-base font-medium" style={{ color: 'var(--text-2)' }}>
            {t.tools.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate(tool.id)}
                className="card text-start p-6 md:p-7 group cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: tool.gradient }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
                  style={{
                    background: tool.gradient,
                    boxShadow: `0 12px 28px ${tool.glow}`,
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
                  {tool.name}
                </h3>
                <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {tool.tagline}
                </p>
                <ul className="space-y-2 mb-6">
                  {[tool.feature1, tool.feature2, tool.feature3].map((f, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--text-3)' }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: tool.gradient }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div
                  className="inline-flex items-center gap-2 font-bold text-sm transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  {t.common.tryNow}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ==================== PORTFOLIO TEASER ==================== */}
      <section>
        <PortfolioTeaser language={language} />
      </section>

      {/* ==================== LIVE EXAMPLES (unit-aware) ==================== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: 'var(--text)' }}>
            {t.examples.title}
          </h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>
            {t.examples.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {LIVE_EXAMPLES.map((ex, i) => {
            const desc = ex.describe(language, unit, fmt, unitTxt);
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleExampleClick(ex)}
                className="card text-start p-5 group"
              >
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2 opacity-60"
                  style={{ color: 'var(--text-3)' }}
                >
                  {language === 'ar' ? 'مثال' : 'Example'} {i + 1}
                </div>
                <div
                  className="font-bold mb-3 text-sm leading-snug"
                  style={{ color: 'var(--text)' }}
                >
                  {desc.title}
                </div>
                <div
                  className="text-base font-extrabold gradient-text-gold num-tabular mb-3"
                  dir="ltr"
                >
                  {desc.result}
                </div>
                <div
                  className="text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--brand-primary)' }}
                >
                  {t.examples.try} →
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black" style={{ color: 'var(--text)' }}>
            {t.faq.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="card overflow-hidden transition-all"
                style={{ borderColor: isOpen ? 'var(--brand-primary)' : 'var(--border)' }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-start"
                  style={{ color: 'var(--text)' }}
                >
                  <span className="font-bold text-sm sm:text-base flex-1">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--brand-primary)' }}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================== ABOUT (full personal story) ==================== */}
      <section>
        <div
          className="card p-7 md:p-10 max-w-3xl mx-auto"
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--brand-primary) 8%, transparent), transparent)',
          }}
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider opacity-70"
            style={{ color: 'var(--text-3)' }}
          >
            <Shield className="w-3.5 h-3.5" />
            {t.about.title}
          </div>
          <h3 className="text-2xl font-black mb-4" style={{ color: 'var(--text)' }}>
            Mohammad AlMarhoun
          </h3>
          <p
            className="text-base leading-relaxed whitespace-pre-line mb-6"
            style={{ color: 'var(--text-2)' }}
          >
            {t.about.bio}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/Eng_AlMarhoun"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-sm"
            >
              📱 Telegram
            </a>
            <a
              href="https://youtube.com/@mohammadalmarhoun?si=739Olv4MpSmD8-Cf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-sm"
            >
              ▶️ YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
