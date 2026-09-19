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
  headline: "Senior Product Owner / AI Product Manager",
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
  bio: "Product Owner in digital payments, currently leading wallet-provisioning and card-migration work that connects a major US card network to Google Pay and Samsung Pay. MBA from IIT Bombay, nine years in payments and pre-sales before that. Outside of the day job, I direct Claude Code to build production-grade AI systems solo — the two case studies below are that work.",
  languages: ["English (C2)", "Hindi (C1)", "Bengali (Native)"],
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
};

export const statStrip = [
  { value: "1", label: "Multi-Agent AI Framework Built Solo", sublabel: "OpenCAM Framework" },
  { value: "325+", label: "Automated Tests Written", sublabel: "OpenCAM Framework" },
  { value: "150+", label: "Job Postings Processed & Auto-Deduped", sublabel: "Job-search automation" },
];

export const openCam = {
  title: "OpenCAM — Autonomous Maker-Checker Framework",
  shortTitle: "OpenCAM Framework",
  subtitle:
    "Engineered a dual-agent LLM pipeline with deterministic policy gating, targeting a cut in CAM drafting time from a business day to 15–30 minutes.",
  repoUrl: "https://github.com/ShamikM88/open-cam-framework",
  badges: ["Multi-Agent AI", "Credit Risk"],
  status: "Early-stage, actively developed · validated with one analyst to date",
  meta: {
    role: "Product Owner — strategy, prompt architecture, policy rules; directed Claude Code for all implementation",
    timeline: "Sep 2026 · ongoing",
    stack: "Python · Claude Code · Anthropic API · Deterministic policy engine",
  },
  problem: {
    heading: "What was broken",
    paragraphs: [
      "I watched my wife, a corporate credit analyst, prepare Credit Assessment Memorandums every day against hard credit-committee deadlines — manual financial spreading, then drafting a narrative under time pressure with real reputational risk if a number was wrong.",
      "Early attempts at using an LLM to draft the memo directly were faster but untrustworthy: grounding was only ever a \"cite your source\" prompt instruction, not an enforced rule, so an unsupported claim could reach committee undetected — and a codebase audit later caught a debt-free company's DSCR being silently computed as 0 instead of undefined, which would have wrongly flagged a healthy borrower as a covenant breach.",
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
        title: "Two independent agents, not one self-grading prompt",
        body: "A single agent auditing its own draft agrees with itself. The Underwriter and Risk Reviewer share no reasoning context, and the Reviewer can only downgrade a verdict — its value comes from auditing cold.",
      },
      {
        title: "Numbers computed in code, never by the model",
        body: "Every covenant is evaluated PASS / FAIL / UNRESOLVABLE against a ratio computed deterministically, never silently defaulted. That's what fixes the debt-free-DSCR bug for good — the model can narrate a number, but it can never produce one.",
      },
      {
        title: "Cut scope mid-flight instead of half-implementing four asks",
        body: "One issue bundled four separable asks together. Rather than push all four through unreviewed, I shipped just the well-bounded piece and explicitly disclosed the other three as deferred, not quietly dropped.",
      },
    ],
  },
  outcomes: {
    heading: "What changed",
    stats: [
      { value: "15–30 min", label: "time-to-first-draft target, from ~1 business day" },
      { value: "325+", label: "passing tests (up from 188 at MVP)" },
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
      { caption: "Maker drafts with cited evidence; Checker independently re-verifies every claim." },
      { caption: "Ratios and covenant tests computed deterministically in code, then narrated by the model." },
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
  },
  problem: {
    heading: "What was broken",
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
        title: "Dedup against full history, not just this run",
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
      { caption: "Applied / Rejected / Interview, filtered live from the full tracked pipeline." },
      { caption: "Inbox signal → proposed update → tracker — never written without review." },
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
    ["QA Model", "325 automated tests, regression-gated", "Manual verification against live runs"],
    ["Target Audience", "Other institutions (designed to be forked)", "Personal use only (N=1)"],
    ["Risk Profile", "Production-adjacent, third-party dependent", "Low-risk personal tooling, fast iteration"],
  ],
};
