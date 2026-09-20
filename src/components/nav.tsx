"use client";

import * as React from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { identity } from "@/data/content";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/#work", label: "Case studies" },
  { href: "/approach/", label: "Delivery approach" },
  { href: "/about/", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = React.useState(false);

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

        <nav className="hidden items-center gap-5 text-sm font-medium text-ink-600 dark:text-ink-300 md:flex lg:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="-mx-3 rounded-full px-3 py-1.5 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white sm:flex"
          >
            <Github className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white sm:flex"
          >
            <Linkedin className="h-[18px] w-[18px]" aria-hidden />
          </a>
          <ThemeToggle />
          <a
            href={`mailto:${identity.email}`}
            className="ml-1 hidden items-center gap-1.5 rounded-full border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 md:inline-flex"
          >
            <Mail className="h-4 w-4" aria-hidden />
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-200/70 bg-ink-50/95 px-6 py-4 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/95 sm:px-8 md:hidden">
          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-900/5 dark:text-ink-200 dark:hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-ink-200/70 pt-3 dark:border-white/10">
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink-300 bg-white px-4 py-2.5 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Let&apos;s talk
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Github className="h-[18px] w-[18px]" aria-hidden />
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-900/5 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Linkedin className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
