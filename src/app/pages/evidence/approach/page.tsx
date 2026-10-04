import type { Metadata } from "next";
import Link from "next/link";
import { governanceComparison } from "@/data/content";
import { EvidenceNav } from "@/app/pages/evidence/evidence-chrome";
import { EvidenceFooter } from "@/app/pages/evidence/evidence-chrome";
import { CARD, EYEBROW, H2, SECTION } from "../golden/template";
import { LiveGapAnalysisCount } from "@/components/live-github-stat";

export const metadata: Metadata = {
  title: "How I work — Shamik Mukherjee",
  description: "How I decide how much process a piece of work needs: controlled and lightweight delivery, and the proof behind each.",
  robots: { index: false, follow: false },
};

const { heroStats, modes, decisionQuestions, proof, closing } = governanceComparison;
// "Target audience" describes OpenCAM's go-to-market, not how I operate, so it stays on the case.
const [rawControlled, rawLightweight] = modes;
// The issue count is stated once, here: 33 is the live total across all gap-analysis audits, and
// 19 is the first (original) OpenCAM audit. Both are kept so the number cannot be misread.
const clarify = (d: { label: string; value: string }) =>
  d.label === "Issue Tracking" ? { ...d, value: "33 surfaced across gap-analysis audits; 19 in the original OpenCAM audit" } : d;
const controlled = {
  ...rawControlled,
  dimensions: rawControlled.dimensions.filter((d) => d.label !== "Target Audience").map(clarify),
};
const lightweight = { ...rawLightweight, dimensions: rawLightweight.dimensions.filter((d) => d.label !== "Target Audience") };

// Each mode applies to these cases. Links go to the golden case pages inside the evidence hierarchy.
const APPLIES_TO = {
  controlled: [
    { label: "Chrome", href: "/pages/evidence/case/chrome" },
    { label: "Wallet", href: "/pages/evidence/case/wallet" },
    { label: "OpenCAM", href: "/pages/evidence/case/opencam" },
  ],
  lightweight: [{ label: "AI Job Search", href: "/pages/evidence/case/job-search" }],
};

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-ice-100 text-ink-900">
      <EvidenceNav />
      <main>
        {/* Hero: the principle, with the three figures that carry it */}
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <p className="font-mono text-xs tracking-wider text-brand-600">how I work</p>
          <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink-900 sm:text-6xl">
            Same discipline. Different weight.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            Consequence sets the minimum control level. The process changes; the standard doesn&apos;t.
          </p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div key={s.label} className={CARD}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold text-brand-600">
                  {/* Live total across all gap-analysis audits (the first audit was 19); fallback is the last known count. */}
                  {s.label.startsWith("Issues") ? <LiveGapAnalysisCount repo="ShamikM88/open-cam-framework" fallback={33} /> : s.value}
                </dd>
                <dd className="mt-2 text-sm leading-snug text-ink-700">{s.label}</dd>
                <dd className="mt-1 font-mono text-[11px] text-ink-500">{s.sublabel}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The decision: a continuum from low to high consequence */}
        <section className={SECTION}>
          <p className={EYEBROW}>the first question</p>
          <h2 className={H2}>What happens if this is wrong?</h2>
          <div className="mt-8">
            <div className="relative h-2 rounded-full bg-gradient-to-r from-brand-100 via-brand-300 to-brand-600" aria-hidden />
            <div className="mt-3 flex justify-between font-mono text-[11px] text-ink-500">
              <span>low consequence</span>
              <span>high consequence</span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="text-sm leading-relaxed text-ink-600">
                <span className="font-semibold text-ink-900">Lightweight delivery</span> sits at the low end: bounded, reversible,
                personal-scale work.
              </div>
              <div className="text-sm leading-relaxed text-ink-600 sm:text-right">
                <span className="font-semibold text-ink-900">Controlled delivery</span> sits at the high end: regulated, shared or
                irreversible work.
              </div>
            </div>
          </div>
        </section>

        {/* The two modes, side by side */}
        <section className={SECTION}>
          <p className={EYEBROW}>two modes</p>
          <h2 className={H2}>Same standard, two levels of process</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              { m: controlled, id: "controlled", applies: APPLIES_TO.controlled, accent: "border-brand-500" },
              { m: lightweight, id: "lightweight", applies: APPLIES_TO.lightweight, accent: "border-ice-200" },
            ].map(({ m, id, applies, accent }) => (
              <article key={id} id={id} className={`scroll-mt-28 rounded-2xl border-2 bg-ice-50 p-6 sm:p-8 ${accent}`}>
                <p className="font-mono text-xs text-brand-600">{m.label.toUpperCase()}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-ink-900">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{m.description}</p>
                <dl className="mt-6 space-y-3">
                  {m.dimensions.map((d) => (
                    <div key={d.label} className="grid grid-cols-[8.5rem_1fr] gap-3 border-t border-ice-200 pt-3 text-sm">
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">{d.label}</dt>
                      <dd className="text-ink-800">{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-xs text-ink-500">
                  Applies to{" "}
                  {applies.map((a, i) => (
                    <span key={a.href}>
                      {i > 0 && " · "}
                      <Link href={a.href} className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700">
                        {a.label}
                      </Link>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* How the mode changes, dimension by dimension, using the same rows as the two modes */}
        <section className={SECTION}>
          <p className={EYEBROW}>how the mode changes</p>
          <h2 className={H2}>The same questions, answered for each mode</h2>
          <div className="mt-8 overflow-hidden rounded-2xl border border-ice-200 bg-ice-50">
            <div className="grid grid-cols-[7rem_1fr_1fr] gap-x-4 border-b border-ice-200 bg-white px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-ink-500 sm:grid-cols-[9rem_1fr_1fr] sm:px-6">
              <span />
              <span className="text-ink-700">Lightweight · job search</span>
              <span className="text-brand-700">Controlled · OpenCAM</span>
            </div>
            {controlled.dimensions.map((d, i) => (
              <div
                key={d.label}
                className="grid grid-cols-[7rem_1fr_1fr] gap-x-4 border-b border-ice-200 px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[9rem_1fr_1fr] sm:px-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">{d.label}</span>
                <span className="text-ink-700">{lightweight.dimensions[i].value}</span>
                <span className="text-ink-900">{d.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Proof in practice: the two stories, restored from the source and linked into the evidence cases */}
        <section className={SECTION}>
          <p className={EYEBROW}>the evidence</p>
          <h2 className={H2}>Proof in practice</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {proof.items.map((p) => (
              <article key={p.title} className={CARD}>
                <p className="font-mono text-[11px] text-ember-600">{p.badge}</p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{p.body}</p>
                <Link
                  href={p.badge.includes("OpenCAM") ? "/pages/evidence/case/opencam" : "/pages/evidence/case/job-search"}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  {p.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* The three questions, which stay the spine of the page */}
        <section className={SECTION}>
          <p className={EYEBROW}>{decisionQuestions.heading.toLowerCase()}</p>
          <h2 className={H2}>The three questions I ask first</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {decisionQuestions.items.map((q, i) => (
              <div key={q.question} className={CARD}>
                <p className="font-mono text-[11px] text-ember-600">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink-900">{q.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-2xl border border-brand-200 bg-ice-50 p-8 sm:p-10">
            <p className="font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
              The process changes. The standard doesn&apos;t.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{closing}</p>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}
