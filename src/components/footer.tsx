import { Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white dark:border-ink-800 dark:bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          Let&apos;s talk about product, AI-directed delivery, or payments.
        </h2>
        <a
          href={`mailto:${identity.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Email Me
        </a>
        <div className="flex items-center gap-4">
          <a
            href={identity.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-ink-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Github className="h-5 w-5" aria-hidden />
          </a>
          <a
            href={identity.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-ink-400 transition-colors hover:text-brand-600 dark:hover:text-brand-400"
          >
            <Linkedin className="h-5 w-5" aria-hidden />
          </a>
        </div>
        <p className="text-xs text-ink-400 dark:text-ink-500">
          © {new Date().getFullYear()} {identity.name} · {identity.location}
        </p>
      </div>
    </footer>
  );
}
