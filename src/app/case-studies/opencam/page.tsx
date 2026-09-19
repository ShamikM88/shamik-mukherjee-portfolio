import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { OpenCamBanner } from "@/components/project-thumbnails";
import { LiveMergedPRCount } from "@/components/live-github-stat";
import { openCam, fork } from "@/data/content";
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
            repoUrl={openCam.repoUrl}
            markdown={openCamMarkdown}
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
            visualIllustrations={[
              <Image
                key="a"
                src="/build-shots/opencam-prs.png"
                alt="Merged pull requests on the open-cam-framework GitHub repository"
                width={1280}
                height={820}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="b"
                src="/build-shots/opencam-issues.png"
                alt="Closed GitHub issues from the 19-issue gap-analysis audit"
                width={1280}
                height={820}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="c"
                src="/build-shots/opencam-enhancements.png"
                alt="GitHub issues tracked with the enhancement label — feature requests from real usage"
                width={1280}
                height={820}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="d"
                src="/build-shots/opencam-spreading-demo.png"
                alt="Financial spreading output showing revenue, EBITDA, and DSCR computed per year from raw line items — synthetic demo data"
                width={953}
                height={1020}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="e"
                src="/build-shots/opencam-cam-facility-demo.png"
                alt="CAM Facility Conditions section with a grounding note disclosing unverified inputs — synthetic demo data"
                width={936}
                height={752}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="f"
                src="/build-shots/opencam-cam-collateral-demo.png"
                alt="CAM Collateral section showing LGD and coverage calculations — synthetic demo data"
                width={932}
                height={747}
                className="h-full w-full object-cover object-top"
              />,
            ]}
            related={{
              href: "/case-studies/job-search-automation/",
              title: fork.shortTitle,
              description: fork.subtitle,
            }}
            headerExtra={<LiveMergedPRCount repo="ShamikM88/open-cam-framework" fallback={37} />}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
