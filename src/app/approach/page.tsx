import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui";
import { governanceComparison } from "@/data/content";

export const metadata: Metadata = {
  title: "Delivery Approach — Shamik Mukherjee",
  description: governanceComparison.intro,
};

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
            Approach
          </p>
          <h1 className="mt-2 text-balance font-display text-4xl font-semibold text-ink-900 dark:text-white sm:text-5xl">
            {governanceComparison.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {governanceComparison.intro}
          </p>

          <Card hover={false} className="mt-10 overflow-x-auto p-0">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-200 dark:border-white/10">
                  {governanceComparison.columns.map((col, i) => (
                    <th
                      key={col}
                      className={`px-5 py-4 font-display text-xs font-semibold uppercase tracking-wider ${
                        i === 0
                          ? "text-ink-500 dark:text-ink-400"
                          : i === 1
                            ? "text-brand-700 dark:text-brand-400"
                            : "text-ember-600 dark:text-ember-400"
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {governanceComparison.rows.map((row, rIdx) => (
                  <tr
                    key={row[0]}
                    className={rIdx % 2 === 0 ? "bg-white dark:bg-ink-900" : "bg-ink-50 dark:bg-ink-900/50"}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cell}
                        className={`px-5 py-4 align-top leading-relaxed ${
                          cIdx === 0
                            ? "font-medium text-ink-700 dark:text-ink-200"
                            : "text-ink-600 dark:text-ink-300"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/case-studies/opencam/"
              className="rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25"
            >
              <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">
                OpenCAM Framework
              </p>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">See the Enterprise Mode case study</p>
            </Link>
            <Link
              href="/case-studies/job-search-automation/"
              className="rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25"
            >
              <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">
                AI Job Search Automation
              </p>
              <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">See the Fast-Iterate Mode case study</p>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
