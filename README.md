# rental-roi-formulas

The standard rental-property return formulas as one dependency-free JavaScript module: mortgage payment, monthly cash flow, NOI, cap rate and cash-on-cash return.

## Definitions

- **Mortgage payment (P&I):** `M = P * r(1+r)^n / ((1+r)^n - 1)`, with `r` the monthly rate and `n` the number of payments.
- **Monthly cash flow:** rent minus mortgage, tax, insurance, HOA, other costs, and maintenance, vacancy and management as percentages of rent.
- **NOI:** annual rent minus annual operating expenses. The mortgage is not an operating expense.
- **Cap rate:** NOI divided by purchase price. Because it ignores financing, it does not change with the down payment.
- **Cash-on-cash return:** annual cash flow divided by cash invested (down payment + closing costs + upfront repairs).

## Use

```js
const { computeROI } = require("./index");
computeROI({ price: 250000, downPct: 20, rate: 6.5, termYears: 30,
  closingCosts: 5000, upfrontRepairs: 0, rent: 2000, tax: 250, insurance: 100,
  hoa: 0, other: 0, maintenancePct: 5, vacancyPct: 5, mgmtPct: 0 });
```

`node index.js` prints a demo with made-up numbers. `npm test` checks the textbook case ($200,000 at 6% over 30 years is $1,199.10 a month), the all-cash case, and that cap rate stays the same when financing changes.

## Related

A browser version with itemized expenses and a 5-year projection is at rentalroianalyzer.com, the [free rental property ROI calculator](https://rentalroianalyzer.com/?utm_source=github&utm_medium=readme). Educational use only, not investment advice.

License: MIT
