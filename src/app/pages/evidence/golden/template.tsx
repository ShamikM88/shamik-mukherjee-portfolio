import type { ReactNode } from "react";
import Link from "next/link";
import { EvidenceNav } from "@/app/pages/evidence/evidence-chrome";
import { EvidenceFooter } from "@/app/pages/evidence/evidence-chrome";
import { CaseStudyToc } from "@/components/case-study-toc";
import { ProcessRail } from "./process-rail";
import { ProofBand, TechnicalBand } from "./technical";
import type { CaseFile, Card, ScopeItem, Section } from "./types";

// Light-world tokens, shared with the evidence home. Dark is used only by the technical and
// proof bands. Eyebrows are uppercase + brand-600 so the CaseStudyToc section navigator finds them.
export const EYEBROW = "text-xs font-semibold uppercase tracking-wider text-brand-600";
export const H2 = "mt-2 font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl";
export const CARD = "rounded-2xl border border-ice-200 bg-ice-50 p-5 sm:p-6";
export const SECTION = "mx-auto max-w-5xl px-6 py-14 sm:px-8 sm:py-16";

const TONE_TEXT = { brand: "text-brand-600", blue: "text-blue-600", ember: "text-ember-600", muted: "text-ink-500" } as const;
const STATUS = {
  done: { mark: "✓", cls: "text-brand-600" },
  pending: { mark: "○", cls: "text-ink-500" },
  wont: { mark: "—", cls: "text-ink-400" },
} as const;

function itemText(i: ScopeItem) {
  return typeof i === "string" ? i : i.text;
}

function ScopeList({ items }: { items: ScopeItem[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-600">
      {items.map((it) => {
        const status = typeof it === "string" ? undefined : it.status;
        return (
          <li key={itemText(it)} className="flex gap-3">
            {status ? (
              <span aria-hidden className={`mt-0.5 w-3 flex-shrink-0 font-mono text-xs ${STATUS[status].cls}`}>
                {STATUS[status].mark}
              </span>
            ) : (
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
            )}
            <span>{itemText(it)}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CardBlock({ card }: { card: Card }) {
  return (
    <div className={CARD}>
      {card.letter && <div className="font-mono text-xs text-brand-600">{card.letter}</div>}
      <div className={`font-display text-base font-semibold ${card.tone ? TONE_TEXT[card.tone] : "text-ink-900"}`}>
        {card.title}
      </div>
      {card.sublabel && <div className="mt-0.5 font-mono text-[11px] text-ink-500">{card.sublabel}</div>}
      {card.body && <p className="mt-3 text-sm leading-relaxed text-ink-600">{card.body}</p>}
      {card.items && <ScopeList items={card.items} />}
    </div>
  );
}

function renderSection(s: Section, key: number, id?: string): ReactNode {
  if (s.kind === "prose") {
    return (
      <section key={key} className={SECTION}>{id && <Anchor id={id} />}
        <p className={EYEBROW}>{s.eyebrow}</p>
        <h2 className={H2}>{s.heading}</h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.links?.map((l) => (
            <p key={l.href}>
              <a href={l.href} target="_blank" rel="noreferrer" className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700">
                {l.label} ↗
              </a>
            </p>
          ))}
        </div>
        {s.callouts && (
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {s.callouts.map((c) => (
              <div key={c} className={`${CARD} text-sm leading-relaxed text-ink-600`}>
                {c}
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  if (s.kind === "cards") {
    return (
      <section key={key} className={SECTION}>{id && <Anchor id={id} />}
        <p className={EYEBROW}>{s.eyebrow}</p>
        <h2 className={H2}>{s.heading}</h2>
        {s.intro && <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{s.intro}</p>}
        <div className={`mt-6 grid gap-3 ${s.cards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {s.cards.map((c) => (
            <CardBlock key={c.title} card={c} />
          ))}
        </div>
      </section>
    );
  }

  if (s.kind === "steps") {
    return (
      <section key={key} className={SECTION}>{id && <Anchor id={id} />}
        <p className={EYEBROW}>{s.eyebrow}</p>
        <h2 className={H2}>{s.heading}</h2>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {s.steps.map((st, i) => (
            <li key={st.title} className={`${CARD} flex gap-4`}>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-semibold text-brand-700">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold leading-snug text-ink-900">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{st.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  // Strategy board: MoSCoW lanes laid out side by side, not a Jira-style column board.
  return (
    <section key={key} className={SECTION}>{id && <Anchor id={id} />}
      <p className={EYEBROW}>{s.eyebrow}</p>
      <h2 className={H2}>{s.heading}</h2>
      {s.intro && <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{s.intro}</p>}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {s.lanes.map((lane) => (
          <div key={lane.label} className={CARD}>
            <div className={`font-display text-base font-semibold ${TONE_TEXT[lane.tone]}`}>{lane.label}</div>
            <div className="mt-0.5 font-mono text-[11px] leading-snug text-ink-500">{lane.sublabel}</div>
            <ScopeList items={lane.items} />
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] text-ink-500">
        <span className="text-brand-600">✓</span> shipped · <span className="text-ink-500">○</span> open ·{" "}
        <span className="text-ink-400">—</span> decided against
      </p>
      {s.links && (
        <p className="mt-4">
          {s.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700"
            >
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </section>
  );
}

// Six-stage index for long case studies. A static, keyboard-operable list of in-page links, not
// a sticky sidebar: it appears once under the hero and wraps to a 3-column grid on phones.
const RAIL = [
  { label: "Context", href: "#stage-context" },
  { label: "Constraint", href: "#stage-graph" },
  { label: "Observed", href: "#stage-graph" },
  { label: "Decision", href: "#stage-decision" },
  { label: "Execution", href: "#stage-execution" },
  { label: "Outcome", href: "#stage-outcome" },
];

function StageRail() {
  return (
    <nav aria-label="Case stages" className="mx-auto max-w-5xl px-6 sm:px-8">
      <ol className="grid grid-cols-3 gap-2 border-y border-ice-200 py-4 sm:grid-cols-6">
        {RAIL.map((r, i) => (
          <li key={r.label}>
            <a
              href={r.href}
              className="group flex flex-col gap-1 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-ice-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            >
              <span className="font-mono text-[10px] text-brand-600">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs font-semibold text-ink-700 group-hover:text-ink-900">{r.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function GoldenCase({ c, hero }: { c: CaseFile; hero?: ReactNode }) {
  const receiptCols = c.receipts.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3";
  const modeAnchor = c.mode === "Controlled Delivery" ? "controlled" : "lightweight";
  // Execution is the first steps section, or the second section for cases without one.
  const execIndex = Math.max(1, c.sections.findIndex((s) => s.kind === "steps"));

  return (
    <div className="min-h-screen bg-ice-100 text-ink-900">
      <EvidenceNav />
      <CaseStudyToc />
      <main>
        {/* 10-second layer: what it was, what it did, what it cost to deliver */}
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-10 sm:px-8 sm:pt-14">
          <div className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
            <Link href="/pages/evidence" className="hover:text-ink-900">Evidence</Link>
            <span aria-hidden>/</span>
            <span>{String(c.index).padStart(2, "0")} of 04</span>
          </div>

          <p className="mt-8 font-mono text-xs tracking-wider text-brand-600">{c.category}</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.1] text-ink-900 sm:text-5xl">
            {c.name}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-600">{c.proposition}</p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium">
            <Link
              href={`/pages/evidence/approach#${modeAnchor}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-300 bg-brand-50 px-3 py-1.5 text-brand-700 hover:border-brand-500"
            >
              {c.mode} →
            </Link>
            <span className="inline-flex items-center rounded-lg border border-ice-200 bg-ice-50 px-3 py-1.5 text-ink-600">
              {c.meta.timeline}
            </span>
          </div>

          <div className={`mt-10 grid gap-3 ${receiptCols}`}>
            {c.receipts.map((r) => (
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
              <dd className="mt-1 leading-snug text-ink-700">{c.meta.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">timeline</dt>
              <dd className="mt-1 text-ink-700">{c.meta.timeline}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-500">status</dt>
              <dd className="mt-1 text-ink-700">{c.meta.status}</dd>
            </div>
          </dl>

          {hero && <div className="mt-10 overflow-hidden rounded-2xl border border-ice-200 bg-ice-50">{hero}</div>}
        </section>

        <StageRail />

        {/* 60-second layer: ownership, then the execution graph */}
        <section className={SECTION}>
          <p className={EYEBROW}>My scope</p>
          <h2 className={H2}>What I owned, what was shared, what I did not touch</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { label: "Owned", mark: "●", tone: "text-brand-600", items: c.ownership.owned },
              { label: c.ownership.sharedLabel, mark: "○", tone: "text-blue-600", items: c.ownership.shared },
              { label: "Out of scope", mark: "—", tone: "text-ink-500", items: c.ownership.outOfScope },
            ].map((col) => (
              <div key={col.label} className={CARD}>
                <div className={`font-mono text-xs font-semibold ${col.tone}`}>
                  {col.mark} {col.label.toUpperCase()}
                </div>
                <ul className="mt-4 space-y-2.5 text-sm leading-snug text-ink-600">
                  {col.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={SECTION}><Anchor id="stage-graph" />
          <p className={EYEBROW}>Execution graph · click a stage</p>
          <h2 className={H2}>From the problem to the outcome</h2>
          <div className="mt-8">
            <ProcessRail stages={c.stages} initial={c.initial} />
          </div>
        </section>

        {/* Full deep dive: the original long-form material, recomposed in the new structure */}
        {c.sections.map((s, i) => renderSection(s, i, i === 0 ? "stage-context" : i === execIndex ? "stage-execution" : undefined))}

        <section className={SECTION}><Anchor id="stage-decision" />
          <p className={EYEBROW}>Decision records</p>
          <h2 className={H2}>{c.decisions.heading}</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {c.decisions.items.map((d, i) => (
              <details
                key={d.title}
                className="group rounded-2xl border border-ice-200 bg-ice-50 p-5 transition-shadow open:shadow-card-hover sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <div>
                    <p className="font-mono text-xs text-ember-600">DECISION {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 font-display text-base font-semibold leading-snug text-ink-900 sm:text-lg">{d.title}</h3>
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
                  <p className="mt-3 leading-relaxed text-ink-600">{d.fullAccount}</p>
                </details>
              </details>
            ))}
          </div>
        </section>

        <TechnicalBand heading={c.technical.heading} panels={c.technical.panels} />

        <section className={SECTION}><Anchor id="stage-outcome" />
          <p className={EYEBROW}>{c.impact.heading}</p>
          <h2 className={H2}>What it delivered</h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-ink-600">
            {c.impact.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <ProofBand proof={c.proof} />

        {c.artefacts && (
          <section className={SECTION}>
            <p className={EYEBROW}>{c.artefacts.heading}</p>
            <h2 className={H2}>Artefacts from the build and the launch</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {c.artefacts.items.map((v, i) => (
                <figure key={v.src} className={`${CARD} flex flex-col gap-4`}>
                  <div className="font-mono text-[11px] text-ember-600">ARTEFACT {String(i + 1).padStart(2, "0")}</div>
                  <div className="overflow-hidden rounded-lg border border-ice-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={v.src} alt={v.alt} loading="lazy" className="h-auto w-full" />
                  </div>
                  <figcaption className="space-y-3 text-sm leading-relaxed text-ink-600">
                    <p>{v.caption}</p>
                    <p>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-brand-600">Why it matters </span>
                      {v.why}
                    </p>
                    <a href={v.sourceUrl} target="_blank" rel="noreferrer" className="inline-block font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700">
                      Source: {v.sourceLabel} ↗
                    </a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className={SECTION}>
          <p className={EYEBROW}>Sources</p>
          <h2 className={H2}>Where each claim can be checked</h2>
          <ul className="mt-6 space-y-3 text-sm text-ink-600">
            {c.sources.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="font-medium text-brand-600 underline underline-offset-4"
                >
                  {s.label}
                </a>
                <span className="text-ink-500"> · {s.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="grid gap-3 border-t border-ice-200 pt-8 sm:grid-cols-3">
            <Link href={`/pages/evidence/case/${c.neighbours.prev.slug}`} className="font-mono text-xs text-ink-600 hover:text-ink-900">
              ← {c.neighbours.prev.label}
            </Link>
            <Link href="/pages/evidence#ship" className="text-center font-mono text-xs text-ink-500 hover:text-ink-900">
              all shipments
            </Link>
            <Link href={`/pages/evidence/case/${c.neighbours.next.slug}`} className="text-right font-mono text-xs text-ink-600 hover:text-ink-900">
              {c.neighbours.next.label} →
            </Link>
          </div>
        </section>
      </main>
      <EvidenceFooter />
    </div>
  );
}

// Zero-height in-page target for the stage rail. It sits inside each section rather than on the
// section itself, because CaseStudyToc sets section ids of its own.
function Anchor({ id }: { id: string }) {
  return <span id={id} aria-hidden="true" className="block h-0 scroll-mt-28" />;
}
