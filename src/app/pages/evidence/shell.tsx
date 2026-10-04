import Link from "next/link";
import { identity } from "@/data/content";
import { T, type Case, type Decision } from "./data";

export function EvidenceHeader() {
  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ borderColor: T.border, background: "rgba(7,11,18,0.9)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8">
        <Link href="/pages/evidence" className="font-mono text-sm font-semibold" style={{ color: T.text }}>
          shamik<span style={{ color: T.teal }}>@</span>evidence
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs" style={{ color: T.secondary }}>
          <Link href="/pages/evidence#ship" className="hover:underline">ship</Link>
          <Link href="/pages/evidence/approach" className="hover:underline">how I work</Link>
          <Link href="/pages/evidence/about" className="hover:underline">about</Link>
        </nav>
      </div>
    </header>
  );
}

export function EvidenceFooter() {
  return (
    <footer className="border-t" style={{ borderColor: T.border, background: T.ink }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ color: T.muted }}>
        <span>
          <span style={{ color: T.teal }}>$</span> connect · {identity.name}
        </span>
        <div className="flex flex-wrap gap-5">
          <a href={`mailto:${identity.email}`} className="hover:underline" style={{ color: T.secondary }}>email</a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: T.secondary }}>linkedin ↗</a>
          <a href={identity.github} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: T.secondary }}>github ↗</a>
        </div>
      </div>
    </footer>
  );
}

export function Receipts({ items }: { items: Case["receipts"] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((r, i) => (
        <div key={r.label} className="flex flex-col justify-between rounded-lg border p-5" style={{ borderColor: T.border, background: T.panel }}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: T.muted }}>
              receipt {String(i + 1).padStart(3, "0")}
            </div>
            <div className="mt-3 font-mono text-3xl font-semibold" style={{ color: T.teal }}>{r.value}</div>
            <div className="mt-2 text-sm leading-snug" style={{ color: T.text }}>{r.label}</div>
          </div>
          {r.note && <div className="mt-4 font-mono text-[10px]" style={{ color: T.dim }}>{r.note}</div>}
        </div>
      ))}
    </div>
  );
}

export function OwnershipStrip({ ownership }: { ownership: Case["ownership"] }) {
  const cols: { label: string; mark: string; color: string; items: string[] }[] = [
    { label: "Owned", mark: "●", color: T.teal, items: ownership.owned },
    { label: "Shared", mark: "○", color: T.blue, items: ownership.shared },
    { label: "Out of scope", mark: "—", color: T.muted, items: ownership.outOfScope },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cols.map((c) => (
        <div key={c.label} className="rounded-lg border p-4" style={{ borderColor: T.border, background: T.panel }}>
          <div className="font-mono text-xs font-semibold" style={{ color: c.color }}>
            {c.mark} {c.label.toUpperCase()}
          </div>
          <ul className="mt-3 space-y-2 text-sm leading-snug" style={{ color: c.label === "Out of scope" ? T.muted : T.secondary }}>
            {c.items.length === 0 && <li style={{ color: T.dim }}>none stated</li>}
            {c.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function DecisionRecord({ d, n }: { d: Decision; n: number }) {
  const rows: [string, string][] = [
    ["PROBLEM", d.problem],
    ["DECISION", d.decision],
    ["TRADE-OFF", d.tradeoff],
    ["RESULT", d.result],
  ];
  return (
    <article className="rounded-lg border p-5 sm:p-6" style={{ borderColor: T.border, background: T.panel }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="font-mono text-xs" style={{ color: T.amber }}>DECISION RECORD #{String(n).padStart(2, "0")}</div>
        {d.draftedTradeoff && (
          <div className="font-mono text-[10px]" style={{ color: T.dim }}>trade-off drafted, to confirm</div>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold leading-snug" style={{ color: T.text }}>{d.title}</h3>
      <dl className="mt-4 space-y-3">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm leading-relaxed">
            <dt className="font-mono text-xs" style={{ color: T.teal }}>{k}</dt>
            <dd style={{ color: T.secondary }}>{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
