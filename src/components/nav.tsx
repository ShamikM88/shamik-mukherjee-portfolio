"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-ink-50 dark:border-ink-800 dark:bg-ink-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-sm font-semibold text-ink-900 dark:text-white"
        >
          <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-brand-300 dark:border-brand-700">
            <Image src={identity.photo} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="hidden sm:inline">{identity.name}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-600 dark:text-ink-300 md:flex">
          <a href="#about" className="transition-colors hover:text-brand-700 dark:hover:text-brand-400">
            About
          </a>
          <a href="#showcase" className="transition-colors hover:text-brand-700 dark:hover:text-brand-400">
            Work
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <Github className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <ThemeToggle />
          <a
            href={`mailto:${identity.email}`}
            className="hidden items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email Me
          </a>
        </div>
      </div>
    </header>
  );
}
