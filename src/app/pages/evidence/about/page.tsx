import type { Metadata } from "next";
import Link from "next/link";
import { about, identity } from "@/data/content";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CARD, EYEBROW, H2, SECTION } from "../golden/template";

export const metadata: Metadata = {
  title: "About (review variant) — Shamik Mukherjee",
  robots: { index: false, follow: false },
};

// PROVISIONAL PROFILE CLAIMS: the 13+ years, the four career chapters and the >$100M TCV figure
// come from the site's own About copy and have not yet been reconciled against the CV. They are
// shown here as normal About facts during review, and must be checked against the CV before the
// production migration. If any does not hold, revise it in content.ts, which this page reads from.

const LENSES = [
  {
    n: "01",
    name: "Systems",
    title: about.progression.items[0].title,
    body: about.progression.items[0].body,
    era: "TCS · 2010–2012",
  },
  {
    n: "02",
    name: "Value",
    title: about.progression.items[1].title,
    body: about.progression.items[1].body,
    era: "IIT Bombay MBA · 2012–2014",
  },
  {
    n: "03",
    name: "Commercial",
    title: about.progression.items[2].title,
    body: about.progression.items[2].body,
    era: "Pre-sales · 2014–2022",
  },
  {
    n: "04",
    name: "Delivery",
    title: about.progression.items[3].title,
    body: about.progression.items[3].body,
    era: "Product Owner · 2022–present",
  },
  {
    n: "05",
    name: "Autonomy",
    title: "Building AI systems that have to be correct",
    body: "I direct AI to build governed systems solo. The clearest example is OpenCAM, where deterministic code computes every figure and independent agents audit the narrative.",
    era: "Solo lab · 2026–ongoing",
    href: "/pages/evidence/case/opencam",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ice-100 text-ink-900">
      <Nav />
      <main>
        {/* Editorial hero: large type, one accent, the profile in two sentences */}
        <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 sm:px-8 sm:pt-20">
          <p className="font-mono text-xs tracking-wider text-brand-600">about</p>
          <h1 className="mt-4 text-balance font-display text-5xl font-semibold leading-[1.05] text-ink-900 sm:text-6xl">
            I learned product from the inside of the system.
          </h1>
          <p className="mt-6 font-display text-base font-semibold text-brand-700">{identity.headline}</p>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-600">{about.bio}</p>

          <dl className="mt-10 grid gap-3 sm:grid-cols-4">
            {about.heroStats.map((s) => (
              <div key={s.label} className={CARD}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold text-brand-600">{s.value}</dd>
                <dd className="mt-2 text-sm leading-snug text-ink-600">{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* The five lenses, each tied to the role that added it */}
        <section className={SECTION}>
          <p className={EYEBROW}>{about.progression.heading.toLowerCase()}</p>
          <h2 className={H2}>Five lenses, each added by a role</h2>
          <div className="mt-8 space-y-3">
            {LENSES.map((l) => (
              <div key={l.n} className={`${CARD} grid gap-4 md:grid-cols-[13rem_1fr]`}>
                <div>
                  <div className="font-mono text-[11px] text-ember-600">
                    {l.n} · {l.name.toUpperCase()}
                  </div>
                  <div className="mt-2 font-display text-base font-semibold leading-snug text-ink-900">{l.title}</div>
                  <div className="mt-2 font-mono text-[11px] text-ink-500">{l.era}</div>
                </div>
                <p className="text-sm leading-relaxed text-ink-600">
                  {l.body}
                  {l.href && (
                    <>
                      {" "}
                      <Link href={l.href} className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700">
                        See the evidence →
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Career: the four chapters, most recent first, as a timeline */}
        <section className={SECTION}>
          <p className={EYEBROW}>career</p>
          <h2 className={H2}>Four chapters, in order</h2>
          <ol className="mt-8 border-l-2 border-brand-200 pl-6 sm:pl-8">
            {about.chapters.map((ch) => (
              <li key={ch.dates} className="relative pb-10 last:pb-0">
                <span aria-hidden className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full border-2 border-brand-500 bg-ice-100 sm:-left-[2.55rem]" />
                <div className="font-mono text-[11px] text-ink-500">{ch.dates}</div>
                <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-ink-900">{ch.company}</h3>
                <div className="mt-1 text-sm font-medium text-brand-700">{ch.subtitle}</div>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">{ch.description}</p>
                {"highlights" in ch && ch.highlights && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-600">
                    {ch.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Translator + owner: the one diagram on this page */}
        <section className={SECTION}>
          <p className={EYEBROW}>{about.whatIBring.heading.toLowerCase()}</p>
          <h2 className={H2}>{about.whatIBring.heading}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
            <div className={`${CARD} p-6`}>
              <div className="grid grid-cols-3 gap-3 text-center font-mono text-[11px] uppercase tracking-wider text-ink-600">
                <span />
                <span className="rounded-lg border border-ice-200 bg-white py-3">Business</span>
                <span />
                <span className="rounded-lg border border-ice-200 bg-white py-3">Engineering</span>
                <span className="rounded-lg border-2 border-brand-500 bg-brand-50 py-4 font-display text-sm font-semibold normal-case tracking-normal text-brand-800">
                  Translator + owner
                </span>
                <span className="rounded-lg border border-ice-200 bg-white py-3">Delivery</span>
                <span />
                <span className="rounded-lg border border-ice-200 bg-white py-3">AI</span>
                <span />
              </div>
            </div>
            <div>
              <p className="text-base leading-relaxed text-ink-600">{about.whatIBring.body}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {about.whatIBring.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ice-200 bg-ice-50 px-3 py-1 text-xs text-ink-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Capability map: four groups instead of a tag cloud, plus the languages that gate some markets */}
        <section className={SECTION}>
          <p className={EYEBROW}>capabilities</p>
          <h2 className={H2}>What I can be trusted with</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.skills.map((g) => (
              <div key={g.category} className={CARD}>
                <div className="font-display text-base font-semibold text-ink-900">{g.category}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.tags.map((t) => (
                    <span key={t} className="rounded-md border border-ice-200 bg-white px-2.5 py-1 text-xs text-ink-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`${CARD} mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2`}>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-500">languages</span>
            {about.languages.map((l) => (
              <span key={l} className="text-sm text-ink-700">
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* How I work: a short pointer, the full treatment lives on the How I work page */}
        <section className={SECTION}>
          <p className={EYEBROW}>{about.philosophy.heading.toLowerCase()}</p>
          <h2 className={H2}>Start from someone actually stuck</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
            {about.philosophy.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p>
              {about.philosophy.linkOut.before}
              <Link href="/pages/evidence/approach" className="font-medium text-brand-600 underline underline-offset-4 hover:text-brand-700">
                {about.philosophy.linkOut.linkLabel}
              </Link>
              {about.philosophy.linkOut.after}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="rounded-2xl border border-brand-200 bg-ice-50 p-8 sm:p-10">
            <p className="font-mono text-xs tracking-wider text-brand-600">{about.nextChapter.eyebrow}</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
              {about.nextChapter.heading}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">{about.nextChapter.subtext}</p>
            <a
              href={`mailto:${identity.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-600"
            >
              Start a conversation →
            </a>
          </div>
        </section>
      </main>
      <Footer showCta={false} showToolLine={false} />
    </div>
  );
}
