"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Chart, registerables } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(...registerables, annotationPlugin);

type GithubLabel = { name: string };
type GithubIssue = { number: number; title: string; html_url: string; labels: GithubLabel[] };

type Shape = "circle" | "triangle" | "rect";

type IssuePoint = {
  number: number;
  title: string;
  url: string;
  x: number;
  y: number;
  color: "could" | "wont" | "delta";
  shape: Shape;
};

const EFFORT: Record<string, number> = { XS: 1, S: 2, M: 3, L: 4, XL: 5 };
const IMPACT: Record<string, number> = { high: 4, medium: 2.5, low: 1 };
// Reuses the exact tones the static MoSCoW lanes above already use for
// could/wont (ember/muted), so a point's color means the same thing in both
// places. Delta deliberately does NOT reuse brand teal - that's "Must have"'s
// color up there, and delta means the opposite (never a MoSCoW question at
// all) - reusing it would send a mixed signal. Violet is the site's fourth
// qualitative accent, genuinely unused by any MoSCoW tone.
const COLOR_HEX = { could: "#e6832a", wont: "#788592", delta: "#8b5cf6" } as const;

// Deterministic offset seeded by issue number - same-tier issues fan out
// instead of stacking on identical coordinates, but reload with the same
// data always looks the same (no re-randomizing on every render).
function jitter(seed: number) {
  const n = Math.sin(seed * 12.9898) * 43758.5453;
  return (n - Math.floor(n)) * 0.6 - 0.3;
}

// Shape priority when an issue carries more than one of these labels at
// once (e.g. a bug that's also tagged enhancement): bug is the most urgent
// framing, tech-debt is more specific than a bare "enhancement" default.
function pickShape(labels: string[]): Shape {
  if (labels.includes("bug")) return "triangle";
  if (labels.includes("tech-debt")) return "rect";
  return "circle";
}

function mapIssue(item: GithubIssue): IssuePoint {
  const labels = item.labels.map((l) => l.name);
  const sizeKey = labels.find((l) => l.startsWith("size/"))?.slice(5) ?? "S";
  const impactKey = labels.find((l) => l.startsWith("impact/"))?.slice(7) ?? "medium";
  const color: IssuePoint["color"] = labels.includes("moscow/could")
    ? "could"
    : labels.includes("moscow/wont")
      ? "wont"
      : "delta";

  return {
    number: item.number,
    title: item.title,
    url: item.html_url,
    x: (EFFORT[sizeKey] ?? 2) + jitter(item.number),
    y: (IMPACT[impactKey] ?? 2.5) + jitter(item.number + 1000),
    color,
    shape: pickShape(labels),
  };
}

// Real, verified open-issue snapshot (2026-09-26, post tech-debt backfill) -
// used only if the live fetch fails, same silent-fallback convention as the
// other live-github-stat components. Kept as raw GithubIssue shape so it
// goes through the same mapIssue() logic as live data.
const FALLBACK_ISSUES: GithubIssue[] = [
  { number: 117, title: "Consider splitting README.md into a docs/ folder if it keeps growing", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/117", labels: [{ name: "impact/low" }] },
  { number: 114, title: "Add support for charts/graphs in CAMs (sector trends, SWOT, positioning, stock price)", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/114", labels: [{ name: "enhancement" }, { name: "size/M" }, { name: "impact/low" }] },
  { number: 113, title: "Render Group/Parent/UBO structure as a tree diagram instead of prose", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/113", labels: [{ name: "enhancement" }, { name: "size/S" }, { name: "impact/low" }] },
  { number: 111, title: "pii_scan.py's PII heuristics are UK-specific in a framework designed to be forked by any institution", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/111", labels: [{ name: "tech-debt" }, { name: "size/S" }, { name: "impact/medium" }] },
  { number: 110, title: "docx_builder.py has no handling for H4+ Markdown headings", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/110", labels: [{ name: "bug" }, { name: "size/XS" }, { name: "impact/low" }] },
  { number: 109, title: "calibrate.py silently truncates calibration samples to 12,000 characters with no warning", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/109", labels: [{ name: "bug" }, { name: "size/S" }, { name: "impact/medium" }] },
  { number: 108, title: "config/settings.json documents several fields that no script actually reads", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/108", labels: [{ name: "tech-debt" }, { name: "size/S" }, { name: "impact/medium" }] },
  { number: 107, title: "No regression test guards against the 'stale numbered cross-reference' bug class recurring", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/107", labels: [{ name: "tech-debt" }, { name: "size/XS" }, { name: "impact/medium" }] },
  { number: 106, title: "Collateral data's state.json -> exported .xlsx plumbing is untested end-to-end", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/106", labels: [{ name: "tech-debt" }, { name: "size/S" }, { name: "impact/medium" }] },
  { number: 105, title: "docx_builder.py's inline code span rendering has no test", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/105", labels: [{ name: "tech-debt" }, { name: "size/XS" }, { name: "impact/low" }] },
  { number: 104, title: "_FileLock's Windows PermissionError retry branch is untested", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/104", labels: [{ name: "tech-debt" }, { name: "size/XS" }, { name: "impact/medium" }] },
  { number: 103, title: "calibrate.py's --mock mode has zero test coverage", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/103", labels: [{ name: "tech-debt" }, { name: "size/S" }, { name: "impact/low" }] },
  { number: 99, title: "Ground-truth figures schema is missing metrics the framework requires citing (Working Capital Days, collateral exposure)", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/99", labels: [{ name: "tech-debt" }, { name: "size/M" }, { name: "impact/high" }] },
  { number: 98, title: "The primary interface never actually invokes the tested financial-formula code", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/98", labels: [{ name: "tech-debt" }, { name: "size/L" }, { name: "impact/high" }] },
  { number: 97, title: "Multi-day deals can export into a different dated folder than their own audit trail", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/97", labels: [{ name: "bug" }, { name: "size/S" }, { name: "impact/medium" }] },
  { number: 96, title: "Parent/UBO Support research has no systematic guidance", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/96", labels: [{ name: "enhancement" }, { name: "tech-debt" }, { name: "impact/high" }] },
  { number: 49, title: "No FX handling or multi-currency support", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/49", labels: [{ name: "enhancement" }, { name: "size/M" }, { name: "impact/low" }, { name: "moscow/wont" }] },
  { number: 48, title: "No HoldCo/OpCo group/subsidiary consolidation", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/48", labels: [{ name: "enhancement" }, { name: "size/L" }, { name: "impact/high" }, { name: "moscow/could" }] },
  { number: 35, title: "No AML/sanctions/PEP screening or ESG scoring", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/35", labels: [{ name: "enhancement" }, { name: "size/L" }, { name: "impact/high" }, { name: "moscow/could" }] },
  { number: 33, title: "Covenant/CP model lacks schedules, step-downs, and cure periods", html_url: "https://github.com/ShamikM88/open-cam-framework/issues/33", labels: [{ name: "enhancement" }, { name: "size/L" }, { name: "impact/high" }, { name: "moscow/could" }] },
];

const LEGEND_COLOR = [
  { key: "could", label: "Could have" },
  { key: "wont", label: "Won't have" },
  { key: "delta", label: "Delta (outside MoSCoW)" },
] as const;

const LEGEND_SHAPE: { shape: Shape; label: string }[] = [
  { shape: "circle", label: "Enhancement" },
  { shape: "triangle", label: "Bug" },
  { shape: "rect", label: "Tech debt" },
];

function ShapeIcon({ shape }: { shape: Shape }) {
  if (shape === "triangle") {
    return (
      <svg width="10" height="10" aria-hidden>
        <polygon points="5,0.5 9.5,9 0.5,9" fill="currentColor" />
      </svg>
    );
  }
  if (shape === "rect") {
    return (
      <svg width="10" height="10" aria-hidden>
        <rect x="0.5" y="0.5" width="9" height="9" rx="1.5" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="10" height="10" aria-hidden>
      <circle cx="5" cy="5" r="4.5" fill="currentColor" />
    </svg>
  );
}

export function ImpactEffortQuadrant({ repo }: { repo: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [points, setPoints] = React.useState<IssuePoint[]>(() => FALLBACK_ISSUES.map(mapIssue));
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartRef = React.useRef<Chart | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    let cancelled = false;
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repo} is:issue is:open`)}&per_page=100`;
    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data: { items?: GithubIssue[] }) => {
        if (cancelled || !data.items) return;
        setPoints(data.items.map(mapIssue));
      })
      .catch(() => {
        /* keep the static fallback snapshot - no visible error state */
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  React.useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const isDark = resolvedTheme === "dark";
    const muted = isDark ? "#a9b3bc" : "#586572";
    const faint = isDark ? "#788592" : "#a9b3bc";
    const grid = isDark ? "#38414b" : "#d3d8dd";
    const ring = isDark ? "#14181d" : "#ffffff";
    // Very low-opacity, purely tonal quadrant tint - no new color meaning,
    // just reinforces the four zones at a glance. Point color already
    // carries the one meaningful color channel (MoSCoW status).
    const zoneTint = isDark ? "rgba(255,255,255,0.03)" : "rgba(10,13,16,0.025)";

    const byColor = (color: IssuePoint["color"]) => points.filter((p) => p.color === color);

    const makeDataset = (color: IssuePoint["color"]) => {
      const items = byColor(color);
      return {
        data: items.map((p) => ({ x: p.x, y: p.y, title: p.title, number: p.number, url: p.url })),
        backgroundColor: COLOR_HEX[color],
        borderColor: ring,
        borderWidth: 1.5,
        pointStyle: items.map((p) => p.shape),
        pointRadius: 7,
        pointHoverRadius: 9,
        pointHoverBorderWidth: 2,
      };
    };

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "scatter",
      data: {
        datasets: [makeDataset("could"), makeDataset("wont"), makeDataset("delta")],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 20, right: 20, bottom: 4, left: 4 } },
        onClick: (_evt, elements) => {
          const el = elements[0];
          if (!el) return;
          const ds = chartRef.current?.data.datasets[el.datasetIndex]?.data[el.index] as
            | { url?: string }
            | undefined;
          if (ds?.url) window.open(ds.url, "_blank", "noopener,noreferrer");
        },
        onHover: (evt, elements) => {
          if (evt.native?.target instanceof HTMLElement) {
            evt.native.target.style.cursor = elements.length ? "pointer" : "default";
          }
        },
        scales: {
          x: {
            min: 0.4,
            max: 5.6,
            title: { display: true, text: "Effort  →", color: muted, font: { size: 12, weight: 500 } },
            ticks: {
              color: faint,
              font: { size: 10 },
              stepSize: 1,
              callback: (v) => ({ 1: "XS", 2: "S", 3: "M", 4: "L", 5: "XL" } as Record<number, string>)[v as number] ?? "",
            },
            grid: { color: grid },
          },
          y: {
            min: 0.4,
            max: 5.1,
            // Chart.js rotates a y-axis title -90deg to read bottom-to-top, which
            // rotates the glyphs too - a leading "up arrow" would end up pointing
            // sideways at the bottom of the axis. A trailing right-arrow rotates
            // into a correctly-pointing-up arrow positioned at the top instead.
            title: { display: true, text: "Impact  →", color: muted, font: { size: 12, weight: 500 } },
            afterBuildTicks: (axis) => {
              axis.ticks = [{ value: 1 }, { value: 2.5 }, { value: 4 }];
            },
            ticks: {
              color: faint,
              font: { size: 10 },
              callback: (v) => ({ 1: "Low", 2.5: "Medium", 4: "High" } as Record<number, string>)[v as number] ?? "",
            },
            grid: { color: grid },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const raw = ctx.raw as { title?: string; number?: number };
                return `#${raw.number} ${raw.title ?? ""}`;
              },
            },
          },
          annotation: {
            annotations: {
              zoneDoNext: { type: "box", xMin: 0.4, xMax: 2.5, yMin: 2.5, yMax: 5.1, backgroundColor: zoneTint, borderWidth: 0 },
              zoneQuickWins: { type: "box", xMin: 0.4, xMax: 2.5, yMin: 0.4, yMax: 2.5, backgroundColor: "transparent", borderWidth: 0 },
              zonePlan: { type: "box", xMin: 2.5, xMax: 5.6, yMin: 2.5, yMax: 5.1, backgroundColor: "transparent", borderWidth: 0 },
              zoneReconsider: { type: "box", xMin: 2.5, xMax: 5.6, yMin: 0.4, yMax: 2.5, backgroundColor: zoneTint, borderWidth: 0 },
              vline: { type: "line", xMin: 2.5, xMax: 2.5, borderColor: grid, borderWidth: 1 },
              hline: { type: "line", yMin: 2.5, yMax: 2.5, borderColor: grid, borderWidth: 1 },
              q1: { type: "label", xValue: 1.45, yValue: 4.95, content: "Do next", color: muted, font: { size: 11, weight: 500 } },
              q2: { type: "label", xValue: 4.05, yValue: 4.95, content: "Plan", color: muted, font: { size: 11, weight: 500 } },
              q3: { type: "label", xValue: 1.45, yValue: 0.55, content: "Quick wins", color: muted, font: { size: 11, weight: 500 } },
              q4: { type: "label", xValue: 4.05, yValue: 0.55, content: "Reconsider", color: muted, font: { size: 11, weight: 500 } },
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [mounted, points, resolvedTheme]);

  if (!mounted) {
    return <div className="h-[380px] w-full" aria-hidden />;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-200 px-4 py-3 dark:border-white/10">
        <div className="flex flex-wrap gap-3 text-xs text-ink-500 dark:text-ink-400">
          {LEGEND_COLOR.map((l) => (
            <span
              key={l.key}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-2.5 py-1 dark:bg-white/5"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: COLOR_HEX[l.key] }}
                aria-hidden
              />
              {l.label}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-ink-500 dark:text-ink-400">
          {LEGEND_SHAPE.map((s) => (
            <span key={s.shape} className="inline-flex items-center gap-1.5">
              <ShapeIcon shape={s.shape} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <div className="relative h-[400px] w-full p-4">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Scatter plot of open OpenCAM backlog issues, Effort (XS to XL) on the x-axis and Impact (Low to High) on the y-axis, colored by MoSCoW status and shaped by bug, enhancement, or tech debt. Click a point to open the issue on GitHub."
        />
      </div>
    </div>
  );
}
