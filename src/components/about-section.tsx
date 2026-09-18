import Image from "next/image";
import { GraduationCap, Award, Languages as LanguagesIcon, MapPin } from "lucide-react";
import { about, identity } from "@/data/content";
import { Card, Badge } from "@/components/ui";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* Photo + bio + quick facts */}
        <div className="flex flex-col items-start gap-6">
          <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-2 border-brand-200 shadow-card dark:border-brand-800 sm:h-56 sm:w-56">
            <Image
              src={identity.photo}
              alt={`${identity.name} headshot`}
              fill
              sizes="224px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">About</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {about.bio}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
            <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden />
            {identity.location}
          </div>

          <div className="flex items-start gap-2 text-sm text-ink-500 dark:text-ink-400">
            <LanguagesIcon className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden />
            <div className="flex flex-wrap gap-1.5">
              {about.languages.map((l) => (
                <Badge key={l} tone="neutral">
                  {l}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline + education + awards + skills */}
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="mb-6 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              Career Timeline
            </h3>
            <ol className="relative flex flex-col gap-8 border-l-2 border-ink-200 pl-6 dark:border-ink-800">
              {about.timeline.map((role) => (
                <li key={`${role.title}-${role.dates}`} className="relative">
                  <span
                    className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-500 dark:border-ink-950"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h4 className="font-display text-base font-semibold text-ink-900 dark:text-white">
                      {role.title}
                    </h4>
                    <span className="font-mono text-xs text-ink-400 dark:text-ink-500">{role.dates}</span>
                  </div>
                  <p className="text-sm text-brand-700 dark:text-brand-400">
                    {role.company} · {role.location}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {role.highlight}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Education */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                <GraduationCap className="h-4 w-4" aria-hidden />
                Education
              </h3>
              <div className="flex flex-col gap-3">
                {about.education.map((ed) => (
                  <Card key={ed.degree} hover={false} className="p-4">
                    <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">
                      {ed.degree}
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-400">
                      {ed.institution} · {ed.period}
                    </p>
                    <p className="mt-1 text-xs text-brand-600 dark:text-brand-400">{ed.detail}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                <Award className="h-4 w-4" aria-hidden />
                Awards
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.awards.map((a) => (
                  <Badge key={a} tone="ember">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-400">
              Core Skills
            </h3>
            <div className="flex flex-col gap-4">
              {about.skills.map((group) => (
                <div key={group.category} className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-xs font-medium text-ink-500 dark:text-ink-400">
                    {group.category}:
                  </span>
                  {group.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
