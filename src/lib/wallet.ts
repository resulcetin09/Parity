import type {
  ConnectedAPI,
  InitialAPI,
} from "@midnight-ntwrk/dapp-connector-api";
import { NETWORK } from "./files";
import { UserError, withTimeout } from "./errors";

export interface WalletSession {
  api: ConnectedAPI;
  name: string;
  address: string;
}

export type ConnectionStage = "permission" | "network" | "address";

// Connector errors may be plain objects from an extension, not Error instances.
// Classify their code/reason without displaying raw extension data.
export function walletConnectionError(
  error: unknown,
  stage: ConnectionStage,
): string {
  if (error instanceof UserError) return error.message;
  const value =
    error && typeof error === "object"
      ? (error as Record<string, unknown>)
      : {};
  const code = typeof value.code === "string" ? value.code : "";
  const reason = [
    value.reason,
    value.message,
    typeof error === "string" ? error : "",
  ]
    .filter((part): part is string => typeof part === "string")
    .join(" ");
  if (
    code === "Rejected" ||
    code === "PermissionRejected" ||
    /reject|denied|cancel/i.test(reason)
  )
    return "The wallet connection was declined. Allow Parity in your wallet’s site permissions, then try again. No transaction was requested.";
  if (
    /network/i.test(reason) &&
    /unsupported|not supported|mismatch|does not match|different|invalid|unknown|not available|not enabled/i.test(
      reason,
    )
  )
    return "Your wallet could not connect to Midnight Preview. Open Lace, select the Preview network and unlock that wallet, then try again. Parity will not switch to another network.";
  if (
    /locked|unlock|not initialized|not initialised|no account|no wallet/i.test(
      reason,
    )
  )
    return "Open Lace and unlock or finish setting up your Midnight Preview wallet, then try connecting again.";
  if (
    code === "Disconnected" ||
    /disconnect|receiving end does not exist|extension context invalidated/i.test(
      reason,
    )
  )
    return "The browser lost its connection to the wallet extension. Open Lace, then reload Parity in the same Chrome profile and try again.";
  if (/timeout|timed out|did not respond/i.test(reason))
    return "The wallet did not respond. Open Lace, unlock it and close any old connection request before trying again.";
  const action = {
    permission: "requesting access",
    network: "checking the Preview network",
    address: "reading your wallet address",
  }[stage];
  return `The wallet connection failed while ${action}. Open Lace in this Chrome profile, check that Midnight Preview is active and unlocked, then retry. Connecting does not require a proof server and no transaction was requested.`;
}

export function discoverWallets(
  scope: Record<string, unknown> | undefined = typeof window === "undefined"
    ? undefined
    : window.midnight,
): InitialAPI[] {
  return Object.values(scope ?? {}).filter((value): value is InitialAPI => {
    if (!value || typeof value !== "object") return false;
    const api = value as Partial<InitialAPI>;
    return (
      typeof api.connect === "function" &&
      typeof api.name === "string" &&
      typeof api.apiVersion === "string" &&
      /^4\./.test(api.apiVersion)
    );
  });
}

export async function assertWalletNetwork(api: ConnectedAPI) {
  const status = await api.getConnectionStatus();
  if (status.status !== "connected")
    throw new UserError("Your wallet disconnected. Connect again to continue.");
  const config = await api.getConfiguration();
  if (config.networkId !== NETWORK)
    throw new UserError(
      "Switch your Midnight wallet to Preview, then reconnect.",
    );
  return config;
}

export async function connectWallet(
  wallet: InitialAPI,
  onStage: (stage: ConnectionStage) => void = () => {},
): Promise<WalletSession> {
  let stage: ConnectionStage = "permission";
  let finished = false;
  const requireActive = () => {
    if (finished)
      throw new UserError(
        "This connection attempt has expired. Close the old request in Lace and try again.",
      );
  };
  try {
    return await withTimeout(
      (async () => {
        onStage(stage);
        const api = await wallet.connect(NETWORK);
        requireActive();
        stage = "network";
        onStage(stage);
        await assertWalletNetwork(api);
        requireActive();
        stage = "address";
        onStage(stage);
        const { shieldedAddress } = await api.getShieldedAddresses();
        if (!shieldedAddress)
          throw new UserError(
            "The wallet did not return an address. Unlock it and try again.",
          );
        return { api, name: wallet.name, address: shieldedAddress };
      })(),
      60000,
      "The wallet did not respond. Unlock the extension, close any old request and try again.",
    );
  } catch (error) {
    throw new UserError(walletConnectionError(error, stage));
  } finally {
    finished = true;
  }
}
