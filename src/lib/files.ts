import type { PayRecord } from "../../contract/managed/parity/contract/index.js";
import { fromHex, toHex } from "./bytes";
import type { InclusionProof } from "./payroll";

export const NETWORK = "preview";
const MAX_FILE_BYTES = 512 * 1024;
const HEX32 = /^[0-9a-f]{64}$/i;
const ADDRESS = /^[0-9a-f]{64,80}$/i;

export interface StoredRecord {
  present: boolean;
  woman: boolean;
  pay: string;
  salt: string;
}

export interface OrganizerCategory {
  label: string;
  id: string;
  records: StoredRecord[];
}

export interface OrganizerEmployee {
  /** HR's own reference. Never sent anywhere. */
  employee: string;
  category: string;
  slot: number;
  secret: string;
}

/**
 * Everything HR needs to run the report. It holds the full payroll and every
 * employee credential, so it must stay on HR's device.
 */
export interface OrganizerFile {
  kind: "parity-organizer";
  version: 1;
  network: typeof NETWORK;
  contractAddress: string;
  employer: string;
  period: string;
  secret: string;
  categories: OrganizerCategory[];
  employees: OrganizerEmployee[];
}

/** What one employee receives: their own record, its path and their credential. */
export interface EmployeePacket {
  kind: "parity-employee";
  version: 1;
  network: typeof NETWORK;
  contractAddress: string;
  employer: string;
  period: string;
  category: string;
  categoryId: string;
  secret: string;
  record: StoredRecord;
  proof: InclusionProof;
}

export const storeRecord = (r: PayRecord): StoredRecord => ({
  present: r.present,
  woman: r.woman,
  pay: r.pay.toString(),
  salt: toHex(r.salt),
});

export const loadRecord = (r: StoredRecord): PayRecord => {
  if (typeof r.present !== "boolean" || typeof r.woman !== "boolean" || !/^\d{1,10}$/.test(r.pay) || !HEX32.test(r.salt))
    throw new Error("The file holds a damaged pay record. Use the original download.");
  return { present: r.present, woman: r.woman, pay: BigInt(r.pay), salt: fromHex(r.salt, 32) };
};

export function isAddress(value: string) {
  return ADDRESS.test(value.trim());
}

function text(value: unknown, field: string, max = 120): string {
  if (typeof value !== "string" || value.length === 0 || value.length > max)
    throw new Error(`The file has an invalid ${field}.`);
  return value;
}

function hex32(value: unknown, field: string): string {
  const v = text(value, field);
  if (!HEX32.test(v)) throw new Error(`The file has an invalid ${field}.`);
  return v.toLowerCase();
}

function common(doc: Record<string, unknown>) {
  if (doc.version !== 1) throw new Error("This file version is not supported.");
  if (doc.network !== NETWORK) throw new Error("This file belongs to a different Midnight network.");
  const contractAddress = text(doc.contractAddress, "contract address");
  if (!ADDRESS.test(contractAddress)) throw new Error("The file has an invalid contract address.");
  return {
    contractAddress: contractAddress.toLowerCase(),
    employer: text(doc.employer, "employer name"),
    period: text(doc.period, "report period", 32),
    secret: hex32(doc.secret, "secret"),
  };
}

export function parseFile(raw: string): OrganizerFile | EmployeePacket {
  if (raw.length > MAX_FILE_BYTES) throw new Error("This file is too large.");
  let doc: unknown;
  try {
    doc = JSON.parse(raw);
  } catch {
    throw new Error("This is not a Parity file.");
  }
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) throw new Error("This is not a Parity file.");
  const d = doc as Record<string, unknown>;
  if (d.kind === "parity-organizer") {
    if (!Array.isArray(d.categories) || !Array.isArray(d.employees)) throw new Error("The organizer file is damaged.");
    const categories = (d.categories as Record<string, unknown>[]).map((c) => {
      if (!Array.isArray(c.records) || c.records.length !== 16) throw new Error("The organizer file is damaged.");
      (c.records as StoredRecord[]).forEach(loadRecord);
      return { label: text(c.label, "category", 32), id: hex32(c.id, "category ID"), records: c.records as StoredRecord[] };
    });
    const employees = (d.employees as Record<string, unknown>[]).map((e) => ({
      employee: text(e.employee, "employee reference"),
      category: text(e.category, "category", 32),
      slot: Number(e.slot),
      secret: hex32(e.secret, "employee secret"),
    }));
    return { kind: "parity-organizer", version: 1, network: NETWORK, ...common(d), categories, employees };
  }
  if (d.kind === "parity-employee") {
    const record = d.record as StoredRecord;
    loadRecord(record);
    const proof = d.proof as InclusionProof;
    if (!proof || !Number.isInteger(proof.index) || !Array.isArray(proof.siblings) || proof.siblings.length !== 4)
      throw new Error("The employee file is damaged.");
    proof.siblings.forEach((s) => hex32(s, "path"));
    return {
      kind: "parity-employee",
      version: 1,
      network: NETWORK,
      ...common(d),
      category: text(d.category, "category", 32),
      categoryId: hex32(d.categoryId, "category ID"),
      record,
      proof,
    };
  }
  throw new Error("This is not a Parity file.");
}

export function download(name: string, value: unknown) {
  const blob = new Blob([`${JSON.stringify(value, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function readFile(file: File): Promise<string> {
  if (file.size > MAX_FILE_BYTES) throw new Error("This file is too large.");
  return file.text();
}
