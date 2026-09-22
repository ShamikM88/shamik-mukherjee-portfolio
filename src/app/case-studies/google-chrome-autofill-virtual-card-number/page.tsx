import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { ChromeAutofillBanner } from "@/components/project-thumbnails";
import { chromeAutofill } from "@/data/content";
import { chromeAutofillMarkdown } from "@/lib/case-study-markdown";

export const metadata: Metadata = {
  title: `${chromeAutofill.shortTitle} — Shamik Mukherjee`,
  description: chromeAutofill.subtitle,
};

// The second Problem paragraph links "Virtual Cards v1" to Google's own public API docs
// (the same URL as the header's "View Google's API Docs" button). Built here as JSX
// rather than in content.ts's plain-string paragraphs, since content.ts is a .ts file
// and can't hold JSX - only this one paragraph is reconstructed; paragraph 1 is pulled
// straight from content.ts unchanged, so there's only one wording to keep in sync
// (this paragraph's own text still needs to match content.ts / case-study-markdown.ts
// if either is ever edited).
const problemWithLink = {
  ...chromeAutofill.problem,
  paragraphs: [
    chromeAutofill.problem.paragraphs[0],
    <>
      Google defined the overarching solution and API framework (
      <a
        href={chromeAutofill.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-brand-600 underline underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
      >
        Virtual Cards v1
      </a>
      ) — but the reality of enterprise software is that execution is where integrations actually succeed or fail.
      Translating Google&apos;s strict cloud requirements into the network&apos;s highly regulated, legacy backend
      architecture was where the real delivery risk lived: there was nowhere in the existing estate for this to plug
      into, so delivery meant standing up a new microservice — the edge component for all inbound Google traffic
      into the network, spanning enrolment, unenrolment, retrieval, and sendOTP — hosted on OpenShift (OCP).
    </>,
  ],
};

export default function ChromeAutofillPage() {
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
            title={chromeAutofill.title}
            badges={chromeAutofill.badges}
            subtitle={chromeAutofill.subtitle}
            repoUrl={chromeAutofill.repoUrl}
            repoLabel="View Google's API Docs"
            showApproachLink={false}
            markdown={chromeAutofillMarkdown}
            markdownFilename="Chrome-Virtual-Card-Autofill-Case-Study.md"
            meta={chromeAutofill.meta}
            problem={problemWithLink}
            scope={chromeAutofill.scope}
            features={chromeAutofill.features}
            process={chromeAutofill.process}
            decisions={chromeAutofill.decisions}
            outcomes={chromeAutofill.outcomes}
            visuals={chromeAutofill.visuals}
            heroIllustration={<ChromeAutofillBanner />}
            currentCaseStudyId="chrome-autofill"
          />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
