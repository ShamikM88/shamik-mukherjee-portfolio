import type { Metadata } from "next";
import Link from "next/link";
import { chromeAutofill } from "@/data/content";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyToc } from "@/components/case-study-toc";
import { ChromeAutofillBanner } from "@/components/project-thumbnails";
import { ProcessRail } from "./process-rail";
import { ProofBand, TechnicalEvidenceBand } from "./dark-bands";
import {
  chromeDecisions,
  chromeOwnership,
  chromeReceipts,
  chromeStages,
  chromeSubtitle,
} from "./chrome-content";

export const metadata: Metadata = {
  title: "Chrome Virtual Card Autofill (review variant) — Shamik Mukherjee",
  robots: { index: false, follow: false },
};

// Light-world section label. Eyebrows that are uppercase + brand-600 are picked up by the
// existing CaseStudyToc section navigator, so every light section keeps this shape.
const EYEBROW = "text-xs font-semibold uppercase tracking-wider text-brand-600";
const H2 = "mt-2 font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl";
const CARD = "rounded-2xl border border-ice-200 bg-ice-50 p-5 sm:p-6";
const SECTION = "mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-16";

const { problem, scope, features, process, outcomes, visuals, decisions, meta } = chromeAutofill;

export default function ChromeGoldenCase() {
  return (
    <div className="min-h-screen bg-ice-100 text-ink-900">
      <Nav />
      <CaseStudyToc />
      <main>
        {/* 10-second layer: what it was, what it did, what it cost to deliver */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
            <Link href="/pages/evidence" className="hover:text-ink-900">Evidence</Link>
            <span aria-hidden>/</span>
            <span>01 of 04</span>
          </div>

          <p className="mt-8 font-mono text-xs tracking-wider text-brand-600">Digital payments · API integration</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl">
            Virtual Card Autofill for Google Chrome
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-600">{chromeSubtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            <Link
              href="/pages/evidence/approach#controlled"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-brand-50 px-3 py-1.5 text-brand-700 hover:border-brand-500"
            >
              {meta.status.includes("Live") ? "● " : ""}Controlled Delivery →
            </Link>
            <span className="inline-flex items-center rounded-lg border border-ice-200 bg-ice-50 px-3 py-1.5 text-ink-600">
              {meta.timeline}
            </span>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-4">
            {chromeReceipts.map((r) => (
              <div key={r.label} className={`${CARD} flex flex-col justify-between`}>
                <div>
                  <div className="font-display text-3xl font-semibold text-brand-600">{r.value}</div>
                  <div className="mt-2 text-sm leading-snug text-ink-600">{r.label}</div>
                </div>
                {r.note && <div className="mt-4 font-mono text-[11px] text-ink-500">{r.note}</div>}
              </div>
            ))}
          </div>

          <dl className="mt-6 grid gap-4 border-y border-ice-200 py-5 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">role</dt>
              <dd className="mt-1 leading-snug text-ink-700">{meta.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">timeline</dt>
              <dd className="mt-1 text-ink-700">{meta.timeline}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">status</dt>
              <dd className="mt-1 text-ink-700">{meta.status}</dd>
            </div>
          </dl>

          <div className="mt-10 overflow-hidden rounded-2xl border border-ice-200 bg-ice-50">
            <ChromeAutofillBanner />
          </div>
        </section>

        {/* 60-second layer: ownership, then the execution graph */}
        <section className={SECTION}>
          <p className={EYEBROW}>My scope</p>
          <h2 className={H2}>What I owned, what I shared, what I did not touch</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { label: "Owned", mark: "●", tone: "text-brand-600", items: chromeOwnership.owned },
              { label: "Shared", mark: "○", tone: "text-blue-600", items: chromeOwnership.shared },
              { label: "Out of scope", mark: "—", tone: "text-ink-500", items: chromeOwnership.outOfScope },
            ].map((c) => (
              <div key={c.label} className={CARD}>
                <div className={`font-mono text-xs font-semibold ${c.tone}`}>
                  {c.mark} {c.label.toUpperCase()}
                </div>
                <ul className="mt-4 space-y-2.5 text-sm leading-snug text-ink-600">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>Execution graph · click a stage</p>
          <h2 className={H2}>From the network&apos;s problem to a live, certified path</h2>
          <div className="mt-8">
            <ProcessRail stages={chromeStages} />
          </div>
        </section>

        {/* Full deep dive: the original long-form material, recomposed in the new structure */}
        <section className={SECTION}>
          <p className={EYEBROW}>{problem.heading}</p>
          <h2 className={H2}>Why this integration was hard to deliver</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
            {problem.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p>
              <a
                href={chromeAutofill.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700"
              >
                Google&apos;s Virtual Cards v1 documentation →
              </a>
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {problem.frictionBullets.map((b) => (
              <div key={b} className={`${CARD} text-sm leading-relaxed text-ink-600`}>
                {b}
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>{scope.heading.split(":")[0]}</p>
          <h2 className={H2}>My scope in detail</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {scope.lanes.map((lane) => (
              <div key={lane.label} className={CARD}>
                <div className="font-display text-base font-semibold text-ink-900">{lane.label}</div>
                <div className="mt-0.5 font-mono text-[11px] text-ink-500">{lane.sublabel}</div>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-600">
                  {lane.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>{features.heading}</p>
          <h2 className={H2}>Two engineering problems under one flow</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {features.items.map((f) => (
              <div key={f.title} className={CARD}>
                <div className="font-mono text-xs text-brand-600">{f.letter}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>{process.heading}</p>
          <h2 className={H2}>Four practices that carried it</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {process.steps.map((s, i) => (
              <li key={s.title} className={`${CARD} flex gap-4`}>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-semibold text-brand-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-snug text-ink-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Decision records: collapsed as scannable cards, expanded for the full reasoning */}
        <section className={SECTION}>
          <p className={EYEBROW}>Decision records</p>
          <h2 className={H2}>{decisions.heading}</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {chromeDecisions.map((d, i) => (
              <details
                key={d.title}
                className="group rounded-2xl border border-ice-200 bg-ice-50 p-5 transition-shadow open:shadow-card-hover sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <div>
                    <p className="font-mono text-xs text-ember-600">DECISION {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink-900 sm:text-lg">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{d.result}</p>
                  </div>
                  <span aria-hidden className="mt-0.5 text-2xl leading-none text-brand-600 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <dl className="mt-5 space-y-4 border-t border-ice-200 pt-5 text-sm leading-relaxed">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-brand-600">Problem</dt>
                    <dd className="mt-1 text-ink-600">{d.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-brand-600">Decision</dt>
                    <dd className="mt-1 text-ink-600">{d.decision}</dd>
                  </div>
                  {d.why && (
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-brand-600">Why</dt>
                      <dd className="mt-1 text-ink-600">{d.why}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-brand-600">Result</dt>
                    <dd className="mt-1 text-ink-600">{d.result}</dd>
                  </div>
                  {d.notMine && (
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">Not mine</dt>
                      <dd className="mt-1 text-ink-500">{d.notMine}</dd>
                    </div>
                  )}
                </dl>

                <details className="mt-5 rounded-lg border border-ice-200 bg-white p-4 text-sm">
                  <summary className="cursor-pointer font-medium text-brand-700">Full account from the case study</summary>
                  <p className="mt-3 leading-relaxed text-ink-600">{decisions.items[d.fullAccount].body}</p>
                </details>
              </details>
            ))}
          </div>
        </section>

        {/* Technical evidence: the one dark environment for system detail */}
        <TechnicalEvidenceBand />

        <section className={SECTION}>
          <p className={EYEBROW}>{outcomes.heading}</p>
          <h2 className={H2}>What it delivered</h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-ink-600">
            {outcomes.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <ProofBand />

        <section className={SECTION}>
          <p className={EYEBROW}>{visuals.heading}</p>
          <h2 className={H2}>Artefacts from the integration and the launch</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {visuals.items.map((v) => (
              <figure key={v.src} className={`${CARD} flex flex-col gap-4`}>
                <div className="overflow-hidden rounded-lg border border-ice-200 bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.src} alt={v.alt} loading="lazy" className="h-auto w-full" />
                </div>
                <figcaption className="text-sm leading-relaxed text-ink-600">
                  {v.caption}{" "}
                  <a
                    href={v.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700"
                  >
                    {v.sourceLabel} ↗
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={SECTION}>
          <p className={EYEBROW}>Sources</p>
          <h2 className={H2}>Where each claim can be checked</h2>
          <ul className="mt-6 space-y-3 text-sm text-ink-600">
            <li>
              <a href={chromeAutofill.repoUrl} target="_blank" rel="noreferrer" className="font-medium text-brand-600 underline underline-offset-4">
                Google Virtual Cards v1: API documentation
              </a>
              <span className="text-ink-500"> · the framework this integration implements</span>
            </li>
            <li>
              <a href={visuals.items[1].sourceUrl} target="_blank" rel="noreferrer" className="font-medium text-brand-600 underline underline-offset-4">
                The network&apos;s public launch post
              </a>
              <span className="text-ink-500"> · consumer-facing launch announcement</span>
            </li>
            <li>
              <Link href="/case-studies/google-chrome-autofill-virtual-card-number" className="font-medium text-brand-600 underline underline-offset-4">
                Original long-form case study
              </Link>
              <span className="text-ink-500"> · on the live site, unchanged during review</span>
            </li>
          </ul>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="grid gap-3 border-t border-ice-200 pt-8 sm:grid-cols-3">
            <Link href="/pages/evidence/case/job-search" className="font-mono text-xs text-ink-600 hover:text-ink-900">
              ← AI Job Search
            </Link>
            <Link href="/pages/evidence#ship" className="text-center font-mono text-xs text-ink-500 hover:text-ink-900">
              all shipments
            </Link>
            <Link href="/pages/evidence/case/wallet" className="text-right font-mono text-xs text-ink-600 hover:text-ink-900">
              Wallet Provisioning →
            </Link>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </div>
  );
}
