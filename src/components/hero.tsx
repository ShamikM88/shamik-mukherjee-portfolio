import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { identity, statStrip } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-glow">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="flex flex-col items-start gap-7 order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
              Currently: {identity.currentRole} · {identity.currentEmployer}
            </span>

            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.08] text-ink-900 dark:text-white sm:text-6xl lg:text-[3.75rem]">
              {identity.taglineLead}
              <br />
              <span className="text-gradient-brand">{identity.taglineHighlight}</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-ink-600 dark:text-ink-300">
              {identity.headline} · {identity.domainLine}. Based in {identity.location}.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-transform hover:scale-[1.02]"
              >
                View case studies
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                About me
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2.25rem] bg-gradient-brand opacity-30 blur-2xl"
                aria-hidden
              />
              <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
                <Image
                  src={identity.photo}
                  alt={`${identity.name} headshot`}
                  fill
                  sizes="(min-width: 1024px) 384px, 320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-ink-200 pt-10 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {statStrip.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dd className="font-display text-4xl font-bold text-ink-900 dark:text-white">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-ink-600 dark:text-ink-300">{stat.label}</dd>
              <dt className="mt-0.5 text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {stat.sublabel}
              </dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
