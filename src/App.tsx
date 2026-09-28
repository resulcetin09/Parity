import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "./components/Mark";
import type { Busy } from "./components/Status";
import { Landing } from "./pages/Landing";
import { Report } from "./pages/Report";
import { Hr } from "./pages/Hr";
import { EmployeeCheck } from "./pages/Check";
import { connectWallet, discoverWallets, type WalletSession } from "./lib/wallet";
import { safeError } from "./lib/errors";
import { shortId } from "./lib/bytes";
import type { MidnightClient, Phase } from "./lib/midnight";

export type Route = "home" | "report" | "hr" | "check";

export interface Session {
  wallet: WalletSession | null;
  client: MidnightClient | null;
  connect: () => Promise<MidnightClient | null>;
  busy: Busy;
  setBusy: (b: Busy) => void;
}

function parse(): { route: Route; params: URLSearchParams } {
  const [path, query = ""] = window.location.hash.replace(/^#\/?/, "").split("?");
  const route = (["report", "hr", "check"].includes(path) ? path : "home") as Route;
  return { route, params: new URLSearchParams(query) };
}

export default function App() {
  const [{ route, params }, setLocation] = useState(parse);
  const [wallet, setWallet] = useState<WalletSession | null>(null);
  const [client, setClient] = useState<MidnightClient | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [walletError, setWalletError] = useState("");
  const [busy, setBusy] = useState<Busy>(null);
  const busyRef = useRef(setBusy);

  useEffect(() => {
    const onHash = () => {
      setLocation(parse());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const connect = useCallback(async (): Promise<MidnightClient | null> => {
    if (client) return client;
    setWalletError("");
    const found = discoverWallets();
    if (found.length === 0) {
      setWalletError("No Midnight wallet found. Install Lace with Midnight support, select Preview, then reload this page.");
      return null;
    }
    setConnecting(true);
    try {
      const session = await connectWallet(found[0]);
      // The SDK is large; load it only when someone connects.
      const { createMidnightClient } = await import("./lib/midnight");
      const next = await createMidnightClient(session, (phase: Phase) => busyRef.current(phase));
      setWallet(session);
      setClient(next);
      return next;
    } catch (error) {
      setWalletError(safeError(error));
      return null;
    } finally {
      setConnecting(false);
    }
  }, [client]);

  const disconnect = async () => {
    await client?.clear();
    setClient(null);
    setWallet(null);
  };

  const session: Session = { wallet, client, connect, busy, setBusy };
  const link = (to: Route, label: string) => (
    <a href={`#/${to === "home" ? "" : to}`} aria-current={route === to ? "page" : undefined}>
      {label}
    </a>
  );

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <a className="brand" href="#/">
          <Mark />
          <span>Parity</span>
        </a>
        <nav className="nav" aria-label="Main">
          {link("report", "Sample report")}
          {link("check", "For employees")}
          {link("hr", "For HR")}
        </nav>
        <div className="wallet">
          {wallet ? (
            <>
              <span className="dot" aria-hidden="true" />
              <span title={wallet.address}>
                {wallet.name} on Preview, {shortId(wallet.address)}
              </span>
              <button type="button" className="btn btn-line btn-sm" onClick={disconnect}>
                Disconnect
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-line btn-sm" onClick={connect} disabled={connecting}>
              {connecting ? "Connecting…" : "Connect wallet"}
            </button>
          )}
        </div>
      </header>
      {walletError && (
        <p className="wallet-error" role="alert">
          {walletError}
        </p>
      )}
      <main id="main">
        {route === "home" && <Landing />}
        {route === "report" && <Report session={session} address={params.get("c") ?? ""} />}
        {route === "hr" && <Hr session={session} />}
        {route === "check" && <EmployeeCheck session={session} />}
      </main>
      <footer className="footer">
        <span>Parity is a prototype for the Rise In New Moon to Full programme. It runs on a Midnight test network and has not been audited.</span>
        <a href="https://github.com/resulcetin09/Parity" style={{ marginLeft: "auto" }}>
          Source on GitHub
        </a>
      </footer>
    </>
  );
}
