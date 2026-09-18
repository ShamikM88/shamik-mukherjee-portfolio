import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
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

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
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
