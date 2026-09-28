import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { circuits } from "./contract";
import { paths, type NetworkName } from "./config";
import type { ObservedAction } from "./indexer";

/** Public facts about one deployment, recorded by `inspect --save` and re-checked by `verify`. */
export interface Evidence {
  schema: "parity-observed/v1";
  network: NetworkName;
  contractAddress: string;
  period: string;
  organizerCommitment: string;
  observedAt: string;
  toolchain: Record<string, string>;
  verifierKeySha256: Record<string, string>;
  action: ObservedAction;
}

export const evidencePath = (network: NetworkName) => path.join(paths.deployments, `${network}.json`);

export async function verifierKeyHashes() {
  const out: Record<string, string> = {};
  for (const circuit of circuits) {
    const key = await readFile(path.join(paths.zkConfig, "keys", `${circuit}.verifier`));
    out[circuit] = createHash("sha256").update(key).digest("hex");
  }
  return out;
}
