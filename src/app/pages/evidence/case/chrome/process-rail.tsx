"use client";

import { useState } from "react";
import type { Stage } from "./chrome-content";

export function ProcessRail({ stages, initial = "constraint" }: { stages: Stage[]; initial?: string }) {
  const [active, setActive] = useState(initial);
  const current = stages.find((s) => s.key === active) ?? stages[0];

  return (
    <div>
      <div className="relative grid grid-cols-3 gap-y-4 sm:grid-cols-6">
        <div
          aria-hidden
          className="absolute left-[8%] right-[8%] top-[11px] hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 sm:block"
        />
        {stages.map((s, i) => {
          const on = s.key === current.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              aria-pressed={on}
              className="group relative flex flex-col items-center gap-2 px-1 text-center"
            >
              <span
                className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 font-mono text-[10px] font-semibold transition-all ${
                  on
                    ? "border-brand-500 bg-brand-500 text-white shadow-[0_0_0_6px_rgba(20,156,114,0.15)]"
                    : "border-brand-300 bg-ice-50 text-brand-700 group-hover:border-brand-500"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs font-semibold transition-colors ${on ? "text-ink-900" : "text-ink-500"}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-200 bg-ice-50 p-6 sm:p-8">
        {current.figure && (
          <div className="mb-5 border-b border-brand-100 pb-5">
            <div className="font-display text-3xl font-semibold text-brand-600 sm:text-4xl">{current.figure.value}</div>
            <div className="mt-1 text-sm text-ink-500">{current.figure.label}</div>
          </div>
        )}
        <h3 className="font-display text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">{current.headline}</h3>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-600 sm:text-base">
          {current.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
