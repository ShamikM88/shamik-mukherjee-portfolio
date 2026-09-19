import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { OpenCamBanner } from "@/components/project-thumbnails";
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
            ]}
            related={{
              href: "/case-studies/job-search-automation/",
              title: fork.shortTitle,
              description: fork.subtitle,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
