"use client";

import * as React from "react";
import { Check, ChevronDown, Download, FileDown } from "lucide-react";

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

export function DownloadCaseStudyButton({
  markdown,
  filename,
  label = "Download Case Study",
}: {
  markdown: string;
  filename: string;
  label?: string;
}) {
  const [downloaded, setDownloaded] = React.useState(false);

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-brand-300 hover:text-brand-700 dark:border-white/15 dark:bg-white/5 dark:text-ink-300 dark:hover:border-white/30 dark:hover:text-white"
      aria-label={label}
    >
      {downloaded ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Download className="h-3.5 w-3.5" aria-hidden />}
      {downloaded ? "Downloaded" : label}
    </button>
  );
}

const RESUME_OPTIONS = [
  {
    href: "/resume/Shamik_Mukherjee_CV_UK_Ireland.pdf",
    // Plain text codes, not flag emoji — combined-flag sequences (GB+IE) fall back to
    // raw region-indicator letters ("GBIE") on systems without full emoji-ZWJ support.
    code: "GB · IE",
    label: "UK / Ireland format",
    sublabel: null,
  },
  {
    href: "/resume/Shamik_Mukherjee_CV_Germany_Lebenslauf.pdf",
    code: "DE",
    label: "Germany format",
    sublabel: "Lebenslauf",
  },
];

/** Split-button pattern (à la GitHub's release download button): one click reveals
 *  both market formats as direct downloads, rather than guessing which one to link. */
export function ResumeDownloadButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="inline-flex items-center gap-1.5 rounded-full border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      >
        <FileDown className="h-4 w-4" aria-hidden />
        Resume
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-card-hover dark:border-white/15 dark:bg-ink-900"
        >
          {RESUME_OPTIONS.map((opt) => (
            <a
              key={opt.href}
              href={opt.href}
              download
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-ink-50 dark:hover:bg-white/10"
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-ink-900 dark:text-white">{opt.label}</span>
                {opt.sublabel && <span className="text-xs text-ink-500 dark:text-ink-400">{opt.sublabel}</span>}
              </span>
              <span className="flex-shrink-0 rounded-full bg-ink-100 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-ink-500 dark:bg-white/10 dark:text-ink-400">
                {opt.code}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
