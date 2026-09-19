"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export function Badge({ children, tone = "brand" }: { children: React.ReactNode; tone?: "brand" | "ember" | "neutral" }) {
  const tones = {
    brand: "bg-brand-100 text-brand-800 dark:bg-brand-500/15 dark:text-brand-300",
    ember: "bg-ember-400/15 text-ember-600 dark:text-ember-400",
    neutral: "bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-ink-300",
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
      className={`rounded-2xl border border-ink-200 bg-white p-6 shadow-card transition-all duration-200 dark:border-white/10 dark:bg-white/[0.03] ${
        hover ? "hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover dark:hover:border-white/25" : ""
      } ${className}`}
    >
      {children}
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
      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
      aria-label={label}
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}
