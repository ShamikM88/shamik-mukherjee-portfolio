import { Building2, GraduationCap, Briefcase, Rocket, Languages as LanguagesIcon, MapPin, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { about, identity } from "@/data/content";
import { Badge } from "@/components/ui";

const CHAPTER_ICONS = { building: Building2, graduation: GraduationCap, briefcase: Briefcase, rocket: Rocket } as const;

export function AboutSection() {
  return (
    <section id="about" className="border-t border-ink-200 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          About me
        </h2>

        <h3 className="mt-5 max-w-3xl text-balance font-display text-3xl font-semibold leading-snug text-ink-900 dark:text-white sm:text-4xl">
          {about.headline}
        </h3>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">{about.bio}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500 dark:text-ink-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" aria-hidden />
            {identity.location}
          </span>
          <span className="flex items-center gap-1.5">
            <LanguagesIcon className="h-4 w-4" aria-hidden />
            {about.languages.join(" · ")}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-ink-200 pt-8 dark:border-white/10">
          {about.heroStats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-brand-600 dark:text-brand-400">{stat.value}</p>
              <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Career Timeline */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Career timeline
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            The path so far
          </h3>
          <ol className="relative mt-10 flex flex-col gap-6 border-l-2 border-ink-200 pl-10 dark:border-white/10 sm:pl-12">
            {about.chapters.map((chapter) => {
              const Icon = CHAPTER_ICONS[chapter.icon as keyof typeof CHAPTER_ICONS];
              return (
                <li key={chapter.company + chapter.dates} className="relative">
                  <span className="absolute -left-[52px] top-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-brand-600 dark:border-white/10 dark:bg-ink-900 dark:text-brand-400 sm:-left-[58px]">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                      {chapter.dates}
                    </p>
                    <h4 className="mt-1.5 font-display text-lg font-semibold text-ink-900 dark:text-white">
                      {chapter.company}
                    </h4>
                    <p className="mt-0.5 text-sm text-ink-500 dark:text-ink-400">{chapter.subtitle}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                      {chapter.description}
                    </p>
                    {chapter.highlights && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {chapter.highlights.map((h) => (
                          <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-brand-500" aria-hidden />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Career Progression */}
        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Career progression
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {about.progression.heading}
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {about.progression.items.map((item, i) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <p className="font-display text-sm font-semibold text-ember-600 dark:text-ember-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 font-display text-base font-semibold text-ink-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Philosophy */}
        <div className="mt-20 max-w-2xl">
          <h3 className="mb-6 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {about.philosophy.heading}
          </h3>
          <div className="flex flex-col gap-4">
            {about.philosophy.paragraphs.map((p) => (
              <p key={p} className="text-base leading-relaxed text-ink-600 dark:text-ink-300">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* What I Bring */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              What I bring
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
              {about.whatIBring.heading}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
              {about.whatIBring.body}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
            {about.whatIBring.tags.map((tag) => (
              <Badge key={tag} tone="ember">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20">
          <h3 className="mb-6 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Core Skills
          </h3>
          <div className="flex flex-col gap-5">
            {about.skills.map((group) => (
              <div key={group.category} className="flex flex-wrap items-baseline gap-x-2 gap-y-2">
                <span className="text-sm font-medium text-ink-900 dark:text-white">
                  {group.category}
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <Badge key={tag} tone="neutral">
                      {tag}
                    </Badge>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Chapter CTA */}
        <div className="mt-20 rounded-3xl border border-ink-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/[0.03] sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {about.nextChapter.eyebrow}
          </p>
          <h3 className="mx-auto mt-3 max-w-xl text-balance font-display text-2xl font-semibold text-ink-900 dark:text-white sm:text-3xl">
            {about.nextChapter.heading}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-ink-600 dark:text-ink-300">
            {about.nextChapter.subtext}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-transform hover:scale-[1.02]"
            >
              View case studies
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
