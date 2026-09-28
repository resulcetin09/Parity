import { pureCircuits } from "../../contract/managed/parity/contract/index.js";
import { NETWORK, loadRecord, type EmployeePacket, type OrganizerFile } from "./files";
import { encodeLabel, fromHex, toHex } from "./bytes";
import { inclusionProof } from "./payroll";

/** One packet per employee: their record, the path to the committed root and their credential. */
export function employeePackets(file: OrganizerFile): { employee: string; packet: EmployeePacket }[] {
  return file.employees.map((e) => {
    const category = file.categories.find((c) => c.label === e.category)!;
    const records = category.records.map(loadRecord);
    return {
      employee: e.employee,
      packet: {
        kind: "parity-employee",
        version: 1,
        network: NETWORK,
        contractAddress: file.contractAddress,
        employer: file.employer,
        period: file.period,
        category: category.label,
        categoryId: category.id,
        secret: e.secret,
        record: category.records[e.slot],
        proof: inclusionProof(records, e.slot),
      },
    };
  });
}

export const credentialOf = (file: OrganizerFile, secret: string) =>
  pureCircuits.credentialCommitment(encodeLabel(file.period), fromHex(secret, 32));

export const categoryRoot = (records: OrganizerFile["categories"][number]["records"]) =>
  toHex(pureCircuits.payrollRoot(records.map(loadRecord)));
