// All copy on this site is sourced from two files in the private ai-job-search repo
// (never committed here): `01-candidate-profile.md` and
// `documents/cv/OpenCAM_Framework_PM_Case_Study.md`. Section B (job-search automation)
// also draws specific figures from a third, closely-related document in that repo —
// `documents/cv/AI_Job_Search_Fork_Feature_Spotlight.md` — since the two primary files
// only summarize that project at a high level. Every field below traces to one of
// those three; nothing here is invented or rounded up. Update this file, not the
// components, when a fact changes upstream.

export const identity = {
  name: "Shamik Mukherjee",
  headline: "Product Manager / Senior Product Owner",
  currentRole: "Product Owner",
  currentEmployer: "Cognizant Technology Solutions",
  domainLine: "Digital Payments · Tokenization · Wallet Integrations (Google Pay, Samsung Pay) · Agile Delivery",
  location: "Reading, Berkshire, UK",
  email: "shamik.mukherjee.88@gmail.com",
  linkedin: "https://linkedin.com/in/shamik-mukherjee",
  github: "https://github.com/ShamikM88",
  initials: "SM",
  photo: "/profile.jpg",
  // Personal-brand tagline, not a sourced fact - an honest characterization of the
  // actual pattern across both case studies below (shipped, AI-directed delivery).
  taglineLead: "I ship products in digital payments —",
  taglineHighlight: "and I direct AI to build them.",
};

export const about = {
  bio: "Product Owner in digital payments, currently leading wallet-provisioning and card-migration work that connects a major US card network to Google Pay and Samsung Pay. MBA from IIT Bombay; 13+ years across product ownership, pre-sales, and engineering in payments and financial services. Outside of the day job, I direct Claude Code to build production-grade AI systems solo — the two case studies on this site are that work.",
  languages: ["English (C2)", "Hindi (C1)", "Bengali (Native)", "German (A0)"],
  // Reverse-chronological. The Summer Intern (SBI, 05/2013-07/2013) entry is deliberately
  // excluded here too, same standing decision as CVs (see 01-candidate-profile.md) - minimal
  // signal from 12+ years back, and the M.Mgmt. entry below already covers the period.
  timeline: [
    {
      title: "Product Owner",
      company: "Cognizant Technology Solutions",
      location: "Farnborough, UK",
      dates: "02/2026 – present",
      highlight: "Leading wallet-provisioning validation across Google Pay & Samsung Pay for a large-scale card migration programme.",
    },
    {
      title: "Product Owner (Proxy) & Onsite Delivery Manager",
      company: "Cognizant Technology Solutions",
      location: "Farnborough, UK",
      dates: "05/2022 – 01/2026",
      highlight: "Launched Virtual Card autofill to 100% of eligible cardholders — 275,000+ transactions in the first 60 days. Star Award – Excellence in Delivery (2024).",
    },
    {
      title: "Pre-Sales Solution Architect",
      company: "Cognizant Technology Solutions",
      location: "Kolkata, India",
      dates: "07/2019 – 04/2022",
      highlight: "Architected and won proposals totalling >$100M TCV across DevOps, test automation, and quality engineering programmes.",
    },
    {
      title: "Pre-Sales Lead / Senior Analyst",
      company: "Cognizant Technology Solutions",
      location: "Kolkata, India",
      dates: "01/2016 – 06/2019",
      highlight: "Owned the full bid lifecycle — RFP/RFI, solution design, commercial modelling — across the banking & financial services portfolio.",
    },
    {
      title: "Business Analyst & Test Lead",
      company: "Cognizant Technology Solutions",
      location: "Kolkata, India",
      dates: "08/2014 – 12/2015",
      highlight: "Led a 10-engineer QA team validating transaction authorisation during a major network upgrade, including new tokenisation capabilities.",
    },
    {
      title: "Presales Consultant",
      company: "Cognizant Technology Solutions",
      location: "Pune, India",
      dates: "05/2014 – 08/2014",
      highlight: "Supported the BFS Quality Engineering & Assurance practice's bid responses and solution development.",
    },
    {
      title: "Software Engineer (Java)",
      company: "Tata Consultancy Services",
      location: "Mumbai, India",
      dates: "12/2010 – 06/2012",
      highlight: "Engineered enhancements to India's largest securities depository (NSDL) — dematerialisation and securities transfer modules.",
    },
  ],
  education: [
    { degree: "M.Mgmt. (MBA equivalent)", institution: "SJMSOM, IIT Bombay", period: "2012 – 2014", detail: "GPA 8.38/10.0" },
    { degree: "B.Tech., Computer Science", institution: "West Bengal University of Technology", period: "2006 – 2010", detail: "GPA 8.47/10.0" },
  ],
  awards: [
    "Star Award — Excellence in Delivery (Cognizant, 2024)",
    "Cognizant Cheers Award — co-authored whitepaper",
    "2nd Runners Up — White Paper Contest",
    "Pillar of the Month — Business Development",
    "Pillar of the Month — Training & Mentoring",
    "TCS Gems — Tata Consultancy Services",
  ],
  skills: [
    {
      category: "Product & Delivery",
      tags: ["Backlog Ownership", "PI Planning", "MVP Definition", "Scrum", "SAFe", "Stakeholder Management"],
    },
    {
      category: "Payments Domain",
      tags: ["Digital Payments", "Tokenisation (EMV)", "Wallet Integrations", "Issuer Push Provisioning", "PCI / RBI Compliance"],
    },
    {
      category: "Commercial & Pre-Sales",
      tags: ["Business Case Development", "RFP/RFI Bid Management", "Commercial Modelling", "Go-to-Market Strategy"],
    },
    {
      category: "AI-Directed Delivery",
      tags: ["Multi-Agent System Architecture", "Claude Code", "AI-Output Governance", "Prompt Architecture"],
    },
  ],
  // Curated subset for the compact homepage teaser card - the About page itself
  // still shows the full grouped list above; this one's just for a small card
  // that shouldn't turn into a wall of badges.
  featuredSkills: [
    "Backlog Ownership",
    "Stakeholder Management",
    "Digital Payments",
    "Wallet Integrations",
    "Go-to-Market Strategy",
    "Multi-Agent System Architecture",
    "AI-Output Governance",
  ],
  philosophy: {
    heading: "How I work",
    paragraphs: [
      "I don't start with a roadmap. I start by watching someone actually stuck — my wife re-keying figures into a spreading template by hand, working out a covenant ratio against a deadline she didn't set. Or me, rereading an email because the tracker no longer matched what was actually happening. If I can't point to a specific moment someone hit a wall, I don't trust the feature enough to build it.",
      "None of this is a separate skill I picked up because AI is trendy, either. Writing acceptance criteria, deciding what \"done\" actually means, and reviewing work before it ships is what I've done for a living for years — directing Claude Code is the same discipline, pointed at a different kind of team member. The bar I'd hold a sprint deliverable to is the bar I hold an AI-generated change to. If something comes back marked \"fixed,\" I ask what I'd ask any developer: fixed where, exactly, and is that the part that actually matters or just the part that was easy to check. Deciding what ships this week versus what gets disclosed as deferred rather than quietly dropped is scope management I'd run on any programme, payments or otherwise.",
      "The same instinct decides how much process surrounds a piece of work. Something other people might fork gets a pull request and an issue tracker before anything merges. Something only I use gets neither, on purpose. Matching the rigor to the actual stakes, not to habit, is most of the job.",
    ],
  },
  personalNote: "A Liverpool supporter since 2005 — Anfield three times, plus Istanbul for the 2019 UEFA Super Cup. It's part of why the UK was always the plan.",
};

export const statStrip = [
  { value: "1", label: "Multi-Agent AI System Shipped 0→1, Solo", sublabel: "OpenCAM Framework" },
  { value: "2", label: "Feedback-Driven Features Shipped the Same Week Requested", sublabel: "OpenCAM Framework" },
  { value: "4", label: "Custom Features Shipped on a Forked Base", sublabel: "Job-search automation" },
];

export const openCam = {
  title: "OpenCAM — Autonomous Maker-Checker Framework",
  shortTitle: "OpenCAM Framework",
  subtitle:
    "Engineered a dual-agent LLM pipeline with deterministic policy gating, targeting a cut in CAM drafting time from a business day to 15–30 minutes.",
  repoUrl: "https://github.com/ShamikM88/open-cam-framework",
  badges: ["Multi-Agent AI", "Credit Risk"],
  meta: {
    role: "Product Manager — strategy, prompt architecture, policy rules; directed Claude Code for all implementation",
    timeline: "Sep 2026 · ongoing",
    stack: "Python · Claude Code · Anthropic API · Deterministic policy engine",
    status: "Early-stage · validated with one analyst to date",
  },
  problem: {
    heading: "What was broken",
    paragraphs: [
      "I watched my wife, a corporate credit analyst, prepare Credit Assessment Memorandums every day against hard credit-committee deadlines — manual financial spreading, then drafting a narrative under time pressure with real reputational risk if a number was wrong. She's running several deals at once, and borrower financials arrive as PDFs or spreadsheets from relationship directors, often before the accounts are even filed with Companies House.",
      "Early attempts at using an LLM to draft the memo directly were faster but untrustworthy: grounding was only ever a \"cite your source\" prompt instruction, not an enforced rule, so an unsupported claim could reach committee undetected — and a codebase audit later caught a debt-free company's DSCR being silently computed as 0 instead of undefined, which would have wrongly flagged a healthy borrower as a covenant breach.",
    ],
    frictionBullets: [
      "One rigid spreading schema couldn't handle real deal variety — a borrower embedding Depreciation inside Cost of Goods Sold, a real house convention, broke the single schema the MVP shipped with.",
      "The pipeline assumed every deal wanted the full automation stack — there was no way to ask for just the qualitative research while spreading a non-standard deal by hand.",
    ],
  },
  scope: {
    heading: "What I scoped in, and what I explicitly didn't",
    lanes: [
      {
        label: "Must have",
        sublabel: "MVP — shipped in PRs #1–20",
        tone: "brand-strong" as const,
        items: [
          "CAM template system",
          "Spreading engine with formula validation",
          ".docx export",
          "The Maker-Checker governance loop itself",
          "Deterministic policy engine layered on LLM narrative",
          "Critical correctness/security fixes before wider use",
        ],
      },
      {
        label: "Should have",
        sublabel: "Fast-follow — shipped in PR #24",
        tone: "brand-muted" as const,
        items: ["Wiring policy checks into the primary slash-command interface, not just the headless script"],
      },
      {
        label: "Could have",
        sublabel: "Post-MVP depth",
        tone: "ember" as const,
        items: [
          "Forward-year projections & stress testing",
          "Conditions Subsequent tracking, Net Debt/EBITDA & FCF ratios",
          "Source-citation hyperlinking",
          "AML/sanctions/PEP screening & ESG scoring",
        ],
      },
      {
        label: "Won't have",
        sublabel: "Explicitly deferred, disclosed not hidden",
        tone: "muted" as const,
        items: [
          "Multi-currency/FX support — today's desk is GBP-only",
          "Full covenant step-down/cure-period modeling — scoped down to just Conditions Subsequent tracking",
        ],
      },
    ],
  },
  features: {
    heading: "What it does",
    items: [
      {
        letter: "A",
        title: "Maker-Checker Governance Loop",
        body: "Two genuinely independent agents — an Underwriter drafts, a Risk Reviewer audits — with no shared reasoning context, and the power to only downgrade a verdict, never upgrade one. Maker and Checker can run on different underlying models, so drafting and audit don't share the same blind spots.",
      },
      {
        letter: "B",
        title: "Deterministic Policy & Compliance Engine",
        body: "Every covenant is evaluated PASS / FAIL / UNRESOLVABLE against a ratio computed from raw financials — never silently defaulted. Every reported figure is checked against ground-truth financials within a 0.5% tolerance before the Checker even sees it.",
      },
      {
        letter: "C",
        title: "Financial Spreading & Auditable Excel Export",
        body: "Every ratio — TNW, EBITDA, DSCR, Gross Leverage, Net Debt/EBITDA, FCF Conversion % — computed straight from the same raw line items shown in the workbook, with formulas generated from a label-based row layout so a reorder can't silently break a reference. An analyst can also supply figures already spread against their own institution's template instead — the CAM then carries an explicit caveat disclosing the spreading wasn't independently recomputed, a real reduction in audit guarantee, disclosed rather than buried.",
      },
      {
        letter: "D",
        title: "Confidentiality-by-Design",
        body: "Every artifact derived from a user's real business — calibration samples, templates, deal state, output — writes only to git-ignored paths, enforced as a build rule, not audited in after the fact.",
      },
      {
        letter: "E",
        title: "Standalone Research Workflow (/research)",
        body: "A separate command for an analyst who just needs the qualitative picture — company and sector research, Go/No-Go screening — without running the full CAM pipeline. It writes the same state.json keys the full pipeline would, so a deal that later needs a full CAM can continue straight in without redoing anything, and exports its own standalone Research Brief through a script kept deliberately separate from the full CAM exporter.",
      },
    ],
  },
  workflow: {
    heading: "How the pipeline actually connects",
    intro:
      "Two entry points, one shared spine. Every deal starts at /calibrate, then an analyst chooses /triage for a full CAM or /research for a standalone qualitative brief — both write the same state, so a deal can always continue into the full pipeline later without redoing work.",
    note: "One nuance the diagram simplifies: a deal continuing from /research rejoins directly at /spread, skipping /commercial entirely — /research already produced that output.",
  },
  strategy: {
    heading: "Validation & strategic context",
    intro:
      "This framework is early-stage, built and validated with one target user — my wife, a corporate credit analyst. I'd rather show the reasoning openly than present these as more settled than they are.",
    cards: [
      {
        title: "Buy vs. build",
        body: "Platforms like nCino or Moody's CreditLens run on vendor-defined schemas and don't give an inspectable, code-level audit trail of how a specific AI draft was checked — that's the exact gap this closes, while keeping confidential deal data off a third-party cloud entirely.",
      },
      {
        title: "Unit economics",
        body: "Slash commands shell out to the same local policy-check modules as the headless script — no separate metered API bill per step beyond the analyst's existing Claude Code access, against multiple hours of a qualified analyst's time saved per deal.",
      },
      {
        title: "Enterprise adoption",
        body: "Because it runs locally and writes nothing but git-ignored files, an analyst or a bank could use it without sending a single confidential figure to a third-party service, and without IT needing to approve a new vendor integration into core banking systems.",
      },
    ],
  },
  process: {
    heading: "How I worked it",
    steps: [
      {
        title: "Started from a real workflow, not a hypothesis",
        body: "Modeled the primary persona directly on my wife's own day as a credit analyst — the actual friction was manual spreading and narrative drafting under deadline pressure, not a problem I picked because it sounded interesting.",
      },
      {
        title: "Shipped the Maker-Checker loop in one day",
        body: "Scoped the MVP tightly — 20 merged PRs in a single day — around one correct, end-to-end loop before going deep on any single feature: template system, spreading engine, .docx export, and the governance loop itself.",
      },
      {
        title: "Ran a dedicated gap-analysis audit, sequenced by risk",
        body: "Once the MVP worked, I audited the live codebase for 19 further issues and merged fixes in risk-weighted severity order — correctness and security bugs first, cosmetic issues after, feature work last.",
      },
      {
        title: "Reprioritized around real feedback, not backlog guesses",
        body: "Two items came directly from my wife hitting the pipeline's limits on a real deal — a rigid spreading schema and an all-or-nothing automation model — and I pulled both to the top of the queue and shipped them the same week.",
      },
    ],
  },
  decisions: {
    heading: "Calls I made, and why",
    items: [
      {
        title: "Independent agents, not one prompt",
        body: "A single agent auditing its own draft agrees with itself. The Underwriter and Risk Reviewer share no reasoning context, and the Reviewer can only downgrade a verdict — its value comes from auditing cold.",
      },
      {
        title: "Code computes numbers, not the model",
        body: "Every covenant is evaluated PASS / FAIL / UNRESOLVABLE against a ratio computed deterministically, never silently defaulted. That's what fixes the debt-free-DSCR bug for good — and a second, near-identical bug where Provisions and Other Long-Term Liabilities silently never reached total_liabilities — the model can narrate a number, but it can never produce one.",
      },
      {
        title: "Cut scope, don't half-implement",
        body: "One issue bundled four separable asks together. Rather than push all four through unreviewed, I shipped just the well-bounded piece and explicitly disclosed the other three as deferred, not quietly dropped.",
      },
      {
        title: "Reopened an issue I'd already closed",
        body: "I'd marked Issue #31 resolved once Maker/Checker could run on different models in code. A later review caught that the setting was never actually switched on in production — the audit wasn't independent. I reopened it and only re-closed once I'd verified it working end to end.",
      },
      {
        title: "Fixed what tests couldn't catch, same day",
        body: "My first live production run leaked markdown formatting artifacts and raw internal JSON into the exported Word document. I fixed both within the day (PR #40) and codified durable prompt guidance alongside the fix, so the same class of gap couldn't recur.",
      },
      {
        title: "Severity order beats arrival order",
        body: "Working the 19-issue gap-analysis backlog, I shipped the highest-criticality correctness and security fixes first (PR #41: date-resume logic, a race condition, a hardcoded model), then lower-severity display bugs (PR #42), then feature work — any fix that could change a credit decision landed before anything cosmetic did.",
      },
    ],
  },
  outcomes: {
    heading: "What changed",
    stats: [
      { value: "15–30 min", label: "time-to-first-draft target, from ~1 business day" },
      { value: "339+", label: "passing tests (up from 188 at MVP)" },
      { value: "0", label: "financial figures the model is allowed to compute itself" },
    ],
    bullets: [
      "Trust turned out to be a product feature: the debt-free-DSCR catch is concrete evidence that code-level verification, not model judgment, is what makes the loop actually trustworthy.",
      "Real usage surfaced the two highest-value roadmap items faster than the original audit backlog did — ship it, use it, let genuine friction drive the backlog.",
    ],
  },
  visuals: {
    heading: "Inside the build",
    items: [
      {
        caption: "Merged pull requests on GitHub — every change reviewed before merge, none pushed direct to main.",
        src: "/build-shots/opencam-prs.png",
        alt: "Merged pull requests on the open-cam-framework GitHub repository",
      },
      {
        caption: "The 19-issue gap-analysis audit, tracked and closed on GitHub as real issues, not a private todo list.",
        src: "/build-shots/opencam-issues.png",
        alt: "Closed GitHub issues from the 19-issue gap-analysis audit",
      },
      {
        caption: "Feature requests tracked as GitHub enhancement issues — the spreading-schema and automation-model fixes that came from real usage, not a backlog guess.",
        src: "/build-shots/opencam-enhancements.png",
        alt: "GitHub issues tracked with the enhancement label — feature requests from real usage",
      },
      {
        caption: "The financial spreading output — every ratio traceable to a raw line item, DSCR shown per year rather than as a single number. Synthetic demo data, generated for this writeup.",
        src: "/build-shots/opencam-spreading-demo.png",
        alt: "Financial spreading output showing revenue, EBITDA, and DSCR computed per year from raw line items — synthetic demo data",
      },
      {
        caption: "The CAM's Facility Conditions section, with a grounding note disclosing exactly which inputs came from the relationship team, unverified against a live feed. Synthetic demo data.",
        src: "/build-shots/opencam-cam-facility-demo.png",
        alt: "CAM Facility Conditions section with a grounding note disclosing unverified inputs — synthetic demo data",
      },
      {
        caption: "The Collateral section's LGD/coverage workout — average vs. max LGD, cover %, all computed from the same disclosed inputs. Synthetic demo data.",
        src: "/build-shots/opencam-cam-collateral-demo.png",
        alt: "CAM Collateral section showing LGD and coverage calculations — synthetic demo data",
      },
    ],
  },
};

export const fork = {
  title: "AI Job Search — Pipeline & Status Automation",
  shortTitle: "AI Job Search Automation",
  subtitle:
    "Extended an open-source job-search framework with Gmail status sync, repost-dedup hardening, and a live application dashboard — automation layered on a forked base, not authored from scratch.",
  baseRepoUrl: "https://github.com/MadsLorentzen/ai-job-search",
  forkRepoUrl: "https://github.com/ShamikM88/ai-job-search",
  badges: ["Agentic AI", "Personal Tooling"],
  meta: {
    role: "Sole developer & end user — directed Claude Code for all implementation",
    timeline: "Aug 2026 · ongoing",
    stack: "JavaScript (Bun) · Claude Code · Gmail API",
    status: "Active — used daily for my own job search",
  },
  problem: {
    heading: "What was missing",
    paragraphs: [
      "The framework's default output was a static snapshot and application outcomes lived entirely in employer emails I had to notice, reread, and hand-transcribe — with dozens of applications in flight, status updates silently lagged reality.",
      "Portal-level dedup only matched on exact URL or job ID, which missed an employer relisting an unfilled role under a brand-new ID. That wasn't hypothetical: a role I'd already been rejected from was scraped three times under three different LinkedIn IDs, and the surviving copy nearly went out again in a fresh application batch before I caught it.",
    ],
  },
  process: {
    heading: "How I worked it",
    steps: [
      {
        title: "Used my own job search as the test bed",
        body: "Forked the framework in August 2026 to run my active search across the UK, Germany, and Ireland, and used the fork itself as the vehicle to close real gaps I hit using it daily.",
      },
      {
        title: "Ran it direct-to-master, deliberately",
        body: "48 fork-specific commits with no PR-per-change or issue-tracked backlog — a live scraper hitting real job portals needed a tight edit-run-observe loop, and review overhead has no payoff when I'm the only contributor and the only person affected by a regression.",
      },
      {
        title: "Closed the repost gap after it actually cost me",
        body: "The three-LinkedIn-ID incident directly drove a same-company-title check against the entire scrape history, not just the current run's pool — catching the exact failure mode that had already happened once.",
      },
      {
        title: "Held data governance to a fixed bar regardless of iteration speed",
        body: "Every piece of sensitive data — the tracker, scraped-job cache, Gmail sync state, cached research — stayed git-ignored throughout, verified afterward with a full git log --full-history audit rather than just assumed.",
      },
    ],
  },
  decisions: {
    heading: "Calls I made, and why",
    items: [
      {
        title: "Direct-to-master, not PR-per-change",
        body: "Contrast with OpenCAM: that's a multi-user tool that has to be defensible to someone else. This is solo personal tooling — direct-to-master rapid feedback loops win when I'm the only stakeholder.",
      },
      {
        title: "Full history checked, not just this run",
        body: "ID-based checks only catch a repost when the ID matches. Comparing normalized company + title against every existing entry, regardless of prior scrape date, catches the case ID checks structurally can't.",
      },
      {
        title: "Cache once, reuse everywhere",
        body: "/rank and /apply were each independently re-fetching the same posting. A shared, normalized-filename cache means the common rank-then-apply path costs one fetch instead of two.",
      },
    ],
  },
  outcomes: {
    heading: "What changed",
    stats: [
      { value: "150+", label: "job postings processed & auto-deduped" },
      { value: "48", label: "fork-specific commits shipped, direct-to-master" },
      { value: "0", label: "PII or client data ever committed — verified via git audit" },
    ],
    bullets: [
      "The repost-hardening fix closes a failure mode that had already cost one wasted application before it shipped — zero repeats since.",
      "One representative Gmail-sync run resolved 7 outcome updates and surfaced 2 new leads from an 11-thread window in a single pass, replacing unbounded manual inbox rereading.",
    ],
  },
  visuals: {
    heading: "Inside the build",
    items: [
      {
        caption: "48 fork-specific commits on GitHub, diverged from the upstream MadsLorentzen/ai-job-search base.",
        src: "/build-shots/fork-commits.png",
        alt: "Commit history on the ai-job-search fork's GitHub repository",
      },
      {
        caption: "The live dashboard, filtered to postings not yet applied to — fit scoring, gates, and dedup status per row.",
        src: "/build-shots/dashboard-filtered.png",
        alt: "The live job-search dashboard filtered to postings not yet applied to",
      },
    ],
  },
};

export const governanceComparison = {
  heading: "PM Delivery & Dual-Governance Model",
  intro:
    "Two different governance models, chosen deliberately for two different risk profiles — not one default applied everywhere.",
  columns: ["Dimension", "OpenCAM (Enterprise Mode)", "Job Search Automation (Fast-Iterate Mode)"],
  rows: [
    ["Commit Policy", "100% PR-based, zero direct-to-main", "Direct commits to master"],
    ["Issue Tracking", "Formal GitHub Issues (19-issue gap audit)", "None — solo, no backlog overhead"],
    ["QA Model", "339 automated tests, regression-gated", "Manual verification against live runs"],
    ["Target Audience", "Other institutions (designed to be forked)", "Personal use only (N=1)"],
    ["Risk Profile", "Production-adjacent, third-party dependent", "Low-risk personal tooling, fast iteration"],
  ],
};
