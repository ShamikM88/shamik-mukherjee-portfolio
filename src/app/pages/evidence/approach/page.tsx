import type { Metadata } from "next";
import { governanceComparison } from "@/data/content";
import { T } from "../data";
import { EvidenceFooter, EvidenceHeader } from "../shell";

export const metadata: Metadata = {
  title: "How I work (review variant) — Shamik Mukherjee",
  robots: { index: false, follow: false },
};

const [controlled, lightweight] = governanceComparison.modes;

export default function ApproachVariant() {
  return (
    <div style={{ background: T.ink, color: T.text }} className="min-h-screen">
      <EvidenceHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>how I work</div>
          <h1 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">Same discipline. Different weight.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: T.secondary }}>
            Consequence sets the minimum control level. The process changes; the standard doesn&apos;t.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>
            {governanceComparison.decisionQuestions.heading.toLowerCase()}
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {governanceComparison.decisionQuestions.items.map((q, i) => (
              <div key={q.question} className="rounded-lg border p-5" style={{ borderColor: T.border, background: T.panel }}>
                <div className="font-mono text-[10px]" style={{ color: T.amber }}>0{i + 1}</div>
                <div className="mt-2 font-semibold leading-snug" style={{ color: T.text }}>{q.question}</div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: T.secondary }}>{q.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>two modes</div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { m: controlled, id: "controlled", color: T.teal, cases: "Chrome · Wallet · OpenCAM" },
              { m: lightweight, id: "lightweight", color: T.blue, cases: "AI Job Search" },
            ].map(({ m, id, color, cases }) => (
              <article key={id} id={id} className="scroll-mt-24 rounded-lg border p-6" style={{ borderColor: color, background: T.panel }}>
                <div className="font-mono text-xs" style={{ color }}>{m.label.toUpperCase()}</div>
                <h2 className="mt-2 text-2xl font-semibold leading-snug" style={{ color: T.text }}>{m.title}</h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: T.secondary }}>{m.description}</p>
                <dl className="mt-5 space-y-2.5">
                  {m.dimensions.map((d) => (
                    <div key={d.label} className="grid grid-cols-[8.5rem_1fr] gap-3 border-t pt-2.5 text-sm" style={{ borderColor: T.border }}>
                      <dt className="font-mono text-[11px] uppercase" style={{ color: T.muted }}>{d.label}</dt>
                      <dd style={{ color: T.text }}>{d.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 font-mono text-[11px]" style={{ color: T.dim }}>applies to: {cases}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-lg border p-8" style={{ borderColor: T.border, background: T.panel }}>
            <p className="text-xl font-semibold leading-snug sm:text-2xl">The process changes. The standard doesn&apos;t.</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: T.muted }}>
              Observe, decide, ship, verify, codify. Both modes do all five. They differ only in how much ceremony sits between them.
            </p>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}
