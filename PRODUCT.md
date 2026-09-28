# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Vite + React + TypeScript with the Midnight SDK (Compact 0.31.1, Midnight.js 4.1.1, Lace DApp connector). Chosen because the same toolchain is already proven in the author's Veil and NightVote dApps, including browser proving through a local proof server and Vercel deployment; Next.js needed extra WASM configuration there.

## Users

Primary for now: the Rise In "New Moon to Full" reviewers, who must understand the mechanism and see a working Midnight integration within minutes.

Product users the demo represents:
- HR and payroll teams at EU employers with 150+ workers who must publish gender pay-gap reports under the Pay Transparency Directive (first reports due June 2027).
- Employees and works councils who need to verify those reports without seeing anyone's salary.
- Labour inspectors and auditors (secondary).

## Product Purpose

Make an employer's gender pay-gap report provable instead of trusted. The employer commits the payroll on-chain as a Merkle root; each employee privately checks their own record against it; the report is computed inside a Compact circuit over the committed records and publishes only aggregates. Success: a reviewer can see a report whose figures are proven against a committed payroll, and an employee can check their record and file an anonymous dispute.

## Positioning

Pay-gap tools today compute reports from data only the employer sees. Parity's mechanism, a zero-knowledge proof that the published figures come from exactly the committed payroll, with the 5-person minimum enforced in the circuit, is what a spreadsheet or HR dashboard cannot truthfully claim.

## Operating Context

- EU Pay Transparency Directive (2023/970): transposition deadline 7 June 2026; employers with 150+ workers report by June 2027; an unexplained gap of 5% or more not fixed within six months triggers a joint pay assessment with worker representatives.
- Small-group protection: groups smaller than 5 people are not published.
- Runs on a Midnight test network (Preview) with the Lace wallet and a local proof server.

## Capabilities and Constraints

- Planned: payroll commitment, employee self-check of their record, in-circuit report with the 5-person threshold, anonymous dispute.
- Proven feasible: a 16-record spike (root recomputation, aggregation by gender, threshold) compiles with Compact 0.31.1.
- Known limits: differencing between report periods can leak a joiner's or leaver's pay; commitments only cover what the employer includes; category-level pay totals are public by design.
- Undecided: maximum records per category per proof, dispute resolution flow details.

## Brand Commitments

Name: Parity. The previous light "ledger" visual direction was rejected by the user (colors, too plain/corporate, typography); the user chose a dark, cinematic direction.

## Evidence on Hand

No real employer data, customers or endorsements. All figures in designs are illustrative (fictional company "Halden & Roe") and must be labelled as sample data. No deployed contract yet.

## Product Principles

- Prove, don't claim: every published figure links to the commitment and transaction behind it.
- No salary ever leaves the payroll; only aggregates of 5 or more people are published.
- Employees can check and dispute without identifying themselves.
- Be honest about limits (anonymous aggregates, differencing risk) rather than overpromising.
