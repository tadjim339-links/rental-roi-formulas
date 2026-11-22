const assert = require("assert");
const { monthlyMortgagePayment, computeROI } = require("./index");
const near = (a, b, e = 0.01) => assert.ok(Math.abs(a - b) <= e, `${a} vs ${b}`);
// 0% interest: straight division
near(monthlyMortgagePayment(120000, 0, 10), 1000);
// 200,000 at 6% for 30 years is the textbook 1199.10
near(monthlyMortgagePayment(200000, 6, 30), 1199.1);
assert.strictEqual(monthlyMortgagePayment(0, 5, 30), 0);
const base = { price: 200000, downPct: 100, rate: 6, termYears: 30, closingCosts: 0, upfrontRepairs: 0,
  rent: 1500, tax: 200, insurance: 100, hoa: 0, other: 0, maintenancePct: 0, vacancyPct: 0, mgmtPct: 0 };
// all cash: no mortgage, cash flow = rent - opex
const r = computeROI(base);
near(r.mortgage, 0); near(r.monthlyCashFlow, 1200);
near(r.noi, 14400); near(r.capRate, 7.2); near(r.cashOnCash, 7.2);
// percentage-of-rent expenses
near(computeROI({ ...base, vacancyPct: 5 }).monthlyOpex, 375);
// financed: cap rate ignores the mortgage, cash flow does not
const f = computeROI({ ...base, downPct: 20 });
near(f.capRate, 7.2);
assert.ok(f.monthlyCashFlow < r.monthlyCashFlow);
console.log("ok");
