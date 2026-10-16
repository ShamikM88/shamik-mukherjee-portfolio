import { ArchiveNav } from "@/app/archive/archive-chrome";
import { Hero } from "@/components/hero";
import { CaseStudiesTeaser } from "@/components/case-studies-teaser";
import { AboutTeaser } from "@/components/about-teaser";
import { ArchiveFooter } from "@/app/archive/archive-chrome";

export const metadata = { robots: { index: false, follow: false } };

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
