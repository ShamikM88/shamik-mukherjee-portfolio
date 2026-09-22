"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { chromeAutofill, openCam, fork } from "@/data/content";
import { ChromeAutofillThumbnail, OpenCamThumbnail, ForkThumbnail } from "@/components/project-thumbnails";

const cards = [
  {
    id: "chrome-autofill",
    href: "/case-studies/google-chrome-autofill-virtual-card-number/",
    thumbnail: <ChromeAutofillThumbnail />,
    tags: chromeAutofill.badges,
    title: chromeAutofill.shortTitle,
    description: chromeAutofill.subtitle,
    statValue: chromeAutofill.outcomes.stats[0].value,
    statLabel: chromeAutofill.outcomes.stats[0].label,
    // Day-job work goes first, deliberately — this is the primary case study,
    // the two personal AI projects below are the differentiator, not the headline.
    accent: "ember" as const,
  },
  {
    id: "opencam",
    href: "/case-studies/opencam/",
    thumbnail: <OpenCamThumbnail />,
    tags: openCam.badges,
    title: openCam.shortTitle,
    description: openCam.subtitle,
    statValue: openCam.outcomes.stats[0].value,
    statLabel: openCam.outcomes.stats[0].label,
    // Matches the brand(green)/blue split established on the Approach page and in
    // the thumbnail illustrations, so a card's accent never contradicts its own image.
    accent: "brand" as const,
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
    accent: "blue" as const,
  },
];

const ACCENT_STYLES = {
  ember: {
    border: "hover:border-ember-400",
    stat: "text-ember-600 dark:text-ember-400",
    link: "group-hover:text-ember-600 dark:group-hover:text-ember-400",
  },
  brand: {
    border: "hover:border-brand-300",
    stat: "text-brand-600 dark:text-brand-400",
    link: "group-hover:text-brand-600 dark:group-hover:text-brand-400",
  },
  blue: {
    border: "hover:border-blue-400",
    stat: "text-blue-600 dark:text-blue-400",
    link: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
};

export function CaseStudiesTeaser() {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateArrows = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  React.useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scrollByCard(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-case-study-card]");
    const gap = 24;
    const step = (card?.offsetWidth ?? el.clientWidth / 2) + gap;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

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

        {/* Cards deliberately don't fill the viewport at exactly 2-up: the 3rd card
            peeks in at the right edge as a "there's more" cue, backed up by the fade
            and the arrow buttons rather than relying on either alone. */}
        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll case studies left"
            className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Scroll case studies right"
            className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>

          {/* Right fade is wide: that card is a deliberately-clipped teaser, so washing
              into it is fine. Left fade is a thin edge vignette only — that card is fully
              in view and meant to be read, so the "more to scroll back to" cue can't eat
              into its text the way the right one does. */}
          {canScrollRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-16 bg-gradient-to-l from-ink-50 to-transparent dark:from-ink-950 sm:w-28" />
          )}
          {canScrollLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-6 bg-gradient-to-r from-ink-50 to-transparent dark:from-ink-950 sm:w-10" />
          )}

          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 pb-2 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:scroll-pl-10"
          >
            {cards.map((card) => {
              const accent = ACCENT_STYLES[card.accent];
              return (
                <Link
                  key={card.id}
                  href={card.href}
                  data-case-study-card
                  className={`group flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover dark:border-white/10 dark:bg-ink-900 dark:hover:border-white/25 sm:w-[45%] ${accent.border}`}
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
                        <span className={`font-display text-lg font-bold ${accent.stat}`}>
                          {card.statValue}
                        </span>
                        <span className="ml-1.5 text-xs text-ink-500 dark:text-ink-400">
                          {card.statLabel}
                        </span>
                      </div>
                      <span className={`flex items-center gap-1 text-sm font-medium text-ink-500 transition-colors dark:text-ink-400 ${accent.link}`}>
                        Read case study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
