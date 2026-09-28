import { describe, expect, it } from "vitest";
import { pureCircuits } from "../contract/managed/parity/contract/index.js";
import { decodeLabel, encodeLabel, fromHex, toHex } from "../src/lib/bytes";
import { loadRecord, parseFile, storeRecord, type OrganizerFile } from "../src/lib/files";
import { employeePackets, credentialOf, categoryRoot } from "../src/lib/packets";
import { buildCategory, rootFromRecord } from "../src/lib/payroll";
import { euros, pct, sampleReport } from "../src/lib/report";
import { parsePayrollCsv, SAMPLE_PAYROLL } from "../src/lib/sample";
import { localProver } from "../src/lib/midnight";

const address = "ab".repeat(32);

function organizerFile(): OrganizerFile {
  const eng = buildCategory("Engineering", SAMPLE_PAYROLL.Engineering);
  return {
    kind: "parity-organizer",
    version: 1,
    network: "preview",
    contractAddress: address,
    employer: "Halden & Roe",
    period: "2026",
    secret: "11".repeat(32),
    categories: [{ label: eng.label, id: eng.id, records: eng.records.map(storeRecord) }],
    employees: SAMPLE_PAYROLL.Engineering.map((e, i) => ({ employee: e.employee, category: "Engineering", slot: i, secret: toHex(new Uint8Array(32).fill(i + 1)) })),
  };
}

describe("labels on-chain", () => {
  it("round-trips periods and category names through 32 bytes", () => {
    for (const text of ["2026", "Customer support", "Müşteri hizmetleri"]) expect(decodeLabel(encodeLabel(text))).toBe(text);
    expect(() => encodeLabel("x".repeat(33))).toThrow("longer than 32 bytes");
  });
});

describe("payroll input", () => {
  it("parses a payroll CSV into categories", () => {
    const parsed = parsePayrollCsv("employee,category,gender,pay\nA1,Legal,woman,4100\nA2,Legal,man,4300\nB1,Ops,woman,2900");
    expect(Object.keys(parsed)).toEqual(["Legal", "Ops"]);
    expect(parsed.Legal[1]).toEqual({ employee: "A2", woman: false, pay: 4300 });
  });

  it("rejects malformed rows with the row number", () => {
    expect(() => parsePayrollCsv("employee,category,gender,pay\nA1,Legal,other,4100")).toThrow("Row 2");
    expect(() => parsePayrollCsv("name,team\nA,B")).toThrow("first line");
  });

  it("refuses more than 16 people in one category", () => {
    const many = Array.from({ length: 17 }, (_, i) => ({ employee: `E${i}`, woman: i % 2 === 0, pay: 3000 }));
    expect(() => buildCategory("Big", many)).toThrow("up to 16");
  });
});

describe("files", () => {
  it("round-trips an organizer file and rejects other networks", () => {
    const file = organizerFile();
    expect(parseFile(JSON.stringify(file))).toEqual(file);
    expect(() => parseFile(JSON.stringify({ ...file, network: "preprod" }))).toThrow("different Midnight network");
    expect(() => parseFile("{}")).toThrow("not a Parity file");
  });

  it("gives each employee a packet whose record proves into the committed root", () => {
    const file = organizerFile();
    const root = categoryRoot(file.categories[0].records);
    const packets = employeePackets(file);
    expect(packets).toHaveLength(SAMPLE_PAYROLL.Engineering.length);
    for (const { packet } of packets) {
      expect(parseFile(JSON.stringify(packet))).toEqual(packet);
      expect(rootFromRecord(loadRecord(packet.record), packet.proof)).toBe(root);
      expect(credentialOf(file, packet.secret)).toEqual(pureCircuits.credentialCommitment(encodeLabel("2026"), fromHex(packet.secret, 32)));
    }
  });

  it("rejects a packet whose record was edited", () => {
    const { packet } = employeePackets(organizerFile())[0];
    expect(() => parseFile(JSON.stringify({ ...packet, record: { ...packet.record, pay: "-5" } }))).toThrow("damaged");
  });
});

describe("sample report", () => {
  it("computes the same figures the circuit would, and withholds small groups", () => {
    const r = sampleReport();
    const byLabel = Object.fromEntries(r.categories.map((c) => [c.label, c]));
    expect(byLabel.Drivers.status).toBe("withheld");
    const eng = byLabel.Engineering;
    if (eng.status !== "published") throw new Error("Engineering should be published");
    expect(eng.figures.women).toBe(6);
    expect(euros(eng.figures.womenAverage)).toBe("€5,140");
    expect(pct(eng.figures.gap)).toBe("8.9%");
    // Drivers never contribute to the overall figure.
    expect(r.overall!.women + r.overall!.men).toBe(28);
  });
});

describe("proof server boundary", () => {
  it("accepts only a local proof server", () => {
    expect(localProver("http://localhost:6300")).toBe("http://localhost:6300/");
    expect(() => localProver("https://prover.example.com")).toThrow("local proof server");
    expect(() => localProver(undefined)).toThrow("local proof server");
  });
});
