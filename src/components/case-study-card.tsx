import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chromeAutofill, walletProvisioning, openCam, fork } from "@/data/content";
import {
  ChromeAutofillThumbnail,
  WalletProvisioningThumbnail,
  OpenCamThumbnail,
  ForkThumbnail,
} from "@/components/project-thumbnails";

export type CaseStudyCardAccent = "ember" | "violet" | "brand" | "blue";

export type CaseStudyCardData = {
  id: string;
  href: string;
  thumbnail: ReactNode;
  tags: string[];
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
  accent: CaseStudyCardAccent;
};

// Single source of truth for every "case study card" rendering on the site —
// the home page carousel and each case study's "More case studies" section
// both read from this list, so there's one place to add a 4th case study.
export const CASE_STUDY_CARDS: CaseStudyCardData[] = [
  {
    id: "chrome-autofill",
    href: "/case-studies/google-chrome-autofill-virtual-card-number/",
    thumbnail: <ChromeAutofillThumbnail />,
    tags: chromeAutofill.badges,
    title: chromeAutofill.shortTitle,
    description: chromeAutofill.subtitle,
    statValue: chromeAutofill.outcomes.stats[0].value,
    statLabel: chromeAutofill.outcomes.stats[0].label,
    // Day-job work goes first, deliberately — this is the primary case study,
    // the two personal AI projects below are the differentiator, not the headline.
    accent: "ember",
  },
  {
    id: "wallet-provisioning",
    href: "/case-studies/wallet-provisioning/",
    thumbnail: <WalletProvisioningThumbnail />,
    tags: walletProvisioning.badges,
    title: walletProvisioning.shortTitle,
    description: walletProvisioning.subtitle,
    statValue: walletProvisioning.outcomes.stats[0].value,
    statLabel: walletProvisioning.outcomes.stats[0].label,
    // Second day-job case study — slots in right after Chrome Autofill, still ahead
    // of the personal AI projects, per the same "day job outranks side projects" call.
    accent: "violet",
  },
  {
    id: "opencam",
    href: "/case-studies/opencam/",
    thumbnail: <OpenCamThumbnail />,
    tags: openCam.badges,
    title: openCam.shortTitle,
    description: openCam.subtitle,
    statValue: openCam.outcomes.stats[0].value,
    statLabel: openCam.outcomes.stats[0].label,
    // Matches the brand(green)/blue split established on the Approach page and in
    // the thumbnail illustrations, so a card's accent never contradicts its own image.
    accent: "brand",
  },
  {
    id: "fork",
    href: "/case-studies/job-search-automation/",
    thumbnail: <ForkThumbnail />,
    tags: fork.badges,
    title: fork.shortTitle,
    description: fork.subtitle,
    statValue: fork.outcomes.stats[0].value,
    statLabel: fork.outcomes.stats[0].label,
    accent: "blue",
  },
];

export const ACCENT_STYLES: Record<CaseStudyCardAccent, { border: string; stat: string; link: string }> = {
  ember: {
    border: "hover:border-ember-400",
    stat: "text-ember-600 dark:text-ember-400",
    link: "group-hover:text-ember-600 dark:group-hover:text-ember-400",
  },
  violet: {
    border: "hover:border-violet-400",
    stat: "text-violet-600 dark:text-violet-400",
    link: "group-hover:text-violet-600 dark:group-hover:text-violet-400",
  },
  brand: {
    border: "hover:border-brand-300",
    stat: "text-brand-600 dark:text-brand-400",
    link: "group-hover:text-brand-600 dark:group-hover:text-brand-400",
  },
  blue: {
    border: "hover:border-blue-400",
    stat: "text-blue-600 dark:text-blue-400",
    link: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
  },
};

/** `className` lets callers add layout concerns (carousel width/snap vs. a plain grid cell)
 *  without touching the card's own visual design. */
export function CaseStudyCard({ card, className = "" }: { card: CaseStudyCardData; className?: string }) {
  const accent = ACCENT_STYLES[card.accent];
  return (
    <Link
      href={card.href}
      data-case-study-card
      className={`group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover dark:border-white/10 dark:bg-ink-900 dark:hover:border-white/25 ${accent.border} ${className}`}
    >
      <div className="aspect-[5/3] w-full overflow-hidden">{card.thumbnail}</div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600 dark:bg-white/10 dark:text-ink-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-white">{card.title}</h3>

        <p className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{card.description}</p>

        {/* gap-3 + min-w-0 on the stat block + flex-shrink-0 on the link: without these,
            a long statLabel wraps to 2 lines and can butt straight into "Read case study"
            with no breathing room. */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink-100 pt-4 dark:border-white/10">
          <div className="min-w-0">
            <span className={`font-display text-lg font-bold ${accent.stat}`}>{card.statValue}</span>
            <span className="ml-1.5 text-xs text-ink-500 dark:text-ink-400">{card.statLabel}</span>
          </div>
          <span
            className={`flex flex-shrink-0 items-center gap-1 text-sm font-medium text-ink-500 transition-colors dark:text-ink-400 ${accent.link}`}
          >
            Read case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
