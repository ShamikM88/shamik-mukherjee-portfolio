import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { openCam } from "@/data/content";
import { openCamMarkdown } from "@/lib/case-study-markdown";
import { Badge, Accordion, CopyMarkdownButton } from "@/components/ui";

export function OpenCamSection() {
  return (
    <div className="flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">
              {openCam.title}
            </h3>
            <p className="text-base text-ink-500 dark:text-ink-400">{openCam.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <CopyMarkdownButton markdown={openCamMarkdown} />
            <a
              href={openCam.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              View Source
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {openCam.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>

        <p className="text-sm text-ink-500 dark:text-ink-400">{openCam.status}</p>
      </div>

      {/* Scorecard — unboxed, stat-strip style for consistency with the hero */}
      <div className="grid grid-cols-1 gap-8 border-y border-ink-200 py-10 dark:border-white/10 sm:grid-cols-3">
        {openCam.scorecard.map((m) => (
          <div key={m.label}>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              {m.label}
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug text-ink-900 dark:text-white">
              {m.value}
            </p>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{m.note}</p>
          </div>
        ))}
      </div>

      {/* Architecture flow */}
      <div>
        <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Architecture
        </h4>
        <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0">
          <div className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap">
            {openCam.architectureFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="rounded-xl bg-brand-50 px-4 py-3 text-center font-mono text-xs font-medium text-brand-800 dark:bg-brand-950 dark:text-brand-300 sm:text-sm">
                  {step}
                </div>
                {i < openCam.architectureFlow.length - 1 && (
                  <ArrowRight
                    className="h-4 w-4 flex-shrink-0 text-ink-300 dark:text-ink-600"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features accordion */}
      <div>
        <h4 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Key Features
        </h4>
        <Accordion items={openCam.features} />
      </div>

      {/* Validation & governance callout — the one deliberately highlighted block */}
      <div className="rounded-2xl border border-ember-500/30 bg-ember-400/5 p-6 dark:bg-ember-500/5">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-ember-600 dark:text-ember-400" aria-hidden />
          <div>
            <h4 className="font-display text-base font-semibold text-ink-900 dark:text-white">
              {openCam.validation.heading}
            </h4>
            <ul className="mt-3 flex flex-col gap-2">
              {openCam.validation.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ember-500" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
