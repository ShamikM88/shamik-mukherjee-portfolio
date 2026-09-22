import Image from "next/image";
import { ArrowRight, Briefcase, GraduationCap, MapPin, CreditCard } from "lucide-react";
import { identity, about, statStrip } from "@/data/content";

// Quick Profile card — replaces the plain photo. Carries the identity facts (role, domain,
// education, location) directly, so the text column to its left no longer needs to restate them.
function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink-200 bg-white text-brand-600 dark:border-white/10 dark:bg-ink-900 dark:text-brand-400">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-400 dark:text-ink-500">{label}</p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-ink-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

// lg:w-[310px] matches the "View case studies" + "About me" button row's rendered width (310px)
// — below lg both are centered so a small mismatch isn't visible, but lg:items-end right-aligns
// both, and a narrower card there left a bare gap next to the buttons.
function QuickProfileCard() {
  return (
    <div className="relative w-[280px] sm:w-72 lg:w-[310px]">
      {/* Neutral dark glow, not the brand-green gradient used elsewhere - reads as soft
          elevation/depth behind the card rather than a colored wash. */}
      <div className="absolute -inset-3 rounded-[2.25rem] bg-ink-900 opacity-20 blur-2xl dark:bg-black dark:opacity-40" aria-hidden />
      <div className="relative flex flex-col gap-5 rounded-[2rem] border border-ink-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03]">
        {/* Stacked, not side-by-side: a horizontal row forces the photo to compete with the
            name/subtitle for the card's ~260px content width. Centering the photo above the
            text instead removes that ceiling, so it can scale independently of the text. */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
            <Image src={identity.photo} alt={`${identity.name} headshot`} fill sizes="112px" className="object-cover" />
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-ink-900 dark:text-white">{identity.name}</p>
            <p className="text-xs text-ink-500 dark:text-ink-400">Quick profile</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t border-ink-200 pt-5 dark:border-white/10">
          <ProfileRow icon={Briefcase} label="Role" value="Payments Product Owner, Cognizant" />
          <ProfileRow icon={CreditCard} label="Domain" value="Digital Payments · Wallets" />
          <ProfileRow icon={GraduationCap} label="Education" value="MBA, IIT Bombay" />
          <ProfileRow icon={MapPin} label="Location" value="Reading, UK" />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-glow">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14">
        {/* items-start, not items-center: the text column is taller than the photo now that
            it carries the full identity block, and centering left dead space above the photo
            rather than aligning it with the badge at the top of the row. */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="flex flex-col items-start gap-6">
            <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-900 dark:text-white sm:text-5xl lg:text-[3.75rem]">
              {identity.taglineLead}
              <br />
              <span className="text-gradient-brand">{identity.taglineHighlight}</span>
            </h1>

            {/* max-w-2xl, not the old max-w-lg: at wide viewports the H1 above wraps based on
                the full grid column width, so a narrower cap here created an asymmetric gap
                between the headline's right edge and this block's. Widened to track it more
                closely instead of stopping short.
                Domain line, "Based in" line, and the "Currently" chip were dropped from here —
                the Quick Profile card now carries Role/Domain/Location, so restating them here
                was pure duplication. What's left is the two lines the card doesn't cover. */}
            <div className="flex max-w-2xl flex-col gap-1.5 leading-relaxed text-ink-600 dark:text-ink-300">
              <p className="text-xl font-medium text-ink-800 dark:text-ink-100">{identity.headline}</p>
              {/* Reuses About's own accurate phrasing verbatim — "13+ years" is total career
                  tenure (engineering, pre-sales, delivery), not years spent as a PM/PO specifically.
                  Appending it directly to the job title above would misleadingly imply the latter. */}
              <p className="text-lg">{about.headline}</p>
            </div>

            {/* Back in the text column, left-aligned - the Quick Profile card is now a
                self-contained unit on the right and doesn't need the CTAs stacked under it
                for height-balance the way the plain photo once did. */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_24px_-4px_rgba(13,125,92,0.5)] transition-transform hover:scale-[1.02]"
              >
                View case studies
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="/about/"
                className="inline-flex items-center gap-2 rounded-full border border-ink-300 bg-white px-6 py-3 text-sm font-medium text-ink-900 transition-colors hover:border-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                About me
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <QuickProfileCard />
          </div>
        </div>

        {/* No intro line here on purpose — it restated the headline's own claim (real payments
            work + solo AI systems) in a smaller font right before the numbers proved it. Spacing
            tightened from the original mt-20/pt-10 so the stat strip - the site's one piece of
            hard evidence above everything else - lands close to the fold. */}
        <div className="mt-10 flex flex-col gap-8 border-t border-ink-200 pt-6 dark:border-white/10 sm:mt-14 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          {statStrip.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dd className="font-display text-4xl font-bold text-ink-900 dark:text-white">
                {stat.value}
              </dd>
              <dd className="mt-1 text-sm text-ink-600 dark:text-ink-300">{stat.label}</dd>
              <dt className="mt-0.5 text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {stat.sublabel}
              </dt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
