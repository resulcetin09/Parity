import path from "node:path";
import { fileURLToPath } from "node:url";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const paths = {
  root,
  zkConfig: path.join(root, "contract", "managed", "parity"),
  secrets: path.join(root, ".secrets"),
  deployments: path.join(root, "deployments"),
};

export type NetworkName = "preprod" | "preview";

export interface NetworkConfig {
  name: NetworkName;
  indexer: string;
  indexerWS: string;
  node: string;
  proofServer: string;
  faucet: string;
  explorer: string;
}

const networks: Record<NetworkName, Omit<NetworkConfig, "proofServer">> = {
  preprod: {
    name: "preprod",
    indexer: "https://indexer.preprod.midnight.network/api/v3/graphql",
    indexerWS: "wss://indexer.preprod.midnight.network/api/v3/graphql/ws",
    node: "https://rpc.preprod.midnight.network",
    faucet: "https://faucet.preprod.midnight.network/",
    explorer: "https://explorer.preprod.midnight.network",
  },
  preview: {
    name: "preview",
    indexer: "https://indexer.preview.midnight.network/api/v3/graphql",
    indexerWS: "wss://indexer.preview.midnight.network/api/v3/graphql/ws",
    node: "https://rpc.preview.midnight.network",
    faucet: "https://faucet.preview.midnight.network/",
    explorer: "https://explorer.preview.midnight.network",
  },
};

export function networkConfig(
  name = (process.env.MIDNIGHT_NETWORK ?? "preview") as NetworkName,
): NetworkConfig {
  const base = networks[name];
  if (!base) throw new Error(`Unsupported network "${name}".`);
  setNetworkId(name);
  return {
    ...base,
    proofServer: process.env.MIDNIGHT_PROOF_SERVER ?? "http://127.0.0.1:6300",
  };
}

// Recorded with every deployment so a reviewer can rebuild the exact artifacts.
export const toolchain = {
  compactc: "0.31.1",
  compactRuntime: "0.16.0",
  ledger: "8.1.0",
  midnightJs: "4.1.1",
  proofServer: "midnightntwrk/proof-server:8.1.0",
};
