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
  { key: "brief", label: "Research\nBrief", cx: 985, y: 336, dashed: true, small: true },
];

function box(n: Node) {
  const w = n.small ? 170 : NODE_W;
  const x = n.cx - w / 2;
  return { x, y: n.y, w, h: NODE_H };
}

function Arrow({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="#586572"
      strokeWidth={1.75}
      strokeDasharray="6 6"
      markerEnd="url(#arrowhead)"
    />
  );
}

export function OpenCamWorkflowDiagram() {
  const byKey = Object.fromEntries(NODES.map((n) => [n.key, n]));
  const b = Object.fromEntries(NODES.map((n) => [n.key, box(n)])) as Record<string, ReturnType<typeof box>>;

  const bottom = (k: string) => ({ x: byKey[k].cx, y: b[k].y + b[k].h });
  const top = (k: string) => ({ x: byKey[k].cx, y: b[k].y });

  return (
    <svg viewBox="0 0 1200 910" className="h-full w-full" role="img" aria-label="OpenCAM pipeline diagram">
      <title>
        OpenCAM pipeline: /calibrate forks into /triage or /research; both converge into /spread, which flows
        through /commercial, /collateral, /project, and /assemble; /research also rejoins directly at /spread
        (skipping /commercial) and separately exports a standalone Research Brief.
      </title>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L4,4 L0,7" fill="none" stroke="#586572" strokeWidth={1.5} />
        </marker>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x={0} y={0} width={1200} height={910} fill="#0a0d10" />

      {/* calibrate -> triage / research (branch bar) */}
      <Arrow d={`M${bottom("calibrate").x},${bottom("calibrate").y} v22 H470 v14`} />
      <Arrow d={`M${bottom("calibrate").x},${bottom("calibrate").y + 22} H730 v14`} />

      {/* triage / research -> spread (merge bar) */}
      <Arrow d={`M${bottom("triage").x},${bottom("triage").y} v22 H600 v14`} />
      <Arrow d={`M${bottom("research").x},${bottom("research").y} v22 H600 v14`} />

      {/* research -> Research Brief (side export) */}
      <Arrow d={`M${bottom("research").x + 40},${bottom("research").y - 10} L${top("brief").x},${top("brief").y}`} />

      {/* main vertical chain */}
      <Arrow d={`M${bottom("spread").x},${bottom("spread").y} V${top("commercial").y}`} />
      <Arrow d={`M${bottom("commercial").x},${bottom("commercial").y} V${top("collateral").y}`} />
      <Arrow d={`M${bottom("collateral").x},${bottom("collateral").y} V${top("project").y}`} />
      <Arrow d={`M${bottom("project").x},${bottom("project").y} V${top("assemble").y}`} />

      {NODES.map((n) => {
        const { x, y, w, h } = box(n);
        return (
          <g key={n.key}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={14}
              fill="#141a20"
              stroke={n.dashed ? "#454f5b" : "#788592"}
              strokeWidth={1.5}
              strokeDasharray={n.dashed ? "5 5" : undefined}
              filter={n.dashed ? undefined : "url(#glow)"}
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
          </g>
        );
      })}

      {/* done checkmark on /assemble */}
      <circle cx={b.assemble.x + b.assemble.w - 8} cy={b.assemble.y - 2} r={16} fill="#2fc98f" />
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
