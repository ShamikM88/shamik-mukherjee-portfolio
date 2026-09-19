// Verbatim markdown for the "Copy Markdown" buttons — sourced directly from the two
// case-study files in the private ai-job-search repo (see src/data/content.ts for the
// sourcing note). Kept as plain strings, not re-derived from content.ts, so what a
// visitor copies matches the original document exactly.

export const openCamMarkdown = `# OpenCAM Framework — PM Case Study

2026-09-17 · @ShamikM88

## 1. Executive Summary & Core Metric Target

I built OpenCAM Framework to automate how Credit Assessment Memorandums (CAMs) get drafted and checked, for corporate and asset-finance lending. At the core are two independent LLM agents: an Underwriter ("Maker") that drafts the CAM, and a Risk Reviewer ("Checker") that audits it independently. Both sit behind a deterministic policy engine that checks covenant compliance, collateral coverage, and source grounding in code — so a CAM can't reach a human reviewer until it's already passed hard checks, not just a model's best guess.

**Target / hypothesized impact metrics** (framework is early-stage; these are the outcomes it is designed to move, not yet measured at scale):

- **Time-to-First-Draft:** baseline ~1 business day of manual data entry, spreading, and narrative drafting → target 15–30 minutes.
- **Grounding / Compliance Defect Rate:** target 0% ungrounded narrative claims or unverified ratio math reaching credit committee, via code-gated verification.
- **Audit-Trail Completeness:** target 100% of deals carry model/prompt-version provenance (\`model_provenance\` in \`state.json\`).

*Everything above is validated with one analyst so far.*

## 2. Scope & Prioritization (MoSCoW)

- **Must have** (MVP, PRs #1–20): CAM template system, spreading engine with formula validation, .docx export, the Maker-Checker loop itself, deterministic policy engine, critical correctness/security fixes.
- **Should have** (fast-follow, PR #24): wiring policy checks into the primary slash-command interface, not just the headless script.
- **Could have** (post-MVP depth): forward-year projections & stress testing, Conditions Subsequent tracking, source-citation hyperlinking, AML/sanctions/PEP/ESG screening.
- **Won't have** (explicitly deferred, disclosed not hidden): multi-currency/FX support, full covenant step-down/cure-period modeling.

## 3. Feature Breakdown

**A. Maker-Checker Governance Loop** — two genuinely independent agents (Underwriter drafts, Risk Reviewer audits), no shared reasoning context, power to only downgrade a verdict, never upgrade one. Maker and Checker can run on different underlying models.

**B. Deterministic Policy & Compliance Engine** — every covenant evaluated PASS / FAIL / UNRESOLVABLE against the ratio computed from raw financials, never silently defaulted. Every reported figure checked against ground-truth financials within a 0.5% tolerance before the Checker sees it.

**C. Financial Spreading & Auditable Excel Export** — every ratio (TNW, EBITDA, DSCR, Gross Leverage, Net Debt/EBITDA, FCF Conversion %) computed from raw line items, formulas generated from a label-based row layout so a row reorder can't silently break a reference.

**D. Confidentiality-by-Design** — every artifact derived from a user's real business writes only to git-ignored paths, enforced as a rule before any new feature is built.

**E. Standalone Research Workflow (\`/research\`)** — a separate command for company/sector research and Go/No-Go screening without running the full CAM pipeline, writing the same state that lets a deal continue into the full pipeline later without redoing work.

## 4. Execution & Governance

Every change went through a pull request — 35 merged PRs, zero commits pushed straight to main — and every gap, bug, or feedback item got tracked as a GitHub issue before it was prioritized. Built solo, directing Claude Code to do the implementation: owned the product strategy, the prompt design for both agents, the policy-engine rules, and reviewed and tested every change before merge.

Hardened via a dedicated 19-issue gap-analysis audit (#21–#39), sequenced and merged in risk-weighted severity order — critical correctness/security bugs first, then lower-severity display-only bugs, then feature-completeness work.

## 5. Outcomes & Validation

- Went from a standing start to a fully working Maker-Checker CAM pipeline — 188 passing tests — in one day. Hardened into a gap-audited system covered by 338 tests.
- Directly caught and fixed a scenario where the system's own logic would have produced a materially wrong credit decision — a healthy, debt-free borrower failing a covenant.
- Shipped both live-feedback-driven items the same sprint they surfaced.

This framework is early-stage, built and validated with one target user. The figures above are directional estimates from hands-on use, not formal multi-tenant pilot data.

## 6. Strategic Context

- **Buy vs. build:** vendor platforms (e.g. nCino, Moody's CreditLens) don't give an inspectable, code-level audit trail of how a specific AI draft was checked — this closes that gap while keeping deal data off a third-party cloud.
- **Unit economics:** no separate metered API bill per step beyond existing Claude Code access, against multiple hours of analyst time saved per deal.
- **Enterprise adoption:** runs locally, writes only git-ignored files — usable without sending confidential figures to a third party or needing IT to approve a new vendor integration.
`;

export const jobSearchForkMarkdown = `# AI Job Search Fork — Feature Spotlight / Micro-Case Study

2026-09-18 · @ShamikM88

## 1. Project Snapshot & Product Context

\`ai-job-search\` (base repo: MadsLorentzen/ai-job-search) is an open-source, agentic job-application framework built on Claude Code. I forked it in August 2026 to run my own active job search across the UK, Germany, and Ireland markets, and used the fork itself as the vehicle to close real gaps I hit using it daily. Most were small fixes; four became durable pipeline features.

**Validation note:** everything below is validated entirely against my own live job search — 150 postings tracked to date, 46 currently applied — not a formal multi-user pilot.

## 2. Key Enhancements Shipped

**A. Live Application Dashboard** — replaced a static export with a live, server-rendered local dashboard: multi-select filters, a date-range filter, stable per-row IDs, a dedicated "Rejected" status view, one-click copy for job code/title.

**B. Gmail Status Sync & Email Deduplication** — a \`/gmail-sync\` command that scans Gmail for interview/offer/rejection signals against every open application and proposes tracker updates for review, plus a track that detects and dedupes job-recommendation digest emails into the scrape pipeline. One representative five-day-lookback run surfaced 7 rejection updates and 2 net-new leads from 11 scanned threads in a single pass.

**C. Cross-Portal & Re-post Hardening** — extended dedup beyond ID-based matching to a same-company-title check against the entire scrape history, catching an employer relisting an unfilled role under a fresh job ID. Closes a real, already-occurred gap: a role scraped three times under three different LinkedIn job IDs across two dates, where the surviving "ranked" copy was one step from a live application batch before it was caught manually.

**D. Cost-Efficiency Caching** — a posting-text cache (shared by \`/rank\` and \`/apply\`) and a company-research cache, each keyed off a normalized filename rather than a live re-fetch. Any posting or company hit by both a \`/rank\` triage pass and a later \`/apply\` pass now costs one fetch instead of two.

## 3. Product Ownership & Delivery Governance

Ran this fork in **Fast-Iterate Personal Tooling mode**: direct commits to \`master\` across 48 fork-specific commits, not a PR-per-change or Issue-tracked backlog — a deliberate choice for solo personal tooling, not an oversight.

Contrast with **OpenCAM Framework**, which runs under strict PR-only, Issue-tracked governance because a multi-user, production-adjacent tool has to be defensible to someone other than its author. Solo personal utility tooling benefits from direct-to-master rapid feedback loops; production systems don't get that same latitude.

**Local data confidentiality**, held constant regardless of governance model: every piece of sensitive data this fork touches is git-ignored and lives only on local disk — verified via a full \`git log --full-history\` audit, not just designed that way.

## 4. Impact & Metric Derivation

Directional estimates from a personal pipeline (150 tracked postings, 46 applied, 40 rejected, 5 in draft):

- **Status-tracking time:** one representative \`/gmail-sync\` run resolved 7 outcome updates and surfaced 2 new leads in a single pass.
- **Wasted-application avoidance:** the repost-hardening fix closes a failure mode that had already cost one wasted application before the fix shipped.
- **Fetch/token efficiency:** caching turns the rank-then-apply path from two fetches into one.
- **Dashboard review time:** pipeline review went from scanning a raw CSV to a single filtered view.
`;
