"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CASE_STUDY_CARDS, CaseStudyCard } from "@/components/case-study-card";

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
            {CASE_STUDY_CARDS.map((card) => (
              <CaseStudyCard key={card.id} card={card} className="w-[85%] flex-shrink-0 snap-start sm:w-[45%]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
