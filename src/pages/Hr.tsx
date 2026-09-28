import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import type { Session } from "../App";
import { Status, TxLine } from "../components/Status";
import { Check } from "../components/Mark";
import { DisputeKind } from "../../contract/managed/parity/contract/index.js";
import { download, parseFile, readFile, type OrganizerFile } from "../lib/files";
import { categoryRoot, credentialOf, employeePackets } from "../lib/packets";
import { MIN_GROUP, type Entry } from "../lib/payroll";
import { Phase } from "../lib/report";
import { parsePayrollCsv, SAMPLE_EMPLOYER, SAMPLE_PAYROLL, SAMPLE_PERIOD } from "../lib/sample";
import { safeError } from "../lib/errors";
import { MAX_LABEL_BYTES, labelBytes, shortId, toHex } from "../lib/bytes";
import type { MidnightClient, Receipt } from "../lib/midnight";

type Ledger = Awaited<ReturnType<MidnightClient["ledger"]>>;

const kindText: Record<DisputeKind, string> = {
  [DisputeKind.payAmount]: "Pay amount",
  [DisputeKind.category]: "Category of work",
  [DisputeKind.gender]: "Recorded gender",
  [DisputeKind.missing]: "Record missing",
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "report";

function lit(entries: Entry[]) {
  const women = entries.filter((e) => e.woman).length;
  return { women, men: entries.length - women, lit: women >= MIN_GROUP && entries.length - women >= MIN_GROUP };
}

export function Hr({ session }: { session: Session }) {
  const [file, setFile] = useState<OrganizerFile | null>(null);
  const [saved, setSaved] = useState(false);
  const [state, setState] = useState<Ledger | null>(null);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<(Receipt & { what: string }) | null>(null);

  const refresh = useCallback(
    async (target: OrganizerFile, client: MidnightClient | null = session.client) => {
      session.setBusy("reading");
      try {
        const reader = client ?? (await import("../lib/midnight")).publicReader();
        setState(await reader.ledger(target.contractAddress));
      } finally {
        session.setBusy(null);
      }
    },
    [session],
  );

  const run = async (what: string, action: (client: MidnightClient, file: OrganizerFile) => Promise<Receipt | null | void>) => {
    if (!file) return;
    setError("");
    setReceipt(null);
    try {
      const client = session.client ?? (await session.connect());
      if (!client) return;
      const r = await action(client, file);
      if (r) setReceipt({ ...r, what });
      await refresh(file, client);
    } catch (e) {
      setError(safeError(e));
    } finally {
      session.setBusy(null);
    }
  };

  const importFile = async (picked: File | undefined) => {
    setError("");
    if (!picked) return;
    try {
      const parsed = parseFile(await readFile(picked));
      if (parsed.kind !== "parity-organizer") throw new Error("This is an employee packet. Import the organizer file instead.");
      setFile(parsed);
      setSaved(true);
      await refresh(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : safeError(e));
    }
  };

  if (!file)
    return (
      <Create
        session={session}
        error={error}
        onImport={importFile}
        onCreated={async (created, r) => {
          setFile(created);
          setSaved(false);
          setReceipt({ ...r, what: "Report created" });
          await refresh(created);
        }}
      />
    );

  const save = () => {
    download(`${slug(file.employer)}-${slug(file.period)}.organizer.json`, file);
    setSaved(true);
  };

  const registered = state ? file.employees.filter((e) => state.registered.member(credentialOf(file, e.secret))).length : 0;
  const committed = (id: string, root: string) => {
    if (!state) return false;
    const key = Uint8Array.from(id.match(/.{2}/g)!, (b) => parseInt(b, 16));
    return state.payroll.member(key) && toHex(state.payroll.lookup(key)) === root;
  };
  const roots = file.categories.map((c) => ({ ...c, root: categoryRoot(c.records) }));
  const allCommitted = roots.every((c) => committed(c.id, c.root));
  const phase = state?.phase ?? Phase.committing;
  const open = state ? [...state.openDisputes].map((n) => ({ n: toHex(n), kind: state.disputes.lookup(n) })) : [];
  const reportLink = `#/report?c=${file.contractAddress}`;

  return (
    <div className="console">
      <aside className="stack-sm" style={{ gap: 22 }}>
        <h1 className="display" style={{ fontSize: 64, fontWeight: 900, lineHeight: 0.9 }}>
          {file.period} report
        </h1>
        <p className="lede">
          {file.employer}. Contract <code>{shortId(file.contractAddress)}</code> on Preview.
        </p>
        <ol className="cue-list" aria-label="Report stages">
          {[
            { at: Phase.committing, title: "Cue 1: Commit payroll", note: `${registered} of ${file.employees.length} employees registered` },
            { at: Phase.checking, title: "Cue 2: Employee check window", note: `${open.length} open, ${state ? Number(state.resolvedDisputes) : 0} resolved disputes` },
            { at: Phase.proving, title: "Cue 3: Prove and publish", note: "Each category proven separately" },
          ].map((cue) => {
            const status = phase > cue.at ? "done" : phase === cue.at ? "now" : "todo";
            return (
              <li key={cue.title} className={status} aria-current={status === "now" ? "step" : undefined}>
                <span className="cue-dot" aria-hidden="true" />
                <span className="stack-sm" style={{ gap: 4 }}>
                  <strong>{cue.title}</strong>
                  <span className="hint">{cue.note}</span>
                </span>
                <span className="hint" style={{ fontWeight: 600 }}>
                  {status === "done" ? "Done" : status === "now" ? "Now" : "Waiting"}
                </span>
              </li>
            );
          })}
        </ol>
        <a href={reportLink} style={{ fontWeight: 600 }}>
          Open the public report
        </a>
      </aside>

      <section className="stack">
        {!saved && (
          <div className="notice-spike stack-sm">
            <strong style={{ fontSize: 19 }}>Save your organizer file now</strong>
            <p className="lede">
              It holds the payroll, the organizer key and every employee credential. It is the only way to run this report and is not stored anywhere else.
              Keep it off shared drives.
            </p>
            <button type="button" className="btn btn-plate" onClick={save} style={{ width: "fit-content" }}>
              Save organizer file
            </button>
          </div>
        )}

        {phase === Phase.committing && (
          <>
            <div className="stack-sm">
              <h2 className="display" style={{ fontSize: 40 }}>
                Register employees
              </h2>
              <p className="lede">
                Each employee gets an anonymous credential so they can dispute their record later. {registered} of {file.employees.length} are registered;
                each transaction registers up to 16.
              </p>
              <button
                type="button"
                className="btn btn-plate"
                style={{ width: "fit-content" }}
                disabled={!saved || !!session.busy || registered === file.employees.length}
                onClick={() => run("Employees registered", (c, f) => c.registerNext(f))}
              >
                {registered === file.employees.length ? "All employees registered" : "Register the next 16"}
              </button>
            </div>

            <div className="stack-sm">
              <h2 className="display" style={{ fontSize: 40 }}>
                Commit the payroll
              </h2>
              <div>
                <div className="table-head">
                  <span>Category</span>
                  <span>Women</span>
                  <span>Men</span>
                  <span>On-chain</span>
                </div>
                {roots.map((c) => {
                  const people = file.employees.filter((e) => e.category === c.label);
                  const women = people.filter((e) => c.records[e.slot].woman).length;
                  const done = committed(c.id, c.root);
                  return (
                    <div className="table-row" key={c.id}>
                      <strong>{c.label}</strong>
                      <span style={{ color: women < MIN_GROUP ? "var(--spike-text)" : undefined }}>{women}</span>
                      <span style={{ color: people.length - women < MIN_GROUP ? "var(--spike-text)" : undefined }}>{people.length - women}</span>
                      {done ? (
                        <span style={{ color: "var(--hmi-text)", fontWeight: 600 }}>Committed</span>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-line btn-sm"
                          disabled={!saved || !!session.busy}
                          onClick={() => run(`${c.label} committed`, (cl, f) => cl.commitCategory(f, c.id))}
                        >
                          Commit
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="hint">Red counts will stay dark in the report: the circuit withholds any group under {MIN_GROUP}.</p>
            </div>

            <Packets file={file} disabled={!saved} />

            <div className="actions" style={{ alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-plate"
                disabled={!saved || !!session.busy || !allCommitted || registered < file.employees.length}
                onClick={() => run("Check window opened", (c, f) => c.openCheckWindow(f))}
              >
                Open the check window
              </button>
              <span className="hint">Opens once every employee is registered and every category committed. Registration then closes.</span>
            </div>
          </>
        )}

        {phase === Phase.checking && (
          <>
            {open.length > 0 ? (
              open.map((d) => (
                <div className="notice-spike" key={d.n} style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <div className="stack-sm" style={{ gap: 6, flex: "1 1 360px" }}>
                    <strong style={{ fontSize: 19 }}>An employee disputes their record: {kindText[d.kind]}</strong>
                    <p className="lede">
                      They proved they hold a valid credential for this report. You don&apos;t know who they are. Check the {kindText[d.kind].toLowerCase()} records,
                      correct and recommit if needed, then mark it resolved. Reference <code>{shortId(d.n)}</code>
                    </p>
                  </div>
                  <button type="button" className="btn btn-plate" disabled={!!session.busy} onClick={() => run("Dispute resolved", (c, f) => c.resolveDispute(f, d.n))}>
                    Mark resolved
                  </button>
                </div>
              ))
            ) : (
              <div className="panel stack-sm">
                <strong style={{ fontSize: 19 }}>No open disputes</strong>
                <p className="lede">Employees are checking their records. Share the packets if you haven&apos;t, then close the window when the check period ends.</p>
              </div>
            )}
            <Packets file={file} disabled={false} />
            <div className="actions" style={{ alignItems: "center" }}>
              <button type="button" className="btn btn-plate" disabled={!!session.busy || open.length > 0} onClick={() => run("Check window closed", (c, f) => c.closeCheckWindow(f))}>
                Close the check window
              </button>
              <span className="hint">{open.length > 0 ? "Resolve every open dispute first." : "The payroll freezes and proving begins."}</span>
            </div>
          </>
        )}

        {phase === Phase.proving && (
          <div className="stack-sm">
            <h2 className="display" style={{ fontSize: 40 }}>
              Prove each category
            </h2>
            <p className="lede">Each proof recomputes the committed root from your payroll and publishes only the totals, or withholds the category.</p>
            <div>
              {file.categories.map((c) => {
                const key = Uint8Array.from(c.id.match(/.{2}/g)!, (b) => parseInt(b, 16));
                const done = state?.results.member(key) ? "Published" : state?.withheld.member(key) ? "Withheld" : null;
                const people = file.employees.filter((e) => e.category === c.label).map((e) => ({ employee: e.employee, woman: c.records[e.slot].woman, pay: 1 }));
                return (
                  <div className="table-row" key={c.id} style={{ gridTemplateColumns: "minmax(0, 1fr) 200px 180px" }}>
                    <strong>{c.label}</strong>
                    <span className="hint">{lit(people).lit ? "Will be lit" : "Will stay dark"}</span>
                    {done ? (
                      <span style={{ color: done === "Published" ? "var(--tungsten-text)" : "var(--muted)", fontWeight: 600 }}>{done}</span>
                    ) : (
                      <button type="button" className="btn btn-plate btn-sm" disabled={!!session.busy} onClick={() => run(`${c.label} proven`, (cl, f) => cl.publishCategory(f, c.id))}>
                        Prove
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Status busy={session.busy} error={error} />
        {receipt && !session.busy && !error && (
          <div className="panel stack-sm" role="status">
            <span className="status" style={{ color: "var(--tungsten-text)", fontWeight: 600 }}>
              <Check /> {receipt.what}
            </span>
            <TxLine txId={receipt.txId} block={receipt.block} />
          </div>
        )}
      </section>
    </div>
  );
}

function Packets({ file, disabled }: { file: OrganizerFile; disabled: boolean }) {
  const packets = useMemo(() => employeePackets(file), [file]);
  return (
    <div className="stack-sm">
      <h2 className="display" style={{ fontSize: 40 }}>
        Employee packets
      </h2>
      <p className="lede">
        Each employee receives only their own packet: their record, its place in the committed payroll and their dispute credential. Send each one privately.
      </p>
      <details>
        <summary style={{ cursor: "pointer", fontWeight: 600, padding: "8px 0" }}>Download packets one by one ({packets.length})</summary>
        <div style={{ columns: "220px", marginTop: 8 }}>
          {packets.map(({ employee, packet }) => (
            <button
              key={employee}
              type="button"
              className="btn btn-line btn-sm"
              disabled={disabled}
              style={{ width: "100%", marginBottom: 8, breakInside: "avoid" }}
              onClick={() => download(`${slug(employee)}.employee.json`, packet)}
            >
              {employee}, {packet.category}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}

function Create({
  session,
  error: outerError,
  onImport,
  onCreated,
}: {
  session: Session;
  error: string;
  onImport: (f: File | undefined) => void;
  onCreated: (file: OrganizerFile, receipt: Receipt) => void;
}) {
  const [employer, setEmployer] = useState(SAMPLE_EMPLOYER);
  const [period, setPeriod] = useState(SAMPLE_PERIOD);
  const [payroll, setPayroll] = useState<Record<string, Entry[]>>(SAMPLE_PAYROLL);
  const [source, setSource] = useState("the sample payroll");
  const [error, setError] = useState("");

  useEffect(() => setError(outerError), [outerError]);

  const loadCsv = async (picked: File | undefined) => {
    setError("");
    if (!picked) return;
    try {
      setPayroll(parsePayrollCsv(await readFile(picked)));
      setSource(picked.name);
    } catch (e) {
      setError(e instanceof Error ? e.message : "The payroll file could not be read.");
    }
  };

  const create = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!employer.trim()) return setError("Name the employer.");
    if (labelBytes(period) === 0 || labelBytes(period) > MAX_LABEL_BYTES) return setError("The period is 1 to 32 characters, for example 2026.");
    try {
      const client = session.client ?? (await session.connect());
      if (!client) return;
      const { file, receipt } = await client.create(employer.trim(), period.trim(), payroll);
      onCreated(file, receipt);
    } catch (e) {
      setError(safeError(e));
    } finally {
      session.setBusy(null);
    }
  };

  const rows = Object.entries(payroll).map(([label, entries]) => ({ label, ...lit(entries), total: entries.length }));

  return (
    <div className="console">
      <aside className="stack-sm" style={{ gap: 22 }}>
        <h1 className="display" style={{ fontSize: 64, fontWeight: 900, lineHeight: 0.9 }}>
          Start a report
        </h1>
        <p className="lede">
          You deploy a report contract, commit your payroll as fingerprints, let employees check their own records, then prove the figures. Salaries never leave
          this device.
        </p>
        <ol className="stack-sm lede" style={{ paddingLeft: "1.2em", margin: 0 }}>
          <li>Connect Lace on Preview, with tDUST for fees and the proof server set to your local one.</li>
          <li>Load the payroll and create the report.</li>
          <li>Save the organizer file. Without it the report cannot be run.</li>
        </ol>
      </aside>

      <form className="stack" onSubmit={create}>
        <div className="actions">
          <div className="field" style={{ flex: "1 1 280px" }}>
            <label htmlFor="employer">Employer</label>
            <input id="employer" value={employer} maxLength={80} onChange={(e) => setEmployer(e.target.value)} />
          </div>
          <div className="field" style={{ flex: "0 1 180px" }}>
            <label htmlFor="period">Period</label>
            <input id="period" value={period} maxLength={32} onChange={(e) => setPeriod(e.target.value)} />
          </div>
        </div>

        <div className="stack-sm">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
            <h2 className="display" style={{ fontSize: 40 }}>
              Payroll
            </h2>
            <span className="hint">Loaded from {source}. Up to 16 people per category in this prototype.</span>
          </div>
          <div>
            <div className="table-head">
              <span>Category</span>
              <span>Women</span>
              <span>Men</span>
              <span>In the report</span>
            </div>
            {rows.map((r) => (
              <div className="table-row" key={r.label}>
                <strong>{r.label}</strong>
                <span style={{ color: r.women < MIN_GROUP ? "var(--spike-text)" : undefined }}>{r.women}</span>
                <span style={{ color: r.men < MIN_GROUP ? "var(--spike-text)" : undefined }}>{r.men}</span>
                <span style={{ color: r.lit ? "var(--tungsten-text)" : "var(--dust)", fontWeight: 600 }}>{r.lit ? "Lit" : "Stays dark"}</span>
              </div>
            ))}
          </div>
          <div className="actions">
            <label className="btn btn-line btn-sm file-btn">
              Load a payroll CSV
              <input type="file" accept=".csv,text/csv" onChange={(e) => loadCsv(e.target.files?.[0])} />
            </label>
            <span className="hint" style={{ alignSelf: "center" }}>
              Columns: employee, category, gender (woman or man), pay. The sample is fictional.
            </span>
          </div>
        </div>

        <div className="actions" style={{ alignItems: "center" }}>
          <button type="submit" className="btn btn-plate" disabled={!!session.busy}>
            Create report on Midnight
          </button>
          <label className="btn btn-line file-btn">
            Import organizer file
            <input type="file" accept="application/json,.json" onChange={(e) => onImport(e.target.files?.[0])} />
          </label>
        </div>
        <Status busy={session.busy} error={error} />
      </form>
    </div>
  );
}
