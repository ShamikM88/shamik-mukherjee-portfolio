import { ExternalLink, ShieldCheck, Mail, LayoutDashboard, GitCompareArrows, Zap } from "lucide-react";
import { fork } from "@/data/content";
import { jobSearchForkMarkdown } from "@/lib/case-study-markdown";
import { Badge, Card, CopyMarkdownButton } from "@/components/ui";

const statusStyles: Record<string, string> = {
  Applied: "bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Interview: "bg-ember-400/20 text-ember-700 dark:text-ember-400",
};

const featureIcons = [LayoutDashboard, Mail, GitCompareArrows, Zap];

export function ForkSection() {
  return (
    <div className="flex flex-col gap-16">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">
              {fork.title}
            </h3>
            <p className="text-base text-ink-500 dark:text-ink-400">{fork.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <CopyMarkdownButton markdown={jobSearchForkMarkdown} />
            <a
              href={fork.forkRepoUrl}
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
          {fork.badges.map((b) => (
            <Badge key={b} tone="ember">
              {b}
            </Badge>
          ))}
        </div>

        <p className="max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
          {fork.disclosure}
        </p>
      </div>

      {/* 4-grid feature cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fork.features.map((feature, i) => {
          const Icon = featureIcons[i];
          return (
            <Card key={feature.title} className="flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-400">
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <h4 className="font-display text-base font-semibold text-ink-900 dark:text-white">
                  {feature.title}
                </h4>
              </div>

              <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{feature.body}</p>

              {/* Mock visuals, per feature */}
              {feature.mock && "statuses" in feature.mock && (
                <div className="flex flex-wrap gap-2">
                  {feature.mock.statuses.map((s) => (
                    <span
                      key={s}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[s] ?? ""}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {feature.mock && "pipeline" in feature.mock && (
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-ink-500 dark:text-ink-400">
                  {(() => {
                    const pipeline = feature.mock.pipeline;
                    return pipeline.map((step, idx) => (
                      <span key={step} className="flex items-center gap-1.5">
                        <span className="rounded-md bg-ink-100 px-2 py-1 dark:bg-ink-800">{step}</span>
                        {idx < pipeline.length - 1 && <span aria-hidden>→</span>}
                      </span>
                    ));
                  })()}
                </div>
              )}

              {feature.before && feature.after && (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-950/30">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-red-600 dark:text-red-400">
                      Before
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                      {feature.before}
                    </p>
                  </div>
                  <div className="rounded-lg border border-brand-200 bg-brand-50 p-3 dark:border-brand-800 dark:bg-brand-950/30">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-400">
                      After
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-600 dark:text-ink-300">
                      {feature.after}
                    </p>
                  </div>
                </div>
              )}

              {feature.metricPill && (
                <span className="inline-flex w-fit items-center rounded-full bg-brand-600 px-3 py-1 font-mono text-xs font-semibold text-white">
                  {feature.metricPill}
                </span>
              )}
            </Card>
          );
        })}
      </div>

      {/* Governance & privacy spotlight */}
      <Card hover={false} className="border-brand-300 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/30">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" aria-hidden />
          <div>
            <h4 className="font-display text-base font-semibold text-ink-900 dark:text-white">
              {fork.governance.heading}
            </h4>
            <ul className="mt-3 flex flex-col gap-2">
              {fork.governance.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" aria-hidden />
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
