import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { identity } from "@/data/content";
import { TerminalConsole } from "./terminal-console";

export const metadata: Metadata = {
  title: "Shipping Terminal (review variant) — Shamik Mukherjee",
  description: "Review variant of the homepage in the Shipping Terminal direction.",
  robots: { index: false, follow: false },
};

const BG = "#070b12";
const TEXT = "#e6edf6";
const MUTED = "#8b98a9";
const TEAL = "#19d3ae";
const AMBER = "#ffb547";
const LINE = "#1d2838";

export default function ShippingTerminalVariant() {
  return (
    <>
      <Nav />
      <main style={{ background: BG, color: TEXT }} className="min-h-screen">
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: LINE, background: "#0b1120" }}>
            <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: LINE }}>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs" style={{ color: MUTED }}>
                shamik — session
              </span>
            </div>
            <div className="space-y-3 p-6 font-mono text-sm leading-relaxed sm:p-8 sm:text-base">
              <div>
                <span style={{ color: TEAL }}>$</span> whoami
              </div>
              <div style={{ color: MUTED }}>
                {identity.name} — Product leader at the point where payments delivery meets AI engineering.
              </div>
              <div className="pt-2">
                <span style={{ color: TEAL }}>$</span> <Link href="#inspect" className="underline underline-offset-4">ship --recent</Link>
              </div>
              <div style={{ color: AMBER }}>
                ! caught: DSCR 0 → undefined, blocked before committee
              </div>
              <div className="pt-2">
                <span style={{ color: TEAL }}>$</span> _
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            I turn technically difficult systems into products that ship. Every line links to its evidence, and you can inspect any of them below.
          </p>
        </section>

        <section id="inspect" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-16 sm:px-8">
          <TerminalConsole />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-16 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            execution evidence
          </div>
          <div className="flex flex-wrap items-center gap-6 font-mono text-sm" style={{ color: TEXT }}>
            <span>
              <LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={87} /> PRs merged
            </span>
            <span>
              <LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={54} /> issues closed
            </span>
            <Link href="/approach" className="underline underline-offset-4" style={{ color: TEAL }}>
              how I work →
            </Link>
          </div>
          <p className="mt-4 max-w-2xl" style={{ color: MUTED }}>
            I don&apos;t just specify the system. I can enter it.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-xl border p-8" style={{ borderColor: LINE, background: "#0b1120" }}>
            <p className="text-2xl font-semibold leading-snug sm:text-3xl">Got a hard product problem?</p>
            <p className="mt-3 max-w-2xl" style={{ color: MUTED }}>
              Let&apos;s talk about the constraint, the trade-off, and what it takes to ship.
            </p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-6 inline-block rounded-md px-5 py-3 font-mono text-sm font-semibold"
              style={{ background: TEAL, color: BG }}
            >
              start a conversation →
            </a>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
