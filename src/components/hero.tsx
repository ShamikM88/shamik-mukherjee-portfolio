import Image from "next/image";
import { Mail, ArrowDown } from "lucide-react";
import { identity, statStrip } from "@/data/content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div className="flex flex-col items-start gap-7 order-2 lg:order-1">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              Currently: {identity.currentRole} · {identity.currentEmployer}
            </span>

            <h1 className="text-balance font-display text-5xl font-semibold leading-[1.05] text-ink-900 dark:text-white sm:text-6xl lg:text-[4.25rem]">
              Hi, I&apos;m {identity.name.split(" ")[0]}.
            </h1>

            <p className="max-w-lg text-balance font-display text-2xl font-medium leading-snug text-brand-700 dark:text-brand-400">
              {identity.headline}
            </p>

            <p className="max-w-lg text-lg leading-relaxed text-ink-600 dark:text-ink-300">
              {identity.domainLine}. Based in {identity.location}.
            </p>

            <div className="flex flex-wrap gap-3 pt-3">
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email Me
              </a>
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink-600 underline decoration-ink-300 decoration-1 underline-offset-4 transition-colors hover:text-brand-700 hover:decoration-brand-400 dark:text-ink-300 dark:decoration-ink-700 dark:hover:text-brand-400"
              >
                See my work
                <ArrowDown className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-[2rem] shadow-card-hover sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem]">
              <Image
                src={identity.photo}
                alt={`${identity.name} headshot`}
                fill
                sizes="(min-width: 1024px) 352px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-ink-200 pt-10 dark:border-ink-800 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {statStrip.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dd className="font-display text-4xl font-bold text-ink-900 dark:text-white">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-ink-600 dark:text-ink-300">{stat.label}</dd>
              <dt className="mt-0.5 text-xs text-ink-400 dark:text-ink-500">{stat.sublabel}</dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
