import { fork as src } from "@/data/content";
import type { CaseFile, Decision, Stage, TechnicalPanel } from "../types";

// Job Search is the lightweight-delivery case. The inherited-versus-built split stays explicit:
// it is the credibility line that stops this reading as "built a job-search platform from scratch".
// The "150+ postings" figure is deliberately left out; the source itself calls it gameable.
const stages: Stage[] = [
  {
    key: "context",
    label: "Context",
    headline: "Application outcomes lived in employer emails I had to notice and transcribe by hand.",
    points: [
      "The framework's default output was a static snapshot.",
      "With dozens of applications in flight, status updates silently lagged reality.",
    ],
  },
  {
    key: "constraint",
    label: "Constraint",
    headline: "Portal dedup only matched exact URLs or IDs, so a relisted role slipped through.",
    points: [
      "An employer relisting an unfilled role under a brand-new ID gets past an ID-only check.",
      "The fix had to work across portals, not only within a single run.",
    ],
  },
  {
    key: "observed",
    label: "Observed",
    headline: "A rejected role was scraped three times under three LinkedIn IDs, and nearly reapplied to.",
    figure: { value: "3 IDs", label: "for one rejected role" },
    points: [
      "The surviving copy nearly went out again in a fresh application batch.",
      "It was caught before the reapplication, not after.",
    ],
  },
  {
    key: "decision",
    label: "Decision",
    headline: "Run direct-to-master, and compare normalised company and title against the whole scrape history.",
    points: [
      "Direct-to-master because I am the only contributor and the only person a regression affects.",
      "A same-company, same-title check against every existing entry, whatever the scrape date.",
    ],
  },
  {
    key: "execution",
    label: "Execution",
    headline: "Edit, run and observe in a tight loop, with sensitive data kept git-ignored throughout.",
    figure: { value: "57", label: "fork-specific commits, direct-to-master" },
    points: [
      "Used my own job search as the test bed, across the UK, Germany and Ireland.",
      "Verified afterwards with a full git-history audit rather than assumed.",
    ],
  },
  {
    key: "outcome",
    label: "Outcome",
    headline: "The repost was caught and closed for good.",
    figure: { value: "0", label: "PII or client data in git history, confirmed by full audit" },
    points: [
      "The repost-hardening fix closed a failure mode that had already cost one wasted application.",
      "Zero repeats since the fix shipped.",
    ],
  },
];

const decisions: Decision[] = [
  {
    title: "Ran direct-to-master, deliberately",
    problem: "A live scraper against real job portals needs a tight edit, run and observe loop.",
    decision: "Committed straight to master, with no PR-per-change or backlog overhead.",
    why: "This is solo personal tooling. Review overhead has no payoff when I'm the only contributor and the only person a regression affects. OpenCAM, by contrast, has to be defensible to someone else.",
    result: "57 fork-specific commits shipped this way, and a full git-history audit confirmed nothing sensitive was committed.",
    fullAccount: src.decisions.items[0].body,
  },
  {
    title: "Dedup on company and title, not just ID",
    problem: "ID-based checks only catch a repost when the ID matches. An employer relisting an unfilled role under a new ID slips through.",
    decision: "Compare normalised company and title against every existing entry, regardless of when it was scraped.",
    why: "ID checks structurally can't catch a relisting under a new ID.",
    result: "The three-ID repost is caught and closed for good, with zero repeats since.",
    fullAccount: src.decisions.items[1].body,
  },
  {
    title: "Cache once, reuse everywhere",
    problem: "/rank and /apply were each independently re-fetching the same posting.",
    decision: "A shared, normalised-filename cache.",
    result: "The common rank-then-apply path costs one fetch instead of two.",
    fullAccount: src.decisions.items[2].body,
  },
];

const technical: TechnicalPanel[] = [
  {
    kind: "flow",
    title: "The repost that nearly got reapplied to",
    intro: "One rejected role, three LinkedIn IDs, one near-miss. It was caught by comparing company and title against the whole history.",
    nodes: [
      { label: "Rejected role scraped", note: "LinkedIn ID A", tone: "external" },
      { label: "Scraped again", note: "LinkedIn ID B", tone: "external" },
      { label: "Scraped a third time", note: "LinkedIn ID C", tone: "external" },
      { label: "Nearly reapplied to", note: "the surviving copy, in a new batch", tone: "alert" },
      { label: "Caught by company + title", note: "checked against the whole scrape history", tone: "owned" },
    ],
  },
  {
    kind: "flow",
    title: "Gmail sync, one representative run",
    intro: "Application outcomes arrive as employer emails. One run replaced rereading the inbox by hand.",
    nodes: [
      { label: "11 threads in the window", note: "one pass", tone: "external" },
      { label: "7 outcome updates resolved", note: "propose-then-approve, inherited mechanism", tone: "owned" },
      { label: "2 new leads surfaced", note: "job-recommendation digests registered as scrape leads", tone: "owned" },
    ],
  },
];

export const jobSearch: CaseFile = {
  slug: "job-search",
  index: 4,
  group: "lab",
  name: src.title,
  short: "ai-job-search",
  category: "Agentic AI · personal tooling",
  proposition: src.subtitle,
  mode: "Lightweight Delivery",
  meta: src.meta,
  receipts: [
    { value: "0", label: "PII or client data in git history, confirmed by full audit" },
    { value: "57", label: "fork-specific commits, direct-to-master" },
    { value: "Live", label: "used daily for my own job search" },
  ],
  ownership: {
    owned: [
      "Product direction and every process decision",
      "Gmail lead detection, repost-dedup hardening, the live dashboard and the shared fetch cache",
    ],
    shared: ["Implementation, directed through Claude Code"],
    sharedLabel: "AI-executed",
    outOfScope: [
      "Inherited from upstream: the core /apply workflow, the scraper framework and the portal-skill pattern",
      "Gmail sync's core propose-then-approve mechanism, and the base /rank and /outcome structure",
    ],
  },
  stages,
  initial: "constraint",
  inspect: {
    constraint: "Portal dedup only matched exact URLs or IDs, so a relisted role slipped through.",
    decision: "Run direct-to-master, and compare normalised company and title against the whole scrape history.",
    outcome: "The repost was caught and closed for good.",
  },
  sections: [
    {
      kind: "prose",
      eyebrow: src.problem.heading,
      heading: "Why this existed",
      paragraphs: src.problem.paragraphs,
    },
    {
      kind: "cards",
      eyebrow: src.scope.heading.split(",")[0],
      heading: "Inherited, and built on top",
      cards: src.scope.lanes.map((lane) => ({
        title: lane.label,
        sublabel: lane.sublabel,
        items: lane.items,
        tone: lane.tone === "brand-strong" ? "brand" : "muted",
      })),
    },
    {
      kind: "steps",
      eyebrow: src.process.heading,
      heading: "Four moves, one test bed",
      steps: src.process.steps,
    },
  ],
  decisions: { heading: src.decisions.heading, items: decisions },
  technical: { heading: "repost and sync", panels: technical },
  impact: { heading: src.outcomes.heading, bullets: src.outcomes.bullets },
  proof: {
    chain: ["claim", "case", "decision", "implementation", "test", "outcome"],
    tiles: [
      { value: "0", label: "PII or client data in git history, confirmed by full audit" },
      { value: "57", label: "fork-specific commits, direct-to-master" },
      { value: "Zero", label: "repeats of the closed repost since the fix" },
      { value: "Daily", label: "used for my own job search" },
    ],
  },
  artefacts: {
    heading: src.visuals.heading,
    items: [
      {
        src: src.visuals.items[0].src,
        alt: src.visuals.items[0].alt,
        caption: src.visuals.items[0].caption,
        why: "It is the audit trail for the direct-to-master decision: every change is visible in the history.",
        sourceUrl: src.forkRepoUrl,
        sourceLabel: "the ai-job-search fork",
      },
      {
        src: src.visuals.items[1].src,
        alt: src.visuals.items[1].alt,
        caption: src.visuals.items[1].caption,
        why: "It shows the operational use: fit scoring, gates and dedup status per row, for postings not yet applied to.",
        sourceUrl: src.forkRepoUrl,
        sourceLabel: "the ai-job-search fork",
      },
    ],
  },
  sources: [
    { label: "ShamikM88/ai-job-search: the fork", href: src.forkRepoUrl, note: "my commits on top of the base" },
    { label: "MadsLorentzen/ai-job-search: the upstream base", href: src.baseRepoUrl, note: "the framework this extends" },
    { label: "Original long-form case study", href: "/case-studies/job-search-automation", note: "on the live site, unchanged during review" },
  ],
  neighbours: {
    prev: { slug: "opencam", label: "OpenCAM" },
    next: { slug: "chrome", label: "Chrome Virtual Card Autofill" },
  },
};
