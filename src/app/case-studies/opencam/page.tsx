import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { OpenCamBanner } from "@/components/project-thumbnails";
import { LiveMergedPRCount } from "@/components/live-github-stat";
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
            workflowIllustration={
              <Image
                src="/illustrations/opencam-workflow.jpg"
                alt="OpenCAM pipeline diagram: /calibrate forks into /triage or /research, both converging into /spread, /collateral, /project, /assemble; /research also has a standalone Research Brief export"
                width={1200}
                height={896}
                className="h-full w-full object-cover"
              />
            }
            strategy={openCam.strategy}
            process={openCam.process}
            decisions={openCam.decisions}
            outcomes={openCam.outcomes}
            visuals={openCam.visuals}
            heroIllustration={<OpenCamBanner />}
            currentCaseStudyId="opencam"
            headerExtra={<LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={37} />}
          />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
