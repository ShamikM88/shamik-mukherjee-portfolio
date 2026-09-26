const NODE_W = 220;
const NODE_H = 72;

type Node = { key: string; label: string; cx: number; y: number; dashed?: boolean; small?: boolean };

const NODES: Node[] = [
  { key: "calibrate", label: "/calibrate", cx: 600, y: 40 },
  { key: "triage", label: "/triage", cx: 470, y: 188 },
  { key: "research", label: "/research", cx: 730, y: 188 },
  { key: "spread", label: "/spread", cx: 600, y: 336 },
  { key: "commercial", label: "/commercial", cx: 600, y: 456 },
  { key: "collateral", label: "/collateral", cx: 600, y: 576 },
  { key: "project", label: "/project", cx: 600, y: 696 },
  { key: "assemble", label: "/assemble", cx: 600, y: 816 },
  { key: "brief", label: "Research\nBrief", cx: 985, y: 188, dashed: true, small: true },
];

const GRAY = "#586572";
const TEAL = "#2fc98f";

function box(n: Node) {
  const w = n.small ? 170 : NODE_W;
  const x = n.cx - w / 2;
  return { x, y: n.y, w, h: NODE_H };
}

function Arrow({ d, color = GRAY, marker = "arrowhead" }: { d: string; color?: string; marker?: string }) {
  return (
    <path d={d} fill="none" stroke={color} strokeWidth={1.75} strokeDasharray="6 6" markerEnd={`url(#${marker})`} />
  );
}

export function OpenCamWorkflowDiagram() {
  const byKey = Object.fromEntries(NODES.map((n) => [n.key, n]));
  const b = Object.fromEntries(NODES.map((n) => [n.key, box(n)])) as Record<string, ReturnType<typeof box>>;

  const bottom = (k: string) => ({ x: byKey[k].cx, y: b[k].y + b[k].h });
  const top = (k: string) => ({ x: byKey[k].cx, y: b[k].y });
  const rightMid = (k: string) => ({ x: b[k].x + b[k].w, y: b[k].y + b[k].h / 2 });
  const leftMid = (k: string) => ({ x: b[k].x, y: b[k].y + b[k].h / 2 });

  return (
    <svg viewBox="0 0 1200 910" className="h-full w-full" role="img" aria-label="OpenCAM pipeline diagram">
      <title>
        OpenCAM pipeline, two lanes after /calibrate: the /triage lane (gray) runs /spread then /commercial then
        /collateral, /project, /assemble. The /research lane (teal) also rejoins at /spread - since /research never
        touches financials, spreading still has to run - but then bypasses /commercial entirely and continues
        straight to /collateral, since /research already produced that qualitative output itself. /research
        separately exports its own standalone Research Brief.
      </title>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L4,4 L0,7" fill="none" stroke={GRAY} strokeWidth={1.5} />
        </marker>
        <marker id="arrowhead-teal" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L4,4 L0,7" fill="none" stroke={TEAL} strokeWidth={1.5} />
        </marker>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-teal" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x={0} y={0} width={1200} height={910} fill="#0a0d10" />

      {/* calibrate -> triage (gray) / research (teal) */}
      <Arrow d={`M${bottom("calibrate").x},${bottom("calibrate").y} v22 H470 v14`} />
      <Arrow
        d={`M${bottom("calibrate").x},${bottom("calibrate").y + 22} H730 v14`}
        color={TEAL}
        marker="arrowhead-teal"
      />

      {/* triage (gray) -> spread ; research (teal) -> spread - both rejoin the same node */}
      <Arrow d={`M${bottom("triage").x},${bottom("triage").y} v22 H600 v14`} />
      <Arrow d={`M${bottom("research").x},${bottom("research").y} v22 H600 v14`} color={TEAL} marker="arrowhead-teal" />

      {/* research -> Research Brief (side export, its own standalone thing - stays gray/neutral) */}
      <Arrow d={`M${rightMid("research").x},${rightMid("research").y} H${leftMid("brief").x}`} />

      {/* triage lane continues in gray: spread -> commercial -> collateral -> project -> assemble */}
      <Arrow d={`M${bottom("spread").x},${bottom("spread").y} V${top("commercial").y}`} />
      <Arrow d={`M${bottom("commercial").x},${bottom("commercial").y} V${top("collateral").y}`} />
      <Arrow d={`M${bottom("collateral").x},${bottom("collateral").y} V${top("project").y}`} />
      <Arrow d={`M${bottom("project").x},${bottom("project").y} V${top("assemble").y}`} />

      {/* research lane bypass, in teal: spread -> collateral directly, around the right side of /commercial */}
      <path
        d={`M${rightMid("spread").x},${rightMid("spread").y} C 900,${rightMid("spread").y} 900,${rightMid("collateral").y} ${rightMid("collateral").x},${rightMid("collateral").y}`}
        fill="none"
        stroke={TEAL}
        strokeWidth={2}
        strokeDasharray="6 6"
        markerEnd="url(#arrowhead-teal)"
      />
      <text x={915} y={(rightMid("spread").y + rightMid("collateral").y) / 2 - 8} textAnchor="start" fontSize={15} fill={TEAL}>
        research lane —
      </text>
      <text x={915} y={(rightMid("spread").y + rightMid("collateral").y) / 2 + 12} textAnchor="start" fontSize={15} fill={TEAL}>
        bypasses /commercial
      </text>

      {NODES.map((n) => {
        const { x, y, w, h } = box(n);
        const isResearchLane = n.key === "research";
        return (
          <g key={n.key}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={14}
              fill="#141a20"
              stroke={n.dashed ? "#454f5b" : isResearchLane ? TEAL : "#788592"}
              strokeWidth={1.5}
              strokeDasharray={n.dashed ? "5 5" : undefined}
              filter={n.dashed ? undefined : isResearchLane ? "url(#glow-teal)" : "url(#glow)"}
              opacity={n.dashed ? 0.85 : 1}
            />
            {n.label.split("\n").map((line, i, arr) => (
              <text
                key={line}
                x={n.cx}
                y={y + h / 2 + (i - (arr.length - 1) / 2) * 22 + 6}
                textAnchor="middle"
                fontFamily="var(--font-mono, monospace)"
                fontSize={n.small ? 18 : 22}
                fill={n.dashed ? "#a9b3bc" : "#d3d8dd"}
              >
                {line}
              </text>
            ))}
            {n.key === "commercial" && (
              <text x={n.cx} y={y + h + 20} textAnchor="middle" fontSize={14} fill="#788592">
                (/triage path only)
              </text>
            )}
          </g>
        );
      })}

      {/* legend */}
      <g transform="translate(70, 40)">
        <line x1={0} y1={0} x2={28} y2={0} stroke={GRAY} strokeWidth={2} strokeDasharray="6 6" />
        <text x={36} y={5} fontSize={15} fill="#a9b3bc">
          /triage lane
        </text>
        <line x1={0} y1={26} x2={28} y2={26} stroke={TEAL} strokeWidth={2} strokeDasharray="6 6" />
        <text x={36} y={31} fontSize={15} fill={TEAL}>
          /research lane
        </text>
      </g>

      {/* done checkmark on /assemble */}
      <circle cx={b.assemble.x + b.assemble.w - 8} cy={b.assemble.y - 2} r={16} fill={TEAL} />
      <path
        d={`M${b.assemble.x + b.assemble.w - 15},${b.assemble.y - 2} l5,5 l9,-10`}
        fill="none"
        stroke="#04241c"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
