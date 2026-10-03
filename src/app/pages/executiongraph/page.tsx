import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { identity } from "@/data/content";

export const metadata: Metadata = {
  title: "Execution Graph (review variant) — Shamik Mukherjee",
  description: "Review variant of the homepage in the Execution Graph direction.",
  robots: { index: false, follow: false },
};

const ORANGE = "#ff4d00";
const INK = "#0a0a0a";
const PAPER = "#f2f0ea";

const receipts = [
  {
    value: "$900K",
    what: "settled in the first 45 days",
    source: "Chrome Virtual Card Autofill",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    value: "1st",
    what: "international issuer live on push provisioning",
    source: "Wallet Provisioning at Scale",
    href: "/case-studies/wallet-provisioning",
  },
  {
    value: "DSCR 0 → undefined",
    what: "a real correctness bug, caught before a credit committee",
    source: "OpenCAM Framework",
    href: "/case-studies/opencam",
  },
];

const traces = [
  {
    title: "Chrome — a 5-second SLA, a 7-8 second path",
    steps: [
      ["Context", "Google's retrieval flow had a hard 5-second latency limit."],
      ["Constraint", "The yellow path was running 7-8 seconds, inside a downstream fraud dependency."],
      ["Decision", "Surfaced the risk as input rather than deciding it myself — then built a mock fraud signal so delivery could keep moving."],
      ["Execution", "Chased the response time down inside Google's limit, and wrote the certification tests myself."],
      ["Outcome", "$900K settled in 45 days, against the SLA."],
    ],
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    title: "OpenCAM — the model narrates, code computes",
    steps: [
      ["Context", "Credit memos drafted by an LLM were fast, but no check stopped a wrong number reaching committee."],
      ["Constraint", "A model can narrate a figure. It must never be the thing that produces one."],
      ["Decision", "Covenants evaluated deterministically — PASS, FAIL or UNRESOLVABLE, never silently defaulted."],
      ["Execution", "Independent maker and checker agents, with the checker able only to downgrade a verdict."],
      ["Outcome", "A debt-free company's DSCR being computed as 0 was caught before it could reach committee."],
    ],
    href: "/case-studies/opencam",
  },
  {
    title: "Wallet provisioning — the migration nobody sees",
    steps: [
      ["Context", "A live card portfolio migration, with wallets that must not notice it."],
      ["Constraint", "Zero cardholder-facing disruption, across Google Pay and Samsung Pay."],
      ["Decision", "Validate that the migration is invisible to the wallet, before scale."],
      ["Execution", "Token cleanup on a live repersonalization, sequenced by release of value."],
      ["Outcome", "First international issuer live on push provisioning in 2025."],
    ],
    href: "/case-studies/wallet-provisioning",
  },
];

export default function ExecutionGraphVariant() {
  return (
    <>
      <Nav />
      <main style={{ background: PAPER, color: INK }} className="min-h-screen">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-8 sm:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>
            Execution graph · {identity.name}
          </p>
          <h1 className="mt-6 text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
            I like hard problems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            Product leadership at the point where ambiguity meets engineering: a payments platform with a hard latency
            limit, a credit process that cannot tolerate a wrong number, and a model that must never be the thing
            producing one.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {receipts.map((r) => (
              <Link
                key={r.what}
                href={r.href}
                className="group border-2 p-6 transition-colors hover:bg-[#0a0a0a] hover:text-[#f2f0ea]"
                style={{ borderColor: INK }}
              >
                <div className="text-3xl font-extrabold" style={{ color: ORANGE }}>
                  {r.value}
                </div>
                <div className="mt-2 text-sm">{r.what}</div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-wider opacity-70">
                  Evidence · {r.source} →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
            <span className="font-semibold">Live from the repo:</span>
            <span>
              <LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={87} /> PRs merged
            </span>
            <span>
              <LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={54} /> issues closed
            </span>
            <Link href="/approach" className="underline underline-offset-4">
              How I work →
            </Link>
          </div>
        </section>

        <section className="border-t-2 px-6 py-16 sm:px-8" style={{ borderColor: INK }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">The graph</h2>
            <p className="mt-3 max-w-2xl">
              Each path is a real piece of work. Click a node to trace the decisions behind it.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="border-2 p-6" style={{ borderColor: INK }}>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Payments</div>
                <div className="mt-4 space-y-3">
                  <Link href="/case-studies/google-chrome-autofill-virtual-card-number" className="block border-2 p-3 font-semibold hover:bg-[#0a0a0a] hover:text-[#f2f0ea]" style={{ borderColor: INK }}>
                    Chrome Virtual Card Autofill
                  </Link>
                  <Link href="/case-studies/wallet-provisioning" className="block border-2 p-3 font-semibold hover:bg-[#0a0a0a] hover:text-[#f2f0ea]" style={{ borderColor: INK }}>
                    Wallet Provisioning at Scale
                  </Link>
                </div>
              </div>
              <div className="border-2 p-6" style={{ borderColor: INK }}>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-70">AI engineering</div>
                <div className="mt-4 space-y-3">
                  <Link href="/case-studies/opencam" className="block border-2 p-3 font-semibold hover:bg-[#0a0a0a] hover:text-[#f2f0ea]" style={{ borderColor: INK }}>
                    OpenCAM — Maker-Checker Framework
                  </Link>
                  <Link href="/case-studies/job-search-automation" className="block border-2 p-3 font-semibold hover:bg-[#0a0a0a] hover:text-[#f2f0ea]" style={{ borderColor: INK }}>
                    AI Job Search Automation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-8" style={{ background: INK, color: PAPER }}>
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Trace the decision</h2>
            <p className="mt-3 max-w-2xl opacity-80">
              Context, constraint, decision, execution, outcome. The reasoning is the part I want you to see.
            </p>
            <div className="mt-12 space-y-14">
              {traces.map((t) => (
                <article key={t.title} className="grid gap-6 md:grid-cols-[1fr_2fr]">
                  <div>
                    <h3 className="text-2xl font-bold leading-tight">{t.title}</h3>
                    <Link href={t.href} className="mt-4 inline-block text-sm font-semibold" style={{ color: ORANGE }}>
                      Open the evidence →
                    </Link>
                  </div>
                  <ol className="space-y-4">
                    {t.steps.map(([label, text], i) => (
                      <li key={label} className="grid grid-cols-[3rem_1fr] gap-4 border-l-2 pl-4" style={{ borderColor: ORANGE }}>
                        <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: ORANGE }}>
                            {label}
                          </div>
                          <div className="mt-1 text-sm leading-relaxed opacity-90">{text}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              Product thinking, with engineering consequences.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${identity.email}`} className="px-6 py-3 font-semibold text-[#0a0a0a]" style={{ background: ORANGE }}>
                Talk to me
              </a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer" className="border-2 px-6 py-3 font-semibold" style={{ borderColor: INK }}>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
