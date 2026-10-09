import { createElement } from "react";
import { openCam as src } from "@/data/content";
import { LiveTestCount } from "@/components/live-github-stat";
import type { CaseFile, Decision, Stage, TechnicalPanel } from "../types";

// OpenCAM is the strongest dark-architecture case. Every decision, scope lane and figure is
// restated from src/data/content.ts; full accounts are pulled from its decisions list by index.
const full = (i: number) => src.decisions.items[i].body;

// The repo has no API for a live test count (it's a CI-time fact, not repo metadata), so this
// reads badges/test-count.json off the default branch, same as the long-form case study page.
// Wired to the component (not a static string) because the static "439+" this replaced had
// already drifted to 1870 by the time it was caught - see docs/decisions.md D14.
const liveTestCount = createElement(LiveTestCount, { repo: "ShamikM88/open-cam-framework", fallback: 1870 });

const toneOf = (t: "brand-strong" | "blue" | "ember" | "muted") => (t === "brand-strong" ? "brand" : t);

const stages: Stage[] = [
  {
    key: "context",
    label: "Context",
    headline: "Credit memos drafted by an LLM were fast, but nothing stopped a wrong number reaching committee.",
    points: [
      "Credit analysts prepare Credit Assessment Memorandums against hard committee deadlines, with real reputational risk if a number is wrong.",
      "Grounding in early LLM drafts was only a \"cite your source\" instruction, not an enforced rule.",
    ],
  },
  {
    key: "constraint",
    label: "Constraint",
    headline: "A model can narrate a figure. It must never produce one.",
    points: [
      "Every covenant is evaluated against a ratio computed from raw financials, not drafted by the model.",
      "The model writes the narrative around figures that code has already computed.",
    ],
  },
  {
    key: "observed",
    label: "Observed",
    headline: "A debt-free company's DSCR was silently computed as 0 instead of undefined.",
    figure: { value: "0 → undefined", label: "DSCR for a debt-free company" },
    points: [
      "Scored as a covenant breach the company does not have, which would have wrongly flagged a healthy borrower.",
      "Found in a codebase audit, not by an analyst.",
    ],
  },
  {
    key: "decision",
    label: "Decision",
    headline: "Covenants evaluated deterministically: PASS, FAIL or UNRESOLVABLE, never silently defaulted.",
    points: [
      "The model can narrate a number, but it can never produce one.",
      "The fix covered a second, near-identical bug where Provisions and Other Long-Term Liabilities never reached total liabilities.",
    ],
  },
  {
    key: "execution",
    label: "Execution",
    headline: "Independent maker and checker agents, with the checker able only to downgrade a verdict.",
    figure: { value: "20 PRs", label: "merged in a single day to ship the Maker-Checker loop" },
    points: [
      "The Underwriter drafts and the Risk Reviewer audits, with no shared reasoning context between them.",
      "A gap-analysis audit of 19 further issues was merged in risk-weighted severity order.",
    ],
  },
  {
    key: "outcome",
    label: "Outcome",
    headline: "The DSCR error was caught before it could reach committee.",
    figure: { value: liveTestCount, label: "passing tests, up from 188 at MVP" },
    points: [
      "Trust turned out to be a product feature: code-level verification, not model judgment, is what makes the loop trustworthy.",
      "Real usage surfaced the two highest-value roadmap items faster than the original audit backlog did.",
    ],
  },
];

const decisions: Decision[] = [
  {
    title: "No shared context between maker and checker",
    problem: "A single agent auditing its own draft agrees with itself.",
    decision: "The Underwriter and Risk Reviewer share no reasoning context, and the Reviewer can only downgrade a verdict.",
    why: "The Reviewer's value comes from auditing cold.",
    result: "Maker and checker can run on different underlying models, so drafting and audit don't share the same blind spots.",
    fullAccount: full(0),
  },
  {
    title: "The model narrates; code computes",
    problem: "An LLM drafting the memo could state a figure that no check had ever computed. A debt-free DSCR was silently defaulted, and a second bug dropped liabilities from the total.",
    decision: "Every covenant is evaluated PASS / FAIL / UNRESOLVABLE against a ratio computed deterministically, never silently defaulted.",
    why: "The model can narrate a number, but it can never produce one.",
    result: "The debt-free DSCR bug is fixed for good, along with the near-identical liabilities bug.",
    fullAccount: full(1),
  },
  {
    title: "Shipped the bounded piece, flagged the rest",
    problem: "One issue bundled four separable asks together.",
    decision: "Shipped the well-bounded piece and explicitly disclosed the other three as deferred.",
    result: "The three deferred asks were disclosed, not quietly dropped.",
    fullAccount: full(2),
  },
  {
    title: "Reopened an issue I had already closed",
    problem: "Issue #31 was marked resolved once Maker and Checker could run on different models in code.",
    decision: "Reopened it after a later review found the setting was never switched on in production, and re-closed it only after verifying it end to end.",
    why: "The first closure had verified the code, not the production behaviour.",
    result: "Re-closed once it was verified working end to end.",
    fullAccount: full(3),
  },
  {
    title: "Fixed what tests couldn't catch, the same day",
    problem: "The first live production run leaked markdown artifacts and raw internal JSON into the exported Word document.",
    decision: "Fixed both within the day (PR #40) and codified durable prompt guidance alongside the fix.",
    result: "The same class of gap can't recur silently.",
    fullAccount: full(4),
  },
  {
    title: "Severity order beats arrival order",
    problem: "A 19-issue gap-analysis backlog, with fixes that could change a credit decision mixed in with cosmetic ones.",
    decision: "Shipped the correctness and security fixes first (PR #41), then the display bugs (PR #42), then feature work.",
    why: "Any fix that could change a credit decision landed before anything cosmetic did.",
    result: "Credit-decision fixes shipped before cosmetic ones.",
    fullAccount: full(5),
  },
  {
    title: "Caught Claude Code skipping my own instruction, mid-deal",
    problem: "Claude Code declared 20+ source citations on a live deal but never called the script that saves the underlying material.",
    decision: "Caught it by asking directly where the material was, then code-enforced that a declared citation has something saved behind it.",
    why: "The same gap could otherwise go unnoticed in my oversight of the AI doing the drafting.",
    result: "The sources folder had to be backfilled by hand. The citation check is now enforced in code.",
    fullAccount: full(6),
  },
  {
    title: "A \"lightweight\" path had zero independent audit",
    problem: "/research, the standalone qualitative-brief command, never ran the Risk Reviewer, so a Go/No-Go legal screen carried decision weight with no independent check.",
    decision: "Gave it a Checker pass.",
    why: "A screen with real decision weight should not run without an independent check.",
    result: "Surfaced a second bug, where the compliance checker would silently return \"compliant: true\" with zero reasons on a research brief. Caught by a manual smoke test before the fix shipped.",
    fullAccount: full(7),
  },
];

const technical: TechnicalPanel[] = [
  {
    kind: "flow",
    title: "Two agents, no shared context",
    intro: "The governance loop, from the case's own description. The checker can only downgrade a verdict, never upgrade one.",
    nodes: [
      { label: "Underwriter", note: "drafts the CAM narrative", tone: "shared" },
      { label: "Ground-truth check", note: "figures within 0.5% of raw financials", tone: "owned" },
      { label: "Risk Reviewer", note: "audits cold, can only downgrade", tone: "shared" },
    ],
  },
  {
    kind: "stack",
    title: "The model narrates. Code computes.",
    intro: "Where each figure is produced, in the order the pipeline runs.",
    layers: [
      { label: "Underwriter drafts the narrative", layer: "Probabilistic", tone: "shared" },
      { label: "Ratios computed from raw financials", layer: "Deterministic", tone: "owned" },
      { label: "Every figure checked against ground-truth financials, 0.5% tolerance", layer: "Deterministic", tone: "owned" },
      { label: "Covenants: PASS / FAIL / UNRESOLVABLE, never silently defaulted", layer: "Deterministic", tone: "owned" },
      { label: "Risk Reviewer audits cold, can only downgrade", layer: "Probabilistic", tone: "shared" },
    ],
    event: {
      title: "CORRECTNESS EVENT",
      facts: [
        { label: "DSCR computed", value: "0" },
        { label: "expected", value: "undefined" },
        { label: "company", value: "debt-free" },
        { label: "caught", value: "before committee" },
      ],
      note: "A debt-free company, scored as a covenant breach it does not have. Found in a codebase audit, not by an analyst.",
    },
  },
];

const artefactWhy = [
  "It shows the change discipline: every change went through a pull request, none pushed straight to main.",
  "The 19-issue audit tracked as real issues, the record behind the risk-sequenced fixes.",
  "Feature requests that came from real usage, not a backlog guess.",
  "Every ratio traceable to a raw line item. This is the reviewer's check on a figure.",
  "The grounding note says which inputs came from the relationship team and were not verified.",
  "LGD and coverage computed from disclosed inputs, not typed in by hand.",
];

export const opencam: CaseFile = {
  slug: "opencam",
  index: 3,
  group: "lab",
  name: "OpenCAM: Autonomous Maker-Checker Framework",
  short: "opencam",
  category: "Multi-agent AI · credit risk",
  proposition: src.subtitle,
  mode: "Controlled Delivery",
  meta: src.meta,
  receipts: [
    { value: "15–30 min", label: "target time to first draft, from about a business day", note: "a target, validated with one analyst" },
    { value: liveTestCount, label: "passing tests" },
    { value: "DSCR", label: "computed as 0 instead of undefined, caught before committee" },
  ],
  ownership: {
    owned: ["Strategy and product direction", "Prompt architecture", "Policy rules, and the MoSCoW scope calls"],
    shared: ["Implementation, directed and reviewed through Claude Code"],
    sharedLabel: "AI-executed",
    outOfScope: [
      "AML, sanctions and PEP screening: a separate AML team's system supplies it",
      "Multi-currency and FX: today's desk is GBP-only",
      "Full covenant step-down and cure-period modelling: deferred",
    ],
  },
  stages,
  initial: "constraint",
  inspect: {
    constraint: "A model can narrate a figure. It must never produce one.",
    decision: "Covenants evaluated deterministically: PASS, FAIL or UNRESOLVABLE.",
    outcome: "The DSCR error was caught before it could reach committee.",
  },
  sections: [
    {
      kind: "prose",
      eyebrow: src.problem.heading,
      heading: "Why the framework exists",
      paragraphs: src.problem.paragraphs,
      callouts: src.problem.frictionBullets,
    },
    {
      kind: "moscow",
      eyebrow: src.scope.heading.split(",")[0],
      heading: src.scope.heading,
      links: [
        {
          label: "Read the MVP v1 PRD, reconstructed from this scope call's own pull requests",
          href: "https://github.com/ShamikM88/open-cam-framework/blob/main/docs/mvp-v1-prd.md",
        },
      ],
      lanes: src.scope.lanes.map((lane) => ({
        label: lane.label,
        sublabel: lane.sublabel,
        tone: toneOf(lane.tone),
        items: lane.items,
      })),
    },
    {
      kind: "moscow",
      eyebrow: "Round 2",
      heading: src.mvp2.heading,
      intro: src.mvp2.intro,
      lanes: src.mvp2.lanes.map((lane) => ({
        label: lane.label,
        sublabel: lane.sublabel,
        tone: toneOf(lane.tone),
        items: lane.items,
      })),
    },
    {
      kind: "cards",
      eyebrow: src.features.heading,
      heading: "Six capabilities, one governance model",
      cards: src.features.items.map((f) => ({ letter: f.letter, title: f.title, body: f.body })),
    },
    {
      kind: "prose",
      eyebrow: src.workflow.heading,
      heading: "Two entry points, one shared spine",
      paragraphs: [src.workflow.intro, src.workflow.note],
    },
    {
      kind: "cards",
      eyebrow: src.strategy.heading,
      heading: "Early-stage, validated with one analyst",
      intro: src.strategy.intro,
      cards: src.strategy.cards.map((c) => ({ title: c.title, body: c.body })),
    },
    {
      kind: "steps",
      eyebrow: src.process.heading,
      heading: "Four steps, each risk-sequenced",
      steps: src.process.steps,
    },
  ],
  decisions: { heading: src.decisions.heading, items: decisions },
  technical: { heading: "pipeline", panels: technical },
  impact: { heading: src.outcomes.heading, bullets: src.outcomes.bullets },
  proof: {
    chain: ["claim", "case", "decision", "implementation", "test", "outcome"],
    tiles: [
      { value: liveTestCount, label: "passing tests, up from 188 at MVP" },
      { value: "0", label: "financial figures the model is allowed to compute itself" },
      { value: "0 → undefined", label: "the DSCR error, caught before committee" },
      { value: "1", label: "analyst validated to date: early-stage, not yet at scale" },
    ],
  },
  artefacts: {
    heading: src.visuals.heading,
    items: src.visuals.items.map((v, i) => ({
      src: v.src,
      alt: v.alt,
      caption: v.caption,
      why: artefactWhy[i],
      sourceUrl: src.repoUrl,
      sourceLabel: "open-cam-framework repository",
    })),
  },
  sources: [
    { label: "OpenCAM source repository", href: src.repoUrl, note: "the code, tests and merged pull requests" },
    { label: "Original long-form case study", href: "/case-studies/opencam", note: "on the live site, unchanged during review" },
  ],
  neighbours: {
    prev: { slug: "wallet", label: "Wallet Provisioning" },
    next: { slug: "job-search", label: "AI Job Search" },
  },
};
