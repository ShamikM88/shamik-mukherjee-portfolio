"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DecisionsCarousel({ items }: { items: { title: string; body: string }[] }) {
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
    const card = el.querySelector<HTMLElement>("[data-decision-card]");
    const gap = 16;
    const step = (card?.offsetWidth ?? el.clientWidth / 2) + gap;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      {/* Left arrow — sits at the left edge of the first visible card */}
      <button
        type="button"
        onClick={() => scrollByCard("left")}
        disabled={!canScrollLeft}
        aria-label="Scroll decisions left"
        className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>

      {/* Right arrow — sits at the right edge of the second visible card */}
      <button
        type="button"
        onClick={() => scrollByCard("right")}
        disabled={!canScrollRight}
        aria-label="Scroll decisions right"
        className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>

      {/* Viewport shows exactly 2 cards */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pt-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.title}
            data-decision-card
            className="flex w-[calc(50%-0.5rem)] flex-shrink-0 flex-col gap-3 rounded-2xl border border-ink-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:bg-ink-50 hover:shadow-card-hover dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
          >
            <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-sm font-semibold text-ink-900 dark:text-white">
              {item.title}
            </h3>
            <div className="h-px w-full bg-ink-100 dark:bg-white/10" />
            <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
