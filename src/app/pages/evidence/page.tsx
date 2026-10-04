import type { Metadata } from "next";
import Link from "next/link";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { identity } from "@/data/content";
import { CASES, T, caseBySlug } from "./data";
import { ShipList } from "./ship-list";
import { EvidenceFooter, EvidenceHeader, Receipts } from "./shell";

export const metadata: Metadata = {
  title: "Evidence (review variant) — Shamik Mukherjee",
  description: "Review variant: the merged evidence-mode homepage.",
  robots: { index: false, follow: false },
};

// The decision archive is drawn from the case-study decisions themselves, so every row
// links back to the case it came from.
const archive = CASES.flatMap((c) =>
  c.decisions.map((d) => ({ when: c.meta.timeline, short: c.short, slug: c.slug, title: d.title })),
);

export default function EvidenceHome() {
  const chrome = caseBySlug("chrome")!;
  return (
    <div style={{ background: T.ink, color: T.text }} className="min-h-screen">
      <EvidenceHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-14 pt-14 sm:px-8 sm:pt-20">
          <div className="font-mono text-sm" style={{ color: T.muted }}>
            <span style={{ color: T.teal }}>$</span> whoami
          </div>
          <div className="mt-3 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>{identity.name}</div>
          <h1 className="mt-6 text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-7xl">I like hard problems.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: T.secondary }}>
            Product leadership at the point where ambiguity meets engineering.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs" style={{ color: T.muted }}>
            <span className="rounded border px-2 py-1" style={{ borderColor: T.border }}>DIGITAL PAYMENTS</span>
            <span className="rounded border px-2 py-1" style={{ borderColor: T.border }}>AI ENGINEERING</span>
            <span className="rounded border px-2 py-1" style={{ borderColor: T.border }}>TECHNICAL DELIVERY</span>
          </div>
          <a href="#ship" className="mt-8 inline-block font-mono text-sm underline underline-offset-4" style={{ color: T.teal }}>
            view what shipped ↓
          </a>
        </section>

        <section id="ship" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>what shipped</div>
          <ShipList />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>receipts · {chrome.short}</div>
          <Receipts items={chrome.receipts} />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>decision archive</div>
          <div className="divide-y rounded-lg border" style={{ borderColor: T.border, background: T.panel }}>
            {archive.map((a) => (
              <Link key={a.title} href={`/pages/evidence/case/${a.slug}`} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3 text-sm hover:bg-white/[0.03] sm:grid-cols-[9rem_10rem_1fr]" style={{ borderColor: T.border }}>
                <span className="font-mono text-xs" style={{ color: T.muted }}>{a.when}</span>
                <span className="hidden font-mono text-xs sm:inline" style={{ color: T.teal }}>{a.short}</span>
                <span style={{ color: T.text }}>{a.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>execution evidence</div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-sm" style={{ color: T.secondary }}>
            <span><LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={87} /> PRs merged</span>
            <span><LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={54} /> issues closed</span>
          </div>
          <p className="mt-4 max-w-2xl" style={{ color: T.muted }}>I don&apos;t just specify the system. I can enter it.</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-lg border p-8" style={{ borderColor: T.border, background: T.panel }}>
            <p className="text-2xl font-semibold leading-snug sm:text-3xl">Got a hard product problem?</p>
            <p className="mt-3 max-w-2xl" style={{ color: T.secondary }}>
              Let&apos;s talk about the constraint, the trade-off, and what it takes to ship.
            </p>
            <p className="mt-3 max-w-2xl text-sm" style={{ color: T.muted }}>
              Exploring Product Manager and Product Leadership roles where technical complexity, business impact and execution intersect.
            </p>
            <a href={`mailto:${identity.email}`} className="mt-6 inline-block rounded-md px-5 py-3 font-mono text-sm font-semibold" style={{ background: T.teal, color: T.ink }}>
              start a conversation →
            </a>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}
