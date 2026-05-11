/**
 * AverageCostCalculator
 *
 * Inputs:
 *   - currentQty (count, comma-formatted)
 *   - currentPrice (price field — fils or dinar based on toggle)
 *   - newQty (count, comma-formatted)
 *   - newPrice  (price field — fils or dinar based on toggle)
 *
 * BUG FIX (v2.1):
 *   The previous version showed "150,000,000" for a totalCost of 150,000.
 *   Root cause: the calculator was passing the user's RAW string straight to
 *   `parseFloat`, which interpreted a fils-formatted price (e.g. "500" meaning
 *   500 fils = 0.500 KD) as 500 KD, then multiplied by quantity. The
 *   shares-and-price product was therefore 1000× too large.
 *
 *   Fix: route all price inputs through `parsePriceInput(value, unit)` so
 *   they are normalized to KD before the math runs. The total cost displays
 *   in the active unit via `formatPriceOutput()`.
 *
 *   Verification table (qty × price):
 *     Unit=fils:   1,000 sh  × 150 fils  → cost 150,000 fils  (= 150 KD)  ✅
 *     Unit=dinar:  1,000 sh  × 0.150 KD  → cost   150 KD      (= 150,000 fils) ✅
 *     Unit=fils: 100,000 sh  × 500 fils  → cost  50,000,000 fils (= 50,000 KD) ✅
 */
import { useState, useEffect, useMemo } from 'react';
import { BarChart3, Zap } from 'lucide-react';
import SmartInput from '../shared/SmartInput';
import ResultCard from '../shared/ResultCard';
import UnitToggle from '../shared/UnitToggle';
import { calcAverageCost, fmtPercent } from '../../lib/calculators';
import { saveEntry } from '../../lib/storage';
import { encodeStateToUrl, pushUrlState } from '../../lib/url-state';
import { haptic } from '../../lib/utils';
import { stripCommas, formatDisplay } from '../../lib/format';
import {
  parsePriceInput,
  formatPriceOutput,
  unitLabel,
  convertPriceText,
  type Unit,
} from '../../lib/units';
import { useUnit } from '../../hooks/useUnit';
import type { Lang } from '../../lib/translations';
import { useT } from '../../lib/translations';

interface Props {
  language: Lang;
  initialInputs?: Record<string, string>;
}

export default function AverageCostCalculator({ language, initialInputs }: Props) {
  const t = useT(language);
  const tt = t.calc.avg;
  const [unit, setUnit] = useUnit();

  useEffect(() => {
    if (initialInputs?.u && (initialInputs.u === 'fils' || initialInputs.u === 'dinar')) {
      setUnit(initialInputs.u as Unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [q1, setQ1] = useState(initialInputs?.q1 || '');
  const [p1, setP1] = useState(initialInputs?.p1 || '');
  const [q2, setQ2] = useState(initialInputs?.q2 || '');
  const [p2, setP2] = useState(initialInputs?.p2 || '');
  const [calculated, setCalculated] = useState(false);

  const handleUnitChange = (next: Unit) => {
    if (next === unit) return;
    setP1((prev) => convertPriceText(prev, unit, next));
    setP2((prev) => convertPriceText(prev, unit, next));
    setUnit(next);
    setCalculated(false);
  };

  // ---- Compute (canonical KD inside calcAverageCost) ----
  const result = useMemo(() => {
    if (!calculated) return null;
    return calcAverageCost({
      currentQty: stripCommas(q1),
      currentPrice: parsePriceInput(p1, unit), // ⬅ FIXED: route through unit conversion
      newQty: stripCommas(q2),
      newPrice: parsePriceInput(p2, unit),     // ⬅ FIXED: route through unit conversion
    });
  }, [calculated, q1, p1, q2, p2, unit]);

  useEffect(() => {
    if (!result || !calculated) return;
    pushUrlState('average-cost', { q1, p1, q2, p2, u: unit });
    saveEntry({
      type: 'average-cost',
      inputs: { q1, p1, q2, p2, u: unit },
      resultPreview: `${p1} → ${formatPriceOutput(result.newAverage, unit, 4)} ${unitLabel(unit, language)}`,
    });
  }, [result]);

  useEffect(() => {
    if (initialInputs?.q1 && initialInputs.p1) setCalculated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canCalculate =
    stripCommas(q1) > 0 && stripCommas(p1) > 0 && stripCommas(q2) > 0 && stripCommas(p2) > 0;

  const handleCalc = () => {
    if (!canCalculate) return;
    haptic(15);
    setCalculated(true);
  };

  const handleReset = () => {
    setQ1('');
    setP1('');
    setQ2('');
    setP2('');
    setCalculated(false);
  };

  const placeholderPrice = unit === 'fils' ? '500' : '0.500';
  const placeholderPrice2 = unit === 'fils' ? '600' : '0.600';

  return (
    <div className="space-y-5 md:space-y-6 calculator-shell">
      <div className="flex items-start gap-3.5 md:gap-4 calculator-header">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg calculator-icon"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
            boxShadow: '0 12px 28px rgba(245,158,11,.35)',
          }}
        >
          <BarChart3 className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl md:text-3xl font-black mb-1" style={{ color: 'var(--text)' }}>
            {tt.title}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            {tt.subtitle}
          </p>
        </div>
      </div>

      <UnitToggle unit={unit} onChange={handleUnitChange} language={language} />

      <div className="card p-4 md:p-6 space-y-5 input-panel">
        <div
          className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2"
          style={{ color: 'var(--text-3)' }}
        >
          {language === 'ar' ? 'وضعك الحاليّ' : 'Current Position'}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <SmartInput
            label={tt.currentQty}
            value={q1}
            onChange={(v) => {
              setQ1(v);
              setCalculated(false);
            }}
            unit={t.common.shares}
            help={tt.helpQty}
            placeholder="5,000"
          />
          <SmartInput
            label={tt.currentPrice}
            value={p1}
            onChange={(v) => {
              setP1(v);
              setCalculated(false);
            }}
            unit={unitLabel(unit, language)}
            help={tt.helpPrice}
            placeholder={placeholderPrice}
            withFormatting={unit === 'fils'}
          />
        </div>

        <div
          className="text-xs font-bold uppercase tracking-wider opacity-70 mt-2 pt-4 border-t mb-2"
          style={{ color: 'var(--text-3)', borderColor: 'var(--border)' }}
        >
          {language === 'ar' ? 'الشراء الجديد' : 'New Purchase'}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <SmartInput
            label={tt.newQty}
            value={q2}
            onChange={(v) => {
              setQ2(v);
              setCalculated(false);
            }}
            unit={t.common.shares}
            help={tt.helpNewQty}
            placeholder="5,000"
          />
          <SmartInput
            label={tt.newPrice}
            value={p2}
            onChange={(v) => {
              setP2(v);
              setCalculated(false);
            }}
            unit={unitLabel(unit, language)}
            help={tt.helpNewPrice}
            placeholder={placeholderPrice2}
            withFormatting={unit === 'fils'}
          />
        </div>

        <button
          onClick={handleCalc}
          disabled={!canCalculate}
          className="btn w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed primary-action"
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
            color: '#1a1400',
            boxShadow: '0 8px 24px rgba(245,158,11,.35)',
          }}
        >
          <Zap className="w-5 h-5" />
          {t.common.calculate}
        </button>
      </div>

      {result && calculated && (
        <ResultCard
          language={language}
          value={
            unit === 'fils'
              ? Math.round(result.newAverage * 1000)
              : result.newAverage
          }
          decimals={unit === 'fils' ? 0 : 4}
          unit={unitLabel(unit, language)}
          caption={tt.newAverage}
          formula={`${result.formula}\nQ1=${q1}, P1=${p1} ${unitLabel(unit, 'en')}, Q2=${q2}, P2=${p2} ${unitLabel(unit, 'en')}`}
          secondaryStats={[
            {
              label: tt.totalShares,
              value: `${formatDisplay(result.totalShares)} ${t.common.shares}`,
              highlight: 'gold',
            },
            {
              // Total cost is always shown in KD, regardless of toggle.
              label: tt.totalCost,
              value: `${formatPriceOutput(result.totalCostKD, 'dinar')} ${unitLabel('dinar', language)}`,
            },
            {
              label: tt.priceChange,
              value: fmtPercent(result.priceChangePercent),
              highlight:
                result.priceChange > 0 ? 'red' : result.priceChange < 0 ? 'green' : undefined,
            },
          ]}
          onCopy={() => {
            const u = unitLabel(unit, language);
            const kdLabel = unitLabel('dinar', language);
            const newAvg = formatPriceOutput(result.newAverage, unit, 4);
            const totalCostKD = formatPriceOutput(result.totalCostKD, 'dinar');
            const totalSh = formatDisplay(result.totalShares);
            const change = fmtPercent(result.priceChangePercent);
            const lines: string[] = [];
            if (language === 'ar') {
              lines.push('حساب متوسّط التكلفة:', '');
              lines.push(`الكميّة الحاليّة: ${q1} ${t.common.shares}`);
              lines.push(`السعر الحاليّ: ${p1} ${u}`);
              lines.push(`الكميّة الجديدة: ${q2} ${t.common.shares}`);
              lines.push(`سعر الشراء الجديد: ${p2} ${u}`);
              lines.push('', `متوسّط السعر الجديد: ${newAvg} ${u}`);
              lines.push(`إجمالي الأسهم: ${totalSh} ${t.common.shares}`);
              lines.push(`إجمالي التكلفة: ${totalCostKD} ${kdLabel}`);
              lines.push(`التغيير في المتوسّط: ${change}`);
              lines.push('', 'تم النسخ من موقع https://kb-almarhoun.vercel.app/');
            } else {
              lines.push('Average Cost Calculation:', '');
              lines.push(`Current Quantity: ${q1} shares`);
              lines.push(`Current Price: ${p1} ${u}`);
              lines.push(`New Quantity: ${q2} shares`);
              lines.push(`New Purchase Price: ${p2} ${u}`);
              lines.push('', `New Average Price: ${newAvg} ${u}`);
              lines.push(`Total Shares: ${totalSh}`);
              lines.push(`Total Cost: ${totalCostKD} ${kdLabel}`);
              lines.push(`Average Change: ${change}`);
              lines.push('', 'Copied from https://kb-almarhoun.vercel.app/');
            }
            return lines.join('\n');
          }}
          onShare={() => encodeStateToUrl('average-cost', { q1, p1, q2, p2, u: unit })}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
