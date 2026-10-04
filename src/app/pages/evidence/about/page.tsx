import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/data/content";
import { T } from "../data";
import { EvidenceFooter, EvidenceHeader } from "../shell";

export const metadata: Metadata = {
  title: "About (review variant) — Shamik Mukherjee",
  robots: { index: false, follow: false },
};

const LENSES = ["Systems", "Value", "Commercial", "Delivery", "Autonomy"];

export default function AboutVariant() {
  return (
    <div style={{ background: T.ink, color: T.text }} className="min-h-screen">
      <EvidenceHeader />
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>about</div>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">I learned product from the inside of the system.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: T.secondary }}>{about.headline}</p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>the lenses</div>
          <div className="grid gap-3 md:grid-cols-5">
            {LENSES.map((l, i) => (
              <div key={l} className="rounded-lg border p-4" style={{ borderColor: T.border, background: T.panel }}>
                <div className="font-mono text-[10px]" style={{ color: T.amber }}>0{i + 1}</div>
                <div className="mt-2 font-mono text-sm font-semibold uppercase" style={{ color: T.text }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-14 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: T.muted }}>each role added a lens</div>
          <div className="space-y-3">
            {about.progression.items.map((item, i) => (
              <div key={item.title} className="grid gap-4 rounded-lg border p-5 md:grid-cols-[12rem_1fr]" style={{ borderColor: T.border, background: T.panel }}>
                <div>
                  <div className="font-mono text-[10px]" style={{ color: T.teal }}>{String(i + 1).padStart(2, "0")} · {LENSES[i]}</div>
                  <div className="mt-1 font-semibold leading-snug" style={{ color: T.text }}>{item.title}</div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: T.secondary }}>{item.body}</p>
              </div>
            ))}
            <div className="grid gap-4 rounded-lg border p-5 md:grid-cols-[12rem_1fr]" style={{ borderColor: T.border, background: T.panel }}>
              <div>
                <div className="font-mono text-[10px]" style={{ color: T.teal }}>05 · AUTONOMY</div>
                <div className="mt-1 font-semibold leading-snug" style={{ color: T.text }}>Building AI systems that have to be correct</div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: T.secondary }}>
                I direct AI to build governed systems solo. The clearest example is OpenCAM, where deterministic code computes every figure and independent agents audit the narrative.{" "}
                <Link href="/pages/evidence/case/opencam" className="underline underline-offset-4" style={{ color: T.teal }}>
                  see the evidence →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-lg border p-8" style={{ borderColor: T.border, background: T.panel }}>
            <div className="font-mono text-xs" style={{ color: T.muted }}>the thread</div>
            <p className="mt-3 text-2xl font-semibold leading-snug">Making complexity executable.</p>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}
