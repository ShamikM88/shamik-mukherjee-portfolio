import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { ForkBanner } from "@/components/project-thumbnails";
import { LiveCommitsAhead } from "@/components/live-github-stat";
import { openCam, fork } from "@/data/content";
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
            repoUrl={fork.forkRepoUrl}
            markdown={jobSearchForkMarkdown}
            meta={fork.meta}
            problem={fork.problem}
            process={fork.process}
            decisions={fork.decisions}
            outcomes={fork.outcomes}
            visuals={fork.visuals}
            heroIllustration={<ForkBanner />}
            visualIllustrations={[
              <Image
                key="a"
                src="/build-shots/fork-commits.png"
                alt="Commit history on the ai-job-search fork's GitHub repository"
                width={1280}
                height={820}
                className="h-full w-full object-cover object-top"
              />,
              <Image
                key="b"
                src="/build-shots/dashboard-filtered.png"
                alt="The live job-search dashboard filtered to postings not yet applied to"
                width={1353}
                height={770}
                className="h-full w-full object-cover object-top"
              />,
            ]}
            related={{
              href: "/case-studies/opencam/",
              title: openCam.shortTitle,
              description: openCam.subtitle,
            }}
            baseRepo={{ url: fork.baseRepoUrl, label: "Forked from MadsLorentzen/ai-job-search" }}
            outcomeStatOverrides={{
              1: <LiveCommitsAhead repo="ShamikM88/ai-job-search" base="MadsLorentzen:master" fallback={48} />,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
