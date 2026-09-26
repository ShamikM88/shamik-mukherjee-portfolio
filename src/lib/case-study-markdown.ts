// Verbatim markdown for the "Copy Markdown" buttons -- the FULL source case
// study documents from the private ai-job-search repo (never committed there --
// documents/cv/** is gitignored), so what a visitor copies is the complete,
// detailed writeup, not a page-length-matched summary. The page itself stays
// curated/scannable by design; this button exists specifically for someone who
// wants more depth than the page shows. Keep in sync with the source .md files --
// see CLAUDE.md in ai-job-search for the reconciliation rule: any fact corrected
// on the page must also be corrected in the source .md file and re-synced here.

export const chromeAutofillMarkdown = `# Virtual Card Autofill for Google Chrome — PM Case Study

2026-09-21 · @ShamikM88

## Context

Online checkout has to balance high security against low friction. To solve it, a major US card network partnered with Google to autofill virtual cards directly inside Chrome, so a shopper's real card number never reaches the merchant.

Google defined the overarching solution and API framework (Virtual Cards v1) — but the reality of enterprise software is that execution is where integrations actually succeed or fail. Translating Google's strict cloud requirements into the network's highly regulated, legacy backend architecture was where the real delivery risk lived: there was nowhere in the existing estate for this to plug into, so delivery meant standing up a new microservice — the edge component for all inbound Google traffic into the network, spanning enrolment, unenrolment, retrieval, and sendOTP — hosted on OpenShift (OCP).

The integration split into two domains: Enrolment/Unenrolment (generating and unlinking the token — essentially mirror-image operations) and Retrieval (fetching the tokenized details dynamically during a transaction). I owned the Retrieval flow — the critical path that fires at the exact moment a user is trying to pay, where the tolerance for friction, latency, or failure was zero.

## Scope

**Technical Translation (Architecture to Action)**
- Broke down dense enterprise architecture flows into structured epics and rigorously defined user stories.
- Scoped and drove delivery of the Retrieval endpoint on a new microservice — the edge component for all inbound Google traffic into the network (enrolment, unenrolment, retrieval, sendOTP) — hosted on OpenShift (OCP), since nothing in the existing estate could serve it.
- Mapped and mitigated complex failure scenarios (e.g. network timeouts) to ensure graceful UI fallbacks.

**Cross-Domain Alignment (Systems & Stakeholder Coordination)**
- Partnered deeply with the Enrolment/Unenrolment-flow PO to keep domain boundaries clean and state management seamless.
- Integrated the Retrieval flow within the edge application against downstream systems — to get the risk decision on the retrieval request, and to fetch the token and DCID cryptogram details.
- Communicated directly with Google stakeholders during high-stakes integration testing to triage edge cases.

**Definition of Done (Quality & Governance)**
- Every story had to clear the full pre-prod test suite, meet every acceptance criterion, and deploy to production before it counted as Done — no partial credit.
- Any new functionality shipped with matching observability — new monitors or dashboard widgets — in the same story, never backfilled later.
- Every functional story was scoped as a vertical slice that could be productionized independently.

**Out of Scope (Clear Boundaries)**
- Overarching partner commercial relations (owned by account executives).
- Enrolment/unenrolment flows (owned by a peer PO).

## The technical puzzle

**A. Dynamic cryptograms (DCID).** The retrieval flow isn't just about passing a static number — it's about real-time security. Instead of the user's real card number, Chrome autofills a token plus a DCID: a dynamic, one-time equivalent of a physical card's CVV, generated fresh per transaction and dead the moment payment settles. Even intercepted mid-transaction, it's already useless.

**B. Zero-tolerance latency.** Getting the cryptography right — managing real-time latency, error handling, and payload security on every single checkout — was a massive engineering puzzle. It's unglamorous infrastructure, but when built right, it just works and nobody notices.

## How I worked it

1. **Transcribed the spec into epics, sequenced by release of value.** I translated Google's functional flow and API spec directly into epics and user stories — broken down by incremental release of value, not by technical layer: the green flow without risk checks first, then the green flow with risk checks added, then the yellow flow with OTP integration layered in last.
2. **Coordinated across every team the flow touched, not just my own.** Retrieval didn't sit in isolation — it depended on downstream teams for the risk decision, the token, and the DCID cryptogram, ran in parallel with the peer PO owning Enrolment/Unenrolment, and needed direct engagement with Google's own team during integration testing. I owned every story and edge case on Retrieval, but shipping it meant staying aligned across all three fronts at once.
3. **Held every story to a DoD that didn't stop at "deployed".** A local unit test passing wasn't proof of anything at this scale — nothing left the backlog as Done until it cleared the full pre-prod suite and was verified in production. That same bar covered observability too: if a story shipped new functionality, the monitoring and dashboards for it shipped in the same story, never as a follow-up.
4. **Validated live before trusting it at scale.** There was no user-facing feedback loop on this — real behavior was the only signal that mattered, so validation meant watching it myself rather than waiting on a research or support channel that didn't exist yet. Rollout was phased and tightly controlled: 1% of eligible cardholders first, then 10%, then 100%, and in that first phase only specific Google-whitelisted email addresses could even see the feature. I ran live retrievals myself against a dummy shopping-cart URL Google's own team shared, watching the autofill actually populate and tracing the full flow through Kibana in real time — seeing individual transactions work end to end before the flow was trusted with real volume.

## Execution calls I made

**Chased a 7-8s response time down to inside Google's 5s limit.** Performance testing threw a curve ball: Google's own NFR required retrievals to respond within 5 seconds. Green flow was fine at 2.4s, but the yellow flow — now hitting the real fraud system — was taking 7-8s. I worked with the engineers to trace it through Datadog to the fraud system's own downstream calls, then worked with that team directly; they optimized their APIs, cut their own downstream call count, and got green flow to 1-1.2s and yellow flow to 3.5-4s. On the yellow path, that response isn't even the card details — it's Google's instruction that the user needs to complete a step-up challenge first. A 5-second wait just to learn that, before any OTP round-trip has even started, wasn't something I was willing to accept.

**Surfaced a risk that wasn't mine to prioritize.** Chasing that latency fix surfaced a second-order risk: a user re-clicking autofill while waiting would generate extra requests that needed idempotent handling to avoid duplicate processing. As PO on this initiative, prioritization calls like this sat with the PM, not me — so I raised it as input rather than deciding it myself. It became an MVP2 item, delivered by the Enrolment team in Q2 2025.

**Mocked the fraud signal rather than waiting on it.** Our first release of value was the green flow with no risk checks — the fraud team's side simply wasn't prioritized yet. For the next release, I had two options: halt development citing a downstream blocker, or keep moving. We worked with the fraud team to understand, at a high level, how they'd tentatively process Google's risk signals — not their actual business rules, just a close approximation — and built a mock from that. Even our integration environment ran against it until the real system was ready.

**Wrote the certification tests myself, because nobody else would.** No one was resourced to write Google's certification test cases — every team was heads-down on their own deliverables. The peer PO on Enrolment and I each knew our own domain well enough to cover it ourselves: I wrote the Retrieval test cases, they wrote Enrolment/Unenrolment's — prerequisites, test data, and expected behaviour for every scenario. Mine included working with engineers to identify specific test cards mapped to each risk outcome — some hardwired to route into the green flow, some into yellow, some into red.

**Built traceability into the step-up verification chain.** Google's spec allows a retrieval request to step up into an identity-verification flow (their own "yellow path") when extra assurance is needed — which meant a single attempt could fan out into a separate OTP dispatch and OTP validation call. I proposed the mechanism that kept those three requests traceable back to one original attempt, rather than three disconnected events.

**Strict deployment gating.** Because of the scale of the network, passing a local unit test wasn't enough. I held the line on our Definition of Done: a sprint deliverable was only marked Done once it was successfully deployed to our OpenShift (OCP) environments and verified against integration tests. It slowed individual sprints down in the short term, but meant nothing ever reached production only to fail in a way pre-prod should have caught.

## Outcomes

- $900K settled volume in the first 45 days
- 275,000+ successful autofill requests in the first 60 days
- Zero actual card details ever exposed to merchants (by design of the token + DCID model)
- Star Award – Excellence in Delivery (December 2024)
- Delivered to production, November 2024, and driving top-of-wallet usage for the network since
- Partner certification testing for the retrieval flow — sandbox and production alike — passed with zero functional defects, against test cases I wrote myself
- Cut yellow-flow (risk-checked) response time from 7-8s to 3.5-4s, and green-flow from 2.4s to 1-1.2s — both comfortably inside Google's 5-second requirement

---

Role: Product Owner — translated architecture to epics, managed backlog, enforced Definition of Done · Timeline: Launched Nov 2024 · Stack: OpenShift (OCP) · Enterprise API Integration · JWE · Status: Live in production
`;

export const walletProvisioningMarkdown = `# Google Pay & Samsung Pay — Wallet Provisioning at Scale

2026-09-22 · @ShamikM88

## Two live fault lines at once

The edge applications connecting a major US card network to Google Pay and Samsung Pay sit on two live fault lines at once. A large-scale card portfolio migration means the underlying card programme itself is changing — and a digital wallet token has to survive that change without the cardholder noticing.

At the same time, specifications and validation rules originally written around a single primary issuer's conventions have to generalize as international franchise issuers come on board, without losing the rigor that keeps bad data out.

## Scope: two squads, one backlog owner

**Backlog Ownership (Two Squads, Two Boards)**
- Epics, user stories, and acceptance criteria across two squads' separate backlogs (Google Pay and Samsung Pay component teams).
- Cross-cutting initiatives — like the card migration validation — synchronized across both teams' boards through shared epics, not a merged backlog.

**B2B Integration Specs (The Contract Partners Build Against)**
- Define and maintain the B2B integration specifications partner organisations build against.
- Own the specification changes needed to generalize validation rules for international issuers, without loosening them enough to let bad data through.

**Card Migration Validation (Quality & Continuity)**
- Lead wallet provisioning validation across Google Pay and Samsung Pay for a large-scale card migration programme.
- Validate functional behaviour in pre-production for every migration wave before it reaches cardholders.

**Out of Scope (Clear Boundaries)**
- Samsung Wallet push provisioning — code-complete, not yet toggled on in production.
- The original Google Pay Transit enablement work — predates this scope.
- Apple Pay — owned by a different team.

## Selected initiatives

**Validating that a card migration is invisible to the wallet.** When a large card portfolio moves to a new underlying issuer, the physical card changes — but a digital wallet token shouldn't care. My teams validate the functional behavior of provisioned Google Pay and Samsung Pay tokens through every migration wave in pre-production: confirming that once the new card is live, the wallet token quietly picks up the new payment profile with zero cardholder friction — no re-enrollment, no re-adding the card, nothing for the cardholder to notice. The plastic changes; the wallet just keeps working.

**Token cleanup on a live repersonalization.** A live Google Wallet token repersonalization campaign left a long tail — cardholders who hadn't reopened their wallet or had inactive devices never picked up their new payment profile. I planned the date-wise batch schedule for the repersonalization notifications and worked with L1 support to run it, then spent two to three months coordinating directly with Google to unlink the tokens that never came back, cleaning up the legacy tail without disrupting cardholders who'd already migrated.

**Internationalizing a single-issuer spec.** Our B2B integration specification for Google Wallet push provisioning was written with one primary issuer in mind, including validation rules built around a single country's cardholder name and address formats. Bringing international franchise issuers onto the same capability meant relaxing that validation without loosening it so far it stopped catching bad data. The first international issuer went live in 2025; a second is currently onboarding, validated end-to-end in production ahead of general availability.

**Making a legacy, partner-published spec audit-ready.** Network-driven specs come with real controls. Ours is legacy — published to partners as PDFs, only once or twice a year — so whenever my work needs a spec change, I document it in Jira under the relevant epic with the updated draft attached, and log it in a tracker that ties every change back to its Jira ID. When a recent audit asked us to produce evidence for every change made, that tracker answered it directly — nothing to reconstruct after the fact.

## Outcomes

- First international issuer live on push provisioning, 2025
- Directs two squads' separate backlogs (Google Pay and Samsung Pay component teams) as independent Jira boards, synchronizing cross-cutting initiatives — like the card migration validation — through shared epics rather than merging them
- Digital wallet tokens continue to work for cardholders through a live, large-scale card portfolio migration — validated in pre-production ahead of each production wave, so the migration stays invisible to the wallet experience
- Closed out the legacy tail of a live token repersonalization campaign, coordinating directly with Google over several months to clean up tokens that never migrated
- Proved a specification built for a single issuer could generalize internationally — first market live in 2025, a second validated end-to-end in production ahead of general availability
- Passed a recent audit on full spec-change traceability — every change traced from tracker entry to Jira ticket, with nothing needing reconstruction after the fact

---

Role: Product Owner (Proxy PO → PO) — backlog ownership across two squads, B2B integration spec ownership, card migration validation, international issuer onboarding · Timeline: Mid 2022 – present · Stack: Legacy On-Prem Applications · Dual-DC Hosting (US) · B2B Integration Specs · Status: Active — ongoing, expanding internationally
`;

export const openCamMarkdown = `# OpenCAM Framework — PM Case Study

2026-09-17, refreshed 2026-09-26 · @ShamikM88

## 1. Executive Summary & Core Metric Target

I built OpenCAM Framework to automate how Credit Assessment Memorandums (CAMs) get drafted and checked, for corporate and asset-finance lending. Today that process runs on spreadsheets, email threads, and a lot of copy-pasting. I replaced it with a standardized pipeline that's actually auditable in code, not just on paper. At the core are two independent LLM agents: an Underwriter ("Maker") that drafts the CAM, and a Risk Reviewer ("Checker") that audits it independently. Both sit behind a deterministic policy engine that checks covenant compliance, collateral coverage, and source grounding in code — so a CAM can't reach a human reviewer until it's already passed hard checks, not just a model's best guess.

**Origin story:** This wasn't a hypothetical problem I picked because it sounded interesting. I watched my wife, a corporate credit analyst, prepare CAMs every day against hard credit-committee deadlines. A case starts as a formal credit request she picks up from her team's queue, not loose paperwork — the real friction is what happens next: manual financial spreading, and drafting a narrative under time pressure with real reputational risk if a number's wrong.

**Target / hypothesized impact metrics** (framework is early-stage; these are the outcomes it is designed to move, not yet measured at scale):

**Time-to-First-Draft**

- Baseline: \\~1 business day of manual data entry, spreading, and narrative drafting
- Target: 15–30 minutes from raw financials to a reviewed draft
- Takeaway: Compressing a day of manual work into half an hour is the single biggest lever for analyst capacity.

**Grounding / Compliance Defect Rate**

- Baseline: Ungrounded claims and unverified ratio math rely entirely on manual second-read review to be caught.
- Target: 0% ungrounded narrative claims or unverified ratio math reaching credit committee.
- Takeaway: Code-gated verification (100% pass rate on automated covenant/CP/source-citation checks before human review) shifts compliance from an expensive manual safety net to an automated guarantee.

**Audit-Trail Completeness**

- Baseline: No record of which analyst assumptions or model version produced a historical memo
- Target: 100% of deals carry model/prompt-version provenance (\`model_provenance\` in \`state.json\`)
- Takeaway: Every historical CAM stays defensible even after the model or a prompt changes later.

*Everything above is validated with one analyst so far — see Section 7 for validation scope and how these target numbers were derived.*

## 2. User Persona & Friction Mapping

**Primary persona: the Corporate Credit Analyst / Underwriter.** I modeled this persona directly on a real analyst's day, not a composite I made up. She's running several deals at once. Borrower financials show up as PDFs or spreadsheets emailed over by relationship directors, often because the accounts haven't been filed with Companies House yet. She re-keys the figures into a spreading template by hand, calculates ratios in Excel, and drafts the narrative sections from ad hoc web research. Then she cross-checks covenant and security terms against the facility documents, and produces a Word memo plus an Excel workbook for credit committee. All of it under time pressure, where a wrong figure or a missing citation is a real compliance and reputational risk.

**Three friction points I kept running into** (grounded in the repo's own issue history):

1. **No independent verification loop on manual data entry.** When I audited the codebase before hardening it, I found a debt-free company's DSCR was being silently computed as \`0\` instead of "undefined" — and it then failed a covenant it should have passed. That's the exact kind of silent, uncaught error the manual process is already exposed to. I fixed it in PR #20 (more on that in Section 6).
2. **One rigid spreading schema, but every institution spreads differently — something I only learned after shipping the MVP.** I built the MVP around one canonical spreading schema on purpose, to get the end-to-end loop working fast (see Section 3). Real use proved that choice too narrow: on a real deal — Borrower A — the borrower's own accounts embed Depreciation inside Cost of Goods Sold, a house convention the single schema couldn't accommodate (Issue #55). That's live analyst feedback, not a hypothetical: forcing every borrower into one schema creates friction because different institutions and deal structures genuinely need tailored templates.
3. **Narrative grounding was a soft instruction, not an enforced rule.** Company history, management bios, market claims — all of it was only ever "cite your source" as prose guidance, with no code-level check behind it. That meant an unsupported claim could reach committee completely undetected. I closed that gap in Issue #26 (PR #43).
4. **No modular, lightweight-only workflow.** If an analyst just needs the qualitative research — company history, industry dynamics, commercial due diligence — while spreading a non-standard deal manually in Excel, there was no way to ask for just that. The pipeline assumed every deal wanted the full automation stack (Issue #56).

## 3. Product Vision & Scope Prioritization (MoSCoW, MVP v1)

I scoped the MVP tightly — PRs #1 through #20, shipped in a single day — around getting one end-to-end loop working before I let myself go deep on any single feature:

| Priority | Scope | Examples |
| --- | --- | --- |
| **Must (MVP)** | I needed the core Maker-Checker loop working end to end, on a correct financial foundation | CAM template system (#2, #5), spreading engine with formula validation (#3, #10), .docx export (#4), multi-step state persistence (#9, #11), the Maker-Checker governance loop itself (#12), a deterministic policy engine layered on top of LLM narrative (#14), critical correctness/security fixes before wider use (#20: path traversal, zero-division masking, non-atomic writes) |
| **Should (fast-follow)** | My fast-follow: close the gap between "the enforcement layer exists" and "the enforcement layer actually runs for real users" | Wiring the deterministic policy checks into the primary, no-API-key slash-command interface (#24) — the headless script had enforcement from day one, but the interface most analysts would actually use did not |
| **Could (post-MVP depth)** | Once I trusted the core loop, I turned to feature completeness | ✅ Forward-year projections and stress testing (#25) · ✅ Conditions Subsequent tracking and Net Debt/EBITDA and FCF ratios (#46) · ✅ source-citation hyperlinking (#47) · ❌ AML/sanctions/PEP screening and ESG scoring (#35, not built — see MVP2 table below) |
| **Won't (explicitly deferred)** | Scope I deliberately chose not to take on, because it would need a schema redesign or serves a use case outside my current user base | ❌ Multi-currency/FX (#49, deprioritized — the current desk is GBP-only) · ❌ HoldCo/OpCo consolidation (#48, prioritized *ahead* of FX for the same reason) · ❌ full covenant step-down/cure-period modeling (#33, deliberately scoped down to just Conditions Subsequent tracking rather than attempting all four bundled sub-asks at once) |

**Delivery status (✅ shipped / ❌ not built):** Must and Should are omitted from the ✅/❌ marks above — by definition, everything in those two rows already shipped as MVP v1 itself. The marks matter where the answer is genuinely mixed: three of four Could-have items shipped anyway once I had capacity, and the fourth (AML/ESG) turned out to already be covered by a separately-owned system rather than being a gap I still need to close — see the MVP2 table in Section 7.

**Key trade-off pattern:** I ran a dedicated gap-analysis audit — 19 issues, #21–#39 — against the live codebase, then sequenced and merged them in risk-weighted severity order. Critical correctness/security bugs went first (PR #41: date-resume logic, a race condition, a hardcoded model), then lower-severity display-only bugs (PR #42), then feature-completeness work. I didn't just work the backlog in issue-number or arrival order.

### What I shipped next: reprioritizing on direct user feedback

Two items came from live analyst use, not from me guessing at backlog grooming, and I pulled both to the top of my priority list and shipped them next:

| User story | Issue | Why now |
| --- | --- | --- |
| "Let me feed in my institution's own approved spreading template instead of forcing my figures through one fixed schema." | #55 (PR #63) | Blocked a real deal until worked around by hand |
| "Let me get just the qualitative research when I'm spreading a non-standard deal manually anyway." | #56 (PR #61) | Analyst is doing the full pipeline's research value even when skipping its financial engine |

**The strategic trade-off:** This is a deliberate pivot on my part — from an "all-in-one automation engine" that owns the entire CAM start to finish, toward a **modular "copilot mode"** where the tool does whatever part of the CAM the analyst hands it, and gets out of the way for the rest. The all-in-one framing was my discovery-phase assumption. Live use showed me that analysts don't want to abandon their own spreading workflow just to get value from the research/compliance automation. I judged that removing that all-or-nothing barrier would lower adoption friction more than any single new feature would. Both shipped the same sprint they were identified — #55 in PR #63, #56 in PR #61 — so this pivot is live in the pipeline now, not just a stated intention.

**How I actually shipped this.** Every change went through a pull request — 59 merged PRs, zero commits pushed straight to main — and every gap, bug, or feedback item got tracked as a GitHub issue before I prioritized it. I built this solo, directing an AI coding assistant (Claude Code) to do the implementation: I owned the product strategy, the prompt design for both agents, the policy-engine rules, and reviewed and tested every change before merge. That's a different kind of PM execution than shipping through an engineering team, and I'd rather name it directly than leave it implicit.

## 4. Feature Breakdown & Product Requirements

### Feature A — Maker-Checker Governance Loop

I built the CAM drafting and review into two independent steps: an Underwriter agent drafts, and a separate Risk Reviewer agent audits it against covenant, security, and grounding rules — with no shared reasoning context between them, and the power to only downgrade a verdict, never upgrade one. Maker and Checker can also run on different underlying models (Issue #31, PR #53), so drafting and audit don't share the same model's blind spots. The payoff for the analyst: gaps get caught before a CAM ever reaches committee, not after.

### Feature B — Deterministic Policy & Compliance Engine

Every covenant gets evaluated as PASS / FAIL / UNRESOLVABLE against the ratio computed from raw financials — never silently defaulted, which is what fixes the real bug where a debt-free company failed a DSCR covenant it should have passed. Conditions Precedent are generated deterministically from the deal's actual collateral and security structure, and every reported figure is checked against ground-truth financials within a 0.5% tolerance before the Checker even sees it. I made sure this enforcement runs identically on both the slash-command and headless interfaces (PR #24) — slash commands shell out to the same local Python state and policy-check modules the headless script uses, so covenant and grounding rules are code-gated before an analyst ever sees a draft, not something the model is trusted to self-police. That means compliance doesn't depend on which surface an analyst uses, or whether the model happened to notice a problem.

### Feature C — Institutional Credit Policy Referencing

A one-time \`/calibrate-policy\` command derives a fork-local credit policy from an institution's own policy documents (mirrors the existing calibration-samples → style-guide pattern). The Underwriter treats it as advisory drafting guidance and self-declares whether it considered the policy; the Risk Reviewer treats it as a mandatory, independently-verified audit obligation — any violation is REJECTED-worthy regardless of what the Underwriter declared. Code-enforced via the same floor-level presence-check pattern used elsewhere: the policy engine rejects a draft that omitted the declaration when a policy is calibrated, but never checks compliance itself — that's the Reviewer's own independent, qualitative audit. Same asymmetric-weight pattern used everywhere else in the governance model. (Issue #57, PR #85)

### Feature D — Financial Spreading & Auditable Excel Export

Every ratio — TNW, EBITDA, DSCR, Gross Leverage, Net Debt/EBITDA, FCF Conversion % — is computed straight from the same raw line items shown in the workbook, across historical, forward-year, and downside cases (Issue #38, PR #50), with formulas generated from a label-based row layout so a row reorder can never silently break a reference. An undefined ratio, like a debt-free company's DSCR, is always shown as genuinely undefined rather than coerced to a misleading \`0\` that could mask a real covenant breach. That means committee can trace every number in the memo straight back to its source.

An analyst can also supply figures already spread against their own institution's template instead of the framework's schema (Issue #55, PR #63) — discovered on a real deal where the borrower's own accounts embed Depreciation inside COGS, a house convention the framework's raw taxonomy couldn't accommodate. Rather than force-map a non-conforming template onto \`FIELD_LABELS\` (the exact kind of silent reconciliation that risks altering a real figure), the framework records the analyst's own subtotals exactly as given and tags the deal's \`financials_source\` as \`analyst-supplied\` rather than \`framework-computed\`. The resulting CAM then carries an explicit, visible caveat disclosing that the spreading wasn't independently recomputed — a real, deliberate reduction in audit guarantee.

### Feature E — Confidentiality-by-Design (Git-Level Data Governance)

Every artifact derived from a user's real business — calibration samples, the derived style guide, calibrated CAM templates, generated deal state and output — writes only to paths already excluded via \`.gitignore\`, and I enforce that as a rule for any new feature before it's built, not audit it in after the fact. A fork can be freely customized on live, confidential deal data with zero risk of a proprietary figure or client name reaching the shared open-source repo. Promoting a locally-derived template upstream is always a deliberate, user-initiated action, gated by a heuristic PII scan (\`scripts/pii_scan.py\`) as a second line of defense before human review.

### Feature F — Standalone Research Workflow (\`/research\`)

Shipped the same week as the other reprioritized item (PR #61, closing Issue #56): a new \`/research\` command that combines \`/triage\`'s Go/No-Go screen and \`/commercial\`'s company/sector research into one step, for an analyst who just needs the qualitative picture on a deal without running the full CAM pipeline. It writes the exact same \`state.json\` keys the two source commands would, so a deal that later turns out to need a full CAM can continue straight into \`/spread\` → \`/collateral\` → \`/project\` → \`/assemble\` without redoing anything already done. It exports a standalone Research Brief (\`.docx\`) through a script deliberately kept separate from the main CAM exporter — a research-only deliverable must never trigger the full-CAM export's side effects (template auto-save, \`.xlsx\` spreading export), since no financials or collateral exist yet for a deal that only ran \`/research\`. Test suite grew from 325 to 338 passing with this PR.

## 5. User Journey & Workflow Architecture

**End-to-end flow, raw input to finalized CAM:**

\`\`\`mermaid
flowchart LR
    subgraph Setup["One-time setup — not run per deal"]
        A[/calibrate<br/>writing style + CAM template, per deal type/]
        AP[/calibrate-policy<br/>institution's credit policy, org-wide/]
    end
    A -.-> G
    AP -.-> G
    B[/triage<br/>legal ID, UBO, Go/No-Go/]
    R[/research<br/>standalone company/sector research + Go/No-Go/]
    R -.-> RB[Research Brief .docx<br/>standalone export]
    B --> C[/spread<br/>ratios from raw financials/]
    R --> C
    C --> D[/commercial<br/>company + sector research/]
    D --> E[/collateral<br/>security + LGD/PD exposure/]
    E --> F[/project optional<br/>projections, stress, covenants/]
    F --> G[/assemble<br/>draft + Checker loop/]
    G --> H[.docx + .xlsx export]
\`\`\`

Note: \`/triage\` and \`/research\` are the two entry points every deal actually starts at; both write the same state, so a deal can continue into the full pipeline later without redoing work. A deal continuing from \`/research\` rejoins directly at \`/spread\` and skips \`/commercial\`, since \`/research\` already produced that output as part of its own combined step (see Feature F, Section 4, for the exact mechanics).

\`/calibrate\` and \`/calibrate-policy\` are one-time, org-level setup: \`/calibrate\` derives house writing style and a CAM template per deal type; \`/calibrate-policy\` derives an institution's own credit policy, org-wide (Feature C, Section 4). Every deal afterward just reads whichever is already in place.

Each step checkpoints its results to a per-deal \`state.json\` the moment it finishes. That way, a compacted conversation or a resumed session never loses work that's already done — only the step still in progress is ever at risk.

Every checkpoint in this journey — \`state.json\`, the exported \`.docx\`/\`.xlsx\`, any calibrated template — is written to a git-ignored local path (see Feature D, Section 4); nothing about a real deal ever needs to leave the analyst's own machine or fork to get the benefit of the automation.

**Edge cases I handled, each grounded in a real, fixed issue:**

- A missing metric is never invented — left explicitly undefined and surfaced, not silently defaulted.
- A deal resumed on a later calendar day still finds its state file automatically; a genuinely new annual review under the same company/proposal names does not silently inherit stale prior-year data (Issue #27).
- Concurrent writes to the same deal's state file cannot silently clobber each other (Issue #21, file-locking).
- Running \`/assemble\` before \`/spread\` has completed is hard-blocked at the code level, not just a prompt reminder (Issue #28).
- An institution-specific spreading convention (e.g. Depreciation embedded in Cost of Goods Sold) is surfaced and reconciled explicitly rather than silently miscalculated (discovered live; formalized as Issue #55).

## 6. Execution, Stakeholder Feedback & Iterate Cycle

- **My first live production run surfaced bugs unit tests never would have caught.** The first real deal — Borrower B — exposed markdown formatting artifacts leaking into the exported Word document, and the model's own internal structured-JSON output leaking into a client-facing file. I fixed both the same day (PR #40), and codified durable prompt guidance alongside the fix — depth/materiality scaling and mandatory bureau-score prompting — so the same class of gap couldn't recur. A CAM with visible formatting glitches or raw JSON in front of a credit committee would have cost the tool its credibility on day one.
- **A codebase audit I ran caught a critical correctness bug before it ever reached a real credit decision.** I found a debt-free company failing a DSCR covenant it should have passed, and fixed it with full regression coverage in PR #20 — before I'd even opened the gap-analysis backlog (#21–#39). Left uncaught, that bug would have wrongly flagged a healthy borrower as a covenant breach — exactly the kind of error that erodes an analyst's trust in the tool.
- **I worked the backlog in risk-weighted priority order, not arrival order.** The highest-criticality correctness/security issues — #27, #21, #34 — shipped in PR #41 first. Lower-severity display-only bugs (#22, #23) followed in PR #42. Feature-completeness work came after that, so any fix that could actually change a credit decision landed before anything cosmetic did.
- **Marking Issue #31 resolved taught me that "the capability exists in code" and "the configuration is switched on" are two different verification steps.** I closed it once the capability to run Maker and Checker on different models existed. A later review caught that the setting actually turning it on had never been flipped — Maker and Checker were still running on the identical model in production, which meant the audit wasn't actually independent, the one guarantee the whole governance loop depends on. I reopened the issue and only re-closed it once I'd verified it working end to end (PR #53).
- **I cut scope mid-flight instead of half-implementing everything.** Issue #33 had bundled four separable asks together: covenant step-downs, cure periods, Conditions Subsequent tracking, and taxonomy severity weighting. Rather than push all four through in one unreviewed pass, I shipped just the well-bounded piece — Conditions Subsequent tracking — in PR #46, and explicitly disclosed the other three as deferred instead of quietly dropping them, so nothing about coverage gets discovered by surprise later.
- **Two live feedback items went straight to the top of my priority list.** Custom spreading-template support (#55) and modular/research-only routing (#56) weren't backlog guesses on my part — both came directly from a real analyst hitting the pipeline's all-or-nothing assumption on a real deal. I reprioritized both to the top of what I worked on that same week (see Section 3).
- **The debt-free-DSCR bug wasn't a one-off — the same class of gap surfaced again, and I caught it the same way.** Auditing the balance-sheet spreading logic found Provisions and Other Long Term Liabilities had no mapping into \`FIELD_LABELS\` at all (Issue #52, PR #59): both fields stayed permanently blank in the exported workbook and were silently dropped from the \`total_liabilities\` calculation, understating leverage for any borrower carrying provisions. Caught on a live deal carrying roughly GBP 2.9–3.6m of provisions, invisible anywhere in the output. Fixed with regression coverage confirming \`total_debt\` and every ratio built from it stayed correctly unaffected, since provisions aren't interest-bearing debt.
- **Closed the same hardcoded-model gap on a third surface.** Issue #31's fix (PR #53) made the Maker and Checker configurable to run on different models, and PR #41 closed the same gap in the orchestrator. \`calibrate.py\` still had two hardcoded model literals of its own (Issue #54, PR #60) — closed by reading the same \`maker_model\` config key, with a deliberately softer fallback than the orchestrator's fail-loud behavior, since calibration derives a one-time style guide rather than drafting a real credit memo.
- **Caught Claude Code skipping my own instruction, on a live deal.** While running an actual deal, Claude Code declared 20+ source citations across \`/triage\` and \`/commercial\` but never once called the script that actually saves the underlying material — despite the instruction telling it to being right there in the command files I'd authored myself (#67/#68). I caught it by asking directly where the material was; the \`sources/\` folder didn't exist until I had it backfilled by hand. Fixed by code-enforcing that a declared citation has something saved behind it (Issue #72, PR #73), so the same gap can't happen again unnoticed — this time in my own oversight of the AI doing the drafting.
- **A "lightweight" path had zero independent audit — and fixing it surfaced a second, sharper bug.** \`/research\`, the standalone qualitative-brief command, never ran the Risk Reviewer at all: a Go/No-Go legal screen carried real decision weight with no independent check (Issue #87). Giving it a Checker pass (PR #94) surfaced that the existing compliance checker assumes a full CAM's shape — pointed at a research-only brief, it would have silently returned \`"compliant": true\` with zero reasons, not because the brief was sound but because nothing matched what the checks look for. Caught by a manual smoke test before the fix shipped, not after.

## 7. Outcomes, Learnings & Next Horizon

**What I've measured so far:**

- I went from a standing start to a fully working Maker-Checker CAM pipeline — 188 passing tests — in one day. From there I hardened it into a gap-audited system covered by 430 tests, with deterministic policy enforcement running identically on both interfaces.
- I directly caught and fixed a scenario where the system's own logic would have produced a materially wrong credit decision — a healthy, debt-free borrower failing a covenant. That's concrete evidence to me that code-enforced verification, not model judgment alone, is the load-bearing safety mechanism here.
- Shipped both live-feedback-driven items the same sprint they surfaced — analyst-supplied pre-spread financials (#55, PR #63) and deal-intake routing/copilot mode (#56, PR #61) — closing the loop from real user friction to a shipped fix faster than the original gap-analysis backlog did.

**Key learning:** Real usage, not synthetic testing, surfaced my two highest-value roadmap items — institutional spreading-convention flexibility (#55) and research-only/intake routing (#56). That's what validated my approach: ship it, use it on a real deal, and let real friction drive the backlog, instead of guessing at features speculatively. It also matches the project's own documented roadmap intent ("support ingesting a user-supplied Excel spreading template") — real use is what turned a noted future direction into a scoped, ready-to-build issue.

**What I'm prioritizing next — MoSCoW round 2 ("Hardening Cycle 2"):**

MVP v1 already shipped and is in daily use. This next MoSCoW pass follows it, in the same priority order as round 1: fix foundational gaps before adding polish.

| Priority | Scope | Examples |
| --- | --- | --- |
| **Must (foundational gaps)** | Correctness/architecture gaps that need fixing before anything else in this round | Fix the dangling Parent/UBO Guideline cross-reference — a template already points to guidance that was never written (#96); wire the primary interface through to the tested financial-formula code instead of around it (#98); extend the ground-truth figures schema to cover metrics the framework already requires citing — Working Capital Days, collateral exposure (#99) |
| **Should (fast-follow)** | Valuable depth once the Must-have gaps are closed | Systematic Parent/UBO research guidance — full ownership chain, ownership percentages, recent ownership changes, and the materiality judgment call for when it warrants a full Ultimate Parent section (#96) |
| **Could (post-round-2 depth)** | Feature completeness, if capacity allows | HoldCo/OpCo group/subsidiary financial consolidation (#48); render Group/Parent/UBO structure as a tree diagram instead of prose (#113); charts/graphs in CAMs — sector trends, SWOT, positioning, stock price (#114) |
| **Won't (deferred for this round)** | Scope I'm consciously not taking on this round | Full covenant step-down/cure-period modeling (#33, same bundled-scope call as MVP v1); FX/multi-currency support (#49, the desk is still GBP-only); AML/sanctions/PEP screening & ESG scoring (#35, my wife's desk has a separately-owned AML team whose system already supplies this as an input — building it into OpenCAM would duplicate, not fill, a gap) |

**Note on #96:** it bundles two genuinely different asks, the same kind of bundled-scope split I made on #33 in MVP v1, now applied prospectively rather than after the fact — fixing an already-broken cross-reference (Must) and building out the fuller systematic guidance that fix's context actually needs to be useful (Should). Surfaced on a real deal with a two-hop ownership structure (a UK parent, a French ultimate parent) and a recent minority investment, where that context only got captured because the analyst explicitly asked for it in conversation — the framework's own prompt never did.

**Note on #33 and #49:** kept in Won't for this round, not because they're low-value forever — if I ever open OpenCAM up for wider adoption beyond my own use, both become real gaps to close rather than deferred scope.

### Validation, Economics & Strategic Context

This framework is early-stage, built and validated with one target user — my wife, a corporate credit analyst. The figures below are directional estimates from hands-on use, not formal multi-tenant pilot data; I'd rather show the reasoning openly than present them as more settled than they are.

- **Validation scope:** The active work in Section 3 — testing schema flexibility against real, non-standard deals — is the first deliberate step toward finding out whether this holds up beyond one analyst's workflow, not just a hypothesis.
- **How I got the target numbers:** The 15–30 minute target comes from watching how long the pipeline actually takes end to end against the equivalent manual work — directionally right, not a precise benchmark yet.
- **What that could mean:** At roughly 4 deals a month per analyst, cutting the draft step from about a business day to under an hour frees up somewhere in the range of 25–30 hours a month for the parts of the job that actually need a human — structuring, negotiation, judgment calls.
- **Buy vs. build:** Platforms like nCino or Moody's CreditLens are built around vendor-defined schemas and don't give you an inspectable, code-level audit trail of how a specific AI draft was checked — exactly the gap this closes. Building it locally also means confidential deal data never has to leave the analyst's own machine.
- **Unit economics:** Slash commands shell out to the same local policy-check modules as the headless script, so there's no separate metered API bill per step beyond the analyst's existing Claude Code access. Against that largely fixed tooling cost sits multiple hours of a qualified analyst's time per deal — a lopsided trade even without a precise figure on either side.
- **Enterprise governance & adoption:** Because this runs locally and writes nothing but git-ignored files, an analyst — or a bank — could use it without sending a single confidential figure to a third-party cloud service, and without needing IT to approve a new vendor integration into core banking systems. That's a real adoption advantage over a SaaS platform. It also means there's no hosted, multi-user version yet — a real gap, not a hidden one.`;

export const jobSearchForkMarkdown = `# AI Job Search Fork — Feature Spotlight / Micro-Case Study

2026-09-18 · @ShamikM88

## 1. Project Snapshot & Product Context

\`ai-job-search\` (base repo: [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search)) is an open-source, agentic job-application framework built on Claude Code: it evaluates postings against a candidate profile, tailors CVs and cover letters, and tracks applications end to end. I forked it in August 2026 to run my own active job search across the UK, Germany, and Ireland markets, and used the fork itself as the vehicle to close real gaps I hit using it daily. Most of those were small fixes; four became durable pipeline features, and those are what this spotlight covers.

**Validation note:** everything below is validated entirely against my own live job search — 150 postings tracked to date, 46 currently applied — not a formal multi-user pilot. I'd rather label it that way than present it as more settled than it is.

## 2. Friction Points & Gap Analysis (The "Why")

1. **Dashboard blindness.** The framework's default output was a static snapshot — no fast way to filter, sort, or see "what's actually live right now" across a growing tracked pipeline without opening the raw CSV or JSON by hand.
2. **Manual status tracking.** Application outcomes lived entirely in employer emails I had to notice, reread, and hand-transcribe into the tracker. With dozens of applications in flight at once, this didn't scale — status updates silently lagged reality.
3. **Reposted listings slipping past dedup.** Portal-level dedup (exact URL, job ID) missed the case where an employer relists an unfilled role under a brand-new job ID. This wasn't hypothetical: a role I'd already been rejected from — scraped three times under three distinct LinkedIn job IDs — nearly went out again in a batch of applications before I noticed the live listing had closed.
4. **Redundant fetches burning time and tokens.** \`/rank\` and \`/apply\` each independently re-fetched the same job posting and re-researched the same company from scratch, even when the other command had already done that work minutes or days earlier.

## 3. Key Enhancements Shipped (Feature Breakdown)

### A. Live Application Dashboard
Replaced the framework's static export with a live, server-rendered local dashboard: multi-select filters, a date-range filter, stable per-row IDs, a dedicated "Rejected" status view (swapped in from a less-actionable "Duplicates" count), and one-click copy for job code/title. **Outcome:** cut "what's actually live right now" from a manual CSV scan down to a single filtered view — directly usable across a 150-posting tracked pipeline.

### B. Gmail Status Sync & Email Deduplication
Built a new \`/gmail-sync\` command that scans Gmail for interview/offer/rejection signals against every open application and proposes tracker updates for my review before writing anything — plus a separate track that detects and dedupes job-recommendation digest emails (StepStone, LinkedIn, Indeed) straight into the scrape pipeline instead of letting them go unread. **Outcome:** one representative five-day-lookback run surfaced 7 rejection updates and 2 net-new leads from 11 scanned threads in a single pass, replacing what had been ad hoc, easy-to-miss manual inbox triage.

### C. Cross-Portal & Re-post Hardening
Extended dedup beyond ID-based matching (exact URL, LinkedIn/StepStone job ID) to a same-company-title check against the *entire* scrape history, not just the current run's pool — catching an employer relisting an unfilled role under a fresh job ID. **Outcome:** directly closes a real, already-occurred gap — the role that had been scraped three times under three different LinkedIn job IDs across two dates. Two of the three were already caught as duplicates of each other, but nothing had checked either against the oldest entry, and the surviving "ranked" copy was one step from a live application batch before I caught it manually. The fix prevents that exact failure mode going forward.

### D. Cost-Efficiency Caching
Added a posting-text cache (shared by \`/rank\` and \`/apply\`) and a company-research cache: each keys off a normalized filename (URL or company name, lowercased with non-alphanumeric runs collapsed to hyphens) rather than a live re-fetch — postings cache indefinitely since a published listing's text doesn't change, company research on a 30-day TTL since that can go stale. **Outcome:** any posting or company hit by both a \`/rank\` triage pass and a later \`/apply\` pass now costs one fetch instead of two, eliminating a duplicate fetch-and-research pass on the common rank-then-apply path.

## 4. Product Ownership & Delivery Governance

As sole developer and end user of this fork, I ran it in what I'd call **Fast-Iterate Personal Tooling mode**: direct commits to \`master\` across 48 fork-specific commits (2026-08-11 through today), not a PR-per-change or Issue-tracked backlog. That was a deliberate choice, not an oversight — a live scraper hitting real job portals against my own job search needed a tight edit-run-observe loop, and the administrative overhead of PR review and issue triage has no payoff when I'm the only contributor and the only person affected by a regression.

Contrast this with **OpenCAM Framework**, a separate open-source project I also built and designed for other institutions to adopt: that one runs under strict PR-only, Issue-tracked governance (35 merged PRs, zero direct-to-main commits), because a multi-user, production-adjacent tool has to be defensible to someone other than me. **Solo personal utility tooling benefits from direct-to-master rapid feedback loops; production or multi-user systems don't get that same latitude, and I don't conflate the two.**

One discipline I held constant regardless of governance model: **local data confidentiality.** Every piece of sensitive data this fork touches — the application tracker, the scraped-job cache, Gmail sync state, cached company research and job postings, and a confidential-client reference file — is git-ignored and lives only on my local disk.

I didn't just design it that way — I audited it. A full \`git log --full-history\` pass against every one of those files shows: the application tracker was tracked once, upstream in the base repo's initial commit, but only ever carried its empty header row, and was untracked before this fork's own commit history begins; the scraped-job cache, Gmail sync state, and the confidential-client reference file have zero history in this repository — never tracked, at any point. My personal job-search data has never left my machine, and that's a verified fact, not a stated intent.

## 5. Impact, Metric Derivation & Personal Efficiency Gains

Everything below is a directional estimate from my own personal pipeline (150 tracked postings, 46 applied, 40 resolved as rejected, 5 in draft as of today) — real numbers from real usage, not formal multi-user benchmark data, and I'm not rounding any of them up for effect.

- **Status-tracking time:** one representative \`/gmail-sync\` run resolved 7 outcome updates and surfaced 2 new leads from an 11-thread, 5-day window in a single pass, replacing what had been unbounded, easy-to-skip manual inbox rereading with a bounded, on-demand check.
- **Wasted-application avoidance:** the repost-hardening fix closes a failure mode that had already cost me once — a role scraped under three job IDs nearly went back out as a fresh application after I'd already been rejected from it. Zero repeats since it shipped; one data point, but a real one.
- **Fetch/token efficiency:** caching turns the rank-then-apply path from two fetches into one for every posting and company that path touches.
- **Dashboard review time:** pipeline review went from opening and scanning a raw CSV to a single filtered view — a qualitative win I haven't clocked in minutes.

**Buy vs. build:** I chose to build this rather than adopt an existing application-tracker SaaS (Huntr, Teal, etc.) because the fork already lives inside my Claude Code workflow — no separate login, no separate data store, and the same tool that drafts my CVs also tracks their outcomes and dedupes the postings feeding them.`;
