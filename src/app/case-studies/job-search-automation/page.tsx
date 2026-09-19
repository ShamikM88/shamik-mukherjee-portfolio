import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { ForkSection } from "@/components/fork-section";
import { GovernanceSection } from "@/components/governance-section";
import { Footer } from "@/components/footer";
import { fork } from "@/data/content";

export const metadata: Metadata = {
  title: `${fork.title} — Shamik Mukherjee`,
  description:
    "Extended an open-source job-search framework with Gmail status sync, repost-dedup hardening, and a live application dashboard.",
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
            Back to case studies
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <ForkSection />
        </div>
        <div className="mx-auto max-w-5xl border-t border-ink-200 px-6 py-16 dark:border-white/10 sm:px-8 sm:py-20">
          <GovernanceSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
