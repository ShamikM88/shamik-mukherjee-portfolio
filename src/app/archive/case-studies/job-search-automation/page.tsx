import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ArchiveNav } from "@/app/archive/archive-chrome";
import { ArchiveFooter } from "@/app/archive/archive-chrome";
import { CaseStudyToc } from "@/components/case-study-toc";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { ForkBanner } from "@/components/project-thumbnails";
import { LiveCommitsAhead } from "@/components/live-github-stat";
import { fork } from "@/data/content";

export const metadata: Metadata = {
  title: `${fork.shortTitle} — Shamik Mukherjee`,
  description: fork.subtitle,
  robots: { index: false, follow: false },
};

export default function JobSearchAutomationPage() {
  return (
    <>
      <ArchiveNav />
      <CaseStudyToc />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8">
          <a
            href="/archive/#work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All case studies
          </a>
        </div>
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
          <CaseStudyDetail
            title={fork.title}
            badges={fork.badges}
            subtitle={fork.subtitle}
            takeaway={fork.takeaway}
            repoUrl={fork.forkRepoUrl}
            meta={fork.meta}
            problem={fork.problem}
            scope={fork.scope}
            process={fork.process}
            decisions={fork.decisions}
            outcomes={fork.outcomes}
            visuals={fork.visuals}
            heroIllustration={<ForkBanner />}
            currentCaseStudyId="fork"
            baseRepo={{ url: fork.baseRepoUrl, label: "Forked from MadsLorentzen/ai-job-search" }}
            // Index 2 now, not 1 - the outcomes.stats array in content.ts was reordered
            // (2026-09-23) so "0 PII..." leads instead of the gameable "150+ postings" figure;
            // this override must track whichever index the "48 commits" stat now sits at.
            outcomeStatOverrides={{
              2: <LiveCommitsAhead repo="ShamikM88/ai-job-search" base="MadsLorentzen:master" fallback={57} />,
            }}
            calloutNote={{
              text: "Run in Fast-Iterate mode — lighter process ceremony by design for solo personal tooling, not a lower bar.",
              linkHref: "/approach/",
              linkLabel: "See the governance comparison against OpenCAM →",
            }}
          />
        </div>
      </main>
      <ArchiveFooter showCta={false} />
    </>
  );
}
