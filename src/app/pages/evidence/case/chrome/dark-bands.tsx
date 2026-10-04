import {
  latencyRows,
  proofChain,
  proofTiles,
  retrievalPath,
  stepUpPath,
} from "./chrome-content";

const NODE_TONE = {
  owned: "border-brand-400 text-brand-300",
  shared: "border-blue-400 text-blue-300",
  external: "border-white/20 text-ink-300",
} as const;

const BAR_TONE = {
  owned: "bg-brand-400",
  muted: "bg-white/25",
} as const;

const SLA_SECONDS = 5;
const SCALE_SECONDS = 8;

export function TechnicalEvidenceBand() {
  return (
    <div className="bg-ink-950 text-white">
      <div className="mx-auto max-w-5xl space-y-14 px-6 py-16 sm:px-8 sm:py-20">
        <section>
          <p className="font-mono text-xs tracking-wider text-brand-400">technical evidence · retrieval path</p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
            Where the five seconds went
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-300 sm:text-base">
            The retrieval path, simplified from the case study&apos;s architecture description. The Enrolment and
            Unenrolment domain is left out of this view.
          </p>

          <ol className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {retrievalPath.map((n, i) => (
              <li key={n.label} className={`flex gap-3 rounded-lg border bg-white/[0.03] px-4 py-3 ${NODE_TONE[n.owner]}`}>
                <span className="font-mono text-[11px] text-ink-500">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="text-sm font-semibold">{n.label}</div>
                  <div className="mt-1 font-mono text-[10px] text-ink-400">{n.note}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-400">
            <span className="text-ink-300">branch:</span>
            {stepUpPath.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded border border-white/15 px-2 py-1">{s}</span>
                {i < stepUpPath.length - 1 && <span aria-hidden>→</span>}
              </span>
            ))}
            <span className="ml-1 text-ink-400">all three traced to one original attempt</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-ink-400">
            <span><span className="text-brand-400">■</span> my scope</span>
            <span><span className="text-blue-400">■</span> integrated against, owned by others</span>
            <span><span className="text-ink-500">■</span> Google and the shopper</span>
          </div>
        </section>

        <section>
          <p className="font-mono text-xs tracking-wider text-brand-400">latency against the SLA</p>
          <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
            Both paths before and after the fraud-system work
          </h3>

          <div className="mt-8 space-y-4">
            {latencyRows.map((r) => (
              <div key={r.label} className="grid grid-cols-[9rem_1fr_5.5rem] items-center gap-4 sm:grid-cols-[11rem_1fr_6.5rem]">
                <div className="text-sm text-ink-300">{r.label}</div>
                <div className="relative h-3 rounded-full bg-white/[0.06]">
                  <div
                    className={`h-3 rounded-full ${BAR_TONE[r.tone]}`}
                    style={{ width: `${(r.mid / SCALE_SECONDS) * 100}%` }}
                  />
                  <div
                    aria-hidden
                    className="absolute -bottom-2 -top-2 border-l border-dashed border-ember-400"
                    style={{ left: `${(SLA_SECONDS / SCALE_SECONDS) * 100}%` }}
                  />
                </div>
                <div className="text-right font-mono text-sm text-white">{r.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-mono text-[10px] text-ink-500">
            <span>0s</span>
            <span className="text-ember-400">Google SLA 5s</span>
            <span>8s</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ProofBand() {
  return (
    <div className="bg-ink-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-wider text-brand-400">proof</p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
          The claim, traced to the outcome
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink-300">
          {proofChain.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded border border-white/15 px-2.5 py-1">{s}</span>
              {i < proofChain.length - 1 && <span aria-hidden className="text-ink-500">→</span>}
            </span>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proofTiles.map((t) => (
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
