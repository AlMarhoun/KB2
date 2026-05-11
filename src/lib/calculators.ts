/**
 * Pure calculator math — no React, no state.
 * Single source of truth for all formulas.
 *
 * Formulas verified against Kuwait Bourse standard practices.
 */

// ===== EX-PRICE =====
export interface ExPriceInput {
  closingPrice: number;
  bonusPercent?: number;        // e.g. 5 for 5%
  capitalIncreasePercent?: number;
  capitalReductionPercent?: number; // entered as positive
  subscriptionPrice?: number;
}

export interface ExPriceResult {
  adjustedPrice: number;
  priceRange: number[];           // 107 steps
  formula: string;
}

/**
 * Adjusted Ex-Price formula:
 *   adjustedPrice = (CP + (CI × SP)) / (1 + B + CI - CR)
 * where CR is treated as a negative decimal internally.
 */
export function calcExPrice(input: ExPriceInput): ExPriceResult {
  const cp = input.closingPrice || 0;
  const B = (input.bonusPercent ?? 0) / 100;
  const CI = (input.capitalIncreasePercent ?? 0) / 100;
  const CR = (input.capitalReductionPercent ?? 0) / 100;
  const SP = input.subscriptionPrice ?? 0;

  const denominator = 1 + B + CI - CR;
  const adjustedPrice = denominator !== 0 ? (cp + CI * SP) / denominator : 0;

  // Build 107-step price range — 53 below, target, 53 above (1 fils per step in Kuwait market)
  const step = 0.001; // 1 fils
  const range: number[] = [];
  for (let i = -53; i <= 53; i++) {
    range.push(Math.max(0, +(adjustedPrice + i * step).toFixed(3)));
  }

  return {
    adjustedPrice: +adjustedPrice.toFixed(3),
    priceRange: range,
    formula: '(CP + (CI × SP)) / (1 + B + CI - CR)',
  };
}

// ===== DIVIDEND =====
export interface DividendInput {
  sharesOwned: number;
  cashDividendPerShareFils: number;
  bonusPercent?: number;
}

export interface DividendResult {
  totalCashKD: number;
  bonusShares: number;
  finalShares: number;
  formula: string;
}

/**
 * Dividend:
 *   totalCash (KD)  = sharesOwned × cashDividendPerShareFils / 1000
 *   bonusShares     = sharesOwned × bonus%
 *   finalShares     = sharesOwned + bonusShares
 */
export function calcDividend(input: DividendInput): DividendResult {
  const shares = input.sharesOwned || 0;
  const cashFils = input.cashDividendPerShareFils || 0;
  const bonus = (input.bonusPercent ?? 0) / 100;

  const totalCashKD = (shares * cashFils) / 1000;
  const bonusShares = Math.floor(shares * bonus);
  const finalShares = shares + bonusShares;

  return {
    totalCashKD: +totalCashKD.toFixed(3),
    bonusShares,
    finalShares,
    formula: 'Cash = (Shares × Fils) / 1000\nBonus = Shares × Bonus%',
  };
}

// ===== AVERAGE COST =====
export interface AverageCostInput {
  currentQty: number;
  currentPrice: number;
  newQty: number;
  newPrice: number;
}

export interface AverageCostResult {
  newAverage: number;
  totalShares: number;
  totalCostKD: number;
  priceChange: number;       // delta vs current avg
  priceChangePercent: number;
  formula: string;
}

/**
 * Weighted average:
 *   newAvg = ((currentQty × currentPrice) + (newQty × newPrice)) / (currentQty + newQty)
 */
export function calcAverageCost(input: AverageCostInput): AverageCostResult {
  const q1 = input.currentQty || 0;
  const p1 = input.currentPrice || 0;
  const q2 = input.newQty || 0;
  const p2 = input.newPrice || 0;

  const totalShares = q1 + q2;
  const totalCostKD = q1 * p1 + q2 * p2;
  const newAverage = totalShares > 0 ? totalCostKD / totalShares : 0;
  const priceChange = newAverage - p1;
  const priceChangePercent = p1 > 0 ? (priceChange / p1) * 100 : 0;

  return {
    newAverage: +newAverage.toFixed(4),
    totalShares,
    totalCostKD: +totalCostKD.toFixed(3),
    priceChange: +priceChange.toFixed(4),
    priceChangePercent: +priceChangePercent.toFixed(2),
    formula: '((Q1 × P1) + (Q2 × P2)) / (Q1 + Q2)',
  };
}

// ===== FORMATTERS =====
export const fmtKD = (v: number, digits = 3) =>
  v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const fmtNumber = (v: number) =>
  v.toLocaleString('en-US');

export const fmtPercent = (v: number, digits = 2) =>
  `${v >= 0 ? '+' : ''}${v.toFixed(digits)}%`;
