import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export enum Phase { committing = 0, checking = 1, proving = 2 }

export enum DisputeKind { payAmount = 0, category = 1, gender = 2, missing = 3 }

export type PayRecord = { present: boolean;
                          woman: boolean;
                          pay: bigint;
                          salt: Uint8Array
                        };

export type CategoryResult = { women: bigint;
                               men: bigint;
                               womenPay: bigint;
                               menPay: bigint
                             };

export type Witnesses<PS> = {
  organizerSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  employeeSecret(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
  credentialPath(context: __compactRuntime.WitnessContext<Ledger, PS>,
                 leaf_0: Uint8Array): [PS, { leaf: Uint8Array,
                                             path: { sibling: { field: bigint },
                                                     goes_left: boolean
                                                   }[]
                                           }];
  categoryRecords(context: __compactRuntime.WitnessContext<Ledger, PS>,
                  category_0: Uint8Array): [PS, PayRecord[]];
}

export type ImpureCircuits<PS> = {
  registerEmployees(context: __compactRuntime.CircuitContext<PS>,
                    batch_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  commitCategory(context: __compactRuntime.CircuitContext<PS>,
                 category_0: Uint8Array,
                 root_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  openCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  fileDispute(context: __compactRuntime.CircuitContext<PS>, kind_0: DisputeKind): __compactRuntime.CircuitResults<PS, Uint8Array>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  closeCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  publishCategory(context: __compactRuntime.CircuitContext<PS>,
                  category_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type ProvableCircuits<PS> = {
  registerEmployees(context: __compactRuntime.CircuitContext<PS>,
                    batch_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  commitCategory(context: __compactRuntime.CircuitContext<PS>,
                 category_0: Uint8Array,
                 root_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  openCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  fileDispute(context: __compactRuntime.CircuitContext<PS>, kind_0: DisputeKind): __compactRuntime.CircuitResults<PS, Uint8Array>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  closeCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  publishCategory(context: __compactRuntime.CircuitContext<PS>,
                  category_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type PureCircuits = {
  organizerCommitment(secret_0: Uint8Array): Uint8Array;
  credentialCommitment(reportPeriod_0: Uint8Array, secret_0: Uint8Array): Uint8Array;
  disputeNullifier(reportPeriod_0: Uint8Array, secret_0: Uint8Array): Uint8Array;
  recordLeaf(record_0: PayRecord): Uint8Array;
  node(left_0: Uint8Array, right_0: Uint8Array): Uint8Array;
  payrollRoot(records_0: PayRecord[]): Uint8Array;
}

export type Circuits<PS> = {
  organizerCommitment(context: __compactRuntime.CircuitContext<PS>,
                      secret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  credentialCommitment(context: __compactRuntime.CircuitContext<PS>,
                       reportPeriod_0: Uint8Array,
                       secret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  disputeNullifier(context: __compactRuntime.CircuitContext<PS>,
                   reportPeriod_0: Uint8Array,
                   secret_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  recordLeaf(context: __compactRuntime.CircuitContext<PS>, record_0: PayRecord): __compactRuntime.CircuitResults<PS, Uint8Array>;
  node(context: __compactRuntime.CircuitContext<PS>,
       left_0: Uint8Array,
       right_0: Uint8Array): __compactRuntime.CircuitResults<PS, Uint8Array>;
  payrollRoot(context: __compactRuntime.CircuitContext<PS>,
              records_0: PayRecord[]): __compactRuntime.CircuitResults<PS, Uint8Array>;
  registerEmployees(context: __compactRuntime.CircuitContext<PS>,
                    batch_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  commitCategory(context: __compactRuntime.CircuitContext<PS>,
                 category_0: Uint8Array,
                 root_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  openCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  fileDispute(context: __compactRuntime.CircuitContext<PS>, kind_0: DisputeKind): __compactRuntime.CircuitResults<PS, Uint8Array>;
  resolveDispute(context: __compactRuntime.CircuitContext<PS>,
                 nullifier_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  closeCheckWindow(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  publishCategory(context: __compactRuntime.CircuitContext<PS>,
                  category_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
}

export type Ledger = {
  readonly period: Uint8Array;
  readonly organizer: Uint8Array;
  readonly phase: Phase;
  employees: {
    isFull(): boolean;
    checkRoot(rt_0: { field: bigint }): boolean;
    root(): __compactRuntime.MerkleTreeDigest;
    firstFree(): bigint;
    pathForLeaf(index_0: bigint, leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array>;
    findPathForLeaf(leaf_0: Uint8Array): __compactRuntime.MerkleTreePath<Uint8Array> | undefined
  };
  registered: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  payroll: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): Uint8Array;
    [Symbol.iterator](): Iterator<[Uint8Array, Uint8Array]>
  };
  disputes: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): DisputeKind;
    [Symbol.iterator](): Iterator<[Uint8Array, DisputeKind]>
  };
  openDisputes: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  readonly resolvedDisputes: bigint;
  results: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CategoryResult;
    [Symbol.iterator](): Iterator<[Uint8Array, CategoryResult]>
  };
  withheld: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               reportPeriod_0: Uint8Array,
               authority_0: Uint8Array): __compactRuntime.ConstructorResult<PS>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
