import type { Phase } from "../lib/midnight";

export type Busy = Phase | "reading" | null;

const text: Record<Exclude<Busy, null>, string> = {
  reading: "Reading the report from the Preview indexer…",
  preparing: "Checking the report on Preview…",
  proving: "Generating the proof on your local proof server. Large proofs take a minute.",
  approving: "Approve the transaction in your wallet.",
  confirming: "Waiting for the block to be confirmed…",
};

export function Status({ busy, error }: { busy: Busy; error?: string }) {
  if (busy)
    return (
      <p className="status" role="status">
        <span className="spinner" aria-hidden="true" />
        {text[busy]}
      </p>
    );
  if (error)
    return (
      <p className="status error" role="alert">
        {error}
      </p>
    );
  return null;
}

export function TxLine({ txId, block }: { txId: string; block: number }) {
  return (
    <p className="hint">
      Confirmed in block {block.toLocaleString("en-GB")}. Transaction <code>{txId}</code>
    </p>
  );
}
