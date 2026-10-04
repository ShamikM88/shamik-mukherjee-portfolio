"use client";

import * as React from "react";
import { T, type Case } from "./data";

const STAGES: { key: keyof Case["graph"]; label: string }[] = [
  { key: "context", label: "Context" },
  { key: "constraint", label: "Constraint" },
  { key: "observed", label: "Observed" },
  { key: "decision", label: "Decision" },
  { key: "execution", label: "Execution" },
  { key: "outcome", label: "Outcome" },
];

export function StageRail({ graph }: { graph: Case["graph"] }) {
  const [stage, setStage] = React.useState<keyof Case["graph"]>("decision");
  return (
    <div>
      <div className="flex flex-wrap items-stretch gap-1 sm:gap-2">
        {STAGES.map((s, i) => {
          const active = s.key === stage;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setStage(s.key)}
              aria-pressed={active}
              className="flex min-w-[6.5rem] flex-1 flex-col gap-1 rounded-md border px-3 py-2.5 text-left transition-colors"
              style={{ borderColor: active ? T.amber : T.border, background: active ? T.raised : "transparent" }}
            >
              <span className="font-mono text-[10px]" style={{ color: active ? T.amber : T.dim }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-xs font-semibold uppercase" style={{ color: active ? T.text : T.muted }}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 rounded-lg border p-5 text-base leading-relaxed sm:text-lg" style={{ borderColor: T.amber, color: T.text, background: T.panel }}>
        {graph[stage]}
      </div>
    </div>
  );
}
