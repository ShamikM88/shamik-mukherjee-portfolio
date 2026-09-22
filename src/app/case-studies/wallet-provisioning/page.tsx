import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CaseStudyDetail } from "@/components/case-study-detail";
import { WalletProvisioningBanner } from "@/components/project-thumbnails";
import { walletProvisioning } from "@/data/content";
import { walletProvisioningMarkdown } from "@/lib/case-study-markdown";

export const metadata: Metadata = {
  title: `${walletProvisioning.shortTitle} — Shamik Mukherjee`,
  description: walletProvisioning.subtitle,
};

export default function WalletProvisioningPage() {
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
            title={walletProvisioning.title}
            badges={walletProvisioning.badges}
            subtitle={walletProvisioning.subtitle}
            takeaway={walletProvisioning.takeaway}
            repoUrl={walletProvisioning.repoUrl}
            repoLabel={walletProvisioning.repoLabel}
            showApproachLink={false}
            markdown={walletProvisioningMarkdown}
            markdownFilename="Google-Pay-Samsung-Pay-Wallet-Provisioning-Case-Study.md"
            meta={walletProvisioning.meta}
            calloutNote={{
              text: "Specifications run in one of two directions: built to a partner's spec, or owned by the network with partners building to it. This sits on the network-driven side — Google and Samsung each integrate against their own B2B specification, both of which my team defines and maintains.",
            }}
            problem={walletProvisioning.problem}
            scope={walletProvisioning.scope}
            caselets={walletProvisioning.caselets}
            outcomes={walletProvisioning.outcomes}
            heroIllustration={<WalletProvisioningBanner />}
            currentCaseStudyId="wallet-provisioning"
          />
        </div>
      </main>
      <Footer showCta={false} />
    </>
  );
}
