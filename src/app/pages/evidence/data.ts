export const T = {
  ink: "#070B12",
  panel: "#0B111B",
  raised: "#151F2C",
  border: "#253140",
  text: "#F5F7FA",
  secondary: "#B5C0CD",
  muted: "#738091",
  dim: "#4E5A68",
  teal: "#20D3B2",
  blue: "#6B8CFF",
  amber: "#FFB454",
  red: "#FF6B6B",
};

export type CaseSlug = "chrome" | "wallet" | "opencam" | "job-search";

export type Decision = {
  title: string;
  problem: string;
  decision: string;
  tradeoff: string;
  result: string;
  // Drafted from the case study's own wording; the trade-off line is my inference and
  // needs confirming before this goes live.
  draftedTradeoff?: boolean;
};

export type Case = {
  slug: CaseSlug;
  name: string;
  short: string;
  category: string;
  mode: "Controlled Delivery" | "Lightweight Delivery";
  summary: string;
  receipts: { value: string; label: string; note?: string }[];
  meta: { role: string; timeline: string; status: string };
  ownership: { owned: string[]; shared: string[]; outOfScope: string[] };
  graph: { context: string; constraint: string; observed: string; decision: string; execution: string; outcome: string };
  decisions: Decision[];
  href: string;
};

export const CASES: Case[] = [
  {
    slug: "chrome",
    name: "Virtual Card Autofill for Google Chrome",
    short: "chrome-virtual-card-autofill",
    category: "Payments · API integration",
    mode: "Controlled Delivery",
    summary:
      "I owned the technical delivery of the Retrieval flow inside a high-constraint enterprise API integration with Google Chrome.",
    receipts: [
      { value: "$900K", label: "settled in the first 45 days" },
      { value: "275K+", label: "successful requests in 60 days" },
      { value: "<5s", label: "Google's latency SLA, delivered against" },
    ],
    meta: {
      role: "Product Owner: translated architecture into epics, managed the backlog, enforced Definition of Done",
      timeline: "Launched Nov 2024",
      status: "Live in production",
    },
    ownership: {
      owned: [
        "Retrieval flow: epics, user stories and acceptance criteria",
        "Scoping and delivery of the Retrieval endpoint",
        "Definition of Done, with observability shipped in the same story",
      ],
      shared: [
        "Integration with downstream risk, token and DCID systems",
        "Triage of edge cases during Google's integration testing",
        "Domain boundaries with the enrolment PO",
      ],
      outOfScope: ["Partner commercial relations (account executives)", "Enrolment and unenrolment flows (a peer PO)"],
    },
    graph: {
      context: "Google Chrome needed tokenized virtual-card retrieval inside checkout.",
      constraint: "Google's 5-second retrieval limit.",
      observed: "Green flow 2.4s. Yellow flow 7–8s, inside the real fraud system.",
      decision: "Isolate the fraud dependency rather than halt the programme.",
      execution: "Worked with the fraud team on their APIs, built a mock fraud signal, and wrote the certification tests myself.",
      outcome: "Green 1–1.2s. Yellow 3.5–4s. $900K settled in 45 days.",
    },
    decisions: [
      {
        title: "Surface the fraud dependency rather than own it",
        problem: "The yellow flow ran 7–8s, and the delay sat in a downstream fraud system I didn't own.",
        decision: "Surfaced it as an input to the team that owned it, then built a mock fraud signal so delivery could keep moving.",
        tradeoff: "Testing ran against the mock signal, so the real dependency had to be validated separately.",
        result: "The fraud team optimized their APIs. Yellow flow went from 7–8s to 3.5–4s.",
        draftedTradeoff: true,
      },
      {
        title: "Write the certification tests myself",
        problem: "Nobody else was going to write the certification tests.",
        decision: "Wrote them myself, and held every story to a Definition of Done that didn't stop at deployed.",
        tradeoff: "I took on test work outside the PO's usual scope to keep the release on track.",
        result: "Validated live before trusting it at scale.",
        draftedTradeoff: true,
      },
    ],
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
  },
  {
    slug: "wallet",
    name: "Google Pay & Samsung Pay: Wallet Provisioning at Scale",
    short: "wallet-provisioning",
    category: "Digital wallets · B2B integration",
    mode: "Controlled Delivery",
    summary:
      "Owned backlog and B2B integration specifications across two wallet squads, validating that a live card migration stays invisible to wallet users.",
    receipts: [
      { value: "1st", label: "international issuer live on push provisioning, 2025" },
      { value: "2", label: "squads, two boards, shared epics" },
      { value: "0", label: "cardholder-facing disruption through the migration", note: "from the case study takeaway" },
    ],
    meta: {
      role: "Product Owner (proxy PO, then PO): backlog across two squads, B2B specs, migration validation",
      timeline: "Mid 2022 to present",
      status: "Active, expanding internationally",
    },
    ownership: {
      owned: [
        "Backlog across the Google Pay and Samsung Pay squads",
        "B2B integration specifications partners build against",
        "Pre-production validation of every migration wave",
      ],
      shared: ["Legacy token repersonalization, coordinated directly with Google over several months"],
      outOfScope: [
        "Samsung Wallet push provisioning (code-complete, not yet toggled on in production)",
        "The original Google Pay Transit enablement",
        "Apple Pay (owned by a different team)",
      ],
    },
    graph: {
      context: "A live card portfolio migration, with wallet tokens that have to survive it.",
      constraint: "Zero cardholder-facing disruption, across two wallets.",
      observed: "Specifications built around one issuer's conventions had to generalize internationally.",
      decision: "Validate each migration wave in pre-production before it reaches cardholders.",
      execution: "Ran two squads from separate boards, synchronized through shared epics, not a merged backlog.",
      outcome: "First international issuer live in 2025. Passed an audit on spec-change traceability.",
    },
    decisions: [
      {
        title: "Two squads, two boards, shared epics",
        problem: "Two squads worked on the same wallet integration and couldn't share one backlog cleanly.",
        decision: "Kept separate Jira boards, and synchronized cross-cutting work through shared epics.",
        tradeoff: "Cross-team alignment became an explicit job rather than something a merged backlog would do for free.",
        result: "The card migration validation ran across both teams without merging their backlogs.",
        draftedTradeoff: true,
      },
      {
        title: "Generalize the spec without loosening it",
        problem: "A specification written for one issuer had to work for international issuers.",
        decision: "Changed the rules to fit each issuer, without loosening validation enough to let bad data through.",
        tradeoff: "More specification work per issuer, in exchange for keeping one rigorous standard.",
        result: "The first market went live in 2025. A second was validated end-to-end before general availability.",
        draftedTradeoff: true,
      },
    ],
    href: "/case-studies/wallet-provisioning",
  },
  {
    slug: "opencam",
    name: "OpenCAM: Autonomous Maker-Checker Framework",
    short: "opencam",
    category: "Multi-agent AI · credit risk",
    mode: "Controlled Delivery",
    summary:
      "A dual-agent LLM pipeline where deterministic code computes every financial figure, and independent agents draft and audit around it.",
    receipts: [
      { value: "15–30 min", label: "target time to first draft, down from a business day", note: "a target, not yet validated at scale" },
      { value: "439+", label: "passing tests" },
      { value: "DSCR", label: "0 → undefined, caught before committee" },
    ],
    meta: {
      role: "Product Manager: strategy, prompt architecture, policy rules; directed Claude Code for all implementation",
      timeline: "Sep 2026, ongoing",
      status: "Early-stage, validated with one analyst to date",
    },
    ownership: {
      owned: ["Strategy", "Prompt architecture", "Policy rules"],
      shared: ["Implementation, directed through Claude Code"],
      outOfScope: [],
    },
    graph: {
      context: "Credit memos drafted by an LLM were fast, but nothing stopped a wrong number reaching committee.",
      constraint: "A model can narrate a figure. It must never produce one.",
      observed: "A debt-free company's DSCR was silently computed as 0 instead of undefined.",
      decision: "Covenants evaluated deterministically: PASS, FAIL or UNRESOLVABLE, never silently defaulted.",
      execution: "Independent maker and checker agents, with the checker able only to downgrade a verdict.",
      outcome: "The DSCR error was caught before it could reach committee.",
    },
    decisions: [
      {
        title: "The model narrates; code computes",
        problem: "An LLM drafting the memo could state a figure that no check had ever computed.",
        decision: "Every covenant evaluated against a ratio computed from raw financials. The model writes the narrative around it.",
        tradeoff: "More deterministic code to maintain, in exchange for figures the model can't invent.",
        result: "The DSCR defect was caught before any credit decision used it.",
        draftedTradeoff: true,
      },
      {
        title: "No shared context between maker and checker",
        problem: "A single agent auditing its own draft agrees with itself.",
        decision: "Maker and checker share no reasoning context, and the checker can only downgrade a verdict.",
        tradeoff: "Less context for the checker, in exchange for an audit that isn't just the draft agreeing with itself.",
        result: "The checker's value comes from auditing cold.",
        draftedTradeoff: true,
      },
    ],
    href: "/case-studies/opencam",
  },
  {
    slug: "job-search",
    name: "AI Job Search: Pipeline & Status Automation",
    short: "ai-job-search",
    category: "Agentic AI · personal tooling",
    mode: "Lightweight Delivery",
    summary:
      "A personal job-search pipeline built and run daily, shipped direct-to-master because I'm the only person affected by a regression.",
    receipts: [
      { value: "0", label: "PII or client data in git history, confirmed by full audit" },
      { value: "57+", label: "fork-specific commits, direct-to-master" },
      { value: "Live", label: "used daily for my own job search" },
    ],
    meta: {
      role: "Sole developer and end user: directed Claude Code for all implementation",
      timeline: "Aug 2026, ongoing",
      status: "Active, used daily",
    },
    ownership: {
      owned: ["Product direction and every process decision"],
      shared: ["Implementation, directed through Claude Code"],
      outOfScope: [],
    },
    graph: {
      context: "Application outcomes lived in employer emails I had to notice and transcribe by hand.",
      constraint: "Portal dedup only matched exact URLs or IDs, so a relisted role slipped through.",
      observed: "A rejected role was scraped three times under three LinkedIn IDs, and nearly reapplied to.",
      decision: "Run direct-to-master, and compare normalized company and title against the whole scrape history.",
      execution: "Edit, run and observe in a tight loop, with sensitive data kept git-ignored throughout.",
      outcome: "The repost was caught and closed for good.",
    },
    decisions: [
      {
        title: "Run direct-to-master, deliberately",
        problem: "A live scraper against real job portals needs a fast edit, run and observe loop.",
        decision: "Committed straight to master, with no PR-per-change or backlog overhead.",
        tradeoff: "No review step. Acceptable because I'm the only contributor and the only person a regression affects.",
        result: "57+ fork-specific commits shipped this way, with a full git-history audit confirming nothing sensitive was committed.",
        draftedTradeoff: true,
      },
      {
        title: "Dedup on company and title, not just ID",
        problem: "ID-based checks miss an employer relisting an unfilled role under a new ID.",
        decision: "Compare normalized company and title against every existing entry, regardless of when it was scraped.",
        tradeoff: "A broader check that can, in principle, flag two genuinely different roles with the same title.",
        result: "The three-ID repost incident was caught and closed for good.",
        draftedTradeoff: true,
      },
    ],
    href: "/case-studies/job-search-automation",
  },
];

export function caseBySlug(slug: string) {
  return CASES.find((c) => c.slug === slug);
}
