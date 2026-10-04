import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASES, T, caseBySlug } from "../../data";
import { DecisionRecord, EvidenceFooter, EvidenceHeader, OwnershipStrip, Receipts } from "../../shell";
import { StageRail } from "../../stage-rail";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseBySlug(slug);
  return {
    title: c ? `${c.short} (review variant) — Shamik Mukherjee` : "Case study",
    robots: { index: false, follow: false },
  };
}

const PIPELINE = [
  { label: "LLM drafts the narrative", layer: "Probabilistic", color: T.blue },
  { label: "Structured proposal", layer: "Boundary", color: T.amber },
  { label: "Ratios computed from raw financials", layer: "Deterministic", color: T.teal },
  { label: "Covenants: PASS / FAIL / UNRESOLVABLE", layer: "Deterministic", color: T.teal },
  { label: "Independent checker audits; can only downgrade", layer: "Probabilistic", color: T.blue },
];

const FAULT_LINES = [
  { title: "Migration continuity", body: "A live card portfolio migration, with wallet tokens that must keep working through it." },
  { title: "One issuer's spec, generalized", body: "A specification written around a single issuer's conventions had to work for international issuers." },
  { title: "Legacy token tail", body: "Tokens that never migrated during a live repersonalization, cleaned up with Google over several months." },
];

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const prev = CASES[(idx - 1 + CASES.length) % CASES.length];
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <div style={{ background: T.ink, color: T.text }} className="min-h-screen">
      <EvidenceHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-12 sm:px-8 sm:pt-16">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>
            {String(idx + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")} · {c.category}
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{c.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: T.secondary }}>{c.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs">
            <Link
              href={c.mode === "Controlled Delivery" ? "/pages/evidence/approach#controlled" : "/pages/evidence/approach#lightweight"}
              className="rounded border px-2.5 py-1"
              style={{ borderColor: T.teal, color: T.teal }}
            >
              DELIVERY MODE · {c.mode.toUpperCase()} →
            </Link>
            <span style={{ color: T.muted }}>{c.meta.status}</span>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-12 sm:px-8">
          <Receipts items={c.receipts} />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-12 sm:px-8">
          <dl className="grid gap-4 border-y py-5 text-sm sm:grid-cols-3" style={{ borderColor: T.border }}>
            <div><dt className="font-mono text-[10px] uppercase tracking-widest" style={{ color: T.muted }}>role</dt><dd className="mt-1 leading-snug" style={{ color: T.secondary }}>{c.meta.role}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-widest" style={{ color: T.muted }}>timeline</dt><dd className="mt-1" style={{ color: T.secondary }}>{c.meta.timeline}</dd></div>
            <div><dt className="font-mono text-[10px] uppercase tracking-widest" style={{ color: T.muted }}>status</dt><dd className="mt-1" style={{ color: T.secondary }}>{c.meta.status}</dd></div>
          </dl>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>my scope</div>
          <OwnershipStrip ownership={c.ownership} />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>execution graph · click a stage</div>
          <StageRail graph={c.graph} />
        </section>

        {c.slug === "opencam" && (
          <>
            <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
              <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>the model narrates · code computes</div>
              <ol className="space-y-2">
                {PIPELINE.map((p, i) => (
                  <li key={p.label} className="flex items-center gap-4 rounded-md border px-4 py-3" style={{ borderColor: T.border, background: T.panel, borderLeft: `3px solid ${p.color}` }}>
                    <span className="font-mono text-xs" style={{ color: T.dim }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 text-sm" style={{ color: T.text }}>{p.label}</span>
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: p.color }}>{p.layer}</span>
                  </li>
                ))}
              </ol>
            </section>
            <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
              <div className="rounded-lg border p-6" style={{ borderColor: T.red, background: T.panel }}>
                <div className="font-mono text-xs font-semibold" style={{ color: T.red }}>! CORRECTNESS EVENT</div>
                <div className="mt-4 grid gap-4 sm:grid-cols-4">
                  <div><div className="font-mono text-[10px] uppercase" style={{ color: T.muted }}>DSCR computed</div><div className="mt-1 font-mono text-2xl" style={{ color: T.text }}>0</div></div>
                  <div><div className="font-mono text-[10px] uppercase" style={{ color: T.muted }}>expected</div><div className="mt-1 font-mono text-2xl" style={{ color: T.text }}>undefined</div></div>
                  <div><div className="font-mono text-[10px] uppercase" style={{ color: T.muted }}>action</div><div className="mt-1 font-mono text-2xl" style={{ color: T.red }}>blocked</div></div>
                  <div><div className="font-mono text-[10px] uppercase" style={{ color: T.muted }}>location</div><div className="mt-1 text-sm" style={{ color: T.text }}>before credit committee</div></div>
                </div>
                <p className="mt-5 text-sm leading-relaxed" style={{ color: T.secondary }}>
                  A debt-free company, scored as a covenant breach it doesn&apos;t have. Found in a codebase audit, not by an analyst.
                </p>
              </div>
            </section>
          </>
        )}

        {c.slug === "wallet" && (
          <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
            <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>fault lines</div>
            <div className="grid gap-3 md:grid-cols-3">
              {FAULT_LINES.map((f, i) => (
                <div key={f.title} className="rounded-lg border p-5" style={{ borderColor: T.border, background: T.panel }}>
                  <div className="font-mono text-[10px]" style={{ color: T.blue }}>FAULT LINE {String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-2 font-semibold" style={{ color: T.text }}>{f.title}</div>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: T.secondary }}>{f.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>decision records</div>
          <div className="grid gap-4 md:grid-cols-2">
            {c.decisions.map((d, i) => (
              <DecisionRecord key={d.title} d={d} n={i + 1} />
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>proof chain</div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs" style={{ color: T.secondary }}>
            {["claim", "case", "decision", "implementation", "test / audit", "outcome"].map((s, i, arr) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded border px-2.5 py-1" style={{ borderColor: T.border }}>{s}</span>
                {i < arr.length - 1 && <span style={{ color: T.dim }}>→</span>}
              </span>
            ))}
          </div>
          <a href={c.href} className="mt-6 inline-block font-mono text-xs underline underline-offset-4" style={{ color: T.teal }}>
            open the original long-form case study →
          </a>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="grid gap-3 border-t pt-8 sm:grid-cols-3" style={{ borderColor: T.border }}>
            <Link href={`/pages/evidence/case/${prev.slug}`} className="font-mono text-xs" style={{ color: T.secondary }}>← {prev.short}</Link>
            <Link href="/pages/evidence#ship" className="text-center font-mono text-xs" style={{ color: T.muted }}>all shipments</Link>
            <Link href={`/pages/evidence/case/${next.slug}`} className="text-right font-mono text-xs" style={{ color: T.secondary }}>{next.short} →</Link>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}
