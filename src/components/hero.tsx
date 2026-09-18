import { Mail, ArrowDown } from "lucide-react";
import { identity, statStrip } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
            Currently: {identity.currentRole} · {identity.currentEmployer}
          </span>

          <h1 className="text-balance font-display text-4xl font-semibold leading-[1.1] text-ink-900 dark:text-white sm:text-5xl md:text-6xl">
            {identity.name}
          </h1>

          <p className="max-w-2xl text-balance font-display text-xl font-medium text-brand-700 dark:text-brand-400 sm:text-2xl">
            {identity.headline}
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300 sm:text-lg">
            {identity.domainLine}
          </p>

          <p className="text-sm text-ink-500 dark:text-ink-400">{identity.location}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email Me
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 rounded-full border border-ink-300 px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-brand-400 hover:text-brand-700 dark:border-ink-700 dark:text-ink-200 dark:hover:border-brand-600 dark:hover:text-brand-400"
            >
              View Work
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-ink-200 bg-ink-200 dark:border-ink-800 dark:bg-ink-800 sm:grid-cols-3">
          {statStrip.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6 dark:bg-ink-900">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-500 dark:text-ink-400">
                {stat.sublabel}
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold text-brand-600 dark:text-brand-400">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-ink-600 dark:text-ink-300">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
