import { Footer } from "@/components/footer";
import { Nav, type NavLink } from "@/components/nav";

// Navigation for the evidence-first primary site. Its links stay within the main portfolio.
const EVIDENCE_HOME = "/";

const EVIDENCE_LINKS: NavLink[] = [
  { href: "/#ship", label: "What shipped" },
  { href: "/approach/", label: "How I work" },
  { href: "/about/", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function EvidenceNav() {
  return <Nav homeHref={EVIDENCE_HOME} links={EVIDENCE_LINKS} />;
}

export function EvidenceFooter() {
  return <Footer showCta={false} showToolLine={false} approachHref="/approach/" />;
}
