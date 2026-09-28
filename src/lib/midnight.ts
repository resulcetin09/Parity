import { CompiledContract } from "@midnight-ntwrk/compact-js";
import { deployContract, findDeployedContract } from "@midnight-ntwrk/midnight-js-contracts";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { FetchZkConfigProvider } from "@midnight-ntwrk/midnight-js-fetch-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { Transaction } from "@midnight-ntwrk/ledger-v8";
import { MidnightBech32m, ShieldedCoinPublicKey, ShieldedEncryptionPublicKey } from "@midnight-ntwrk/wallet-sdk-address-format";
import type { FinalizedTxData, MidnightProviders } from "@midnight-ntwrk/midnight-js-types";
import { Contract, ledger, pureCircuits, type DisputeKind } from "../../contract/managed/parity/contract/index.js";
import { witnesses, type PrivateState } from "../contract/witnesses";
import { memoryPrivateState } from "./private-state";
import { assertWalletNetwork, type WalletSession } from "./wallet";
import { NETWORK, loadRecord, storeRecord, type EmployeePacket, type OrganizerFile } from "./files";
import { encodeLabel, fromHex, randomSecret, toHex } from "./bytes";
import { buildCategory, type Entry } from "./payroll";
import { fromLedger, type ReportView } from "./report";
import { UserError, withTimeout } from "./errors";

export type Phase = "preparing" | "proving" | "approving" | "confirming";
export interface Receipt {
  txId: string;
  block: number;
}
type Circuits =
  | "registerEmployees"
  | "commitCategory"
  | "openCheckWindow"
  | "fileDispute"
  | "resolveDispute"
  | "closeCheckWindow"
  | "publishCategory";
type Providers = MidnightProviders<Circuits, string, PrivateState>;
type Ledger = ReturnType<typeof ledger>;

export const PUBLIC_INDEXER = {
  http: "https://indexer.preview.midnight.network/api/v3/graphql",
  ws: "wss://indexer.preview.midnight.network/api/v3/graphql/ws",
};
const BATCH = 16;

const compiledContract = CompiledContract.make("Parity", Contract<PrivateState>).pipe(
  CompiledContract.withWitnesses(witnesses),
  CompiledContract.withCompiledFileAssets("contract/parity"),
);

async function readLedger(source: ReturnType<typeof indexerPublicDataProvider>, address: string): Promise<Ledger> {
  const result = await withTimeout(
    source.queryContractState(address),
    30000,
    "The Preview indexer did not respond. Check your connection and try again.",
  );
  if (!result) throw new UserError("No Parity report exists at this address on Preview.");
  try {
    return ledger(result.data);
  } catch {
    throw new UserError("The contract at this address is not a Parity report.");
  }
}

/** Read-only access; needs no wallet. */
export function publicReader() {
  setNetworkId(NETWORK);
  const source = indexerPublicDataProvider(PUBLIC_INDEXER.http, PUBLIC_INDEXER.ws);
  return {
    report: async (address: string, employer = ""): Promise<ReportView> => fromLedger(await readLedger(source, address), employer),
    ledger: (address: string) => readLedger(source, address),
  };
}

export function localProver(url: string | undefined): string {
  if (!url)
    throw new UserError("Choose a local proof server in your wallet settings (http://localhost:6300), then reconnect.");
  const parsed = new URL(url);
  if (
    !["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname) ||
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password
  )
    throw new UserError(
      "Parity requires a local proof server, so salaries and secrets never reach a third party. Set your wallet's proof server to http://localhost:6300.",
    );
  return parsed.href;
}

function confirmed(data: FinalizedTxData): Receipt {
  if (data.status !== "SucceedEntirely")
    throw new UserError("The transaction was included but did not succeed. Refresh before trying again.");
  return { txId: data.txId, block: data.blockHeight };
}

const organizerState = (file: OrganizerFile): PrivateState => ({
  organizerSecret: fromHex(file.secret, 32),
  payroll: Object.fromEntries(file.categories.map((c) => [c.id, c.records.map(loadRecord)])),
});

export async function createMidnightClient(session: WalletSession, onPhase: (phase: Phase) => void) {
  setNetworkId(NETWORK);
  const config = await assertWalletNetwork(session.api);
  const prover = localProver(config.proverServerUri);
  // The full shielded address exceeds bech32's default length limit, so decode
  // the two keys the connector also returns separately.
  const { shieldedCoinPublicKey, shieldedEncryptionPublicKey } = await session.api.getShieldedAddresses();
  const coinPublicKey = ShieldedCoinPublicKey.codec.decode(NETWORK, MidnightBech32m.parse(shieldedCoinPublicKey)).toHexString();
  const encryptionPublicKey = ShieldedEncryptionPublicKey.codec
    .decode(NETWORK, MidnightBech32m.parse(shieldedEncryptionPublicKey))
    .toHexString();
  const privateStateProvider = memoryPrivateState();
  const zkConfigProvider = new FetchZkConfigProvider<Circuits>(
    new URL(`${import.meta.env.BASE_URL}contract/parity`, window.location.origin).href,
    // The SDK calls fetch as a method of the provider; browsers reject that
    // ("Illegal invocation") unless fetch stays bound to window.
    (input, init) => window.fetch(input, init),
  );
  const rawProof = httpClientProofProvider(prover, zkConfigProvider);
  const rawPublic = indexerPublicDataProvider(config.indexerUri, config.indexerWsUri);
  const providers: Providers = {
    privateStateProvider,
    zkConfigProvider,
    publicDataProvider: {
      ...rawPublic,
      async queryZSwapAndContractState(address, options) {
        const result = await rawPublic.queryZSwapAndContractState(address, options);
        if (!result) return result;
        const [zswap, contract, parameters] = result;
        return [zswap.postBlockUpdate(new Date()), contract, parameters];
      },
    },
    proofProvider: {
      async proveTx(tx, options) {
        await assertWalletNetwork(session.api);
        onPhase("proving");
        return rawProof.proveTx(tx, options);
      },
    },
    walletProvider: {
      getCoinPublicKey: () => coinPublicKey,
      getEncryptionPublicKey: () => encryptionPublicKey,
      async balanceTx(tx) {
        await assertWalletNetwork(session.api);
        onPhase("approving");
        const result = await session.api.balanceUnsealedTransaction(toHex(tx.serialize()));
        return Transaction.deserialize("signature", "proof", "binding", fromHex(result.tx));
      },
    },
    midnightProvider: {
      async submitTx(tx) {
        await assertWalletNetwork(session.api);
        await session.api.submitTransaction(toHex(tx.serialize()));
        onPhase("confirming");
        return tx.identifiers()[0];
      },
    },
  };

  // Witness state is imported per operation and never retained by the SDK.
  async function scoped<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } finally {
      await privateStateProvider.clear();
    }
  }
  async function join(address: string, state: PrivateState) {
    onPhase("preparing");
    await assertWalletNetwork(session.api);
    await readLedger(rawPublic, address);
    // findDeployedContract also refuses a contract whose on-chain verifier keys
    // differ from the ones this app was built with.
    return findDeployedContract(providers, {
      compiledContract,
      contractAddress: address,
      privateStateId: "parity",
      initialPrivateState: state,
    });
  }
  const asOrganizer = (file: OrganizerFile) => join(file.contractAddress, organizerState(file));

  return {
    ledger: (address: string) => readLedger(rawPublic, address),
    report: async (address: string, employer = "") => fromLedger(await readLedger(rawPublic, address), employer),

    /** Deploys a new report. Returns the organizer file, which must be saved before anything else. */
    create: (employer: string, period: string, payroll: Record<string, Entry[]>) =>
      scoped(async () => {
        onPhase("preparing");
        const categories = Object.entries(payroll).map(([label, entries]) => ({ built: buildCategory(label, entries), entries }));
        const secret = randomSecret();
        const deployed = await deployContract(providers, {
          compiledContract,
          privateStateId: "parity",
          initialPrivateState: { organizerSecret: secret },
          args: [encodeLabel(period), pureCircuits.organizerCommitment(secret)],
        });
        const receipt = confirmed(deployed.deployTxData.public);
        const file: OrganizerFile = {
          kind: "parity-organizer",
          version: 1,
          network: NETWORK,
          contractAddress: deployed.deployTxData.public.contractAddress,
          employer,
          period,
          secret: toHex(secret),
          categories: categories.map(({ built }) => ({ label: built.label, id: built.id, records: built.records.map(storeRecord) })),
          employees: categories.flatMap(({ built, entries }) =>
            entries.map((e, i) => ({ employee: e.employee, category: built.label, slot: built.slots[i], secret: toHex(randomSecret()) })),
          ),
        };
        return { file, receipt };
      }),

    /** Registers every employee not yet on-chain, 16 per transaction. */
    registerNext: (file: OrganizerFile) =>
      scoped(async () => {
        const period = encodeLabel(file.period);
        const state = await readLedger(rawPublic, file.contractAddress);
        const pending = file.employees
          .map((e) => pureCircuits.credentialCommitment(period, fromHex(e.secret, 32)))
          .filter((c) => !state.registered.member(c));
        if (pending.length === 0) return null;
        const batch = [...pending.slice(0, BATCH)];
        while (batch.length < BATCH) batch.push(new Uint8Array(32));
        const c = await asOrganizer(file);
        return { ...confirmed((await c.callTx.registerEmployees(batch)).public), remaining: Math.max(0, pending.length - BATCH) };
      }),

    commitCategory: (file: OrganizerFile, categoryId: string) =>
      scoped(async () => {
        const category = file.categories.find((c) => c.id === categoryId);
        if (!category) throw new UserError("That category is not in this organizer file.");
        const root = pureCircuits.payrollRoot(category.records.map(loadRecord));
        const c = await asOrganizer(file);
        return confirmed((await c.callTx.commitCategory(fromHex(category.id, 32), root)).public);
      }),

    openCheckWindow: (file: OrganizerFile) =>
      scoped(async () => confirmed((await (await asOrganizer(file)).callTx.openCheckWindow()).public)),

    resolveDispute: (file: OrganizerFile, nullifier: string) =>
      scoped(async () => confirmed((await (await asOrganizer(file)).callTx.resolveDispute(fromHex(nullifier, 32))).public)),

    closeCheckWindow: (file: OrganizerFile) =>
      scoped(async () => confirmed((await (await asOrganizer(file)).callTx.closeCheckWindow()).public)),

    publishCategory: (file: OrganizerFile, categoryId: string) =>
      scoped(async () =>
        confirmed((await (await asOrganizer(file)).callTx.publishCategory(fromHex(categoryId, 32))).public),
      ),

    fileDispute: (packet: EmployeePacket, kind: DisputeKind) =>
      scoped(async () => {
        const secret = fromHex(packet.secret, 32);
        const c = await join(packet.contractAddress, { employeeSecret: secret });
        const tx = await c.callTx.fileDispute(kind);
        return {
          ...confirmed(tx.public),
          reference: toHex(pureCircuits.disputeNullifier(encodeLabel(packet.period), secret)),
        };
      }),

    async clear() {
      await privateStateProvider.clear();
      await privateStateProvider.clearSigningKeys();
    },
  };
}

export type MidnightClient = Awaited<ReturnType<typeof createMidnightClient>>;
