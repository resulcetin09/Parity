import { useState } from "react";
import type { Session } from "../App";
import { Status, TxLine } from "../components/Status";
import { Check } from "../components/Mark";
import { DisputeKind } from "../../contract/managed/parity/contract/index.js";
import { loadRecord, parseFile, readFile, type EmployeePacket } from "../lib/files";
import { rootFromRecord } from "../lib/payroll";
import { euros, Phase } from "../lib/report";
import { fromHex, shortId, toHex } from "../lib/bytes";
import { safeError } from "../lib/errors";

type Verdict = { phase: Phase; committedRoot: string | null; matches: boolean };

const kinds: { value: DisputeKind; label: string }[] = [
  { value: DisputeKind.payAmount, label: "Pay amount" },
  { value: DisputeKind.category, label: "Category of work" },
  { value: DisputeKind.gender, label: "Recorded gender" },
  { value: DisputeKind.missing, label: "Something else is missing or wrong" },
];

export function EmployeeCheck({ session }: { session: Session }) {
  const [packet, setPacket] = useState<EmployeePacket | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [disputing, setDisputing] = useState(false);
  const [kind, setKind] = useState<DisputeKind>(DisputeKind.payAmount);
  const [filed, setFiled] = useState<{ txId: string; block: number; reference: string } | null>(null);
  const [error, setError] = useState("");

  const load = async (picked: File | undefined) => {
    setError("");
    setVerdict(null);
    setFiled(null);
    if (!picked) return;
    try {
      const parsed = parseFile(await readFile(picked));
      if (parsed.kind !== "parity-employee") throw new Error("This is HR's organizer file. Import your own employee packet.");
      setPacket(parsed);
      session.setBusy("reading");
      const reader = session.client ?? (await import("../lib/midnight")).publicReader();
      const state = await reader.ledger(parsed.contractAddress);
      const id = fromHex(parsed.categoryId, 32);
      const committedRoot = state.payroll.member(id) ? toHex(state.payroll.lookup(id)) : null;
      // Recomputed here, on this device: the record never leaves it.
      const mine = rootFromRecord(loadRecord(parsed.record), parsed.proof);
      setVerdict({ phase: state.phase, committedRoot, matches: committedRoot === mine });
    } catch (e) {
      setError(e instanceof Error && !(e as { cause?: unknown }).cause ? e.message : safeError(e));
    } finally {
      session.setBusy(null);
    }
  };

  const dispute = async () => {
    if (!packet) return;
    setError("");
    try {
      const client = session.client ?? (await session.connect());
      if (!client) return;
      setFiled(await client.fileDispute(packet, kind));
    } catch (e) {
      setError(safeError(e));
    } finally {
      session.setBusy(null);
    }
  };

  if (!packet)
    return (
      <div className="narrow">
        <h1 className="display" style={{ fontSize: 64, fontWeight: 900, lineHeight: 0.9 }}>
          Check your record
        </h1>
        <p className="lede">
          HR sends each employee a packet with their own record and its place in the committed payroll. Open it here: the check runs on this device and nothing
          about you is sent anywhere.
        </p>
        <label className="btn btn-plate file-btn" style={{ width: "fit-content" }}>
          Open my packet
          <input type="file" accept="application/json,.json" onChange={(e) => load(e.target.files?.[0])} />
        </label>
        <Status busy={session.busy} error={error} />
      </div>
    );

  const record = loadRecord(packet.record);
  const canDispute = verdict?.phase === Phase.checking;

  return (
    <div className="narrow">
      <p className="hint">
        {packet.employer}, {packet.period} report
      </p>
      <h1 className="display" style={{ fontSize: 56, fontWeight: 900, lineHeight: 0.9 }}>
        Your {packet.period} record
      </h1>
      <div className="panel" style={{ padding: "6px 20px" }}>
        <div className="kv">
          <span>Category</span>
          <strong>{packet.category}</strong>
        </div>
        <div className="kv">
          <span>Recorded gender</span>
          <strong>{record.woman ? "Woman" : "Man"}</strong>
        </div>
        <div className="kv">
          <span>Average monthly pay</span>
          <strong>{euros(Number(record.pay))}</strong>
        </div>
      </div>

      {verdict && (
        <div className="stack-sm" style={{ gap: 10 }}>
          <div style={{ height: 4, background: verdict.matches ? "linear-gradient(90deg, var(--tungsten-hot), var(--tungsten))" : "var(--spike)" }} />
          {verdict.matches ? (
            <span className="status" style={{ color: "var(--tungsten-text)", fontWeight: 700, fontSize: 17 }}>
              <Check /> In the committed payroll
            </span>
          ) : (
            <span className="status error" style={{ fontWeight: 700, fontSize: 17 }}>
              {verdict.committedRoot ? "This record is not what HR committed" : "This category has not been committed yet"}
            </span>
          )}
          <p className="hint">
            Checked on this device against {verdict.committedRoot ? `commitment ${shortId(verdict.committedRoot)}` : "the report"} on Preview. Nothing was sent to
            your employer.
          </p>
        </div>
      )}

      {filed ? (
        <div className="panel stack-sm" role="status">
          <span className="status" style={{ color: "var(--tungsten-text)", fontWeight: 600 }}>
            <Check /> Dispute filed anonymously
          </span>
          <p className="lede">
            HR sees that a registered employee disputes a {kinds.find((k) => k.value === kind)!.label.toLowerCase()}. Not your name, record or pay. The report cannot be
            proven until it is resolved. Reference <code>{shortId(filed.reference)}</code>
          </p>
          <TxLine txId={filed.txId} block={filed.block} />
        </div>
      ) : disputing ? (
        <div className="stack-sm" style={{ gap: 18 }}>
          <fieldset>
            <legend className="legend" style={{ marginBottom: 8 }}>
              What is wrong?
            </legend>
            {kinds.map((k) => (
              <label className="radio" key={k.value}>
                <input type="radio" name="kind" checked={kind === k.value} onChange={() => setKind(k.value)} />
                {k.label}
              </label>
            ))}
          </fieldset>
          <div className="panel stack-sm" style={{ gap: 6 }}>
            <strong>What HR will see</strong>
            <p className="hint" style={{ fontSize: 14, color: "var(--muted)" }}>
              That someone with a valid credential for this report disputes one field. Not your name, your record or your pay. One dispute per report.
            </p>
          </div>
          <button type="button" className="btn btn-spike-solid" disabled={!!session.busy || !canDispute} onClick={dispute}>
            File anonymous dispute
          </button>
          {!canDispute && <p className="hint">Disputes are accepted only while the check window is open.</p>}
        </div>
      ) : (
        <>
          <p className="lede">{verdict?.matches ? "Is everything above right? Then there is nothing to do." : "If your payslips say otherwise, you can dispute it without identifying yourself."}</p>
          <div className="stack-sm">
            <a className="btn btn-plate" href={`#/report?c=${packet.contractAddress}`}>
              {verdict?.matches ? "Yes, it is right. See the report" : "See the report"}
            </a>
            <button type="button" className="btn btn-spike" onClick={() => setDisputing(true)}>
              Something is wrong
            </button>
          </div>
        </>
      )}
      <Status busy={session.busy} error={error} />
    </div>
  );
}
