import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { openCam } from "@/data/content";
import { openCamMarkdown } from "@/lib/case-study-markdown";
import { Badge, Card, MetricCard, Accordion, CopyMarkdownButton } from "@/components/ui";

export function OpenCamSection() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header card */}
      <Card hover={false} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
              {openCam.title}
            </h3>
            <p className="text-sm text-ink-500 dark:text-ink-400">{openCam.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <CopyMarkdownButton markdown={openCamMarkdown} />
            <a
              href={openCam.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
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
      </Card>

      {/* Scorecard */}
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Target Metrics
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {openCam.scorecard.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} note={m.note} />
          ))}
        </div>
      </div>

      {/* Architecture flow */}
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Architecture
        </h4>
        <Card hover={false} className="overflow-x-auto">
          <div className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center">
            {openCam.architectureFlow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-center font-mono text-xs font-medium text-brand-800 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300 sm:text-sm">
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
        </Card>
      </div>

      {/* Features accordion */}
      <div>
        <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
          Key Features
        </h4>
        <Accordion items={openCam.features} />
      </div>

      {/* Validation & governance callout */}
      <Card hover={false} className="border-ember-500/30 bg-ember-400/5 dark:bg-ember-500/5">
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
      </Card>
    </div>
  );
}
