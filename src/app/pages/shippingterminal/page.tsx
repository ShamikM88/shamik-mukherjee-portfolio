import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { identity } from "@/data/content";

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

const ledger = [
  {
    value: "275K+",
    label: "successful autofill requests in 60 days",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
    source: "chrome-autofill",
  },
  {
    value: "$900K",
    label: "settled in the first 45 days",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
    source: "chrome-autofill",
  },
  {
    value: "<5s",
    label: "Google's latency SLA, delivered against",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
    source: "chrome-autofill",
  },
  {
    value: "1st",
    label: "international issuer live on push provisioning",
    href: "/case-studies/wallet-provisioning",
    source: "wallet-provisioning",
  },
];

const decisionLog = [
  {
    ts: "2024-11",
    tag: "DECIDE",
    line: "Built a mock fraud signal to keep delivery moving while a downstream dependency was unresolved.",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    ts: "2024-11",
    tag: "DECIDE",
    line: "Chased a 7-8s response time down inside Google's 5s limit. Wrote the certification tests myself.",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    ts: "2026-09",
    tag: "DECIDE",
    line: "Let the model narrate; let the code compute. Covenants evaluated deterministically, never silently defaulted.",
    href: "/case-studies/opencam",
  },
  {
    ts: "2026-09",
    tag: "CATCH",
    line: "debt-free company DSCR computed as 0 instead of undefined — caught before it could reach committee.",
    href: "/case-studies/opencam",
  },
];

function Term({ children }: { children: React.ReactNode }) {
  return <span className="font-mono">{children}</span>;
}

export default function ShippingTerminalVariant() {
  return (
    <>
      <Nav />
      <main style={{ background: BG, color: TEXT }} className="min-h-screen">
        <section className="mx-auto max-w-5xl px-6 pb-14 pt-14 sm:px-8 sm:pt-20">
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
                <span style={{ color: TEAL }}>$</span> <Term>whoami</Term>
              </div>
              <div style={{ color: MUTED }}>
                {identity.name} — Product leader at the point where payments delivery meets AI engineering.
              </div>
              <div className="pt-2">
                <span style={{ color: TEAL }}>$</span> <Term>ship --recent</Term>
              </div>
              <div>
                <span style={{ color: TEAL }}>✓</span>{" "}
                <Link href="/case-studies/google-chrome-autofill-virtual-card-number" className="underline underline-offset-4">
                  chrome-virtual-card-autofill
                </Link>{" "}
                <span style={{ color: MUTED }}>— 275K+ requests, $900K settled, inside a &lt;5s SLA</span>
              </div>
              <div>
                <span style={{ color: TEAL }}>✓</span>{" "}
                <Link href="/case-studies/wallet-provisioning" className="underline underline-offset-4">
                  wallet-provisioning
                </Link>{" "}
                <span style={{ color: MUTED }}>— 1st international issuer live on push provisioning</span>
              </div>
              <div>
                <span style={{ color: TEAL }}>✓</span>{" "}
                <Link href="/case-studies/opencam" className="underline underline-offset-4">
                  opencam
                </Link>{" "}
                <span style={{ color: MUTED }}>— maker/checker gate, deterministic policy engine</span>
              </div>
              <div>
                <span style={{ color: AMBER }}>!</span>{" "}
                <span style={{ color: AMBER }}>
                  caught: DSCR 0 → undefined, blocked before committee
                </span>
              </div>
              <div className="pt-2">
                <span style={{ color: TEAL }}>$</span> <Term>_</Term>
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed">
            I turn technically difficult systems into products that ship. Every line above links to its evidence.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            receipts
          </div>
          <div className="divide-y" style={{ borderColor: LINE }}>
            {ledger.map((row) => (
              <Link
                key={row.label}
                href={row.href}
                className="grid grid-cols-[7rem_1fr_auto] items-baseline gap-4 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[10rem_1fr_auto]"
              >
                <span className="font-mono text-3xl font-semibold" style={{ color: TEAL }}>
                  {row.value}
                </span>
                <span className="text-base" style={{ color: TEXT }}>
                  {row.label}
                </span>
                <span className="font-mono text-xs" style={{ color: MUTED }}>
                  {row.source} →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-6 font-mono text-sm" style={{ color: MUTED }}>
            <span>
              <LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={87} /> PRs merged
            </span>
            <span>
              <LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={54} /> issues closed
            </span>
            <Link href="/approach" className="underline underline-offset-4">
              how I work
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            decision log
          </div>
          <div className="space-y-2 rounded-xl border p-5 font-mono text-sm" style={{ borderColor: LINE, background: "#0b1120" }}>
            {decisionLog.map((d) => (
              <Link key={d.line} href={d.href} className="grid grid-cols-[5.5rem_4.5rem_1fr] gap-3 rounded px-2 py-2 hover:bg-white/[0.03]">
                <span style={{ color: MUTED }}>{d.ts}</span>
                <span style={{ color: d.tag === "CATCH" ? AMBER : TEAL }}>[{d.tag}]</span>
                <span style={{ color: TEXT }}>{d.line}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
          <div className="font-mono text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            next
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link href="/#work" className="rounded-md px-5 py-3 font-semibold text-[#070b12]" style={{ background: TEAL }}>
              open the case studies
            </Link>
            <a href={`mailto:${identity.email}`} className="rounded-md border px-5 py-3 font-semibold" style={{ borderColor: LINE }}>
              talk to me
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
