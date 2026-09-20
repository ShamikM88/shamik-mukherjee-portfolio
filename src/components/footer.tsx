import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/content";

export function Footer({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer id="contact" className="border-t border-ink-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        {showCta && (
          <div className="rounded-3xl border border-ink-200 bg-white px-8 py-16 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <h2 className="text-balance font-display text-3xl font-semibold text-ink-900 dark:text-white sm:text-4xl">
              Let&apos;s build something people love.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-ink-600 dark:text-ink-300">
              I&apos;m actively looking for my next Product Manager / Product Owner role. If this
              resonates, say hello.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(13,125,92,0.5)] transition-transform hover:scale-[1.02]"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {identity.email}
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </div>
          </div>
        )}

        <div className={`flex flex-col items-center justify-between gap-4 text-xs text-ink-400 sm:flex-row ${showCta ? "mt-10" : ""}`}>
          <p>
            © {new Date().getFullYear()} {identity.name} · {identity.location}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={identity.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/approach/" className="transition-colors hover:text-brand-600 dark:hover:text-brand-400">
              Delivery approach
            </Link>
            <span>Built with Claude Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
