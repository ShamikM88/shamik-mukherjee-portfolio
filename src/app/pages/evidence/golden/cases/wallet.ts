import { walletProvisioning as src } from "@/data/content";
import type { CaseFile, Decision, Stage, TechnicalPanel } from "../types";

// Wallet has no decision records in its source, so each decision below is derived from the
// case's own initiatives and outcomes. "Why" is shown only where the source states the reasoning.
const stages: Stage[] = [
  {
    key: "context",
    label: "Context",
    headline: "A live card portfolio migration, with wallet tokens that have to survive it.",
    points: [
      "The edge applications connect a major US card network to Google Pay and Samsung Pay.",
      "A digital wallet token has to keep working while the underlying card programme changes.",
    ],
  },
  {
    key: "constraint",
    label: "Constraint",
    headline: "Zero cardholder-facing disruption, across two wallets.",
    points: [
      "The migration has to stay invisible to wallet users, through every wave.",
      "Specifications and validation rules were written around one primary issuer's conventions.",
    ],
  },
  {
    key: "observed",
    label: "Observed",
    headline: "Specifications built around one issuer's conventions had to generalise internationally.",
    points: [
      "Validation rules included one country's cardholder name and address formats.",
      "Relaxing them had to stop short of letting bad data through.",
    ],
  },
  {
    key: "decision",
    label: "Decision",
    headline: "Validate each migration wave in pre-production before it reaches cardholders.",
    points: [
      "Validation came before production, for every wave of the card migration.",
      "Cross-cutting work went through shared epics across the two squads, not a merged backlog.",
    ],
  },
  {
    key: "execution",
    label: "Execution",
    headline: "Two squads, two boards, one synchronised contract.",
    points: [
      "Separate Jira boards for the Google Pay and Samsung Pay component teams.",
      "Specification changes documented in Jira under the relevant epic, with every change logged in a tracker.",
    ],
  },
  {
    key: "outcome",
    label: "Outcome",
    headline: "First international issuer live in 2025. Passed an audit on spec-change traceability.",
    figure: { value: "2025", label: "first international issuer live on push provisioning" },
    points: [
      "A second international issuer is onboarding, validated end-to-end in production ahead of general availability.",
      "Cardholders kept their wallet tokens through a live, large-scale migration.",
    ],
  },
];

const decisions: Decision[] = [
  {
    title: "Validated every migration wave before cardholders saw it",
    problem: "A card portfolio migration changes the card underneath live wallet tokens, and those tokens have to keep working.",
    decision: "Validated the functional behaviour of provisioned Google Pay and Samsung Pay tokens through every migration wave in pre-production, before production.",
    why: "A wallet token should not need re-enrolling when the card underneath it changes, so that has to be proven before each wave reaches cardholders.",
    result: "The migration waves ran with zero cardholder-facing disruption.",
    fullAccount: src.caselets.items[0].body,
  },
  {
    title: "Two squads, separate boards, shared epics",
    problem: "Two component teams each had their own backlog, but cross-cutting work like the card migration validation had to move together.",
    decision: "Kept separate Jira boards and synchronised cross-cutting initiatives through shared epics, rather than merging the backlogs.",
    result: "The card migration validation ran across both teams' boards without merging their backlogs.",
    fullAccount: src.outcomes.bullets[0],
  },
  {
    title: "Generalised the spec without loosening it",
    problem: "A specification built for one issuer, including one country's name and address formats, had to work for international issuers.",
    decision: "Relaxed the validation enough to fit each international issuer, without loosening it so far it stopped catching bad data.",
    why: "Loosening it far enough to stop catching bad data would defeat the point of a single rigorous standard.",
    result: "The first international issuer went live in 2025. A second is onboarding, validated end-to-end in production ahead of general availability.",
    fullAccount: src.caselets.items[2].body,
  },
  {
    title: "Worked the token tail until it was clear who was stuck",
    problem: "A live repersonalisation campaign left a long tail of tokens that never picked up the new payment profile.",
    decision: "Ran the notification batches with L1 support, tracked completion against both stages over two to three months, and agreed with Google when the remainder would not come back.",
    why: "Tracking both stages was how the team could tell which cardholders were actually stuck.",
    result: "About 30 days after Google's ramp-up hit 100%, the network initiated the unlinks for the tail, without touching cardholders who had already migrated.",
    fullAccount: src.caselets.items[1].body,
  },
  {
    title: "Made a legacy, partner-published spec audit-ready",
    problem: "The spec is legacy and published to partners as PDFs once or twice a year, so changes are hard to evidence after the fact.",
    decision: "Documented each spec change in Jira under the relevant epic with the updated draft attached, and logged it in a tracker tied to every Jira ID.",
    why: "Network-driven specs come with real controls, and this one has to meet them too.",
    result: "When a recent audit asked for evidence of every change, the tracker answered it directly.",
    fullAccount: src.caselets.items[3].body,
  },
];

const technical: TechnicalPanel[] = [
  {
    kind: "flow",
    title: "The plastic changes. The wallet keeps working.",
    intro: "How a card portfolio migration reaches a wallet token, simplified from the case study. Every migration wave is validated in pre-production before cardholders see it.",
    nodes: [
      { label: "Card portfolio migration", note: "a live programme, in waves", tone: "external" },
      { label: "Pre-production validation", note: "every wave, before cardholders", tone: "owned" },
      { label: "Google Pay & Samsung Pay tokens", note: "integrated against, owned by the wallets", tone: "shared" },
      { label: "New payment profile on the token", note: "no re-enrolment, no re-adding the card", tone: "shared" },
      { label: "Cardholder sees no change", note: "the wallet just keeps working", tone: "external" },
    ],
  },
  {
    kind: "flow",
    title: "Closing the token tail, in stages",
    intro: "The legacy tail of a live repersonalisation campaign, cleaned up with Google over several months.",
    nodes: [
      { label: "Tickle notifications", note: "every token still on the old SDK, in batches", tone: "shared" },
      { label: "Repersonalisation calls", note: "processed by Google, ramping over several days", tone: "shared" },
      { label: "Tail agreed as not recovering", note: "about 30 days after Google's ramp hit 100%", tone: "owned" },
      { label: "Unlinks", note: "initiated by the network, issuer and Google kept informed", tone: "shared" },
    ],
    footnote: "Closed without touching cardholders who had already migrated.",
  },
];

export const wallet: CaseFile = {
  slug: "wallet",
  index: 2,
  group: "work",
  name: src.title,
  short: "wallet-provisioning",
  category: "Digital wallets · B2B integration",
  proposition: src.subtitle,
  mode: "Controlled Delivery",
  meta: src.meta,
  receipts: [
    { value: "1st", label: "international issuer live on push provisioning, 2025" },
    { value: "0", label: "cardholder-facing disruption through the migration" },
    { value: "2", label: "squads on separate boards, synchronised through shared epics" },
  ],
  ownership: {
    owned: [
      "Backlog across the Google Pay and Samsung Pay squads",
      "B2B integration specifications partners build against",
      "Pre-production validation of every migration wave",
    ],
    shared: ["Legacy token repersonalisation, coordinated directly with Google over several months"],
    sharedLabel: "Shared",
    outOfScope: [
      "Samsung Wallet push provisioning (code-complete, not yet toggled on in production)",
      "The original Google Pay Transit enablement",
      "Apple Pay (owned by a different team)",
    ],
  },
  stages,
  initial: "decision",
  inspect: {
    constraint: "Zero cardholder-facing disruption, across two wallets.",
    decision: "Validate each migration wave in pre-production before it reaches cardholders.",
    outcome: "First international issuer live in 2025. Passed an audit on spec-change traceability.",
  },
  sections: [
    {
      kind: "prose",
      eyebrow: src.problem.heading,
      heading: "Two faults, one wallet contract",
      paragraphs: src.problem.paragraphs,
    },
    {
      kind: "cards",
      eyebrow: src.scope.heading.split(":")[0],
      heading: "My scope in detail",
      cards: src.scope.lanes.map((lane) => ({
        title: lane.label,
        sublabel: lane.sublabel,
        items: lane.items,
        tone: lane.tone === "brand-strong" ? "brand" : (lane.tone as "blue" | "ember" | "muted"),
      })),
    },
    {
      kind: "cards",
      eyebrow: src.caselets.heading,
      heading: "Four initiatives, one contract",
      cards: src.caselets.items.map((c) => ({ title: c.title, body: c.body })),
    },
  ],
  decisions: { heading: "Calls I made, and why", items: decisions },
  technical: { heading: "migration and token lifecycle", panels: technical },
  impact: { heading: src.outcomes.heading, bullets: src.outcomes.bullets },
  proof: {
    chain: ["claim", "case", "decision", "implementation", "test", "outcome"],
    tiles: [
      { value: "2025", label: "first international issuer live on push provisioning" },
      { value: "Zero", label: "cardholder-facing disruption through the migration" },
      { value: "Passed", label: "a recent audit on full spec-change traceability" },
      { value: "Closed", label: "the legacy token tail, coordinated with Google over several months" },
    ],
  },
  sources: [
    { label: "Google Push Provisioning API documentation", href: src.repoUrl, note: "the integration partners build against" },
    {
      label: "Original long-form case study",
      href: "/case-studies/wallet-provisioning",
      note: "on the live site, unchanged during review",
    },
  ],
  neighbours: {
    prev: { slug: "chrome", label: "Chrome Virtual Card Autofill" },
    next: { slug: "opencam", label: "OpenCAM" },
  },
};
