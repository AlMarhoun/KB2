import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import logoImg from '../../assets/logo.png';

interface Props {
  reducedMotion: boolean;
}

const ticks = ['620', '590.5', '+5%', '12 فلس', '0.520', '108,000'];
const positions = [
  { insetInlineStart: '9%', top: '18%' },
  { insetInlineStart: '66%', top: '16%' },
  { insetInlineStart: '18%', top: '44%' },
  { insetInlineStart: '72%', top: '48%' },
  { insetInlineStart: '12%', top: '74%' },
  { insetInlineStart: '62%', top: '76%' },
];

export default function SplashScreen({ reducedMotion }: Props) {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.015 }}
      transition={{ duration: reducedMotion ? 0.15 : 0.45, ease: 'easeOut' }}
      role="status"
      aria-label="Launching Kuwait Bourse Calculator"
    >
      <div className="splash-market" aria-hidden>
        {ticks.map((tick, index) => (
          <span key={tick} style={{ '--i': index, ...positions[index] } as CSSProperties}>
            {tick}
          </span>
        ))}
      </div>

      <motion.div
        className="splash-logo-wrap"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.88, y: 12 }}
        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="splash-sweep" aria-hidden />
        <img src={logoImg} alt="" className="splash-logo" />
      </motion.div>

      <motion.div
        className="splash-copy"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: reducedMotion ? 0 : 0.55 }}
      >
        <p className="splash-title">حاسبة بورصة الكويت</p>
        <p className="splash-subtitle">Kuwait Bourse Calculator</p>
        <p className="splash-caption">أدوات ذكية لحسابات سوق الكويت</p>
      </motion.div>
    </motion.div>
  );
}
