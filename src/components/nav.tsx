"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-ink-50/85 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <span className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl">
            <Image src={identity.photo} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="hidden font-display text-sm font-semibold text-ink-900 dark:text-white sm:inline">
            {identity.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-600 dark:text-ink-300 md:flex">
          <a href="/#work" className="transition-colors hover:text-ink-900 dark:hover:text-white">
            Case studies
          </a>
          <a href="/about/" className="transition-colors hover:text-ink-900 dark:hover:text-white">
            About
          </a>
          <a href="/#contact" className="transition-colors hover:text-ink-900 dark:hover:text-white">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Github className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <ThemeToggle />
          <a
            href={`mailto:${identity.email}`}
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
}
