// Re-checks deployments/<network>.json against the public indexer. No wallet,
// no secrets, no proof server: only the compiled contract and network access.
import { readFile } from "node:fs/promises";
import { verifierKeysEqual } from "@midnight-ntwrk/midnight-js-contracts";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { WebSocket } from "ws";
import { ledger } from "../contract/managed/parity/contract/index.js";
import { networkConfig, paths, type NetworkName } from "./config";
import { circuits, type ParityCircuit } from "./contract";
import { decodeLabel, toHex } from "../src/lib/bytes";
import { evidencePath, verifierKeyHashes, type Evidence } from "./evidence";
import { actionAtBlock } from "./indexer";

(globalThis as { WebSocket?: unknown }).WebSocket = WebSocket;

let failures = 0;
function check(label: string, ok: boolean, detail = "") {
  if (!ok) failures++;
  console.log(`  ${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
}

async function main() {
  const network = (process.env.MIDNIGHT_NETWORK ?? "preview") as NetworkName;
  const config = networkConfig(network);
  const evidence: Evidence = JSON.parse(await readFile(evidencePath(network), "utf8"));
  console.log(`Verifying ${evidence.contractAddress} on ${network}`);
  check("evidence targets this network", evidence.network === network);
  const state = await indexerPublicDataProvider(config.indexer, config.indexerWS).queryContractState(evidence.contractAddress);
  check("contract exists on the public indexer", state !== null);
  if (!state) return;
  const local = await new NodeZkConfigProvider<ParityCircuit>(paths.zkConfig).getVerifierKeys([...circuits]);
  for (const [circuit, key] of local) {
    const onChain = state.operation(circuit)?.verifierKey;
    check(`on-chain verifier key for ${circuit} matches this source`, !!onChain && verifierKeysEqual(key, onChain));
  }
  const hashes = await verifierKeyHashes();
  check("recorded verifier key hashes match this build", circuits.every((c) => hashes[c] === evidence.verifierKeySha256[c]));
  const value = ledger(state.data);
  check("report period matches", decodeLabel(value.period) === evidence.period);
  check("organizer commitment matches", toHex(value.organizer) === evidence.organizerCommitment);
  const action = await actionAtBlock(config.indexer, evidence.contractAddress, evidence.action.blockHeight);
  check(
    `${evidence.action.kind} transaction is in block ${evidence.action.blockHeight}`,
    action?.txHash === evidence.action.txHash && action.status === "SUCCESS",
    action ? `tx ${action.txHash}, ${action.status}` : "not found",
  );
}

main().then(
  () => {
    console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
    process.exit(failures ? 1 : 0);
  },
  (error) => {
    console.error(`Verification failed: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  },
);
