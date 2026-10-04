// Executive and evidence layers for the Chrome golden case. The deep layer renders
// `chromeAutofill` from src/data/content.ts directly, so long-form facts stay single-sourced.
// Everything here is restated from that file; no new claims are introduced.
import { chromeAutofill } from "@/data/content";

export const chromeReceipts = [
  { value: "$900K", label: "settled in the first 45 days" },
  { value: "275K+", label: "successful autofill requests in 60 days" },
  { value: "<5s", label: "Google's latency requirement, met on both paths", note: "green 1–1.2s · yellow 3.5–4s" },
  { value: "0", label: "card details exposed to merchants" },
];

export const chromeOwnership = {
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
  outOfScope: [
    "Partner commercial relations (account executives)",
    "Enrolment and unenrolment flows (a peer PO)",
  ],
};

export type Stage = { key: string; label: string; headline: string; points: string[] };

export const chromeStages: Stage[] = [
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
    points: [
      "Retrieval is the critical path. Tolerance for latency, friction or failure there was zero.",
      "The integration split into two domains: Enrolment/Unenrolment (generating and unlinking the token) and Retrieval (fetching the tokenised details during a transaction).",
    ],
  },
  {
    key: "observed",
    label: "Observed",
    headline: "The green path was fine. The yellow path was not.",
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
    points: [
      "Green 1–1.2s. Yellow 3.5–4s.",
      "$900K settled in 45 days. 275K+ successful requests in 60 days.",
      "Sandbox and production certification passed with zero functional defects, against test cases I wrote.",
      "Star Award – Excellence in Delivery, 2024.",
    ],
  },
];

export type ChromeDecision = {
  title: string;
  problem: string;
  decision: string;
  why?: string;
  result: string;
  notMine?: string;
  // Index into chromeAutofill.decisions.items, so the full source account stays attached.
  fullAccount: number;
};

export const chromeDecisions: ChromeDecision[] = [
  {
    title: "Chased the yellow path from 7–8s to inside Google's 5-second limit",
    problem: "Performance testing put the yellow path at 7–8s once the real fraud system was in the path, against Google's 5-second NFR.",
    decision: "Traced the latency through Datadog to the fraud system's downstream calls, then worked with that team directly. They optimised their APIs and cut their own downstream call count.",
    why: "On the yellow path the response doesn't carry card details. It tells the user to complete a step-up challenge first, so a 5-second wait before any OTP round-trip had started wasn't acceptable.",
    result: "Green 2.4s → 1–1.2s. Yellow 7–8s → 3.5–4s.",
    notMine: "The fraud system's own APIs and business rules.",
    fullAccount: 0,
  },
  {
    title: "Raised a risk I did not own to the person who did",
    problem: "A user re-clicking autofill while waiting would send extra requests, which needed idempotent handling to avoid duplicate processing.",
    decision: "Raised it as an input to the PM rather than deciding it myself.",
    why: "As PO on this initiative, prioritisation sat with the PM.",
    result: "Became an MVP2 item, delivered by the Enrolment team in Q2 2025.",
    notMine: "Prioritising the idempotency fix.",
    fullAccount: 1,
  },
  {
    title: "Built a mock fraud signal to keep delivery moving",
    problem: "The first release (green flow, no risk checks) had shipped. The fraud team's side wasn't prioritised for the next release.",
    decision: "Built a close approximation of how the fraud team would process Google's risk signals, not their actual business rules. Integration ran against the mock.",
    why: "The alternative was to halt development citing a downstream blocker.",
    result: "Integration ran against the mock until the real system was ready.",
    notMine: "The real fraud rules.",
    fullAccount: 2,
  },
  {
    title: "Wrote the certification tests myself, because nobody else would",
    problem: "No one was resourced to write Google's certification test cases. Every team was on its own deliverables.",
    decision: "Wrote the Retrieval test cases, including specific test cards mapped to green, yellow and red outcomes. The peer PO wrote Enrolment/Unenrolment's.",
    why: "Each PO knew their own domain well enough to cover it.",
    result: "Sandbox and production certification passed with zero functional defects, against cases I wrote.",
    notMine: "The Enrolment/Unenrolment test cases.",
    fullAccount: 3,
  },
  {
    title: "Made one attempt traceable across the step-up chain",
    problem: "Google's step-up path can fan one retrieval out into a separate OTP dispatch and OTP validation. That is three requests that could show up as disconnected events.",
    decision: "Proposed the mechanism that keeps all three traceable back to one original attempt.",
    why: "Three disconnected events are hard to follow back to a single shopper attempt.",
    result: "The three requests stay tied to one original attempt.",
    fullAccount: 4,
  },
  {
    title: "Held every story to a Definition of Done that did not stop at deployed",
    problem: "At the network's scale, a passing local unit test is not proof of anything.",
    decision: "A sprint deliverable counted as Done only once it was deployed to the OpenShift environments and verified against integration tests.",
    why: "It keeps failures small and catches them near the source instead of letting them compound.",
    result: "It slowed individual sprints in the short term. It wasn't airtight: a couple of minor bugs still reached production and were fixed the next sprint.",
    fullAccount: 5,
  },
];

// Simplified from the case study's architecture description. The Enrolment/Unenrolment
// domain is deliberately omitted from this diagram.
export const retrievalPath: { label: string; note: string; owner: "owned" | "shared" | "external" }[] = [
  { label: "Chrome checkout", note: "shopper pays", owner: "external" },
  { label: "Google Virtual Cards API", note: "retrieval call", owner: "external" },
  { label: "Edge microservice (OCP)", note: "Retrieval endpoint", owner: "owned" },
  { label: "Risk decision", note: "downstream fraud system", owner: "shared" },
  { label: "Token + DCID", note: "one-time cryptogram", owner: "shared" },
  { label: "Response to Chrome", note: "green 1–1.2s · yellow 3.5–4s", owner: "owned" },
];

export const stepUpPath = ["Yellow only: step-up challenge", "OTP dispatch", "OTP validation"];

// Midpoints of the reported ranges, on a 0–8 second scale.
export const latencyRows = [
  { label: "Green · before", value: "2.4s", mid: 2.4, tone: "muted" as const },
  { label: "Green · after", value: "1–1.2s", mid: 1.1, tone: "owned" as const },
  { label: "Yellow · before", value: "7–8s", mid: 7.5, tone: "muted" as const },
  { label: "Yellow · after", value: "3.5–4s", mid: 3.75, tone: "owned" as const },
];

export const proofChain = ["claim", "case", "decision", "implementation", "test", "outcome"];

export const proofTiles = [
  { value: "Zero", label: "functional defects in sandbox and production certification" },
  { value: "1 → 10 → 100%", label: "phased rollout, Google-whitelisted accounts first" },
  { value: "Zero", label: "card details exposed to merchants" },
  { value: "2024", label: "Star Award – Excellence in Delivery" },
];

export const chromeSubtitle = chromeAutofill.subtitle;
export const chromeMeta = chromeAutofill.meta;
