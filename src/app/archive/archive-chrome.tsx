import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import type { NavLink } from "@/components/nav";

const ARCHIVE_LINKS: NavLink[] = [
  { href: "/archive/#work", label: "Case studies" },
  { href: "/archive/approach/", label: "Delivery approach" },
  { href: "/archive/about/", label: "About" },
  { href: "/archive/#contact", label: "Contact" },
];

export function ArchiveNav() {
  return <Nav homeHref="/archive/" links={ARCHIVE_LINKS} />;
}

export function ArchiveFooter({
  showCta,
  showToolLine,
}: {
  showCta?: boolean;
  showToolLine?: boolean;
}) {
  return (
    <Footer
      showCta={showCta}
      showToolLine={showToolLine}
      approachHref="/archive/approach/"
    />
  );
}
