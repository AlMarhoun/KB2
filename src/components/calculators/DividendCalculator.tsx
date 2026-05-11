/**
 * DividendCalculator
 *
 * Inputs:
 *   - sharesOwned (count — formatted with commas, no unit conversion)
 *   - cashDividendPerShare (price-per-share — fils or dinar based on toggle)
 *       NOTE: Kuwait Bourse historically announces dividends in fils.
 *             We honor that as the default; "dinar" lets you enter the
 *             per-share dividend in KD if you got the figure in that form.
 *   - bonus % (percentage)
 *
 * Output: total cash in fils OR dinar (matches toggle), plus bonus shares count.
 */
import { useState, useEffect, useMemo } from 'react';
import { Calculator, Zap } from 'lucide-react';
import SmartInput from '../shared/SmartInput';
import ResultCard from '../shared/ResultCard';
import UnitToggle from '../shared/UnitToggle';
import { calcDividend } from '../../lib/calculators';
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

export default function DividendCalculator({ language, initialInputs }: Props) {
  const t = useT(language);
  const tt = t.calc.div;
  const [unit, setUnit] = useUnit();

  useEffect(() => {
    if (initialInputs?.u && (initialInputs.u === 'fils' || initialInputs.u === 'dinar')) {
      setUnit(initialInputs.u as Unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [shares, setShares] = useState(initialInputs?.shares || '');
  const [cash, setCash] = useState(initialInputs?.cash || '');
  const [b, setB] = useState(initialInputs?.b || '');
  const [calculated, setCalculated] = useState(false);

  const handleUnitChange = (next: Unit) => {
    if (next === unit) return;
    setCash((prev) => convertPriceText(prev, unit, next));
    setUnit(next);
    setCalculated(false);
  };

  // ---- Compute (canonical KD inside calcDividend) ----
  // The calc takes "fils per share" historically. We pass it the value parsed
  // by the unit: if unit=fils, the user's input IS fils per share; if dinar,
  // we convert KD-per-share back to fils for the calc to keep arithmetic consistent.
  const result = useMemo(() => {
    if (!calculated) return null;
    const cashPerShareKD = parsePriceInput(cash, unit); // KD per share
    const cashPerShareFils = cashPerShareKD * 1000;
    return calcDividend({
      sharesOwned: stripCommas(shares),
      cashDividendPerShareFils: cashPerShareFils,
      bonusPercent: stripCommas(b),
    });
  }, [calculated, shares, cash, b, unit]);

  useEffect(() => {
    if (!result || !calculated) return;
    pushUrlState('dividend', { shares, cash, b, u: unit });
    saveEntry({
      type: 'dividend',
      inputs: { shares, cash, b, u: unit },
      // Result preview always in dinar — the input unit only affects how
      // dividend-per-share was entered, not the total cash received.
      resultPreview: `${formatDisplay(stripCommas(shares))} sh → ${formatPriceOutput(result.totalCashKD, 'dinar')} ${unitLabel('dinar', language)}`,
    });
  }, [result]);

  useEffect(() => {
    if (initialInputs?.shares && initialInputs.cash) setCalculated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canCalculate = stripCommas(shares) > 0 && (stripCommas(cash) > 0 || stripCommas(b) > 0);

  const handleCalc = () => {
    if (!canCalculate) return;
    haptic(15);
    setCalculated(true);
  };

  const handleReset = () => {
    setShares('');
    setCash('');
    setB('');
    setCalculated(false);
  };

  const placeholderCash = unit === 'fils' ? '12' : '0.012';

  return (
    <div className="space-y-5 md:space-y-6 calculator-shell">
      <div className="flex items-start gap-3.5 md:gap-4 calculator-header">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg calculator-icon"
          style={{
            background: 'linear-gradient(135deg, #22C55E, #10B981)',
            boxShadow: '0 12px 28px rgba(34,197,94,.35)',
          }}
        >
          <Calculator className="w-7 h-7 text-white" />
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
        <SmartInput
          label={tt.sharesOwned}
          value={shares}
          onChange={(v) => {
            setShares(v);
            setCalculated(false);
          }}
          unit={t.common.shares}
          help={tt.helpShares}
          placeholder="100,000"
        />
        <SmartInput
          label={
            unit === 'fils'
              ? tt.cashDiv
              : language === 'ar'
              ? 'التوزيع النقديّ لكلّ سهم (د.ك)'
              : 'Cash Dividend per Share (KD)'
          }
          value={cash}
          onChange={(v) => {
            setCash(v);
            setCalculated(false);
          }}
          unit={unitLabel(unit, language)}
          help={tt.helpCash}
          placeholder={placeholderCash}
          withFormatting={unit === 'fils'}
        />
        <SmartInput
          label={tt.bonus}
          value={b}
          onChange={(v) => {
            setB(v);
            setCalculated(false);
          }}
          unit="%"
          help={tt.helpBonus}
          placeholder="5"
        />

        <button
          onClick={handleCalc}
          disabled={!canCalculate}
          className="btn w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed primary-action"
          style={{
            background: 'linear-gradient(135deg, #22C55E, #10B981)',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(34,197,94,.35)',
          }}
        >
          <Zap className="w-5 h-5" />
          {t.common.calculate}
        </button>
      </div>

      {result && calculated && (
        <ResultCard
          language={language}
          // Total cash is always shown in dinar (KD) regardless of input unit.
          // The unit toggle only affects how the per-share dividend was entered.
          value={result.totalCashKD}
          decimals={3}
          unit={unitLabel('dinar', language)}
          caption={tt.totalCash}
          formula={`${result.formula}\nShares=${shares}, Cash=${cash} ${unitLabel(unit, 'en')}/share, Bonus=${b || 0}%`}
          secondaryStats={[
            {
              label: tt.bonusShares,
              value: `+${formatDisplay(result.bonusShares)} ${t.common.shares}`,
              highlight: 'gold',
            },
            {
              label: tt.finalPosition,
              value: `${formatDisplay(result.finalShares)} ${t.common.shares}`,
              highlight: 'green',
            },
          ]}
          onCopy={() => {
            const inputUnit = unitLabel(unit, language);           // per-share input unit
            const kdLabel = unitLabel('dinar', language);          // total cash always in KD
            const sh = formatDisplay(stripCommas(shares));
            const totalCash = formatPriceOutput(result.totalCashKD, 'dinar');
            const lines: string[] = [];
            if (language === 'ar') {
              lines.push('حساب التوزيعات:', '');
              lines.push(`عدد الأسهم: ${sh} ${t.common.shares}`);
              if (cash) lines.push(`التوزيع لكلّ سهم: ${cash} ${inputUnit}`);
              if (b) lines.push(`نسبة المنحة: ${b}%`);
              lines.push('', `إجمالي النقد: ${totalCash} ${kdLabel}`);
              if (result.bonusShares > 0)
                lines.push(`أسهم المنحة: +${formatDisplay(result.bonusShares)} ${t.common.shares}`);
              lines.push(`المركز النهائي: ${formatDisplay(result.finalShares)} ${t.common.shares}`);
              lines.push('', 'تم النسخ من موقع https://kb-almarhoun.vercel.app/');
            } else {
              lines.push('Dividend Calculation:', '');
              lines.push(`Shares Owned: ${sh}`);
              if (cash) lines.push(`Cash per Share: ${cash} ${inputUnit}`);
              if (b) lines.push(`Bonus Ratio: ${b}%`);
              lines.push('', `Total Cash: ${totalCash} ${kdLabel}`);
              if (result.bonusShares > 0)
                lines.push(`Bonus Shares: +${formatDisplay(result.bonusShares)}`);
              lines.push(`Final Position: ${formatDisplay(result.finalShares)} shares`);
              lines.push('', 'Copied from https://kb-almarhoun.vercel.app/');
            }
            return lines.join('\n');
          }}
          onShare={() => encodeStateToUrl('dividend', { shares, cash, b, u: unit })}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
