import type { ReactNode } from "react";
import type { FlowNode, TechnicalPanel, Tone } from "./types";

// The dark environment is reserved for system detail: architecture, timings, and proof.
const NODE_TONE: Record<Tone, string> = {
  owned: "border-brand-400 text-brand-300",
  shared: "border-blue-400 text-blue-300",
  external: "border-white/20 text-ink-300",
  alert: "border-ember-400 text-ember-400",
  muted: "border-white/10 text-ink-400",
};

const LAYER_TONE: Record<Tone, string> = {
  owned: "border-l-brand-400",
  shared: "border-l-blue-400",
  external: "border-l-white/30",
  alert: "border-l-ember-400",
  muted: "border-l-white/15",
};

const LEGEND: { tone: Tone; label: string }[] = [
  { tone: "owned", label: "my scope" },
  { tone: "shared", label: "integrated against, owned by others" },
  { tone: "external", label: "external party" },
];

function Flow({ panel }: { panel: Extract<TechnicalPanel, { kind: "flow" }> }) {
  const legendTones = new Set(panel.nodes.map((n: FlowNode) => n.tone));
  return (
    <div>
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{panel.title}</h3>
      {panel.intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">{panel.intro}</p>}

      <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {panel.nodes.map((n, i) => (
          <li key={n.label} className={`flex gap-3 rounded-lg border bg-white/[0.03] px-4 py-3 ${NODE_TONE[n.tone]}`}>
            <span className="font-mono text-[11px] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div className="text-sm font-semibold">{n.label}</div>
              {n.note && <div className="mt-1 font-mono text-[10px] text-ink-400">{n.note}</div>}
            </div>
          </li>
        ))}
      </ol>

      {panel.branch && (
        <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-400">
          <span className="text-ink-300">{panel.branch.label}:</span>
          {panel.branch.steps.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded border border-white/15 px-2 py-1">{s}</span>
              {i < panel.branch!.steps.length - 1 && <span aria-hidden>→</span>}
            </span>
          ))}
          {panel.branch.note && <span className="ml-1 text-ink-400">{panel.branch.note}</span>}
        </div>
      )}

      {panel.footnote && <p className="mt-4 font-mono text-[11px] text-ink-500">{panel.footnote}</p>}

      {legendTones.size > 1 && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-ink-400">
          {LEGEND.filter((l) => legendTones.has(l.tone)).map((l) => (
            <span key={l.label}>
              <span className={l.tone === "owned" ? "text-brand-400" : l.tone === "shared" ? "text-blue-400" : "text-ink-500"}>■</span>{" "}
              {l.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Bars({ panel }: { panel: Extract<TechnicalPanel, { kind: "bars" }> }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{panel.title}</h3>
      {panel.intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">{panel.intro}</p>}
      <div className="mt-8 space-y-4">
        {panel.rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[9rem_1fr_5.5rem] items-center gap-4 sm:grid-cols-[11rem_1fr_6.5rem]">
            <div className="text-sm text-ink-300">{r.label}</div>
            <div className="relative h-3 rounded-full bg-white/[0.06]">
              <div
                className={`h-3 rounded-full ${r.tone === "owned" ? "bg-brand-400" : "bg-white/25"}`}
                style={{ width: `${(r.mid / panel.scale) * 100}%` }}
              />
              {panel.sla && (
                <div
                  aria-hidden
                  className="absolute -bottom-2 -top-2 border-l border-dashed border-ember-400"
                  style={{ left: `${(panel.sla.at / panel.scale) * 100}%` }}
                />
              )}
            </div>
            <div className="text-right font-mono text-sm text-white">{r.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between font-mono text-[10px] text-ink-500">
        <span>0s</span>
        {panel.sla && <span className="text-ember-400">{panel.sla.label}</span>}
        <span>{panel.scale}s</span>
      </div>
    </div>
  );
}

function Stack({ panel }: { panel: Extract<TechnicalPanel, { kind: "stack" }> }) {
  return (
    <div>
      <h3 className="font-display text-xl font-semibold sm:text-2xl">{panel.title}</h3>
      {panel.intro && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">{panel.intro}</p>}
      <ol className="mt-8 space-y-2">
        {panel.layers.map((l, i) => (
          <li key={l.label} className={`flex items-center gap-4 rounded-md border border-white/10 border-l-4 bg-white/[0.03] px-4 py-3 ${LAYER_TONE[l.tone]}`}>
            <span className="font-mono text-xs text-ink-500">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 text-sm text-ink-100">{l.label}</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-400">{l.layer}</span>
          </li>
        ))}
      </ol>
      {panel.event && (
        <div className="mt-8 rounded-xl border border-ember-400/40 bg-white/[0.03] p-6">
          <div className="font-mono text-xs font-semibold text-ember-400">! {panel.event.title}</div>
          <dl className="mt-5 grid gap-4 sm:grid-cols-4">
            {panel.event.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-500">{f.label}</dt>
                <dd className="mt-1 font-display text-xl text-white">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm leading-relaxed text-ink-300">{panel.event.note}</p>
        </div>
      )}
    </div>
  );
}

export function TechnicalBand({ heading, panels }: { heading: string; panels: TechnicalPanel[] }) {
  return (
    <div className="bg-ink-950 text-white">
      <div className="mx-auto max-w-5xl space-y-16 px-6 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-wider text-brand-400">technical evidence · {heading}</p>
        {panels.map((p, i) => (
          <section key={`${p.kind}-${i}`}>
            {p.kind === "flow" && <Flow panel={p} />}
            {p.kind === "bars" && <Bars panel={p} />}
            {p.kind === "stack" && <Stack panel={p} />}
          </section>
        ))}
      </div>
    </div>
  );
}

export function ProofBand({ proof }: { proof: { chain: string[]; tiles: { value: ReactNode; label: string }[] } }) {
  return (
    <div className="bg-ink-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-wider text-brand-400">proof</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">The claim, traced to the outcome</h2>

        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-300">
          {proof.chain.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded border border-white/15 px-2.5 py-1">{s}</span>
              {i < proof.chain.length - 1 && <span aria-hidden className="text-ink-500">→</span>}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof.tiles.map((t) => (
            <div key={t.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-display text-2xl font-semibold text-brand-400">{t.value}</div>
              <div className="mt-2 text-sm leading-snug text-ink-300">{t.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
