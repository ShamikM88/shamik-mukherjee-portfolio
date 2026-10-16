import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ArchiveNav } from "@/app/archive/archive-chrome";
import { AboutSection } from "@/components/about-section";
import { ArchiveFooter } from "@/app/archive/archive-chrome";

export const metadata: Metadata = {
  title: "About — Shamik Mukherjee",
  description:
    "Career timeline, education, awards, and core skills for Shamik Mukherjee, Product Owner in digital payments.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <>
      <ArchiveNav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8">
          <Link
            href="/archive/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back home
          </Link>
        </div>
        <AboutSection />
      </main>
      <ArchiveFooter showCta={false} />
    </>
  );
}
