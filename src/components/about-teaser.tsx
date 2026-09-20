import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { about } from "@/data/content";
import { Badge } from "@/components/ui";

export function AboutTeaser() {
  return (
    <section className="border-t border-ink-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-8 rounded-3xl border border-ink-200 bg-white p-8 dark:border-white/10 dark:bg-white/[0.03] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              About
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
              Same delivery discipline, pointed at a different kind of team member.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
              {about.bio}
            </p>
            <Link
              href="/about/"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
            >
              More about me
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            {about.featuredSkills.map((tag) => (
              <Badge key={tag} tone="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
