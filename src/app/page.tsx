import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { Tabs } from "@/components/tabs";
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
        <AboutSection />

        <section className="mx-auto max-w-5xl border-t border-ink-200 px-6 py-20 dark:border-ink-800 sm:px-8 sm:py-28">
          <Tabs
            tabs={[
              { id: "opencam", label: "OpenCAM Framework", content: <OpenCamSection /> },
              { id: "fork", label: "Job Search Automation", content: <ForkSection /> },
              { id: "governance", label: "Delivery Model", content: <GovernanceSection /> },
            ]}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
