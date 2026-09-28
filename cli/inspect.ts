// Inspects a Parity contract on the public indexer, with no wallet and no
// secrets, and optionally records what it saw in deployments/<network>.json.
//
//   npm run inspect:preview -- <contract address> [--save]
import { mkdir, writeFile } from "node:fs/promises";
import { verifierKeysEqual } from "@midnight-ntwrk/midnight-js-contracts";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { WebSocket } from "ws";
import { Phase, ledger } from "../contract/managed/parity/contract/index.js";
import { networkConfig, paths, toolchain, type NetworkName } from "./config";
import { circuits, type ParityCircuit } from "./contract";
import { decodeLabel, toHex } from "../src/lib/bytes";
import { figures } from "../src/lib/payroll";
import { evidencePath, verifierKeyHashes, type Evidence } from "./evidence";
import { latestAction } from "./indexer";

(globalThis as { WebSocket?: unknown }).WebSocket = WebSocket;

async function main() {
  const address = process.argv.slice(2).find((a) => !a.startsWith("--"))?.toLowerCase();
  const save = process.argv.includes("--save");
  if (!address || !/^[0-9a-f]{64,80}$/.test(address))
    throw new Error("Usage: npm run inspect:preview -- <contract address> [--save]");
  const network = (process.env.MIDNIGHT_NETWORK ?? "preview") as NetworkName;
  const config = networkConfig(network);
  let failures = 0;
  const check = (label: string, ok: boolean, detail = "") => {
    if (!ok) failures++;
    console.log(`  ${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  };

  console.log(`Parity report contract ${address}`);
  console.log(`Network: Midnight ${network} (indexer ${config.indexer})\n`);
  const state = await indexerPublicDataProvider(config.indexer, config.indexerWS).queryContractState(address);
  check("contract exists on the public indexer", state !== null);
  if (!state) process.exit(1);

  const local = await new NodeZkConfigProvider<ParityCircuit>(paths.zkConfig).getVerifierKeys([...circuits]);
  for (const [circuit, key] of local) {
    const onChain = state.operation(circuit)?.verifierKey;
    check(`verifier key for ${circuit} matches contract/parity.compact`, !!onChain && verifierKeysEqual(key, onChain));
  }
  const action = await latestAction(config.indexer, address);
  if (action)
    check(`latest action: ${action.kind}`, action.status === "SUCCESS", `tx ${action.txHash}, block ${action.blockHeight}, ${action.blockTime}, ${action.status}`);

  const value = ledger(state.data);
  console.log("\nPublic state");
  console.log(`  period               ${decodeLabel(value.period)}`);
  console.log(`  phase                ${Phase[value.phase]}`);
  console.log(`  employees            ${value.registered.size()}`);
  console.log(`  open disputes        ${value.openDisputes.size()} (resolved ${value.resolvedDisputes})`);
  for (const [id] of value.payroll) {
    const label = decodeLabel(id);
    if (value.results.member(id)) {
      const f = figures(value.results.lookup(id));
      console.log(`  ${label.padEnd(20)} ${f.women} women, ${f.men} men, gap ${f.gap.toFixed(1)}%`);
    } else if (value.withheld.member(id)) console.log(`  ${label.padEnd(20)} withheld: a group has fewer than 5 people`);
    else console.log(`  ${label.padEnd(20)} committed, not yet proven`);
  }

  if (save && action && !failures) {
    const evidence: Evidence = {
      schema: "parity-observed/v1",
      network,
      contractAddress: address,
      period: decodeLabel(value.period),
      organizerCommitment: toHex(value.organizer),
      observedAt: new Date().toISOString(),
      toolchain,
      verifierKeySha256: await verifierKeyHashes(),
      action,
    };
    await mkdir(paths.deployments, { recursive: true });
    await writeFile(evidencePath(network), `${JSON.stringify(evidence, null, 2)}\n`);
    console.log(`\nRecorded in ${evidencePath(network)}. Re-check any time: npm run verify:preview`);
  }
  console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
  process.exit(failures ? 1 : 0);
}

main().catch((error) => {
  console.error(`Inspection failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
