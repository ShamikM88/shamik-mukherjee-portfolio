import type { Metadata } from "next";
import Link from "next/link";
import { LiveMergedPRCount, LiveClosedIssueCount } from "@/components/live-github-stat";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { identity } from "@/data/content";
import { CASES, caseBySlug, type Case } from "./data";

export const metadata: Metadata = {
  title: "Evidence (review variant) — Shamik Mukherjee",
  description: "Review variant: the evidence home for product leadership, payments and AI delivery.",
  robots: { index: false, follow: false },
};

// Light world, same tokens as the Chrome golden case. Dark is reserved for the execution
// evidence band at the end of the page.
const EYEBROW = "text-xs font-semibold uppercase tracking-wider text-brand-600";
const H2 = "mt-2 font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl";
const CARD = "rounded-2xl border border-ice-200 bg-ice-50 p-5 sm:p-6";
const SECTION = "mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-16";

// Grouped by how the work was done, so a recruiter never reads solo projects as employer work.
const AT_WORK = ["chrome", "wallet"];
const SOLO_LAB = ["opencam", "job-search"];

const bySlug = (slugs: string[]) => slugs.map((s) => caseBySlug(s)!);

// The decision archive is drawn from the case-study decisions themselves, so every row links
// back to its case. Trade-off text is deliberately not shown on public pages.
const archive = CASES.flatMap((c) => c.decisions.map((d) => ({ slug: c.slug, short: c.short, title: d.title, result: d.result })));

function ShipCard({ c, index }: { c: Case; index: number }) {
  const lead = c.receipts.slice(0, 2);
  return (
    <article className={`${CARD} flex flex-col`}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-ember-600">{String(index + 1).padStart(2, "0")} · {c.mode.toUpperCase()}</span>
        <span className="font-mono text-[11px] text-ink-500">{c.meta.timeline}</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-ink-900">{c.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.category}</p>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ice-200 pt-5">
        {lead.map((r) => (
          <div key={r.label}>
            <dt className="sr-only">{r.label}</dt>
            <dd className="font-display text-2xl font-semibold text-brand-600">{r.value}</dd>
            <dd className="mt-1 text-xs leading-snug text-ink-600">{r.label}</dd>
            {r.note && <dd className="mt-1 font-mono text-[10px] text-ink-500">{r.note}</dd>}
          </div>
        ))}
      </dl>

      <details className="group mt-5 rounded-lg border border-ice-200 bg-white p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-xs font-semibold text-brand-700 [&::-webkit-details-marker]:hidden">
          Inspect
          <span aria-hidden className="text-base leading-none transition-transform group-open:rotate-45">+</span>
        </summary>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">Constraint</dt>
            <dd className="mt-0.5 text-ink-600">{c.graph.constraint}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">Decision</dt>
            <dd className="mt-0.5 text-ink-600">{c.graph.decision}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">Outcome</dt>
            <dd className="mt-0.5 text-ink-600">{c.graph.outcome}</dd>
          </div>
        </dl>
      </details>

      <Link
        href={`/pages/evidence/case/${c.slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        Open case study →
      </Link>
    </article>
  );
}

export default function EvidenceHome() {
  const cases = bySlug([...AT_WORK, ...SOLO_LAB]);
  const atWork = cases.filter((c) => AT_WORK.includes(c.slug));
  const solo = cases.filter((c) => SOLO_LAB.includes(c.slug));

  return (
    <div className="min-h-screen bg-ice-100 text-ink-900">
      <Nav />
      <main>
        {/* 10-second layer */}
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <p className="font-mono text-xs tracking-wider text-brand-600">Product leadership · Payments · AI</p>
          <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink-900 sm:text-7xl">
            I like hard problems.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            Product leadership at the point where business ambiguity meets engineering reality.
          </p>
          <p className="mt-4 text-sm font-medium text-ink-500">Digital Payments · AI Engineering · Technical Delivery</p>
          <a
            href="#ship"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
          >
            View the evidence →
          </a>
        </section>

        {/* Profile capsule: the context the original homepage carried, in one block */}
        <section className={SECTION}>
          <p className={EYEBROW}>$ profile --brief</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Current", "Product Owner · Digital Payments"],
              ["Current scope", "Google Pay · Samsung Pay · card migration"],
              ["Background", "Engineering · MBA (IIT Bombay) · Pre-sales · Delivery"],
              ["AI lab", "Multi-agent AI · governed systems · Claude Code"],
            ].map(([k, v]) => (
              <div key={k} className={CARD}>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">{k}</dt>
                <dd className="mt-2 font-display text-base font-semibold leading-snug text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 60-second layer: what shipped, grouped by context */}
        <section id="ship" className={`${SECTION} scroll-mt-24`}>
          <p className={EYEBROW}>$ ship --recent</p>
          <h2 className={H2}>What shipped</h2>

          <div className="mt-8">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-500">At work · production delivery</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {atWork.map((c, i) => (
                <ShipCard key={c.slug} c={c} index={i} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-500">Solo AI lab · directed through Claude Code</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {solo.map((c, i) => (
                <ShipCard key={c.slug} c={c} index={atWork.length + i} />
              ))}
            </div>
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>Decision archive</p>
          <h2 className={H2}>Product judgement, case by case</h2>
          <div className="mt-6 divide-y divide-ice-200 overflow-hidden rounded-2xl border border-ice-200 bg-ice-50">
            {archive.map((a) => (
              <Link
                key={a.title}
                href={`/pages/evidence/case/${a.slug}`}
                className="grid gap-2 px-5 py-4 transition-colors hover:bg-white sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <span className="font-mono text-xs text-brand-600">{a.short}</span>
                <span>
                  <span className="block font-medium text-ink-900">{a.title}</span>
                  <span className="mt-1 block text-sm text-ink-600">{a.result}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Dark: the one place the page enters the system */}
        <div className="bg-ink-950 text-white">
          <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            <p className="font-mono text-xs tracking-wider text-brand-400">execution evidence</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              I don&apos;t just specify the system. I can enter it.
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="font-display text-2xl font-semibold text-brand-400 sm:text-3xl">
                  <LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={87} />
                </div>
                <div className="mt-2 font-mono text-[10px] text-ink-500">scope: OpenCAM repo</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="font-display text-2xl font-semibold text-brand-400 sm:text-3xl">
                  <LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={54} />
                </div>
                <div className="mt-2 font-mono text-[10px] text-ink-500">scope: OpenCAM repo</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="font-display text-2xl font-semibold text-brand-400 sm:text-3xl">439+ passing tests</div>
                <div className="mt-2 font-mono text-[10px] text-ink-500">scope: OpenCAM</div>
              </div>
            </div>
          </section>
        </div>

        <section className={`${SECTION} pb-20`}>
          <div className={`${CARD} p-8 sm:p-10`}>
            <p className="font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
              Got a hard product problem?
            </p>
            <p className="mt-3 max-w-2xl text-ink-600">
              Let&apos;s talk about the constraint, the trade-off, and what it takes to ship.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-ink-500">
              Exploring Product Manager and Product Leadership roles where technical complexity, business impact and execution intersect.
            </p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              Start a conversation →
            </a>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </div>
  );
}
