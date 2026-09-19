import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/nav";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About — Shamik Mukherjee",
  description:
    "Career timeline, education, awards, and core skills for Shamik Mukherjee, Product Owner in digital payments.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="mx-auto max-w-5xl px-6 pt-10 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back home
          </Link>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
