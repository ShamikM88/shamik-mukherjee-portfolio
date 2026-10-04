import Link from "next/link";
import { identity } from "@/data/content";
import { T } from "./data";

// Dark header and footer for the Approach and About pages. These move to the light system in
// their own step; the golden cases and the evidence home use the site's own Nav and Footer.
export function EvidenceHeader() {
  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ borderColor: T.border, background: "rgba(7,11,18,0.9)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5 sm:px-8">
        <Link href="/pages/evidence" className="font-mono text-sm font-semibold" style={{ color: T.text }}>
          shamik<span style={{ color: T.teal }}>@</span>evidence
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs" style={{ color: T.secondary }}>
          <Link href="/pages/evidence#ship" className="hover:underline">ship</Link>
          <Link href="/pages/evidence/approach" className="hover:underline">how I work</Link>
          <Link href="/pages/evidence/about" className="hover:underline">about</Link>
        </nav>
      </div>
    </header>
  );
}

export function EvidenceFooter() {
  return (
    <footer className="border-t" style={{ borderColor: T.border, background: T.ink }}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 font-mono text-xs sm:flex-row sm:items-center sm:justify-between sm:px-8" style={{ color: T.muted }}>
        <span>
          <span style={{ color: T.teal }}>$</span> connect · {identity.name}
        </span>
        <div className="flex flex-wrap gap-5">
          <a href={`mailto:${identity.email}`} className="hover:underline" style={{ color: T.secondary }}>email</a>
          <a href={identity.linkedin} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: T.secondary }}>linkedin ↗</a>
          <a href={identity.github} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: T.secondary }}>github ↗</a>
        </div>
      </div>
    </footer>
  );
}
