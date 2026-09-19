import { GraduationCap, Award, Languages as LanguagesIcon, MapPin } from "lucide-react";
import { about, identity } from "@/data/content";
import { Badge } from "@/components/ui";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-ink-200 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          About
        </h2>

        <p className="mt-5 max-w-3xl text-balance font-display text-2xl font-medium leading-snug text-ink-900 dark:text-white sm:text-3xl">
          {about.bio}
        </p>

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

        {/* Career Timeline */}
        <div className="mt-20">
          <h3 className="mb-10 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Career Timeline
          </h3>
          <ol className="relative flex flex-col gap-10 border-l-2 border-ink-200 pl-7 dark:border-white/10">
            {about.timeline.map((role) => (
              <li key={`${role.title}-${role.dates}`} className="relative">
                <span
                  className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-ink-50 bg-brand-500 dark:border-ink-950"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h4 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                    {role.title}
                  </h4>
                  <span className="font-mono text-xs text-ink-400 dark:text-ink-500">{role.dates}</span>
                </div>
                <p className="mt-0.5 text-sm text-brand-700 dark:text-brand-400">
                  {role.company} · {role.location}
                </p>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-600 dark:text-ink-300">
                  {role.highlight}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Education + Awards */}
        <div className="mt-20 grid grid-cols-1 gap-14 sm:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <GraduationCap className="h-4 w-4" aria-hidden />
              Education
            </h3>
            <div className="flex flex-col gap-5">
              {about.education.map((ed) => (
                <div key={ed.degree}>
                  <p className="font-display text-base font-semibold text-ink-900 dark:text-white">
                    {ed.degree}
                  </p>
                  <p className="text-sm text-ink-500 dark:text-ink-400">
                    {ed.institution} · {ed.period} · {ed.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              <Award className="h-4 w-4" aria-hidden />
              Awards
            </h3>
            <ul className="flex flex-col gap-2.5">
              {about.awards.map((a) => (
                <li key={a} className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {a}
                </li>
              ))}
            </ul>
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
      </div>
    </section>
  );
}
