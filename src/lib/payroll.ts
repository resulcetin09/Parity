import { pureCircuits, type PayRecord } from "../../contract/managed/parity/contract/index.js";
import { encodeLabel, fromHex, randomSecret, toHex } from "./bytes";

/** Records per category in one proof. Unused slots are salted blanks. */
export const SLOTS = 16;
/** Smallest group the report may publish. Enforced in the circuit. */
export const MIN_GROUP = 5;

export interface Entry {
  /** Employer's own reference; never leaves HR's device. */
  employee: string;
  woman: boolean;
  /** Average monthly gross pay, whole euros. */
  pay: number;
}

export interface CategoryPayroll {
  label: string;
  id: string;
  records: PayRecord[];
  root: string;
  /** Slot index of each entry, in input order. */
  slots: number[];
}

export interface InclusionProof {
  index: number;
  siblings: string[];
}

const blank = (): PayRecord => ({ present: false, woman: false, pay: 0n, salt: randomSecret() });

export function buildCategory(label: string, entries: Entry[]): CategoryPayroll {
  if (entries.length === 0) throw new Error(`"${label}" has no employees.`);
  if (entries.length > SLOTS)
    throw new Error(`"${label}" has ${entries.length} employees; this prototype proves up to ${SLOTS} per category.`);
  for (const e of entries)
    if (!Number.isInteger(e.pay) || e.pay <= 0 || e.pay >= 2 ** 32)
      throw new Error(`Pay for ${e.employee} must be a positive whole number of euros.`);
  const records: PayRecord[] = Array.from({ length: SLOTS }, blank);
  entries.forEach((e, i) => {
    records[i] = { present: true, woman: e.woman, pay: BigInt(e.pay), salt: randomSecret() };
  });
  return {
    label,
    id: toHex(encodeLabel(label)),
    records,
    root: toHex(pureCircuits.payrollRoot(records)),
    slots: entries.map((_, i) => i),
  };
}

function levels(records: PayRecord[]): Uint8Array[][] {
  const out: Uint8Array[][] = [records.map((r) => pureCircuits.recordLeaf(r))];
  while (out[out.length - 1].length > 1) {
    const prev = out[out.length - 1];
    const next: Uint8Array[] = [];
    for (let i = 0; i < prev.length; i += 2) next.push(pureCircuits.node(prev[i], prev[i + 1]));
    out.push(next);
  }
  return out;
}

export function inclusionProof(records: PayRecord[], index: number): InclusionProof {
  const tree = levels(records);
  const siblings: string[] = [];
  let i = index;
  for (let level = 0; level < tree.length - 1; level++) {
    siblings.push(toHex(tree[level][i ^ 1]));
    i >>= 1;
  }
  return { index, siblings };
}

/** Recomputes the category root from one record and its path. Runs on the employee's device. */
export function rootFromRecord(record: PayRecord, proof: InclusionProof): string {
  let hash = pureCircuits.recordLeaf(record);
  let i = proof.index;
  for (const sibling of proof.siblings) {
    const s = fromHex(sibling, 32);
    hash = i % 2 === 0 ? pureCircuits.node(hash, s) : pureCircuits.node(s, hash);
    i >>= 1;
  }
  return toHex(hash);
}

export interface GroupFigures {
  women: number;
  men: number;
  womenAverage: number;
  menAverage: number;
  /** Percentage by which women's average is below men's; negative if above. */
  gap: number;
}

export function figures(r: { women: bigint; men: bigint; womenPay: bigint; menPay: bigint }): GroupFigures {
  const womenAverage = Number(r.womenPay) / Number(r.women);
  const menAverage = Number(r.menPay) / Number(r.men);
  return {
    women: Number(r.women),
    men: Number(r.men),
    womenAverage,
    menAverage,
    gap: ((menAverage - womenAverage) / menAverage) * 100,
  };
}
