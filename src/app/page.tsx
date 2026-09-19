import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CaseStudiesTeaser } from "@/components/case-studies-teaser";
import { AboutSection } from "@/components/about-section";
import { OpenCamSection } from "@/components/opencam-section";
import { ForkSection } from "@/components/fork-section";
import { GovernanceSection } from "@/components/governance-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudiesTeaser />
        <AboutSection />

        <section
          id="opencam"
          className="mx-auto max-w-5xl border-t border-ink-200 px-6 py-20 dark:border-white/10 sm:px-8 sm:py-28"
        >
          <OpenCamSection />
        </section>

        <section
          id="fork"
          className="mx-auto max-w-5xl border-t border-ink-200 px-6 py-20 dark:border-white/10 sm:px-8 sm:py-28"
        >
          <ForkSection />
        </section>

        <section
          id="delivery-model"
          className="mx-auto max-w-5xl border-t border-ink-200 px-6 py-20 dark:border-white/10 sm:px-8 sm:py-28"
        >
          <GovernanceSection />
        </section>
      </main>
      <Footer />
    </>
  );
}
