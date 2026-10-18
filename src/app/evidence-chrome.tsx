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

// The evidence site's body has no dark: styling and is meant to stay light always. Nav/Footer are
// shared with /archive (which does support dark mode), so the global theme toggle set on /archive
// would otherwise leak into these components here too (Tailwind's dark: variant matches any
// ancestor with the "dark" class, so a nested next-themes provider can't locally override the
// root html element). Disable dark-mode classes and the toggle outright for this site's chrome.
export function EvidenceNav() {
  return <Nav homeHref={EVIDENCE_HOME} links={EVIDENCE_LINKS} showThemeToggle={false} enableDarkMode={false} />;
}

export function EvidenceFooter() {
  return <Footer showCta={false} showToolLine={false} approachHref="/approach/" enableDarkMode={false} />;
}
