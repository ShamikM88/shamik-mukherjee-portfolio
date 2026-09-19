import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { CaseStudiesTeaser } from "@/components/case-studies-teaser";
import { AboutTeaser } from "@/components/about-teaser";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <CaseStudiesTeaser />
        <AboutTeaser />
      </main>
      <Footer />
    </>
  );
}
