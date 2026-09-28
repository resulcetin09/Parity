import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "../App";
import { Stage, Pair } from "../components/Stage";
import { Check } from "../components/Mark";
import { Status } from "../components/Status";
import { euros, pct, sampleReport, Phase, type ReportView } from "../lib/report";
import { isAddress } from "../lib/files";
import { safeError } from "../lib/errors";
import { shortId } from "../lib/bytes";

const phaseText: Record<Phase, string> = {
  [Phase.committing]: "HR is committing the payroll.",
  [Phase.checking]: "Employees are checking their records.",
  [Phase.proving]: "Categories are being proven.",
};

export function Report({ session, address }: { session: Session; address: string }) {
  const [report, setReport] = useState<ReportView | null>(address ? null : sampleReport());
  const [error, setError] = useState("");
  const [input, setInput] = useState(address);

  useEffect(() => {
    if (!address) {
      setReport(sampleReport());
      return;
    }
    let cancelled = false;
    (async () => {
      setError("");
      setReport(null);
      session.setBusy("reading");
      try {
        const reader = session.client ?? (await import("../lib/midnight")).publicReader();
        const view = await reader.report(address);
        if (!cancelled) setReport(view);
      } catch (e) {
        if (!cancelled) setError(safeError(e));
      } finally {
        session.setBusy(null);
      }
    })();
    return () => {
      cancelled = true;
    };
    // Re-read only when the address changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const open = (event: FormEvent) => {
    event.preventDefault();
    const target = input.trim().toLowerCase();
    if (!isAddress(target)) return setError("A report address is 64 hexadecimal characters.");
    window.location.hash = `#/report?c=${target}`;
  };

  const opener = (
    <form className="field" onSubmit={open} style={{ maxWidth: 640 }}>
      <label htmlFor="address">Open a report by its contract address</label>
      <div className="actions">
        <input id="address" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Contract address" spellCheck={false} style={{ flex: "1 1 320px" }} />
        <button className="btn btn-line" type="submit">
          Open report
        </button>
      </div>
    </form>
  );

  if (!report)
    return (
      <section className="section stack">
        <Status busy={session.busy} error={error} />
        {opener}
      </section>
    );

  const title = report.source === "sample" ? report.employer : `Report ${shortId(address)}`;
  const published = report.categories.filter((c) => c.status === "published").length;

  return (
    <>
      {report.overall ? (
        <Stage
          figures={report.overall}
          label={`${title} pay-gap report`}
          caption={
            report.source === "sample"
              ? `Sample report. ${report.employer} is a fictional employer.`
              : `Read from Midnight Preview. Across the ${published} published ${published === 1 ? "category" : "categories"}.`
          }
        >
          <h1 className="display" style={{ fontSize: "clamp(64px, 7vw, 96px)" }}>
            {title}
          </h1>
          <p>Gender pay gap report, period {report.period}. Averages across published categories; withheld groups never count.</p>
          <span className="tag tag-proven">
            <Check /> {report.source === "sample" ? "Sample: computed the way the circuit computes it" : "Proven against the committed payroll"}
          </span>
        </Stage>
      ) : (
        <section className="section stack" style={{ gap: 18 }}>
          <h1 className="display" style={{ fontSize: "clamp(64px, 7vw, 96px)" }}>
            {title}
          </h1>
          <p className="lede">Period {report.period}. {phaseText[report.phase]} Nothing has been proven yet, so nothing is lit.</p>
        </section>
      )}

      <section className="section" aria-labelledby="cats">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
          <h2 id="cats" className="display" style={{ fontSize: 56 }}>
            By category of work
          </h2>
          <span className="hint">Groups under 5 people are never published</span>
        </div>
        <div className="rows">
          {report.categories.map((c) => {
            if (c.status === "published") {
              const f = c.figures;
              const over = f.gap > 5;
              return (
                <div className="row" key={c.id}>
                  <h3>{c.label}</h3>
                  <span className="meta">
                    {f.women} women, {f.men} men
                    <br />
                    {euros(f.womenAverage)} against {euros(f.menAverage)}
                  </span>
                  <Pair gap={f.gap} />
                  <span className="verdict">
                    <strong style={{ color: over ? "var(--tungsten)" : undefined }}>{f.gap >= 0 ? `${pct(f.gap)} short` : `${pct(-f.gap)} ahead`}</strong>
                    <span className="hint" style={{ color: over ? "var(--spike-text)" : "var(--hmi-text)" }}>
                      {over ? "Over 5%: joint assessment" : "Within 5%"}
                    </span>
                  </span>
                </div>
              );
            }
            if (c.status === "withheld")
              return (
                <div className="row" key={c.id}>
                  <h3 style={{ color: "var(--muted)" }}>{c.label}</h3>
                  <span className="meta">Not lit</span>
                  <span style={{ color: "var(--muted)" }}>Fewer than 5 women or 5 men work here, so an average could identify them.</span>
                  <span className="hint">Withheld by the circuit</span>
                </div>
              );
            return (
              <div className="row" key={c.id}>
                <h3>{c.label}</h3>
                <span className="meta">Committed</span>
                <code>root {shortId(c.root)}</code>
                <span className="hint">Not yet proven</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section stack" aria-labelledby="proof">
        <h2 id="proof" className="display" style={{ fontSize: 56 }}>
          {report.source === "sample" ? "How a report is proven" : "What the chain says"}
        </h2>
        {report.source === "sample" ? (
          <p className="lede" style={{ maxWidth: 760 }}>
            In a live report, HR commits each category's payroll as a salted Merkle root, employees check their own records and can dispute them anonymously,
            and a zero-knowledge proof publishes only these aggregates. This sample runs the same arithmetic in your browser; nothing here is on-chain.
          </p>
        ) : (
          <dl className="dl">
            <dt>Contract</dt>
            <dd>
              <code>{address}</code>
            </dd>
            <dt>Stage</dt>
            <dd>{phaseText[report.phase]}</dd>
            <dt>Registered employees</dt>
            <dd>{report.employees}</dd>
            <dt>Disputes</dt>
            <dd>
              {report.openDisputes.length} open, {report.resolvedDisputes} resolved
            </dd>
          </dl>
        )}
        {opener}
        <Status busy={session.busy} error={error} />
      </section>
    </>
  );
}
