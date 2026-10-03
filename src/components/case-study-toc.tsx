"use client";

import * as React from "react";

type Item = { id: string; label: string; top: number };

function toTitle(text: string) {
  const t = text.trim().toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

export function CaseStudyToc() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [touch, setTouch] = React.useState(false);

  React.useEffect(() => {
    setTouch(!window.matchMedia("(hover: hover)").matches);

    const measure = () => {
      const eyebrows = Array.from(document.querySelectorAll("main p")).filter(
        (p) =>
          p.classList.contains("uppercase") &&
          p.classList.contains("text-brand-600") &&
          p.textContent?.trim() !== "Next",
      ) as HTMLElement[];
      const found = eyebrows
        .filter((p) => p.parentElement)
        .map((p, i) => {
          const section = p.parentElement as HTMLElement;
          const id = `section-${i}`;
          section.id = id;
          return { id, label: toTitle(p.textContent ?? ""), top: section.getBoundingClientRect().top + window.scrollY };
        });
      setItems(found);
    };
    measure();
    window.addEventListener("resize", measure);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    if (!open || !touch) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, touch]);

  if (items.length === 0) return null;

  const focusLine = typeof window !== "undefined" ? window.scrollY + window.innerHeight * 0.4 : 0;
  const passedCount = items.filter((i) => i.top <= focusLine).length;
  const currentIdx = Math.max(0, passedCount - 1);
  const current = items[currentIdx];
  const pct = Math.round(progress * 100);

  const Chip = (
    <div className="flex items-center gap-2.5 rounded-full border border-ink-200 bg-white py-1.5 pl-1.5 pr-3.5 text-left shadow-lg dark:border-white/10 dark:bg-ink-900">
      <div
        className="grid h-7 w-7 place-items-center rounded-full"
        style={{ background: `conic-gradient(#149c72 ${pct}%, #d2e1ee ${pct}%)` }}
        aria-hidden
      >
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] font-bold text-brand-600 dark:bg-ink-900">
          {currentIdx + 1}
        </span>
      </div>
      <div className="text-xs leading-tight">
        <div className="font-semibold text-ink-900 dark:text-white">{current?.label}</div>
        <div className="text-[10px] text-ink-500 dark:text-ink-400">
          {currentIdx + 1} of {items.length}
        </div>
      </div>
    </div>
  );

  const List = (
    <ol className="flex flex-col gap-1">
      {items.map((item, idx) => {
        const isCurrent = idx === currentIdx;
        const isPassed = idx < passedCount;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={`flex min-h-[44px] items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                isCurrent
                  ? "bg-brand-50 font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
                  : isPassed
                    ? "text-ink-700 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/5"
                    : "text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-white/5"
              }`}
            >
              <span className="w-6 font-mono text-[11px] text-ink-400">{String(idx + 1).padStart(2, "0")}</span>
              <span className="flex-1">{item.label}</span>
              {isCurrent && (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">Now</span>
              )}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (touch) {
    return (
      <>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label={`Sections, currently ${current?.label}`}
            className="fixed bottom-4 right-4 z-30"
          >
            {Chip}
          </button>
        )}
        {open && (
          <div className="fixed inset-0 z-40">
            <button
              type="button"
              aria-label="Close sections"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink-950/40 backdrop-blur-[2px]"
            />
            <nav
              aria-label="Case study sections"
              className="absolute inset-x-0 bottom-0 flex max-h-[75vh] flex-col rounded-t-3xl border-t border-ink-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl dark:border-white/10 dark:bg-ink-900"
            >
              <div className="flex justify-center pt-2.5" aria-hidden>
                <span className="h-1 w-10 rounded-full bg-ink-200 dark:bg-white/20" />
              </div>
              <div className="flex items-center justify-between px-5 pb-3 pt-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">Sections</div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">
                    You&apos;re in {current?.label} · {currentIdx + 1} of {items.length}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-ink-200"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto px-3 pb-4">{List}</div>
            </nav>
          </div>
        )}
      </>
    );
  }

  return (
    <nav
      aria-label="Case study sections"
      className="fixed bottom-6 right-6 z-30"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`origin-bottom-right overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-lg transition-all duration-300 ease-out dark:border-white/10 dark:bg-ink-900 ${
          open ? "w-64" : "w-auto"
        }`}
      >
        {open ? (
          <div className="max-h-[60vh] overflow-y-auto p-2 text-xs">{List}</div>
        ) : (
          <div className="flex items-center gap-2.5 py-1.5 pl-1.5 pr-3.5">
            <div
              className="grid h-7 w-7 place-items-center rounded-full"
              style={{ background: `conic-gradient(#149c72 ${pct}%, #d2e1ee ${pct}%)` }}
              aria-hidden
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] font-bold text-brand-600 dark:bg-ink-900">
                {currentIdx + 1}
              </span>
            </div>
            <div className="text-xs leading-tight">
              <div className="font-semibold text-ink-900 dark:text-white">{current?.label}</div>
              <div className="text-[10px] text-ink-500 dark:text-ink-400">
                {currentIdx + 1} of {items.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
