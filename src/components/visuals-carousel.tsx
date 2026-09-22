"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, X, ZoomIn } from "lucide-react";

/** sourceUrl is optional - a citation link to the original/public source of this visual, e.g. a public post being screenshotted. */
type VisualItem = { caption: string; src: string; alt: string; sourceUrl?: string; sourceLabel?: string };

export function VisualsCarousel({ items }: { items: VisualItem[] }) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

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
    // Re-check once more items settle in (e.g. images finish loading and affect layout).
  }, [updateArrows, items.length]);

  React.useEffect(() => {
    if (lightboxIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  function scrollByCard(direction: "left" | "right") {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-visual-card]");
    const gap = 16;
    const step = (card?.offsetWidth ?? el.clientWidth / 2) + gap;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  }

  // No arrows needed at all if everything already fits (e.g. exactly 2 items on desktop).
  const needsNav = items.length > 2;
  // Exact 2-up fit only when there's nothing to peek at; 3+ items get a deliberately
  // narrower card so the next one pokes into view as a "there's more" cue.
  const twoUp = items.length <= 2;
  const active = lightboxIndex !== null ? items[lightboxIndex] : null;

  return (
    <div className="relative">
      {needsNav && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll visuals left"
            className="absolute -left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white md:-left-4"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Scroll visuals right"
            className="absolute -right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-card transition-all duration-200 hover:border-brand-300 hover:bg-ink-50 hover:text-brand-700 disabled:pointer-events-none disabled:opacity-30 dark:border-white/15 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-white/30 dark:hover:bg-white/[0.1] dark:hover:text-white md:-right-4"
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
        </>
      )}

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 pt-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:scroll-pl-10"
      >
        {items.map((item, i) => (
          <div
            key={item.caption}
            data-visual-card
            className={`flex w-[85%] flex-shrink-0 snap-start flex-col gap-2 rounded-2xl p-1 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${twoUp ? "sm:w-[calc(50%-0.5rem)]" : "sm:w-[45%]"}`}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Enlarge: ${item.alt}`}
              className="group relative aspect-[5/3] w-full cursor-zoom-in overflow-hidden rounded-2xl"
            >
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover object-top" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="h-6 w-6 text-white" aria-hidden />
              </span>
            </button>
            <p className="text-xs text-ink-500 dark:text-ink-400">{item.caption}</p>
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-1 text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                <ExternalLink className="h-3 w-3" aria-hidden />
                {item.sourceLabel ?? "View original post"}
              </a>
            )}
          </div>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element -- natural sizing so the element's own bounds match the visible picture, so a click in the letterboxed space around it still reaches the backdrop and closes the lightbox (an `Image fill` box spans its full container even where the letterboxed image doesn't) */}
          <img
            src={active.src}
            alt={active.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[92vw] w-auto h-auto rounded-lg object-contain"
          />
          <p className="max-w-2xl text-center text-sm text-ink-300">{active.caption}</p>
        </div>
      )}
    </div>
  );
}
