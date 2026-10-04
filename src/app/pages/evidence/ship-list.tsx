"use client";

import * as React from "react";
import Link from "next/link";
import { CASES, T, type Case } from "./data";

const FILTERS = ["ALL", "PAYMENTS", "AI"] as const;

const LIST_SUMMARY: Record<string, string> = {
  chrome: "275K+ requests · $900K settled · <5s SLA",
  wallet: "1st international issuer · push provisioning",
  opencam: "maker/checker · deterministic policy engine",
  "job-search": "0 PII exposed · 57+ commits direct-to-master",
};

function domainOf(c: Case) {
  return c.slug === "opencam" || c.slug === "job-search" ? "AI" : "PAYMENTS";
}

export function ShipList() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("ALL");
  const visible = CASES.filter((c) => filter === "ALL" || domainOf(c) === filter);
  const [active, setActive] = React.useState(0);
  const [openSlug, setOpenSlug] = React.useState<string | null>("chrome");
  const rowRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    setActive(0);
  }, [filter]);

  const onKey = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(visible.length - 1, idx + 1);
      setActive(next);
      rowRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(0, idx - 1);
      setActive(prev);
      rowRefs.current[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenSlug((s) => (s === visible[idx].slug ? null : visible[idx].slug));
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-xs" style={{ color: T.muted }}>
        <span>filter</span>
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className="rounded border px-2.5 py-1"
            style={{ borderColor: filter === f ? T.teal : T.border, color: filter === f ? T.teal : T.muted }}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto hidden sm:inline">↑ ↓ navigate · ENTER inspect</span>
      </div>
      <div role="listbox" aria-label="Recent shipments" className="rounded-xl border p-2 font-mono text-sm" style={{ borderColor: T.border, background: T.panel }}>
        {visible.map((c, idx) => {
          const isOpen = openSlug === c.slug;
          const isActive = active === idx;
          return (
            <div key={c.slug} className="mb-1 last:mb-0">
              <button
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                type="button"
                role="option"
                aria-selected={isActive}
                aria-expanded={isOpen}
                onFocus={() => setActive(idx)}
                onKeyDown={(e) => onKey(e, idx)}
                onClick={() => setOpenSlug(isOpen ? null : c.slug)}
                className="flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-3 py-2.5 text-left transition-colors focus:outline-none"
                style={{ background: isActive ? T.raised : "transparent" }}
              >
                <span style={{ color: T.teal }}>✓</span>
                <span style={{ color: T.text }}>{c.short}</span>
                <span className="text-xs sm:text-sm" style={{ color: T.muted }}>
                  — {LIST_SUMMARY[c.slug]}
                </span>
              </button>
              {isOpen && (
                <div className="ml-4 mt-1 space-y-2 border-l-2 py-3 pl-4" style={{ borderColor: T.teal }}>
                  <div className="text-xs" style={{ color: T.muted }}>$ inspect {c.short}</div>
                  <div className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-xs leading-relaxed sm:text-sm">
                    <span style={{ color: T.teal }}>CONSTRAINT</span>
                    <span style={{ color: T.text }}>{c.graph.constraint}</span>
                    <span style={{ color: T.teal }}>OBSERVED</span>
                    <span style={{ color: T.text }}>{c.graph.observed}</span>
                    <span style={{ color: T.amber }}>DECISION</span>
                    <span style={{ color: T.text }}>{c.graph.decision}</span>
                    <span style={{ color: T.teal }}>OUTCOME</span>
                    <span style={{ color: T.text }}>{c.graph.outcome}</span>
                  </div>
                  <Link href={`/pages/evidence/case/${c.slug}`} className="inline-block pt-2 text-xs underline underline-offset-4" style={{ color: T.teal }}>
                    open full case →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
        {visible.length === 0 && <div className="px-3 py-2" style={{ color: T.muted }}>nothing shipped in this domain</div>}
      </div>
    </div>
  );
}
