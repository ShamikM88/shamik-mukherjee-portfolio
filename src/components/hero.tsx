import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { identity, about, statStrip } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-glow">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        {/* items-start, not items-center: the text column is taller than the photo now that
            it carries the full identity block, and centering left dead space above the photo
            rather than aligning it with the badge at the top of the row. */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-900 dark:text-white sm:text-5xl lg:text-[3.75rem]">
              {identity.taglineLead}
              <br />
              <span className="text-gradient-brand">{identity.taglineHighlight}</span>
            </h1>

            <div className="flex max-w-lg flex-col gap-1.5 leading-relaxed text-ink-600 dark:text-ink-300">
              <p className="text-xl font-medium text-ink-800 dark:text-ink-100">{identity.headline}</p>
              <p className="text-lg">{identity.domainLine}</p>
              {/* Reuses About's own accurate phrasing verbatim — "13+ years" is total career
                  tenure (engineering, pre-sales, delivery), not years spent as a PM/PO specifically.
                  Appending it directly to the job title above would misleadingly imply the latter. */}
              <p className="text-lg">{about.headline}</p>
              <p className="text-lg">Based in {identity.location}.</p>
              {/* Moved here from above the headline — a small status pill shouldn't outrank the
                  hero's biggest line. Grouped with the rest of the identity facts instead, as a
                  closing beat right before the CTAs. */}
              <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-300">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                Currently: {identity.currentRole} · {identity.currentEmployer}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(13,125,92,0.5)] transition-transform hover:scale-[1.02]"
              >
                View case studies
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="/about/"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                About me
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2.25rem] bg-gradient-brand opacity-30 blur-2xl"
                aria-hidden
              />
              <div className="relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:h-64 sm:w-64 lg:h-80 lg:w-80">
                <Image
                  src={identity.photo}
                  alt={`${identity.name} headshot`}
                  fill
                  sizes="(min-width: 1024px) 320px, 256px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* No intro line here on purpose — it restated the headline's own claim (real payments
            work + solo AI systems) in a smaller font right before the numbers proved it. Spacing
            tightened from the original mt-20/pt-10 so the stat strip - the site's one piece of
            hard evidence above everything else - lands close to the fold. */}
        <div className="mt-10 flex flex-col gap-8 border-t border-ink-200 pt-6 dark:border-white/10 sm:mt-14 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
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
