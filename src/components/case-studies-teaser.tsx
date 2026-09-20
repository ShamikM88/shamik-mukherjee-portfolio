import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { openCam, fork } from "@/data/content";
import { OpenCamThumbnail, ForkThumbnail } from "@/components/project-thumbnails";

const cards = [
  {
    id: "opencam",
    href: "/case-studies/opencam/",
    thumbnail: <OpenCamThumbnail />,
    tags: openCam.badges,
    title: openCam.shortTitle,
    description: openCam.subtitle,
    statValue: openCam.outcomes.stats[0].value,
    statLabel: openCam.outcomes.stats[0].label,
  },
  {
    id: "fork",
    href: "/case-studies/job-search-automation/",
    thumbnail: <ForkThumbnail />,
    tags: fork.badges,
    title: fork.shortTitle,
    description: fork.subtitle,
    statValue: fork.outcomes.stats[2].value,
    statLabel: fork.outcomes.stats[2].label,
  },
];

export function CaseStudiesTeaser() {
  return (
    <section id="work" className="border-t border-ink-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Selected work
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">
              Case studies
            </h2>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-300 hover:shadow-card-hover dark:border-white/10 dark:bg-ink-900 dark:hover:border-white/25"
            >
              <div className="aspect-[5/3] w-full overflow-hidden">{card.thumbnail}</div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600 dark:bg-white/10 dark:text-ink-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-white">
                  {card.title}
                </h3>

                <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {card.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-ink-100 pt-4 dark:border-white/10">
                  <div>
                    <span className="font-display text-lg font-bold text-brand-600 dark:text-brand-400">
                      {card.statValue}
                    </span>
                    <span className="ml-1.5 text-xs text-ink-500 dark:text-ink-400">
                      {card.statLabel}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors group-hover:text-brand-600 dark:text-ink-400 dark:group-hover:text-brand-400">
                    Read case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
