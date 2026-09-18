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
  title: "OpenCAM Framework",
  subtitle: "Primary Case Study — built solo, ground-up",
  repoUrl: "https://github.com/ShamikM88/open-cam-framework",
  badges: ["Multi-Agent AI", "Deterministic Policy Engine", "Enterprise Governance"],
  status: "Early-stage, actively developed · validated with one analyst to date",
  scorecard: [
    {
      label: "Time-to-First-Draft",
      value: "~1 business day → 15–30 min",
      note: "Target, not yet measured at scale",
    },
    {
      label: "Compliance Defect Rate",
      value: "Code-gated checks before human review",
      note: "Target: 0% ungrounded claims reach committee",
    },
    {
      label: "Audit Trail",
      value: "Model/prompt-version provenance per deal",
      note: "Target: 100% of deals carry provenance",
    },
  ],
  architectureFlow: [
    "Raw Financials / PDFs",
    "Spreading Engine",
    "Maker Agent (Underwriter)",
    "Deterministic Policy Engine",
    "Checker Agent (Risk Reviewer)",
    "Audit-Ready Export",
  ],
  features: [
    {
      title: "A. Maker-Checker Governance Loop",
      body: "Two genuinely independent agents — an Underwriter that drafts, a Risk Reviewer that audits — with no shared reasoning context and the power to only downgrade a verdict, never upgrade one. Maker and Checker can also run on different underlying models, so drafting and audit don't share the same blind spots.",
    },
    {
      title: "B. Deterministic Policy & Compliance Engine",
      body: "Every covenant is evaluated PASS / FAIL / UNRESOLVABLE against the ratio computed from raw financials — never silently defaulted. Conditions Precedent are generated deterministically from the deal's actual collateral structure, and every reported figure is checked against ground-truth financials within a 0.5% tolerance before the Checker even sees it.",
    },
    {
      title: "C. Financial Spreading & Auditable Excel Export",
      body: "Every ratio — TNW, EBITDA, DSCR, Gross Leverage, Net Debt/EBITDA, FCF Conversion — is computed straight from the raw line items shown in the workbook, with formulas generated from a label-based row layout so a row reorder can never silently break a reference. An undefined ratio (e.g. a debt-free company's DSCR) is always shown as genuinely undefined, never coerced to a misleading 0.",
    },
    {
      title: "D. Confidentiality-by-Design",
      body: "Every artifact derived from a user's real business — calibration samples, generated deal state, output documents — writes only to git-ignored paths, enforced as a rule before any new feature is built, not audited in after the fact. A fork can be customized on live, confidential deal data with zero risk of a proprietary figure reaching the shared open-source repo.",
    },
  ],
  validation: {
    heading: "Validation & Governance",
    points: [
      "Validated hands-on with one real analyst to date — the framework is early-stage, and these are target numbers, not formal multi-tenant pilot data.",
      "35 merged PRs, zero direct-to-main commits — every change was reviewed before merge.",
      "Hardened via a dedicated 19-issue gap-analysis audit sequenced in risk-weighted severity order, plus two live-user-feedback-driven fast-follows shipped the same sprint they surfaced.",
      "188 → 325 passing tests over the project's life, with regression coverage required before any fix was treated as done.",
    ],
  },
};

type ForkFeature = {
  title: string;
  body: string;
  mock?: { statuses: string[] } | { pipeline: string[] };
  before?: string;
  after?: string;
  metricPill?: string;
};

export const fork: {
  title: string;
  subtitle: string;
  baseRepoUrl: string;
  forkRepoUrl: string;
  badges: string[];
  disclosure: string;
  features: ForkFeature[];
  governance: { heading: string; points: string[] };
} = {
  title: "AI Job Search Automation",
  subtitle: "Feature Spotlight — automation on a forked base, not authored from scratch",
  baseRepoUrl: "https://github.com/MadsLorentzen/ai-job-search",
  forkRepoUrl: "https://github.com/ShamikM88/ai-job-search",
  badges: ["Rapid Automation", "Personal Tooling", "Local-Only PII"],
  disclosure:
    "Built on an open-source job-search framework (MadsLorentzen/ai-job-search); the automation, dedup logic, Gmail sync, and dashboard below are original work layered on top of it, not a from-scratch build.",
  features: [
    {
      title: "Live Application Dashboard",
      body: "Replaced a static export with a live, server-rendered local dashboard: multi-select filters, a date-range filter, and a dedicated Applied / Rejected / Interview status view across the full tracked pipeline.",
      mock: { statuses: ["Applied", "Rejected", "Interview"] },
    },
    {
      title: "Gmail Status Sync",
      body: "An automated pipeline that scans Gmail for interview, offer, and rejection signals against every open application and proposes tracker updates for review — no manual inbox rereading to keep status current.",
      mock: { pipeline: ["Inbox", "Signal detected", "Proposed update", "Tracker"] },
    },
    {
      title: "Cross-Portal Dedup",
      body: "Extended dedup beyond exact-URL and job-ID matching to a same-company-title check against the entire scrape history — catching an employer relisting an unfilled role under a brand-new listing ID.",
      before: "A role relisted under a new ID slips past ID-based dedup and resurfaces as a fresh application candidate.",
      after: "Matched against full scrape history by normalized company + title and flagged as a repost before it reaches the pipeline again.",
    },
    {
      title: "Cost-Efficiency Caching",
      body: "A shared, normalized-filename cache for fetched postings and company research, so the same job or company is looked up once across the pipeline's lifetime.",
      metricPill: "1 fetch instead of 2",
    },
  ],
  governance: {
    heading: "Governance & Privacy",
    points: [
      "Every piece of sensitive data this fork touches — the application tracker, scraped-job cache, Gmail sync state, cached research, and a confidential-client reference file — is git-ignored and lives only on local disk.",
      "Verified, not just designed: a full git log --full-history audit confirms zero PII or client data has ever been committed to this repository's history.",
      "Direct-to-master commits, no PR/Issue backlog — a deliberate choice for solo personal tooling, not an oversight.",
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
