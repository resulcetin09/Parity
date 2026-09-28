import { Phase, ledger } from "../../contract/managed/parity/contract/index.js";
import { decodeLabel, toHex } from "./bytes";
import { MIN_GROUP, buildCategory, figures, type Entry, type GroupFigures } from "./payroll";
import { SAMPLE_EMPLOYER, SAMPLE_PAYROLL, SAMPLE_PERIOD } from "./sample";

export { Phase };

export type CategoryView =
  | { id: string; label: string; status: "published"; figures: GroupFigures }
  | { id: string; label: string; status: "withheld" }
  | { id: string; label: string; status: "pending"; root: string };

export interface ReportView {
  source: "sample" | "chain";
  employer: string;
  period: string;
  phase: Phase;
  employees: number;
  openDisputes: string[];
  resolvedDisputes: number;
  categories: CategoryView[];
  /** Across published categories only: withheld groups never contribute. */
  overall: GroupFigures | null;
}

function overallOf(categories: CategoryView[]): GroupFigures | null {
  const pub = categories.filter((c): c is Extract<CategoryView, { status: "published" }> => c.status === "published");
  if (pub.length === 0) return null;
  const sum = pub.reduce(
    (a, c) => ({
      women: a.women + BigInt(c.figures.women),
      men: a.men + BigInt(c.figures.men),
      womenPay: a.womenPay + BigInt(Math.round(c.figures.womenAverage * c.figures.women)),
      menPay: a.menPay + BigInt(Math.round(c.figures.menAverage * c.figures.men)),
    }),
    { women: 0n, men: 0n, womenPay: 0n, menPay: 0n },
  );
  return figures(sum);
}

export function fromLedger(value: ReturnType<typeof ledger>, employer = ""): ReportView {
  const categories: CategoryView[] = [...value.payroll].map(([id, root]) => {
    const label = decodeLabel(id);
    const hex = toHex(id);
    if (value.results.member(id)) return { id: hex, label, status: "published", figures: figures(value.results.lookup(id)) };
    if (value.withheld.member(id)) return { id: hex, label, status: "withheld" };
    return { id: hex, label, status: "pending", root: toHex(root) };
  });
  return {
    source: "chain",
    employer,
    period: decodeLabel(value.period),
    phase: value.phase,
    employees: Number(value.registered.size()),
    openDisputes: [...value.openDisputes].map(toHex),
    resolvedDisputes: Number(value.resolvedDisputes),
    categories,
    overall: overallOf(categories),
  };
}

/** The same aggregation the circuit performs, run locally on the sample payroll. */
export function sampleReport(payroll: Record<string, Entry[]> = SAMPLE_PAYROLL): ReportView {
  const categories: CategoryView[] = Object.entries(payroll).map(([label, entries]) => {
    const built = buildCategory(label, entries);
    const women = entries.filter((e) => e.woman);
    const men = entries.filter((e) => !e.woman);
    if (women.length < MIN_GROUP || men.length < MIN_GROUP) return { id: built.id, label, status: "withheld" };
    const total = (xs: Entry[]) => BigInt(xs.reduce((a, e) => a + e.pay, 0));
    return {
      id: built.id,
      label,
      status: "published",
      figures: figures({ women: BigInt(women.length), men: BigInt(men.length), womenPay: total(women), menPay: total(men) }),
    };
  });
  return {
    source: "sample",
    employer: SAMPLE_EMPLOYER,
    period: SAMPLE_PERIOD,
    phase: Phase.proving,
    employees: Object.values(payroll).flat().length,
    openDisputes: [],
    resolvedDisputes: 0,
    categories,
    overall: overallOf(categories),
  };
}

export const euros = (n: number) => `€${Math.round(n).toLocaleString("en-GB")}`;
export const pct = (n: number) => `${n.toFixed(1)}%`;
