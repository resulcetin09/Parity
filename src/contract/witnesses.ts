import type { PayRecord, Witnesses } from "../../contract/managed/parity/contract/index.js";
import { toHex } from "../lib/bytes";

// Private state never leaves the device that builds the proof. HR holds the
// organizer secret and the payroll records; an employee holds only their own
// credential secret.
export type PrivateState = {
  organizerSecret?: Uint8Array;
  employeeSecret?: Uint8Array;
  /** Category ID (hex) to its 16 committed records. */
  payroll?: Record<string, PayRecord[]>;
};

export const witnesses: Witnesses<PrivateState> = {
  organizerSecret: ({ privateState }) => {
    if (!privateState.organizerSecret) throw new Error("Import your organizer file first.");
    return [privateState, privateState.organizerSecret];
  },
  employeeSecret: ({ privateState }) => {
    if (!privateState.employeeSecret) throw new Error("Import your employee file first.");
    return [privateState, privateState.employeeSecret];
  },
  credentialPath: ({ ledger, privateState }, leaf) => {
    const path = ledger.employees.findPathForLeaf(leaf);
    if (!path) throw new Error("This employee file is not registered for this report.");
    return [privateState, path];
  },
  categoryRecords: ({ privateState }, category) => {
    const records = privateState.payroll?.[toHex(category)];
    if (!records) throw new Error("Import the payroll for this category first.");
    return [privateState, records];
  },
};
