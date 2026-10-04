import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { identity } from "@/data/content";
import { GraphExplorer } from "./graph-explorer";

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

export default function ExecutionGraphVariant() {
  return (
    <>
      <Nav />
      <main style={{ background: PAPER, color: INK }} className="min-h-screen">
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:px-8 sm:pt-24">
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
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16 sm:px-8">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Select a system to explore</div>
          <div className="mt-4">
            <GraphExplorer />
          </div>
        </section>

        <section className="border-t-2 px-6 py-16 sm:px-8" style={{ borderColor: INK }}>
          <div className="mx-auto max-w-6xl">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-70">Execution evidence</div>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
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
          </div>
        </section>

        <section className="px-6 py-20 sm:px-8" style={{ background: INK, color: PAPER }}>
          <div className="mx-auto max-w-6xl">
            <p className="text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
              Got a hard product problem?
            </p>
            <p className="mt-4 max-w-2xl opacity-80">
              Let&apos;s talk about the system, the constraint, and what it takes to ship it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={`mailto:${identity.email}`} className="px-6 py-3 font-semibold text-[#0a0a0a]" style={{ background: ORANGE }}>
                Start a conversation →
              </a>
              <a href={identity.linkedin} target="_blank" rel="noreferrer" className="border-2 px-6 py-3 font-semibold" style={{ borderColor: PAPER }}>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
