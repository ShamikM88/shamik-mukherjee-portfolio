import { chromeAutofill } from "@/data/content";
import type { CaseFile, Decision, Stage, TechnicalPanel } from "../types";

// Chrome is the golden case. Its deep layer is sourced from chromeAutofill in src/data/content.ts,
// so long-form facts stay single-sourced. Decisions are restated from that file's execution calls,
// and full accounts are pulled from the same source by index.
const src = chromeAutofill;
const full = (i: number) => src.decisions.items[i].body;

const stages: Stage[] = [
  {
    key: "context",
    label: "Context",
    headline: "Checkout needed security without friction, and the card network needed the friction gone.",
    points: [
      "A major US card network partnered with Google to autofill virtual cards inside Chrome, so the real card number never reaches the merchant.",
      "Friction at checkout is what loses top-of-wallet usage to a competing card.",
      "Google defined the API framework. Delivery meant standing up a new edge microservice in a regulated, legacy estate with nowhere existing to plug it in.",
    ],
  },
  {
    key: "constraint",
    label: "Constraint",
    headline: "Google's 5-second retrieval limit, on the path that fires as the shopper pays.",
    figure: { value: "≤5.0s", label: "Google's retrieval target" },
    points: [
      "Retrieval is the critical path. Tolerance for latency, friction or failure there was zero.",
      "The integration split into two domains: Enrolment/Unenrolment (generating and unlinking the token) and Retrieval (fetching the tokenised details during a transaction).",
    ],
  },
  {
    key: "observed",
    label: "Observed",
    headline: "The green path was fine. The yellow path was not.",
    figure: { value: "2.4s / 7–8s", label: "green / yellow, before the fraud-system work" },
    points: [
      "Green flow, with no risk checks: 2.4s.",
      "Yellow flow, once it hit the real fraud system: 7–8s.",
      "The delay sat in a downstream system I did not own.",
    ],
  },
  {
    key: "decision",
    label: "Decision",
    headline: "Keep moving, and take the latency problem to the team that owned it.",
    points: [
      "Rather than halt for a downstream blocker, I built a mock fraud signal from a high-level understanding of how the fraud team would process Google's risk signals.",
      "I traced the latency through Datadog to the fraud system's own downstream calls, then worked with that team directly.",
    ],
  },
  {
    key: "execution",
    label: "Execution",
    headline: "Sequenced by release of value, gated by a Definition of Done that did not stop at deployed.",
    figure: { value: "1 → 10 → 100%", label: "phased rollout of eligible cardholders" },
    points: [
      "Epics ran in release order: green without risk checks, then green with them, then yellow with OTP layered in last.",
      "I wrote the Retrieval certification test cases myself, with test cards mapped to green, yellow and red outcomes.",
      "Rollout was phased: 1% of eligible cardholders, then 10%, then 100%. The first phase was limited to Google-whitelisted accounts.",
      "Live retrievals ran against a dummy cart Google's team shared, traced end to end in Kibana.",
    ],
  },
  {
    key: "outcome",
    label: "Outcome",
    headline: "Both paths inside Google's limit, with certification passed.",
    figure: { value: "275K+", label: "successful autofill requests in 60 days" },
    points: [
      "Green 1–1.2s. Yellow 3.5–4s.",
      "$900K settled in 45 days. 275K+ successful requests in 60 days.",
      "Sandbox and production certification passed with zero functional defects, against test cases I wrote.",
      "Star Award – Excellence in Delivery, 2024.",
    ],
  },
];

const decisions: Decision[] = [
  {
    title: "Chased the yellow path from 7–8s to inside Google's 5-second limit",
    problem: "Performance testing put the yellow path at 7–8s once the real fraud system was in the path, against Google's 5-second NFR.",
    decision: "Traced the latency through Datadog to the fraud system's downstream calls, then worked with that team directly. They optimised their APIs and cut their own downstream call count.",
    why: "On the yellow path the response doesn't carry card details. It tells the user to complete a step-up challenge first, so a 5-second wait before any OTP round-trip had started wasn't acceptable.",
    result: "Green 2.4s → 1–1.2s. Yellow 7–8s → 3.5–4s.",
    notMine: "The fraud system's own APIs and business rules.",
    fullAccount: full(0),
  },
  {
    title: "Raised a risk I did not own to the person who did",
    problem: "A user re-clicking autofill while waiting would send extra requests, which needed idempotent handling to avoid duplicate processing.",
    decision: "Raised it as an input to the PM rather than deciding it myself.",
    why: "As PO on this initiative, prioritisation sat with the PM.",
    result: "Became an MVP2 item, delivered by the Enrolment team in Q2 2025.",
    notMine: "Prioritising the idempotency fix.",
    fullAccount: full(1),
  },
  {
    title: "Built a mock fraud signal to keep delivery moving",
    problem: "The first release (green flow, no risk checks) had shipped. The fraud team's side wasn't prioritised for the next release.",
    decision: "Built a close approximation of how the fraud team would process Google's risk signals, not their actual business rules. Integration ran against the mock.",
    why: "The alternative was to halt development citing a downstream blocker.",
    result: "Integration ran against the mock until the real system was ready.",
    notMine: "The real fraud rules.",
    fullAccount: full(2),
  },
  {
    title: "Wrote the certification tests myself, because nobody else would",
    problem: "No one was resourced to write Google's certification test cases. Every team was on its own deliverables.",
    decision: "Wrote the Retrieval test cases, including specific test cards mapped to green, yellow and red outcomes. The peer PO wrote Enrolment/Unenrolment's.",
    why: "Each PO knew their own domain well enough to cover it.",
    result: "Sandbox and production certification passed with zero functional defects, against cases I wrote.",
    notMine: "The Enrolment/Unenrolment test cases.",
    fullAccount: full(3),
  },
  {
    title: "Made one attempt traceable across the step-up chain",
    problem: "Google's step-up path can fan one retrieval out into a separate OTP dispatch and OTP validation. That is three requests that could show up as disconnected events.",
    decision: "Proposed the mechanism that keeps all three traceable back to one original attempt.",
    why: "To keep the three requests traceable back to one original attempt.",
    result: "The three requests stay tied to one original attempt.",
    fullAccount: full(4),
  },
  {
    title: "Held every story to a Definition of Done that did not stop at deployed",
    problem: "At the network's scale, a passing local unit test is not proof of anything.",
    decision: "A sprint deliverable counted as Done only once it was deployed to the OpenShift environments and verified against integration tests.",
    why: "It keeps failures small and catches them near the source instead of letting them compound.",
    result: "It slowed individual sprints in the short term. It wasn't airtight: a couple of minor bugs still reached production and were fixed the next sprint.",
    fullAccount: full(5),
  },
];

const technical: TechnicalPanel[] = [
  {
    kind: "flow",
    title: "Where the five seconds went",
    intro:
      "The retrieval path, simplified from the case study's architecture description. The Enrolment and Unenrolment domain is left out of this view.",
    nodes: [
      { label: "Chrome checkout", note: "shopper pays", tone: "external" },
      { label: "Google Virtual Cards API", note: "retrieval call", tone: "external" },
      { label: "Edge microservice (OCP)", note: "Retrieval endpoint", tone: "owned" },
      { label: "Risk decision", note: "downstream fraud system", tone: "shared" },
      { label: "Token + DCID", note: "one-time cryptogram", tone: "shared" },
      { label: "Response to Chrome", note: "green 1–1.2s · yellow 3.5–4s", tone: "owned" },
    ],
    branch: { label: "branch", steps: ["Yellow only: step-up challenge", "OTP dispatch", "OTP validation"], note: "all three traced to one original attempt" },
  },
  {
    kind: "bars",
    title: "Both paths before and after the fraud-system work",
    scale: 8,
    sla: { at: 5, label: "Google SLA 5s" },
    rows: [
      { label: "Green · before", value: "2.4s", mid: 2.4, tone: "muted" },
      { label: "Green · after", value: "1–1.2s", mid: 1.1, tone: "owned" },
      { label: "Yellow · before", value: "7–8s", mid: 7.5, tone: "muted" },
      { label: "Yellow · after", value: "3.5–4s", mid: 3.75, tone: "owned" },
    ],
  },
];

export const chrome: CaseFile = {
  slug: "chrome",
  index: 1,
  group: "work",
  name: "Virtual Card Autofill for Google Chrome",
  short: "chrome-virtual-card-autofill",
  category: "Digital payments · API integration",
  proposition: src.subtitle,
  mode: "Controlled Delivery",
  meta: src.meta,
  receipts: [
    { value: "$900K", label: "settled in the first 45 days" },
    { value: "275K+", label: "successful autofill requests in 60 days" },
    { value: "<5s", label: "Google's latency requirement, met on both paths", note: "green 1–1.2s · yellow 3.5–4s" },
    { value: "0", label: "card details exposed to merchants" },
  ],
  ownership: {
    owned: [
      "Retrieval flow: epics, user stories and acceptance criteria",
      "Scoping and delivery of the Retrieval endpoint on the new edge microservice (OCP)",
      "Definition of Done, with observability shipped in the same story",
    ],
    shared: [
      "Integration with downstream risk, token and DCID systems",
      "Edge-case triage during Google's integration testing",
      "Domain boundary with the Enrolment/Unenrolment PO",
    ],
    sharedLabel: "Shared",
    outOfScope: ["Partner commercial relations (account executives)", "Enrolment and unenrolment flows (a peer PO)"],
  },
  stages,
  initial: "constraint",
  inspect: {
    constraint: "Google's 5-second retrieval limit.",
    decision: "Isolate the fraud dependency rather than halt the programme.",
    outcome: "Green 1–1.2s. Yellow 3.5–4s. $900K settled in 45 days.",
  },
  sections: [
    {
      kind: "prose",
      eyebrow: src.problem.heading,
      heading: "Why this integration was hard to deliver",
      paragraphs: src.problem.paragraphs,
      callouts: src.problem.frictionBullets,
      links: [{ label: "Google's Virtual Cards v1 documentation", href: src.repoUrl }],
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
      eyebrow: src.features.heading,
      heading: "Two engineering problems under one flow",
      cards: src.features.items.map((f) => ({ letter: f.letter, title: f.title, body: f.body })),
    },
    {
      kind: "steps",
      eyebrow: src.process.heading,
      heading: "Four practices that carried it",
      steps: src.process.steps,
    },
  ],
  decisions: { heading: src.decisions.heading, items: decisions },
  // Latency is the focal point for this case, so the comparison leads the technical band.
  technical: { heading: "retrieval path", panels: [technical[1], technical[0]] },
  impact: { heading: src.outcomes.heading, bullets: src.outcomes.bullets },
  proof: {
    chain: ["claim", "case", "decision", "implementation", "test", "outcome"],
    tiles: [
      { value: "Zero", label: "functional defects in sandbox and production certification" },
      { value: "1 → 10 → 100%", label: "phased rollout, Google-whitelisted accounts first" },
      { value: "Zero", label: "card details exposed to merchants" },
      { value: "2024", label: "Star Award – Excellence in Delivery" },
    ],
  },
  artefacts: {
    heading: src.visuals.heading,
    items: [
      {
        src: src.visuals.items[0].src,
        alt: src.visuals.items[0].alt,
        caption: src.visuals.items[0].caption,
        why: "It maps the external API contract onto the Retrieval surface I owned, the part of the flow where the latency and step-up work sat.",
        sourceUrl: src.visuals.items[0].sourceUrl,
        sourceLabel: src.visuals.items[0].sourceLabel,
      },
      {
        src: src.visuals.items[1].src,
        alt: src.visuals.items[1].alt,
        caption: src.visuals.items[1].caption,
        why: "It is external evidence that the capability went live and reached consumers, not only an internal delivery claim.",
        sourceUrl: src.visuals.items[1].sourceUrl,
        sourceLabel: src.visuals.items[1].sourceLabel,
      },
    ],
  },
  sources: [
    { label: "Google Virtual Cards v1: API documentation", href: src.repoUrl, note: "the framework this integration implements" },
    { label: "The network's public launch post", href: src.visuals.items[1].sourceUrl, note: "consumer-facing launch announcement" },
    {
      label: "Original long-form case study",
      href: "/case-studies/google-chrome-autofill-virtual-card-number",
      note: "on the live site, unchanged during review",
    },
  ],
  neighbours: {
    prev: { slug: "job-search", label: "AI Job Search" },
    next: { slug: "wallet", label: "Wallet Provisioning" },
  },
};
