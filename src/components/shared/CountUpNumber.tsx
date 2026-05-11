import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Animated count-up number with easeOut.
 * Used for the "result reveal moment" — number ticks up from 0.
 */
export default function CountUpNumber({
  value,
  decimals = 3,
  duration = 0.8,
  className = '',
  prefix = '',
  suffix = '',
}: Props) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) =>
    v.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, duration, motionVal, rounded]);

  return (
    <motion.span className={`num-tabular ${className}`} dir="ltr">
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
