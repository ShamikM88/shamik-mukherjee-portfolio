import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { ForkBanner } from "@/components/project-thumbnails";
import { LiveCommitsAhead } from "@/components/live-github-stat";
import { fork } from "@/data/content";
import { jobSearchForkMarkdown } from "@/lib/case-study-markdown";

export const metadata: Metadata = {
  title: `${fork.shortTitle} — Shamik Mukherjee`,
  description: fork.subtitle,
};

export default function JobSearchAutomationPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            All case studies
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
          <CaseStudyDetail
            title={fork.title}
            badges={fork.badges}
            subtitle={fork.subtitle}
            takeaway={fork.takeaway}
            repoUrl={fork.forkRepoUrl}
            markdown={jobSearchForkMarkdown}
            markdownFilename="AI-Job-Search-Fork-Case-Study.md"
            meta={fork.meta}
            problem={fork.problem}
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
              2: <LiveCommitsAhead repo="ShamikM88/ai-job-search" base="MadsLorentzen:master" fallback={48} />,
            }}
            calloutNote={{
              text: "Run in Fast-Iterate mode — lighter process ceremony by design for solo personal tooling, not a lower bar.",
              linkHref: "/approach/",
              linkLabel: "See the governance comparison against OpenCAM →",
            }}
          />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
