import type { CSSProperties } from "react";
import type { GroupFigures } from "../lib/payroll";
import { euros, pct } from "../lib/report";

interface Props {
  figures: GroupFigures;
  caption: string;
  children: React.ReactNode;
  label?: string;
}

/** Two follow spots aimed at one mark; the women's beam stops short by the gap. */
export function Stage({ figures, caption, children, label = "Pay gaps, proven" }: Props) {
  const ratio = Math.max(0.2, Math.min(1, figures.womenAverage / figures.menAverage));
  const a = `calc(var(--mark) * ${ratio.toFixed(4)})`;
  const shortfall = Math.max(0, figures.menAverage - figures.womenAverage);
  return (
    <section className="stage" aria-label={label} style={{ "--mark": "88%" } as CSSProperties}>
      <div className="stage-copy">{children}</div>
      <div className="rig" aria-hidden="true">
        <div className="spike" />
        <span className="spike-label">Equal pay</span>
        <div className="beam beam-a" style={{ width: a }}>
          <div className="cone" />
          <div className="core" />
          <div className="pool" />
        </div>
        <div className="beam beam-b" style={{ width: "var(--mark)" }}>
          <div className="cone" />
          <div className="core" />
          <div className="pool" />
        </div>
        {figures.gap > 0 && <div className="gap" style={{ left: a, width: `calc(var(--mark) - ${a})` }} />}
        <span className="beam-label a" style={{ left: `calc(${a} - 340px)` }}>
          Women, average <strong>{euros(figures.womenAverage)}</strong> a month
        </span>
        <span className="beam-label b" style={{ left: `calc(var(--mark) - 340px)` }}>
          Men, average <strong>{euros(figures.menAverage)}</strong> a month
        </span>
        <div className="gap-figure" style={{ left: `calc(${a} - 24px)` }}>
          <strong>{figures.gap > 0 ? `${pct(figures.gap)} short` : "Level"}</strong>
          <span>{shortfall > 0 ? `${euros(shortfall)} a month, on average` : "No gap in these figures"}</span>
        </div>
        <div className="floor">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <p className="stage-caption">{caption}</p>
    </section>
  );
}

/** The same pair of beams, one row high, for tables. */
export function Pair({ gap }: { gap: number }) {
  return (
    <div className="pair" aria-hidden="true">
      <div className="b" style={{ width: "100%" }} />
      <div className="a" style={{ width: `${Math.max(20, 100 - Math.max(0, gap))}%` }} />
      <div className="five" />
    </div>
  );
}
