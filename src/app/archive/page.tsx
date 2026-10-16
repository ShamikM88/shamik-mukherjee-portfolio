import { ArchiveNav } from "@/app/archive/archive-chrome";
import { Hero } from "@/components/hero";
import { CaseStudiesTeaser } from "@/components/case-studies-teaser";
import { AboutTeaser } from "@/components/about-teaser";
import { ArchiveFooter } from "@/app/archive/archive-chrome";

export const metadata = {
  title: "Shamik Mukherjee — Senior Product Owner, targeting Product Manager scope",
  description:
    "Product Owner in digital payments and tokenization, building AI-directed multi-agent systems solo. See OpenCAM Framework (a Maker-Checker credit underwriting system) and an automated job-search pipeline.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <>
      <ArchiveNav />
      <main>
        <Hero />
        <CaseStudiesTeaser />
        <AboutTeaser />
      </main>
      <ArchiveFooter />
    </>
  );
}
