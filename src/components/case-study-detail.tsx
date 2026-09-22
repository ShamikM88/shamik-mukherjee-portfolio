import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, GitFork, Mail, ArrowRight } from "lucide-react";
import { identity } from "@/data/content";
import { Badge, DownloadCaseStudyButton, ResumeDownloadButton } from "@/components/ui";
import { DecisionsCarousel } from "@/components/decisions-carousel";
import { VisualsCarousel } from "@/components/visuals-carousel";
import { ScopeLanes } from "@/components/scope-lanes";
import { CASE_STUDY_CARDS } from "@/components/case-study-card";

type Meta = { role: string; timeline: string; stack: string; status: string };
type TextBlock = { heading: string; paragraphs: ReactNode[]; frictionBullets?: string[] };
type StepBlock = { heading: string; steps: { title: string; body: string }[] };
type ItemBlock = { heading: string; items: { title: string; body: string }[] };
type OutcomeBlock = { heading: string; stats: { value: string; label: string }[]; bullets: string[] };
type VisualBlock = { heading: string; items: { caption: string; src: string; alt: string }[] };
type ScopeBlock = {
  heading: string;
  lanes: { label: string; sublabel: string; tone: "brand-strong" | "blue" | "ember" | "muted"; items: string[] }[];
};
type FeatureBlock = { heading: string; items: { letter: string; title: string; body: string }[] };
type StrategyBlock = { heading: string; intro: string; cards: { title: string; body: string }[] };
type WorkflowBlock = { heading: string; intro: string; note?: string };

export function CaseStudyDetail({
  title,
  badges,
  subtitle,
  repoUrl,
  repoLabel = "View Source",
  markdown,
  markdownFilename,
  meta,
  problem,
  process,
  decisions,
  outcomes,
  visuals,
  heroIllustration,
  currentCaseStudyId,
  baseRepo,
  headerExtra,
  outcomeStatOverrides,
  scope,
  features,
  workflow,
  workflowIllustration,
  strategy,
  governanceNote,
  showApproachLink = true,
}: {
  title: string;
  badges: string[];
  subtitle: string;
  repoUrl: string;
  /** Label for the repoUrl link — defaults to "View Source"; override for links that aren't a code repo (e.g. a public API reference). */
  repoLabel?: string;
  markdown: string;
  markdownFilename: string;
  meta: Meta;
  problem: TextBlock;
  process: StepBlock;
  decisions: ItemBlock;
  outcomes: OutcomeBlock;
  visuals: VisualBlock;
  heroIllustration: ReactNode;
  /** This case study's own id in CASE_STUDY_CARDS — used to show every *other* case study in "More case studies". */
  currentCaseStudyId: string;
  /** Extra header link(s) after View Source / baseRepo, e.g. a live PR-count badge. */
  headerExtra?: ReactNode;
  /** Replace a specific outcome stat's displayed value with a live-fetched ReactNode, keyed by index. */
  outcomeStatOverrides?: Record<number, ReactNode>;
  /** Only set for projects built on someone else's open-source base. */
  baseRepo?: { url: string; label: string };
  /** MoSCoW scope breakdown — optional, not every case study has this depth of source material. */
  scope?: ScopeBlock;
  /** Structured feature/product-requirements list — optional. */
  features?: FeatureBlock;
  /** Workflow/pipeline diagram section — optional, needs both the text block and the illustration. */
  workflow?: WorkflowBlock;
  workflowIllustration?: ReactNode;
  /** Validation & strategic-context cards (buy-vs-build, economics, adoption) — optional. */
  strategy?: StrategyBlock;
  /** One-line callout explaining a deliberately lighter governance model vs. the other case study — optional. */
  governanceNote?: { text: string; linkHref: string; linkLabel: string };
  /** Show the "compare delivery models" link under Decisions — only relevant to the two AI-governance case studies (OpenCAM/Fork). Defaults true for backward compatibility. */
  showApproachLink?: boolean;
}) {
  return (
    <div className="flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
        <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] text-ink-900 dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">{subtitle}</p>
        <div className="flex gap-2">
          <DownloadCaseStudyButton markdown={markdown} filename={markdownFilename} />
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            {repoLabel}
          </a>
          {baseRepo && (
            <a
              href={baseRepo.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
            >
              <GitFork className="h-3.5 w-3.5" aria-hidden />
              {baseRepo.label}
            </a>
          )}
          {headerExtra && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 dark:border-white/15 dark:bg-white/5 dark:text-ink-300">
              {headerExtra}
            </span>
          )}
        </div>
      </div>

      {/* Hero illustration */}
      <div className="aspect-[800/380] w-full overflow-hidden rounded-2xl">{heroIllustration}</div>

      {/* Meta bar */}
      <div className="grid grid-cols-1 gap-6 rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Role</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.role}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Timeline</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.timeline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Stack</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.stack}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Status</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.status}</p>
        </div>
      </div>

      {/* Governance note — only set on case studies with deliberately lighter process */}
      {governanceNote && (
        <p className="text-sm italic text-ink-500 dark:text-ink-400">
          {governanceNote.text}{" "}
          <Link href={governanceNote.linkHref} className="not-italic text-brand-600 underline underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            {governanceNote.linkLabel}
          </Link>
        </p>
      )}

      {/* Problem */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Problem</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {problem.heading}
        </h2>
        <div className="mt-4 flex max-w-2xl flex-col gap-4">
          {problem.paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-ink-600 dark:text-ink-300">
              {p}
            </p>
          ))}
        </div>
        {problem.frictionBullets && (
          <ul className="mt-4 flex max-w-2xl flex-col gap-2.5">
            {problem.frictionBullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Scope & Prioritization */}
      {scope && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Scope</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {scope.heading}
          </h2>
          <div className="mt-6">
            <ScopeLanes lanes={scope.lanes} />
          </div>
        </div>
      )}

      {/* Features */}
      {features && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Product
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {features.heading}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.items.map((f) => (
              <div
                key={f.letter}
                className="flex gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                  {f.letter}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workflow diagram */}
      {workflow && workflowIllustration && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Workflow
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {workflow.heading}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-2xl border border-ink-200 dark:border-white/10">
              {workflowIllustration}
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-base leading-relaxed text-ink-600 dark:text-ink-300">{workflow.intro}</p>
              {workflow.note && (
                <p className="text-sm leading-relaxed text-ink-500 dark:text-ink-400">{workflow.note}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Validation & Strategic Context */}
      {strategy && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Strategy
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {strategy.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">{strategy.intro}</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {strategy.cards.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <h3 className="font-display text-sm font-semibold text-ink-900 dark:text-white">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Process</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {process.heading}
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {process.steps.map((step, i) => (
            <div
              key={step.title}
              className="flex scale-100 gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-200 hover:scale-[1.015] hover:bg-ink-50 dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
            >
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decisions */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Decisions</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {decisions.heading}
        </h2>
        <div className="mt-6">
          <DecisionsCarousel items={decisions.items} />
        </div>
        {showApproachLink && (
          <Link
            href="/approach/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            See how this compares to the other project&apos;s delivery model
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        )}
      </div>

      {/* Outcomes */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Outcomes</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {outcomes.heading}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {outcomes.stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <p className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400">
                {outcomeStatOverrides?.[i] ?? s.value}
              </p>
              <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{s.label}</p>
            </div>
          ))}
        </div>
        <ul className="mt-6 flex flex-col gap-2.5">
          {outcomes.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Supporting visuals */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Supporting visuals
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {visuals.heading}
        </h2>
        <div className="mt-6">
          <VisualsCarousel items={visuals.items} />
        </div>
      </div>

      {/* Related + CTA */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Next</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink-900 dark:text-white">More case studies</h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CASE_STUDY_CARDS.filter((c) => c.id !== currentCaseStudyId).map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="flex items-center justify-between gap-3 rounded-xl bg-ink-50 px-5 py-4 transition-colors hover:bg-ink-100 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">{card.title}</p>
                <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{card.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-ink-400" aria-hidden />
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${identity.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(13,125,92,0.5)] transition-transform hover:scale-[1.02]"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Talk about this work
          </a>
          <ResumeDownloadButton />
        </div>
      </div>
    </div>
  );
}
