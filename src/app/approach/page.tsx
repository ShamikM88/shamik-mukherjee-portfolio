import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { governanceComparison } from "@/data/content";
import { LiveTestCount, LiveGapAnalysisCount } from "@/components/live-github-stat";

const MODE_ICONS = [ShieldCheck, Zap];

export const metadata: Metadata = {
  title: "Delivery Approach — Shamik Mukherjee",
  description: governanceComparison.subhead,
};

// Links "Chrome Autofill retrieval flow" within the subhead so the enterprise-rigor claim
// isn't just asserted - it's one click from the case study that backs it up. Built here as
// JSX (content.ts is a .ts file and can't hold it) by splitting the plain-text subhead
// around that exact phrase; keep both in sync if the wording ever changes.
const subheadWithLink = (() => {
  const linkText = "Chrome Autofill retrieval flow";
  const [before, after] = governanceComparison.subhead.split(linkText);
  return (
    <>
      {before}
      <Link
        href="/case-studies/google-chrome-autofill-virtual-card-number/"
        className="text-brand-600 underline underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        {linkText}
      </Link>
      {after}
    </>
  );
})();

export default function ApproachPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back home
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Delivery approach
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold text-ink-900 dark:text-white sm:text-5xl">
            {governanceComparison.heading}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {subheadWithLink}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
            {governanceComparison.framing}
          </p>

          {/* Numbers above the fold, same pattern as every other page on the site */}
          <div className="mt-10 flex flex-col gap-8 border-t border-ink-200 pt-6 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            {governanceComparison.heroStats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dd className="font-display text-3xl font-bold text-ink-900 dark:text-white">
                  {stat.label === "Regression-Gated Tests" ? (
                    <LiveTestCount repo="ShamikM88/open-cam-framework" fallback={439} />
                  ) : stat.label === "Issues Surfaced by Gap-Analysis Audits" ? (
                    <LiveGapAnalysisCount repo="ShamikM88/open-cam-framework" fallback={33} />
                  ) : (
                    stat.value
                  )}
                </dd>
                <dd className="mt-1 text-sm text-ink-600 dark:text-ink-300">{stat.label}</dd>
                <dt className="mt-0.5 text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {stat.sublabel}
                </dt>
              </div>
            ))}
          </div>

          {/* Proof in Practice - moved up from the bottom of the page: the concrete, slightly
              unflattering Issue #31 story is the strongest evidence on this page that the
              governance claims are real, not marketing, and it was previously the last thing
              a reader would reach after two rounds of framework/theory. */}
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Proof in practice
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
              {governanceComparison.proof.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {governanceComparison.proof.items.map((item, i) => {
                const isControlled = i === 0;
                return (
                  <Link
                    key={item.title}
                    href={item.linkHref}
                    className={`group flex flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25 ${isControlled ? "hover:border-brand-300" : "hover:border-blue-400"}`}
                  >
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${isControlled ? "text-brand-600 dark:text-brand-400" : "text-blue-600 dark:text-blue-400"}`}
                    >
                      {item.badge}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{item.body}</p>
                    <span
                      className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${isControlled ? "text-brand-600 group-hover:text-brand-700 dark:text-brand-400 dark:group-hover:text-brand-300" : "text-blue-600 group-hover:text-blue-500 dark:text-blue-400"}`}
                    >
                      {item.linkLabel}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Two Operating Modes */}
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Two operating modes
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
              Same discipline. Different weight.
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {governanceComparison.modes.map((mode, i) => {
                const Icon = MODE_ICONS[i];
                const isControlled = i === 0;
                return (
                  <div
                    key={mode.label}
                    className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase tracking-wider ${isControlled ? "text-brand-600 dark:text-brand-400" : "text-blue-600 dark:text-blue-400"}`}
                        >
                          Mode {mode.number} · {mode.label}
                        </p>
                        <h3 className="mt-1.5 font-display text-lg font-semibold text-ink-900 dark:text-white">
                          {mode.title}
                        </h3>
                      </div>
                      <span
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${isControlled ? "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-400" : "bg-blue-400/15 text-blue-600 dark:text-blue-400"}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300 lg:min-h-[4.25rem]">
                      {mode.description}
                    </p>
                    <dl className="mt-5 flex flex-col divide-y divide-ink-100 border-t border-ink-100 dark:divide-white/10 dark:border-white/10">
                      {mode.dimensions.map((d) => (
                        <div key={d.label} className="flex flex-col gap-0.5 py-3">
                          <dt className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                            {d.label}
                          </dt>
                          <dd className="text-sm leading-relaxed text-ink-700 dark:text-ink-200">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How I Decide */}
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              How I decide
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
              {governanceComparison.decisionQuestions.heading}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {governanceComparison.decisionQuestions.items.map((item, i) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <p className="font-display text-sm font-semibold text-brand-600 dark:text-brand-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-base font-semibold text-ink-900 dark:text-white">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing statement - states the transfer back to a hiring context explicitly,
              rather than leaving the reader to infer it from two AI side-project examples. */}
          <div className="mt-16 max-w-3xl border-t border-ink-200 pt-8 dark:border-white/10">
            <p className="text-lg leading-relaxed text-ink-600 dark:text-ink-300">{governanceComparison.closing}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
