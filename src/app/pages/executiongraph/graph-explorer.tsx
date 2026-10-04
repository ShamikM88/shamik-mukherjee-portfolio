"use client";

import * as React from "react";
import Link from "next/link";

const ORANGE = "#ff4d00";
const INK = "#0a0a0a";
const PAPER = "#f2f0ea";

const STAGES = ["Context", "Constraint", "Decision", "Execution", "Outcome"] as const;

type Project = {
  id: string;
  name: string;
  domain: "Payments" | "AI";
  href: string;
  steps: Record<(typeof STAGES)[number], string>;
};

const PROJECTS: Project[] = [
  {
    id: "chrome",
    name: "Chrome Virtual Card Autofill",
    domain: "Payments",
    href: "/case-studies/google-chrome-autofill-virtual-card-number",
    steps: {
      Context: "Google's retrieval flow had a hard 5-second latency limit.",
      Constraint: "The yellow path was running 7-8 seconds, inside a downstream fraud dependency.",
      Decision:
        "Surfaced the risk as input rather than deciding it myself, then built a mock fraud signal so delivery could keep moving.",
      Execution: "Chased the response time down inside Google's limit, and wrote the certification tests myself.",
      Outcome: "$900K settled in 45 days, against the SLA.",
    },
  },
  {
    id: "wallet",
    name: "Wallet Provisioning at Scale",
    domain: "Payments",
    href: "/case-studies/wallet-provisioning",
    steps: {
      Context: "A live card portfolio migration, with wallets that must not notice it.",
      Constraint: "Zero cardholder-facing disruption, across Google Pay and Samsung Pay.",
      Decision: "Validate that the migration is invisible to the wallet, before scale.",
      Execution: "Token cleanup on a live repersonalization, sequenced by release of value.",
      Outcome: "First international issuer live on push provisioning in 2025.",
    },
  },
  {
    id: "opencam",
    name: "OpenCAM — Maker-Checker Framework",
    domain: "AI",
    href: "/case-studies/opencam",
    steps: {
      Context: "Credit memos drafted by an LLM were fast, but no check stopped a wrong number reaching committee.",
      Constraint: "A model can narrate a figure. It must never be the thing that produces one.",
      Decision: "Covenants evaluated deterministically: PASS, FAIL or UNRESOLVABLE, never silently defaulted.",
      Execution: "Independent maker and checker agents, with the checker able only to downgrade a verdict.",
      Outcome: "A debt-free company's DSCR being computed as 0 was caught before it could reach committee.",
    },
  },
];

const PIPELINE: { label: string; layer: "probabilistic" | "deterministic" | "boundary" }[] = [
  { label: "LLM drafts the narrative", layer: "probabilistic" },
  { label: "Structured proposal", layer: "boundary" },
  { label: "Ratios computed from raw financials", layer: "deterministic" },
  { label: "Covenants: PASS / FAIL / UNRESOLVABLE", layer: "deterministic" },
  { label: "Independent checker audits, can only downgrade", layer: "probabilistic" },
];

const LAYER_STYLE = {
  probabilistic: { border: "#8b5cf6", label: "Probabilistic" },
  deterministic: { border: INK, label: "Deterministic" },
  boundary: { border: ORANGE, label: "Boundary" },
} as const;

export function GraphExplorer() {
  const [projectId, setProjectId] = React.useState<string>("chrome");
  const [stage, setStage] = React.useState<(typeof STAGES)[number]>("Decision");
  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0];

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        {(["Payments", "AI"] as const).map((domain) => (
          <div key={domain} className="border-2 p-5" style={{ borderColor: INK }}>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-70">{domain}</div>
            <div className="mt-4 flex flex-col gap-3">
              {PROJECTS.filter((p) => p.domain === domain).map((p) => {
                const active = p.id === projectId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProjectId(p.id)}
                    aria-pressed={active}
                    className="flex items-center justify-between border-2 p-3 text-left font-semibold transition-colors"
                    style={{
                      borderColor: INK,
                      background: active ? INK : "transparent",
                      color: active ? PAPER : INK,
                    }}
                  >
                    {p.name}
                    <span className="text-xs" style={{ color: active ? ORANGE : INK }}>
                      {active ? "selected" : "select →"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="relative flex flex-wrap justify-between gap-2">
          {STAGES.map((s, i) => {
            const active = s === stage;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStage(s)}
                aria-pressed={active}
                className="flex flex-1 min-w-[5.5rem] flex-col items-center gap-2 text-center"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-full border-2 font-mono text-xs font-bold transition-colors"
                  style={{
                    borderColor: ORANGE,
                    background: active ? ORANGE : PAPER,
                    color: active ? PAPER : ORANGE,
                    transform: active ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: active ? ORANGE : INK }}>
                  {s}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mx-6 mt-[-2.6rem] h-[2px]" style={{ background: ORANGE, opacity: 0.4 }} aria-hidden />
      </div>

      <div className="mt-10 border-2 p-6 sm:p-8" style={{ borderColor: INK }}>
        <div className="text-xs font-semibold uppercase tracking-wider opacity-70">
          {project.name} · {stage}
        </div>
        <p className="mt-4 text-xl leading-relaxed sm:text-2xl">{project.steps[stage]}</p>
        <Link href={project.href} className="mt-6 inline-block text-sm font-semibold underline underline-offset-4" style={{ color: ORANGE }}>
          Open the evidence →
        </Link>
      </div>

      {projectId === "opencam" && (
        <div className="mt-12">
          <div className="text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">The model narrates. Code computes.</div>
          <p className="mt-3 max-w-2xl">
            Where the AI is allowed to be probabilistic, and where it is not.
          </p>
          <ol className="mt-8 space-y-3">
            {PIPELINE.map((step, i) => {
              const style = LAYER_STYLE[step.layer];
              return (
                <li key={step.label} className="flex items-center gap-4 border-l-4 bg-white/40 p-4" style={{ borderColor: style.border }}>
                  <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-semibold">{step.label}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: style.border }}>
                    {style.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </div>
  );
}
