import { Footer } from "@/components/footer";
import { Nav, type NavLink } from "@/components/nav";

// Navigation for the Evidence hierarchy. Every link stays inside /pages/evidence, so visitors
// never leave the review route for the legacy site by accident.
const EVIDENCE_HOME = "/pages/evidence/";

const EVIDENCE_LINKS: NavLink[] = [
  { href: "/pages/evidence/#ship", label: "What shipped" },
  { href: "/pages/evidence/approach/", label: "How I work" },
  { href: "/pages/evidence/about/", label: "About" },
  { href: "/pages/evidence/#contact", label: "Contact" },
];

export function EvidenceNav() {
  return <Nav homeHref={EVIDENCE_HOME} links={EVIDENCE_LINKS} />;
}

export function EvidenceFooter() {
  return <Footer showCta={false} showToolLine={false} approachHref="/pages/evidence/approach/" />;
}
