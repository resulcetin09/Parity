import { Stage, Pair } from "../components/Stage";
import { Check } from "../components/Mark";
import { euros, pct, sampleReport } from "../lib/report";
import { SAMPLE_EMPLOYER } from "../lib/sample";

const sample = sampleReport();

export function Landing() {
  const overall = sample.overall!;
  return (
    <>
      <Stage figures={overall} caption={`Sample figures from ${SAMPLE_EMPLOYER}, a fictional employer. Scale: share of men's average pay.`}>
        <h1 className="display">Pay gaps, proven.</h1>
        <p>
          EU law now makes employers publish their gender pay gap, but nobody outside payroll can check the figures. Parity proves them
          against the real payroll, without revealing a single salary.
        </p>
        <div className="actions">
          <a className="btn btn-plate" href="#/hr">
            Start a report
          </a>
          <a className="btn btn-line" href="#/report">
            See a sample report
          </a>
        </div>
      </Stage>

      <section className="section grid-12" aria-labelledby="problem">
        <h2 id="problem" className="display" style={{ gridColumn: "1 / span 6", fontSize: "clamp(48px, 5vw, 72px)" }}>
          The law asks for a number nobody can check.
        </h2>
        <div className="stack-sm lede" style={{ gridColumn: "8 / span 5", gap: 24 }}>
          <p>
            The EU Pay Transparency Directive took effect in June 2026. Employers with 150 or more staff publish their first gender pay-gap
            report in June 2027, and a gap over 5% that they cannot justify triggers a joint pay assessment with worker representatives.
          </p>
          <p>But the report is computed from data only the employer sees. To check it, employees would need everyone's salary, which privacy law rightly forbids.</p>
          <p style={{ color: "var(--bone)", fontWeight: 600 }}>Parity makes the report checkable without opening the payroll.</p>
        </div>
      </section>

      <section className="section stack" id="how" aria-labelledby="how-title" style={{ gap: 56 }}>
        <h2 id="how-title" className="display" style={{ fontSize: 56 }}>
          Three cues, one proof
        </h2>
        <ol className="cues">
          <li className="cue">
            <span className="cue-no">Cue 1</span>
            <h3>Commit the payroll</h3>
            <p>HR publishes a fingerprint of every pay record on Midnight. The records stay private; the fingerprint cannot be quietly changed.</p>
          </li>
          <li className="cue">
            <span className="cue-no">Cue 2</span>
            <h3>Employees check their own line</h3>
            <p>Each employee confirms on their phone that their record is in the fingerprint and correct. If it is not, they dispute it anonymously.</p>
          </li>
          <li className="cue">
            <span className="cue-no">Cue 3</span>
            <h3>Prove the report</h3>
            <p>A zero-knowledge proof shows the published averages came from exactly those records. Groups under five people are never published.</p>
          </li>
        </ol>
      </section>

      <section className="section section-alt grid-12" aria-labelledby="sample-title">
        <div className="stack-sm" style={{ gridColumn: "1 / span 4", gap: 22 }}>
          <h2 id="sample-title" className="display" style={{ fontSize: 56 }}>
            What a proven report shows
          </h2>
          <p className="lede">Every category of work as two beams and the distance between them. A group too small to stay anonymous is withheld, and says so.</p>
          <a href="#/report" style={{ fontWeight: 600 }}>
            Open the sample report
          </a>
        </div>
        <div className="rows" style={{ gridColumn: "6 / span 7" }}>
          {sample.categories.map((c) =>
            c.status === "published" ? (
              <div key={c.id} className="stack-sm" style={{ gap: 10, padding: "22px 0", borderBottom: "1px solid var(--rule)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17 }}>
                  <span>{c.label}</span>
                  <strong style={{ color: c.figures.gap > 5 ? "var(--tungsten)" : undefined }}>{pct(c.figures.gap)} short</strong>
                </div>
                <Pair gap={c.figures.gap} />
              </div>
            ) : (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", padding: "22px 0", color: "var(--dust)", fontSize: 17 }}>
                <span>{c.label}</span>
                <span>Withheld: fewer than 5 in a group</span>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="section grid-12" aria-labelledby="emp-title" style={{ alignItems: "center" }}>
        <div className="stack-sm" style={{ gridColumn: "1 / span 6", gap: 24 }}>
          <h2 id="emp-title" className="display" style={{ fontSize: "clamp(48px, 5vw, 72px)" }}>
            Is your pay in the report?
          </h2>
          <p className="lede" style={{ maxWidth: 520 }}>
            Check your own record against what your employer committed. It happens on your device. Your employer does not learn that you looked, and
            nobody learns what you earn.
          </p>
          <a className="btn btn-plate" href="#/check" style={{ width: "fit-content" }}>
            Check my record
          </a>
        </div>
        <div className="panel stack-sm" style={{ gridColumn: "8 / span 4", justifySelf: "end", width: "100%", maxWidth: 360 }}>
          <h3 style={{ fontSize: 20 }}>Your {sample.period} record</h3>
          <div>
            <div className="kv">
              <span>Category</span>
              <span>Engineering</span>
            </div>
            <div className="kv">
              <span>Average monthly pay</span>
              <span>{euros(5180)}</span>
            </div>
          </div>
          <span className="status" style={{ color: "var(--tungsten-text)", fontWeight: 600 }}>
            <Check /> In the committed payroll
          </span>
        </div>
      </section>

      <section className="section grid-12" aria-labelledby="built-title">
        <h2 id="built-title" className="display" style={{ gridColumn: "1 / span 5", fontSize: 56 }}>
          Built on Midnight
        </h2>
        <dl className="dl" style={{ gridColumn: "7 / span 6" }}>
          <dt>Contract</dt>
          <dd>Compact, with private witnesses for every salary</dd>
          <dt>Commitment</dt>
          <dd>A salted Merkle root of each category's payroll, on-chain</dd>
          <dt>Report</dt>
          <dd>A zero-knowledge proof of the aggregates and the 5-person rule</dd>
          <dt>Disputes</dt>
          <dd>Anonymous: a membership proof and a one-per-report nullifier</dd>
        </dl>
      </section>

      <section className="section stack" aria-labelledby="close-title" style={{ gap: 30, alignItems: "flex-start" }}>
        <h2 id="close-title" className="display" style={{ fontSize: "clamp(56px, 7vw, 96px)", fontWeight: 900, maxWidth: 900 }}>
          Publish a report anyone can check.
        </h2>
        <a className="btn btn-plate" href="#/hr">
          Start a report
        </a>
      </section>
    </>
  );
}
