import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, GitFork, Mail, ArrowRight } from "lucide-react";
import { identity } from "@/data/content";
import { Badge, CopyMarkdownButton } from "@/components/ui";
import { DecisionsCarousel } from "@/components/decisions-carousel";

type Meta = { role: string; timeline: string; stack: string; status: string };
type TextBlock = { heading: string; paragraphs: string[] };
type StepBlock = { heading: string; steps: { title: string; body: string }[] };
type ItemBlock = { heading: string; items: { title: string; body: string }[] };
type OutcomeBlock = { heading: string; stats: { value: string; label: string }[]; bullets: string[] };
type VisualBlock = { heading: string; items: { caption: string }[] };

export function CaseStudyDetail({
  title,
  badges,
  subtitle,
  repoUrl,
  markdown,
  meta,
  problem,
  process,
  decisions,
  outcomes,
  visuals,
  heroIllustration,
  visualIllustrations,
  related,
  baseRepo,
  headerExtra,
  outcomeStatOverrides,
}: {
  title: string;
  badges: string[];
  subtitle: string;
  repoUrl: string;
  markdown: string;
  meta: Meta;
  problem: TextBlock;
  process: StepBlock;
  decisions: ItemBlock;
  outcomes: OutcomeBlock;
  visuals: VisualBlock;
  heroIllustration: ReactNode;
  visualIllustrations: [ReactNode, ReactNode];
  related: { href: string; title: string; description: string };
  /** Extra header link(s) after View Source / baseRepo, e.g. a live PR-count badge. */
  headerExtra?: ReactNode;
  /** Replace a specific outcome stat's displayed value with a live-fetched ReactNode, keyed by index. */
  outcomeStatOverrides?: Record<number, ReactNode>;
  /** Only set for projects built on someone else's open-source base. */
  baseRepo?: { url: string; label: string };
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
          <CopyMarkdownButton markdown={markdown} />
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            View Source
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
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">Role</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.role}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">Timeline</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.timeline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">Stack</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.stack}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">Status</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-ink-200">{meta.status}</p>
        </div>
      </div>

      {/* Problem */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Problem</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
          {problem.heading}
        </h2>
        <div className="mt-4 flex max-w-2xl flex-col gap-4">
          {problem.paragraphs.map((p) => (
            <p key={p} className="text-base leading-relaxed text-ink-600 dark:text-ink-300">
              {p}
            </p>
          ))}
        </div>
      </div>

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
        <Link
          href="/approach/"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          See how this compares to the other project&apos;s delivery model
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
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
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {visuals.items.map((item, i) => (
            <div key={item.caption} className="flex flex-col gap-2">
              <div className="aspect-[5/3] w-full overflow-hidden rounded-2xl">{visualIllustrations[i]}</div>
              <p className="text-sm text-ink-500 dark:text-ink-400">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related + CTA */}
      <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Next</p>
        <h2 className="mt-2 font-display text-xl font-semibold text-ink-900 dark:text-white">More case studies</h2>

        <Link
          href={related.href}
          className="mt-4 flex items-center justify-between rounded-xl bg-ink-50 px-5 py-4 transition-colors hover:bg-ink-100 dark:bg-white/5 dark:hover:bg-white/10"
        >
          <div>
            <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">{related.title}</p>
            <p className="mt-0.5 text-xs text-ink-500 dark:text-ink-400">{related.description}</p>
          </div>
          <ArrowRight className="h-4 w-4 flex-shrink-0 text-ink-400 dark:text-ink-500" aria-hidden />
        </Link>

        <a
          href={`mailto:${identity.email}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-transform hover:scale-[1.02]"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Talk about this work
        </a>
      </div>
    </div>
  );
}
