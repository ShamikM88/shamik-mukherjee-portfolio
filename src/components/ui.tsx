"use client";

import * as React from "react";
import { ChevronDown, Check, Copy } from "lucide-react";

export function Badge({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "ember" | "neutral" }) {
  const tones = {
    brand: "bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-300",
    ember: "bg-ember-400/15 text-ember-600 dark:text-ember-400",
    neutral: "bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-200 dark:border-ink-800 dark:bg-ink-900 ${
        hover ? "hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover dark:hover:border-brand-700" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function MetricCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <Card className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        {label}
      </span>
      <span className="font-display text-xl font-semibold text-ink-900 dark:text-white sm:text-2xl">
        {value}
      </span>
      {note && <span className="text-sm text-ink-500 dark:text-ink-400">{note}</span>}
    </Card>
  );
}

export function Accordion({ items }: { items: { title: string; body: string }[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.title}
            className="overflow-hidden rounded-xl border border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-medium text-ink-900 hover:bg-ink-50 dark:text-white dark:hover:bg-ink-800/60"
            >
              <span>{item.title}</span>
              <ChevronDown
                aria-hidden
                className={`h-5 w-5 flex-shrink-0 text-brand-600 transition-transform duration-200 dark:text-brand-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{item.body}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CopyMarkdownButton({ markdown, label = "Copy Markdown" }: { markdown: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in unsupported contexts — fail silently, button just won't confirm.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-brand-700 dark:hover:text-brand-400"
      aria-label={label}
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}
