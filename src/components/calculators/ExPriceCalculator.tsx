/**
 * ExPriceCalculator
 *
 * Inputs:
 *   - closingPrice (price field — fils or dinar based on toggle)
 *   - bonus % (percentage — always raw)
 *   - capital increase % (percentage — always raw)
 *   - capital reduction % (percentage — always raw)
 *   - subscription price (price field — fils or dinar based on toggle)
 *
 * Internal contract:
 *   - All math runs in KD via parsePriceInput().
 *   - Display uses formatPriceOutput() with the active unit.
 *   - URL state stores the *raw user input* with a `u` flag for the unit so
 *     shared links restore both the value and the unit context.
 */
import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, Zap } from 'lucide-react';
import SmartInput from '../shared/SmartInput';
import ResultCard from '../shared/ResultCard';
import PriceRangeChart from '../shared/PriceRangeChart';
import UnitToggle from '../shared/UnitToggle';
import { calcExPrice } from '../../lib/calculators';
import { saveEntry } from '../../lib/storage';
import { encodeStateToUrl, pushUrlState } from '../../lib/url-state';
import { haptic } from '../../lib/utils';
import { stripCommas } from '../../lib/format';
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

type ExType = '' | 'bonus' | 'capital-increase' | 'capital-reduction' | 'all';

export default function ExPriceCalculator({ language, initialInputs }: Props) {
  const t = useT(language);
  const tt = t.calc.ex;
  const [unit, setUnit] = useUnit();

  // If example provided a unit hint, prefer it on initial load.
  useEffect(() => {
    if (initialInputs?.u && (initialInputs.u === 'fils' || initialInputs.u === 'dinar')) {
      setUnit(initialInputs.u as Unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [type, setType] = useState<ExType>((initialInputs?.type as ExType) || '');
  const [cp, setCp] = useState(initialInputs?.cp || '');
  const [b, setB] = useState(initialInputs?.b || '');
  const [ci, setCi] = useState(initialInputs?.ci || '');
  const [cr, setCr] = useState(initialInputs?.cr || '');
  const [sp, setSp] = useState(initialInputs?.sp || '');
  const [calculated, setCalculated] = useState(false);

  const showBonus = type === 'bonus' || type === 'all';
  const showCI = type === 'capital-increase' || type === 'all';
  const showCR = type === 'capital-reduction' || type === 'all';

  // ---- Convert price-field text values when unit changes ----
  const handleUnitChange = (next: Unit) => {
    if (next === unit) return;
    setCp((prev) => convertPriceText(prev, unit, next));
    setSp((prev) => convertPriceText(prev, unit, next));
    setUnit(next);
    setCalculated(false);
  };

  // ---- Compute (always in KD) ----
  const result = useMemo(() => {
    if (!calculated || !type) return null;
    return calcExPrice({
      closingPrice: parsePriceInput(cp, unit),
      bonusPercent: showBonus ? stripCommas(b) : 0,
      capitalIncreasePercent: showCI ? stripCommas(ci) : 0,
      capitalReductionPercent: showCR ? stripCommas(cr) : 0,
      subscriptionPrice: showCI ? parsePriceInput(sp, unit) : 0,
    });
  }, [calculated, type, cp, b, ci, cr, sp, showBonus, showCI, showCR, unit]);

  // ---- "What-if" closing-price scenarios: 11 pairs of (closingFils, adjustedFils)
  //      built by re-running the same ex-price formula with closingPrice varied
  //      by ±k fils (step = 1, k = -5..+5). Empty if base CP is missing.
  const baseClosingFils = useMemo(() => {
    if (!result) return 0;
    return Math.max(0, Math.round(parsePriceInput(cp, unit) * 1000));
  }, [result, cp, unit]);

  const openingPairs = useMemo(() => {
    if (!result || !type || baseClosingFils <= 0) return [];
    const pairs: { closingFils: number; adjustedFils: number }[] = [];
    for (let k = -5; k <= 5; k++) {
      const newCpFils = baseClosingFils + k;
      if (newCpFils <= 0) continue;
      const r = calcExPrice({
        closingPrice: newCpFils / 1000,
        bonusPercent: showBonus ? stripCommas(b) : 0,
        capitalIncreasePercent: showCI ? stripCommas(ci) : 0,
        capitalReductionPercent: showCR ? stripCommas(cr) : 0,
        subscriptionPrice: showCI ? parsePriceInput(sp, unit) : 0,
      });
      pairs.push({
        closingFils: newCpFils,
        adjustedFils: Math.max(0, Math.round(r.adjustedPrice * 1000)),
      });
    }
    return pairs;
  }, [result, type, baseClosingFils, b, ci, cr, sp, showBonus, showCI, showCR, unit]);

  // ---- Persist + share ----
  useEffect(() => {
    if (!result || !calculated) return;
    pushUrlState('ex-price', { type, cp, b, ci, cr, sp, u: unit });
    saveEntry({
      type: 'ex-price',
      inputs: { type, cp, b, ci, cr, sp, u: unit },
      resultPreview: `${cp || '0'} → ${formatPriceOutput(result.adjustedPrice, unit)} ${unitLabel(unit, language)}`,
    });
  }, [result]);

  // ---- Auto-calc when arriving via shared link / example ----
  useEffect(() => {
    if (initialInputs && initialInputs.cp && initialInputs.type) {
      setCalculated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canCalculate = !!type && !!cp && stripCommas(cp) > 0;

  const handleCalc = () => {
    if (!canCalculate) return;
    haptic(15);
    setCalculated(true);
  };

  const handleReset = () => {
    setType('');
    setCp('');
    setB('');
    setCi('');
    setCr('');
    setSp('');
    setCalculated(false);
  };

  const placeholderPrice = unit === 'fils' ? '620' : '0.620';
  const placeholderSP = unit === 'fils' ? '100' : '0.100';

  return (
    <div className="space-y-5 md:space-y-6 calculator-shell">
      {/* Header */}
      <div className="flex items-start gap-3.5 md:gap-4 calculator-header">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg calculator-icon"
          style={{
            background: 'linear-gradient(135deg, #0A84FF, #6366F1)',
            boxShadow: '0 12px 28px rgba(10,132,255,.35)',
          }}
        >
          <TrendingUp className="w-7 h-7 text-white" />
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

      {/* Global unit toggle */}
      <UnitToggle unit={unit} onChange={handleUnitChange} language={language} />

      {/* Type selector */}
      <div className="card p-4 md:p-6 input-panel">
        <label className="text-sm font-bold mb-3 block" style={{ color: 'var(--text)' }}>
          {tt.typeLabel}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { v: 'bonus' as const, l: tt.typeBonus },
            { v: 'capital-increase' as const, l: tt.typeCI },
            { v: 'capital-reduction' as const, l: tt.typeCR },
            { v: 'all' as const, l: tt.typeAll },
          ].map((opt) => (
            <button
              key={opt.v}
              onClick={() => {
                haptic(8);
                setType(opt.v);
                setCalculated(false);
              }}
              className="px-3 py-3.5 rounded-xl text-xs font-bold transition-all min-h-12"
              style={
                type === opt.v
                  ? {
                      background: 'linear-gradient(135deg, #0A84FF, #6366F1)',
                      color: '#fff',
                      boxShadow: '0 8px 20px rgba(10,132,255,.3)',
                    }
                  : {
                      background: 'var(--surface-2)',
                      color: 'var(--text-2)',
                      border: '1px solid var(--border)',
                    }
              }
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      {type && (
        <div className="card p-4 md:p-6 space-y-5 input-panel">
          <SmartInput
            label={tt.closingPrice}
            value={cp}
            onChange={(v) => {
              setCp(v);
              setCalculated(false);
            }}
            unit={unitLabel(unit, language)}
            help={tt.helpCP}
            placeholder={placeholderPrice}
            withFormatting={unit === 'fils'}
          />

          {showBonus && (
            <SmartInput
              label={tt.bonus}
              value={b}
              onChange={(v) => {
                setB(v);
                setCalculated(false);
              }}
              unit="%"
              help={tt.helpB}
              placeholder="5"
            />
          )}

          {showCI && (
            <>
              <SmartInput
                label={tt.ci}
                value={ci}
                onChange={(v) => {
                  setCi(v);
                  setCalculated(false);
                }}
                unit="%"
                help={tt.helpCI}
                placeholder="10"
              />
              <SmartInput
                label={tt.sp}
                value={sp}
                onChange={(v) => {
                  setSp(v);
                  setCalculated(false);
                }}
                unit={unitLabel(unit, language)}
                help={tt.helpSP}
                placeholder={placeholderSP}
                withFormatting={unit === 'fils'}
              />
            </>
          )}

          {showCR && (
            <SmartInput
              label={tt.cr}
              value={cr}
              onChange={(v) => {
                setCr(v);
                setCalculated(false);
              }}
              unit="%"
              help={tt.helpCR}
              placeholder="20"
            />
          )}

          <button
            onClick={handleCalc}
            disabled={!canCalculate}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed primary-action"
          >
            <Zap className="w-5 h-5" />
            {t.common.calculate}
          </button>
        </div>
      )}

      {/* Result */}
      {result && calculated && (
        <ResultCard
          language={language}
          // Pass the value already in display unit; tell ResultCard the decimals.
          value={
            unit === 'fils'
              ? Math.round(result.adjustedPrice * 1000)
              : result.adjustedPrice
          }
          decimals={unit === 'fils' ? 0 : 3}
          unit={unitLabel(unit, language)}
          caption={tt.adjustedPrice}
          formula={`${result.formula}\nCP=${cp} ${unitLabel(unit, 'en')}, B=${b || 0}%, CI=${ci || 0}%, CR=${cr || 0}%, SP=${sp || 0}`}
          onCopy={() => {
            const u = unitLabel(unit, language);
            const adj = formatPriceOutput(result.adjustedPrice, unit);
            const typeLabel =
              type === 'bonus'
                ? tt.typeBonus
                : type === 'capital-increase'
                ? tt.typeCI
                : type === 'capital-reduction'
                ? tt.typeCR
                : tt.typeAll;
            const lines: string[] = [];
            if (language === 'ar') {
              lines.push('حساب التفسيخ:', '');
              lines.push(`نوع التفسيخ: ${typeLabel}`);
              lines.push(`سعر الإغلاق: ${cp} ${u}`);
              if (showBonus && b) lines.push(`نسبة المنحة: ${b}%`);
              if (showCI && ci) lines.push(`نسبة زيادة رأس المال: ${ci}%`);
              if (showCI && sp) lines.push(`سعر الاكتتاب: ${sp} ${u}`);
              if (showCR && cr) lines.push(`نسبة تخفيض رأس المال: ${cr}%`);
              lines.push('', `السعر المعدل: ${adj} ${u}`, '');
              lines.push('تم النسخ من موقع https://kb-almarhoun.vercel.app/');
            } else {
              lines.push('Ex-Price Calculation:', '');
              lines.push(`Type: ${typeLabel}`);
              lines.push(`Closing Price: ${cp} ${u}`);
              if (showBonus && b) lines.push(`Bonus Ratio: ${b}%`);
              if (showCI && ci) lines.push(`Capital Increase: ${ci}%`);
              if (showCI && sp) lines.push(`Subscription Price: ${sp} ${u}`);
              if (showCR && cr) lines.push(`Capital Reduction: ${cr}%`);
              lines.push('', `Adjusted Price: ${adj} ${u}`, '');
              lines.push('Copied from https://kb-almarhoun.vercel.app/');
            }
            return lines.join('\n');
          }}
          onShare={() =>
            encodeStateToUrl('ex-price', { type, cp, b, ci, cr, sp, u: unit })
          }
          onReset={handleReset}
        >
          <PriceRangeChart
            closingFils={baseClosingFils}
            pairs={openingPairs}
            language={language}
            unit={unit}
          />
        </ResultCard>
      )}
    </div>
  );
}
