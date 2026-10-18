"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { identity } from "@/data/content";
import { ThemeToggle } from "@/components/theme-toggle";
import { ResumeDownloadButton } from "@/components/ui";

const LINKS = [
  { href: "/#ship", label: "Case studies" },
  { href: "/approach/", label: "Delivery approach" },
  { href: "/about/", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export type NavLink = { href: string; label: string };

// Defaults are the live site's navigation. Evidence pages pass their own links and home, so the
// shared component never changes what the live site renders.
export function Nav({
  homeHref = "/",
  links = LINKS,
  showThemeToggle = true,
  enableDarkMode = true,
}: {
  homeHref?: string;
  links?: NavLink[];
  showThemeToggle?: boolean;
  enableDarkMode?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  // Tailwind's dark: variant matches any ancestor with the "dark" class, so it can't be scoped
  // off locally when the global theme is dark - the classes themselves must be omitted instead.
  const d = (cls: string) => (enableDarkMode ? cls : "");

  return (
    <header
      className={`sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/85 backdrop-blur-md ${d("dark:border-white/10 dark:bg-ink-950/80")}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href={homeHref} className="flex items-center gap-2.5">
          <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl">
            <Image src={identity.photo} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className={`hidden font-display text-sm font-semibold text-ink-900 sm:inline ${d("dark:text-white")}`}>
            {identity.name}
          </span>
        </Link>

        <nav className={`hidden items-center gap-5 text-sm font-medium text-ink-600 md:flex lg:gap-8 ${d("dark:text-ink-300")}`}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`-mx-3 rounded-full px-3 py-1.5 transition-colors hover:bg-ink-900/5 hover:text-ink-900 ${d("dark:hover:bg-white/10 dark:hover:text-white")}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className={`hidden h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 sm:flex ${d("dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white")}`}
          >
            <Github className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className={`hidden h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 sm:flex ${d("dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white")}`}
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden />
          </a>
          {showThemeToggle && <ThemeToggle />}
          <ResumeDownloadButton className="ml-1 hidden md:block" />
          <a
            href={`mailto:${identity.email}`}
            className={`hidden items-center gap-1.5 rounded-full border border-ink-300 bg-ice-50 px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 md:inline-flex ${d("dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10")}`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 md:hidden ${d("dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white")}`}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`border-t border-ink-200/70 bg-ink-50/95 px-6 py-4 backdrop-blur-md sm:px-8 md:hidden ${d("dark:border-white/10 dark:bg-ink-950/95")}`}
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 ${d("dark:text-ink-200 dark:hover:bg-white/10")}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className={`mt-3 flex flex-col gap-2 border-t border-ink-200/70 pt-3 ${d("dark:border-white/10")}`}>
            <a
              href={`mailto:${identity.email}`}
              className={`inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-300 bg-ice-50 px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 ${d("dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10")}`}
            >
              <Mail className="h-4 w-4" aria-hidden />
              Let&apos;s talk
            </a>
            <ResumeDownloadButton className="[&>button]:w-full [&>button]:justify-center" />
            <div className="flex items-center gap-2">
              <a
                href={identity.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 ${d("dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white")}`}
              >
                <Github className="h-[18px] w-[18px]" aria-hidden />
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 ${d("dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white")}`}
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
