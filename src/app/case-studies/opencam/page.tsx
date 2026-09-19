import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { OpenCamSection } from "@/components/opencam-section";
import { Footer } from "@/components/footer";
import { openCam } from "@/data/content";

export const metadata: Metadata = {
  title: `${openCam.title} — Shamik Mukherjee`,
  description:
    "Solo-built Maker-Checker multi-agent system for Credit Assessment Memorandum drafting, gated by a deterministic policy engine.",
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
            Back to case studies
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
          <OpenCamSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
