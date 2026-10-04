"use client";

import * as React from "react";
import Link from "next/link";

const BG = "#070b12";
const PANEL = "#0b1120";
const TEXT = "#e6edf6";
const MUTED = "#8b98a9";
const TEAL = "#19d3ae";
const AMBER = "#ffb547";
const LINE = "#1d2838";

type Entry = {
  id: string;
  name: string;
  summary: string;
  domain: "Payments" | "AI" | "Risk";
  caught?: boolean;
  fields: { label: string; value: string }[];
  href: string;
};

const SHIPPED: Entry[] = [
  {
    id: "chrome",
    name: "chrome-virtual-card-autofill",
    summary: "275K+ requests · $900K settled · <5s SLA",
    domain: "Payments",
    fields: [
      { label: "SYSTEM", value: "Google Chrome Virtual Card Autofill" },
      { label: "CONSTRAINT", value: "5s latency SLA from Google" },
      { label: "OBSERVED", value: "Yellow path 7–8s, inside a downstream fraud dependency" },
      { label: "DECISION", value: "Surface the dependency as input; build a mock fraud signal to keep delivery moving" },
      { label: "EXECUTION", value: "Worked with the fraud team on their APIs; wrote the certification tests myself" },
      { label: "OUTCOME", value: "Yellow 3.5–4s, green 1–1.2s · 275K+ requests · $900K settled in 45 days" },
    ],
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    id: "wallet",
    name: "wallet-provisioning",
    summary: "1st international issuer · push provisioning",
    domain: "Payments",
    fields: [
      { label: "SYSTEM", value: "Google Pay & Samsung Pay wallet provisioning" },
      { label: "CONSTRAINT", value: "A live card migration must be invisible to wallet users" },
      { label: "DECISION", value: "Validate the migration is invisible to the wallet before scale" },
      { label: "EXECUTION", value: "Token cleanup on a live repersonalization, sequenced by release of value" },
      { label: "OUTCOME", value: "First international issuer live on push provisioning in 2025" },
    ],
    href: "/case-studies/wallet-provisioning",
  },
  {
    id: "opencam",
    name: "opencam",
    summary: "maker/checker gate · deterministic policy engine",
    domain: "AI",
    fields: [
      { label: "SYSTEM", value: "OpenCAM — autonomous maker-checker credit memo framework" },
      { label: "CONSTRAINT", value: "A model can narrate a figure; it must never produce one" },
      { label: "DECISION", value: "Covenants evaluated deterministically: PASS, FAIL or UNRESOLVABLE" },
      { label: "EXECUTION", value: "Independent maker and checker agents; the checker can only downgrade" },
      { label: "OUTCOME", value: "Every figure checked against ground-truth financials within a 0.5% tolerance" },
    ],
    href: "/case-studies/opencam",
  },
];

const CATCH: Entry = {
  id: "dscr",
  name: "dscr-catch",
  summary: "debt-free company · DSCR 0 → undefined",
  domain: "Risk",
  caught: true,
  fields: [
    { label: "CONTEXT", value: "A debt-free company's DSCR was silently computed as 0" },
    { label: "RISK", value: "0 reads as a covenant breach; a healthy borrower gets flagged" },
    { label: "CAUGHT", value: "Found in a codebase audit, before any credit committee" },
    { label: "FIX", value: "DSCR is undefined when there is no debt service, not zero" },
  ],
  href: "/case-studies/opencam",
};

const LOG: { ts: string; tag: "DECIDE" | "CATCH"; domain: Entry["domain"]; line: string; href: string }[] = [
  {
    ts: "2024-11",
    tag: "DECIDE",
    domain: "Payments",
    line: "Built a mock fraud signal to keep delivery moving while a downstream dependency was unresolved.",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    ts: "2024-11",
    tag: "DECIDE",
    domain: "Payments",
    line: "Chased the yellow path from 7–8s to 3.5–4s, inside Google's 5s limit.",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    ts: "2026-09",
    tag: "DECIDE",
    domain: "AI",
    line: "Let the model narrate; let the code compute. Covenants evaluated deterministically.",
    href: "/case-studies/opencam",
  },
  {
    ts: "2026-09",
    tag: "CATCH",
    domain: "Risk",
    line: "A debt-free company's DSCR computed as 0 instead of undefined, caught before committee.",
    href: "/case-studies/opencam",
  },
];

const FILTERS = ["All", "Payments", "AI", "Risk"] as const;

export function TerminalConsole() {
  const [openId, setOpenId] = React.useState<string>("chrome");
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");
  const [logOpen, setLogOpen] = React.useState<number | null>(null);

  const visibleLog = LOG.filter((e) => filter === "All" || e.domain === filter);
  const detail = logOpen !== null ? visibleLog[logOpen] : undefined;

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
          $ ship --recent · click a line to inspect
        </div>
        <div className="space-y-2 rounded-xl border p-4 font-mono text-sm sm:p-5" style={{ borderColor: LINE, background: PANEL }}>
          {[...SHIPPED, CATCH].map((e) => {
            const open = openId === e.id;
            return (
              <div key={e.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? "" : e.id)}
                  aria-expanded={open}
                  className="flex w-full flex-wrap items-baseline gap-x-3 rounded px-2 py-2 text-left hover:bg-white/[0.03]"
                >
                  <span style={{ color: e.caught ? AMBER : TEAL }}>{e.caught ? "!" : "✓"}</span>
                  <span style={{ color: TEXT }} className="underline-offset-4 hover:underline">
                    {e.name}
                  </span>
                  <span className="text-xs sm:text-sm" style={{ color: MUTED }}>
                    — {e.summary}
                  </span>
                </button>
                {open && (
                  <div className="mb-3 ml-2 mt-1 space-y-2 border-l-2 py-2 pl-4" style={{ borderColor: e.caught ? AMBER : TEAL }}>
                    <div className="text-xs" style={{ color: MUTED }}>$ inspect {e.name}</div>
                    {e.fields.map((f) => (
                      <div key={f.label} className="grid grid-cols-[6.5rem_1fr] gap-3 text-xs leading-relaxed sm:text-sm">
                        <span style={{ color: e.caught ? AMBER : TEAL }}>{f.label}</span>
                        <span style={{ color: TEXT }}>{f.value}</span>
                      </div>
                    ))}
                    <Link href={e.href} className="inline-block pt-2 text-xs underline underline-offset-4" style={{ color: TEAL }}>
                      open the case study →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
          receipts
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { value: "275K+", label: "successful autofill requests in 60 days", href: "/case-studies/google-chrome-autofill-virtual-card-number", source: "chrome-autofill" },
            { value: "$900K", label: "settled in the first 45 days", href: "/case-studies/google-chrome-autofill-virtual-card-number", source: "chrome-autofill" },
            { value: "<5s", label: "Google's latency SLA, delivered against", href: "/case-studies/google-chrome-autofill-virtual-card-number", source: "chrome-autofill" },
          ].map((r) => (
            <Link key={r.label} href={r.href} className="group flex flex-col justify-between rounded-lg border p-5 hover:bg-white/[0.03]" style={{ borderColor: LINE, background: PANEL }}>
              <div>
                <div className="font-mono text-3xl font-semibold" style={{ color: TEAL }}>{r.value}</div>
                <div className="mt-2 text-sm" style={{ color: TEXT }}>{r.label}</div>
              </div>
              <div className="mt-6 font-mono text-[11px] uppercase tracking-wider" style={{ color: MUTED }}>
                verified against {r.source} → inspect
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
          decision log
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setLogOpen(null);
              }}
              aria-pressed={filter === f}
              className="rounded border px-3 py-1 font-mono text-xs"
              style={{
                borderColor: filter === f ? TEAL : LINE,
                color: filter === f ? TEAL : MUTED,
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="rounded-xl border p-3 font-mono text-sm" style={{ borderColor: LINE, background: PANEL }}>
          {visibleLog.map((d, i) => {
            const active = logOpen === i;
            return (
              <button
                key={`${d.ts}-${d.line}`}
                type="button"
                onClick={() => setLogOpen(active ? null : i)}
                aria-pressed={active}
                className="grid w-full grid-cols-[5rem_4.5rem_1fr] gap-3 rounded px-2 py-2 text-left hover:bg-white/[0.03]"
                style={{ background: active ? "rgba(25,211,174,0.06)" : undefined }}
              >
                <span style={{ color: MUTED }}>{d.ts}</span>
                <span style={{ color: d.tag === "CATCH" ? AMBER : TEAL }}>[{d.tag}]</span>
                <span className="text-xs sm:text-sm" style={{ color: TEXT }}>{d.line}</span>
              </button>
            );
          })}
          {visibleLog.length === 0 && <div className="px-2 py-2" style={{ color: MUTED }}>no entries</div>}
        </div>
        {detail && (
          <div className="mt-3 rounded-xl border p-5 text-sm" style={{ borderColor: TEAL, background: BG, color: TEXT }}>
            <div className="font-mono text-xs" style={{ color: MUTED }}>{detail.ts} · {detail.domain} · {detail.tag}</div>
            <p className="mt-2 leading-relaxed">{detail.line}</p>
            <Link href={detail.href} className="mt-3 inline-block font-mono text-xs underline underline-offset-4" style={{ color: TEAL }}>
              open the evidence →
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
