"use strict";
// Monthly P&I: M = P * r(1+r)^n / ((1+r)^n - 1)
function monthlyMortgagePayment(principal, annualRatePct, termYears) {
  if (principal <= 0) return 0;
  const n = Math.round(termYears * 12);
  if (n <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * (r * f)) / (f - 1);
}

// inp: price, downPct, rate, termYears, closingCosts, upfrontRepairs, rent,
// tax, insurance, hoa, other (all $/month), maintenancePct, vacancyPct, mgmtPct (% of rent)
function computeROI(inp) {
  const downPayment = inp.price * (inp.downPct / 100);
  const loan = Math.max(0, inp.price - downPayment);
  const mortgage = inp.downPct >= 100 ? 0 : monthlyMortgagePayment(loan, inp.rate, inp.termYears);
  const pctExpenses = ((inp.maintenancePct + inp.vacancyPct + inp.mgmtPct) / 100) * inp.rent;
  const monthlyOpex = inp.tax + inp.insurance + inp.hoa + inp.other + pctExpenses;
  const monthlyCashFlow = inp.rent - (mortgage + monthlyOpex);
  const annualCashFlow = monthlyCashFlow * 12;
  const cashInvested = downPayment + inp.closingCosts + inp.upfrontRepairs;
  const cashOnCash = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : null;
  const noi = inp.rent * 12 - monthlyOpex * 12; // mortgage is not an operating expense
  const capRate = inp.price > 0 ? (noi / inp.price) * 100 : null;
  return { downPayment, loan, mortgage, monthlyOpex, monthlyCashFlow, annualCashFlow, cashInvested, cashOnCash, noi, capRate };
}

module.exports = { monthlyMortgagePayment, computeROI };

if (require.main === module) {
  const demo = { price: 250000, downPct: 20, rate: 6.5, termYears: 30, closingCosts: 5000, upfrontRepairs: 0,
    rent: 2000, tax: 250, insurance: 100, hoa: 0, other: 0, maintenancePct: 5, vacancyPct: 5, mgmtPct: 0 };
  console.log("illustrative inputs, not a real property:", computeROI(demo));
}
