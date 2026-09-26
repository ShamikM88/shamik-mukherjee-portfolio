import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { ScopeLanes } from "@/components/scope-lanes";
import { OpenCamWorkflowDiagram } from "@/components/opencam-workflow-diagram";
import { OpenCamBanner } from "@/components/project-thumbnails";
import { LiveMergedPRCount, LiveClosedIssueCount, LiveTestCount } from "@/components/live-github-stat";
import { ImpactEffortQuadrant } from "@/components/impact-effort-quadrant";
import { openCam } from "@/data/content";
import { openCamMarkdown } from "@/lib/case-study-markdown";

export const metadata: Metadata = {
  title: `${openCam.shortTitle} — Shamik Mukherjee`,
  description: openCam.subtitle,
};

export default function OpenCamPage() {
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
            title={openCam.title}
            badges={openCam.badges}
            subtitle={openCam.subtitle}
            takeaway={openCam.takeaway}
            repoUrl={openCam.repoUrl}
            markdown={openCamMarkdown}
            markdownFilename="OpenCAM-Framework-Case-Study.md"
            meta={openCam.meta}
            problem={openCam.problem}
            scope={openCam.scope}
            features={openCam.features}
            workflow={openCam.workflow}
            workflowIllustration={<OpenCamWorkflowDiagram />}
            strategy={openCam.strategy}
            process={openCam.process}
            decisions={openCam.decisions}
            outcomes={openCam.outcomes}
            outcomesExtra={
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Next horizon
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink-900 dark:text-white">
                  {openCam.mvp2.heading}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {openCam.mvp2.intro}
                </p>
                <div className="mt-6">
                  <ScopeLanes lanes={openCam.mvp2.lanes} />
                </div>
                <p className="mt-8 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  MoSCoW above is how I scoped round 2 itself; this board is how I sequence what&apos;s
                  inside it — live from the repo&apos;s own issue labels, so it never goes stale the
                  way a hand-maintained backlog table would. Click a point to open the real issue.
                </p>
                <div className="mt-4">
                  <ImpactEffortQuadrant repo="ShamikM88/open-cam-framework" />
                </div>
              </div>
            }
            visuals={openCam.visuals}
            heroIllustration={<OpenCamBanner />}
            currentCaseStudyId="opencam"
            headerExtra={
              <>
                <LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={60} />
                <span aria-hidden> · </span>
                <LiveClosedIssueCount repo="ShamikM88/open-cam-framework" fallback={36} />
              </>
            }
            // Index 1 - the "passing tests" stat in openCam.outcomes.stats (content.ts).
            // Test count has no GitHub API, so it's fetched from badges/test-count.json
            // (code-enforced against real pytest output, PR #118) instead of search API.
            outcomeStatOverrides={{
              1: <LiveTestCount repo="ShamikM88/open-cam-framework" fallback={439} />,
            }}
          />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
