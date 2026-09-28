import type { Entry } from "./payroll";

/**
 * Illustrative payroll for "Halden & Roe", a fictional employer. Every figure
 * the app shows without a live contract comes from here and is labelled as a
 * sample. Up to 16 people per category, the prototype's proof size.
 */
export const SAMPLE_EMPLOYER = "Halden & Roe";
export const SAMPLE_PERIOD = "2026";

const people = (prefix: string, women: number[], men: number[]): Entry[] => [
  ...women.map((pay, i) => ({ employee: `${prefix}-W${i + 1}`, woman: true, pay })),
  ...men.map((pay, i) => ({ employee: `${prefix}-M${i + 1}`, woman: false, pay })),
];

export const SAMPLE_PAYROLL: Record<string, Entry[]> = {
  Engineering: people("ENG", [5020, 5180, 4960, 5240, 5110, 5330], [5540, 5720, 5480, 5650, 5810, 5590, 5700]),
  "Customer support": people("SUP", [2710, 2760, 2690, 2800, 2740, 2720, 2780, 2700, 2750], [2790, 2820, 2760, 2810, 2770, 2800]),
  Drivers: people("DRV", [3050, 3120, 2980], [3200, 3240, 3180, 3310, 3150, 3270, 3220, 3190, 3260, 3230, 3170]),
};

/** Parses `employee,category,gender,pay` CSV. Gender is "woman" or "man". */
export function parsePayrollCsv(csv: string): Record<string, Entry[]> {
  const out: Record<string, Entry[]> = {};
  const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("The payroll file has no rows. Expected: employee,category,gender,pay");
  const [header, ...rows] = lines;
  if (!/^employee,category,gender,pay$/i.test(header.replace(/\s/g, "")))
    throw new Error("The first line must be: employee,category,gender,pay");
  rows.forEach((row, i) => {
    const [employee, category, gender, pay] = row.split(",").map((c) => c.trim());
    const g = gender?.toLowerCase();
    if (!employee || !category || (g !== "woman" && g !== "man") || !/^\d+$/.test(pay ?? ""))
      throw new Error(`Row ${i + 2} is not valid: "${row}"`);
    (out[category] ??= []).push({ employee, woman: g === "woman", pay: Number(pay) });
  });
  return out;
}
