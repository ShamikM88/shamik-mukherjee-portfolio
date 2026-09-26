const BLUE = "#3b82f6";
const TEAL = "#2fc98f";
const NEUTRAL = "#586572";
const TEXT = "#d3d8dd";
const ZONE = "#454f5b";

type PipeNode = { key: string; label: string; cx: number; y: number; w?: number; lane?: "blue" | "teal" };
type OutputNode = { key: string; cx: number; y: number; lines: string[]; icons: ("word" | "excel")[] };

const H = 72;
const OUT_W = 190;
const OUT_H = 92;

const SETUP: PipeNode[] = [
  { key: "calibrate", label: "/calibrate", cx: 460, y: 65, w: 210 },
  { key: "calibrate-policy", label: "/calibrate-policy", cx: 750, y: 65, w: 250 },
];

const PIPE: PipeNode[] = [
  { key: "triage", label: "/triage", cx: 470, y: 230, lane: "blue" },
  { key: "research", label: "/research", cx: 730, y: 230, lane: "teal" },
  { key: "spread", label: "/spread", cx: 600, y: 378 },
  { key: "commercial", label: "/commercial", cx: 600, y: 498, lane: "blue" },
  { key: "collateral", label: "/collateral", cx: 600, y: 618 },
  { key: "project", label: "/project", cx: 600, y: 738 },
  { key: "assemble", label: "/assemble", cx: 600, y: 858 },
];

const OUTPUTS: OutputNode[] = [
  { key: "brief", cx: 985, y: 220, lines: ["Research", "Brief"], icons: ["word"] },
  { key: "spreadOut", cx: 985, y: 368, lines: ["Spreading", "Template"], icons: ["excel"] },
  { key: "camOut", cx: 985, y: 838, lines: ["Full CAM", ".docx + .xlsx"], icons: ["word", "excel"] },
];

function pbox(n: PipeNode) {
  const w = n.w ?? 220;
  return { x: n.cx - w / 2, y: n.y, w, h: H };
}
function obox(n: OutputNode) {
  return { x: n.cx - OUT_W / 2, y: n.y, w: OUT_W, h: OUT_H };
}

function Arrow({
  d,
  color = NEUTRAL,
  marker,
  dashed = true,
}: {
  d: string;
  color?: string;
  marker: string;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeDasharray={dashed ? "6 6" : undefined}
      markerEnd={`url(#${marker})`}
    />
  );
}

function DocIcon({ cx, cy, kind }: { cx: number; cy: number; kind: "word" | "excel" }) {
  const color = kind === "word" ? BLUE : TEAL;
  const w = 26,
    h = 32,
    fold = 8;
  const x = cx - w / 2,
    y = cy - h / 2;
  return (
    <g>
      <path d={`M${x},${y} H${x + w - fold} L${x + w},${y + fold} V${y + h} H${x} Z`} fill="#0e1318" stroke={color} strokeWidth={1.5} />
      <path d={`M${x + w - fold},${y} V${y + fold} H${x + w}`} fill="none" stroke={color} strokeWidth={1.5} />
      <text x={cx} y={y + h - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill={color} fontFamily="var(--font-mono, monospace)">
        {kind === "word" ? "W" : "X"}
      </text>
    </g>
  );
}

export function OpenCamWorkflowDiagram() {
  const sb = Object.fromEntries(SETUP.map((n) => [n.key, { ...pbox(n), cx: n.cx }])) as Record<
    string,
    { x: number; y: number; w: number; h: number; cx: number }
  >;
  const pb = Object.fromEntries(PIPE.map((n) => [n.key, { ...pbox(n), cx: n.cx }])) as Record<
    string,
    { x: number; y: number; w: number; h: number; cx: number }
  >;
  const ob = Object.fromEntries(OUTPUTS.map((n) => [n.key, { ...obox(n), cx: n.cx }])) as Record<
    string,
    { x: number; y: number; w: number; h: number; cx: number }
  >;

  const bottom = (k: string) => ({ x: pb[k].cx, y: pb[k].y + pb[k].h });
  const top = (k: string) => ({ x: pb[k].cx, y: pb[k].y });
  const rightMid = (k: string) => ({ x: pb[k].x + pb[k].w, y: pb[k].y + pb[k].h / 2 });
  const outLeftMid = (k: string) => ({ x: ob[k].x, y: ob[k].y + ob[k].h / 2 });

  return (
    <svg viewBox="0 0 1200 1060" className="h-full w-full" role="img" aria-label="OpenCAM pipeline diagram">
      <title>
        Two zones. One-time setup, not run per deal: /calibrate (writing style + CAM template, per deal type) and
        /calibrate-policy (institution credit policy, org-wide) - both just pre-existing config, not wired into any
        specific deal. Per-deal execution: every deal starts at /triage or /research. The /triage lane (blue, solid
        - committed once chosen) runs straight through /spread, /commercial, /collateral, /project, /assemble. The
        /research lane (teal) is solid only for what's guaranteed - /research itself and its standalone Research
        Brief export; everything past that (rejoining at /spread, skipping /commercial, continuing to /collateral,
        /project, /assemble) is dashed because an analyst may never come back to finish a full CAM. /spread also
        exports a Spreading Template, and /assemble exports the Full CAM (.docx + .xlsx).
      </title>
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L4,4 L0,7" fill="none" stroke={NEUTRAL} strokeWidth={1.5} />
        </marker>
        <marker id="arrowhead-blue" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,1 L4,4 L0,7" fill="none" stroke={BLUE} strokeWidth={1.5} />
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
        <filter id="glow-blue" x="-60%" y="-60%" width="220%" height="220%">
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

      <rect x={0} y={0} width={1200} height={1060} fill="#0a0d10" />

      {/* Setup zone */}
      <rect x={300} y={25} width={600} height={130} rx={16} fill="none" stroke={ZONE} strokeWidth={1.5} strokeDasharray="4 6" />
      <text x={322} y={48} fontSize={13} letterSpacing={1} fill="#788592">
        ONE-TIME SETUP — NOT RUN PER DEAL
      </text>

      {/* Per-deal zone */}
      <rect x={30} y={175} width={1140} height={850} rx={16} fill="none" stroke={ZONE} strokeWidth={1.5} strokeDasharray="4 6" />
      <text x={52} y={200} fontSize={13} letterSpacing={1} fill="#788592">
        PER-DEAL EXECUTION
      </text>

      {SETUP.map((n) => {
        const { x, y, w, h } = pbox(n);
        return (
          <g key={n.key}>
            <rect x={x} y={y} width={w} height={h} rx={14} fill="#141a20" stroke="#788592" strokeWidth={1.5} />
            <text x={n.cx} y={y + h / 2 + 6} textAnchor="middle" fontFamily="var(--font-mono, monospace)" fontSize={18} fill={TEXT}>
              {n.label}
            </text>
          </g>
        );
      })}

      {/* triage (blue, solid) -> spread ; research (teal, dashed - optional continuation) -> spread */}
      <Arrow d={`M${bottom("triage").x},${bottom("triage").y} V${top("spread").y}`} color={BLUE} marker="arrowhead-blue" dashed={false} />
      <Arrow d={`M${bottom("research").x},${bottom("research").y} v40 H${top("spread").x + 20} v14`} color={TEAL} marker="arrowhead-teal" />

      {/* research -> Research Brief (solid - guaranteed) */}
      <Arrow d={`M${rightMid("research").x},${rightMid("research").y} H${outLeftMid("brief").x}`} color={TEAL} marker="arrowhead-teal" dashed={false} />

      {/* spread -> Spreading Template (solid - guaranteed once /spread runs) */}
      <Arrow d={`M${rightMid("spread").x},${rightMid("spread").y} H${outLeftMid("spreadOut").x}`} marker="arrowhead" dashed={false} />

      {/* triage lane continues, solid blue: spread -> commercial -> collateral */}
      <Arrow d={`M${bottom("spread").x},${bottom("spread").y} V${top("commercial").y}`} color={BLUE} marker="arrowhead-blue" dashed={false} />
      <Arrow d={`M${bottom("commercial").x},${bottom("commercial").y} V${top("collateral").y}`} color={BLUE} marker="arrowhead-blue" dashed={false} />

      {/* research lane bypass, dashed teal (optional): spread -> collateral directly, around /commercial */}
      <path
        d={`M${rightMid("spread").x},${rightMid("spread").y} C 880,${rightMid("spread").y} 880,${rightMid("collateral").y} ${rightMid("collateral").x},${rightMid("collateral").y}`}
        fill="none"
        stroke={TEAL}
        strokeWidth={2}
        strokeDasharray="6 6"
        markerEnd="url(#arrowhead-teal)"
      />
      <text x={895} y={(rightMid("spread").y + rightMid("collateral").y) / 2 - 8} textAnchor="start" fontSize={15} fill={TEAL}>
        research lane —
      </text>
      <text x={895} y={(rightMid("spread").y + rightMid("collateral").y) / 2 + 12} textAnchor="start" fontSize={15} fill={TEAL}>
        bypasses /commercial
      </text>

      {/* both lanes reconverged at /collateral - blue solid, teal dashed, threading through to the end */}
      <Arrow d={`M580,${bottom("collateral").y} V${top("project").y}`} color={BLUE} marker="arrowhead-blue" dashed={false} />
      <Arrow d={`M620,${bottom("collateral").y} V${top("project").y}`} color={TEAL} marker="arrowhead-teal" />
      <Arrow d={`M580,${bottom("project").y} V${top("assemble").y}`} color={BLUE} marker="arrowhead-blue" dashed={false} />
      <Arrow d={`M620,${bottom("project").y} V${top("assemble").y}`} color={TEAL} marker="arrowhead-teal" />

      {/* assemble -> Full CAM output (solid - guaranteed once /assemble runs) */}
      <Arrow d={`M${rightMid("assemble").x},${rightMid("assemble").y} H${outLeftMid("camOut").x}`} marker="arrowhead" dashed={false} />

      {PIPE.map((n) => {
        const { x, y, w, h } = pbox(n);
        const stroke = n.lane === "blue" ? BLUE : n.lane === "teal" ? TEAL : "#788592";
        const filter = n.lane === "blue" ? "url(#glow-blue)" : n.lane === "teal" ? "url(#glow-teal)" : "url(#glow)";
        return (
          <g key={n.key}>
            <rect x={x} y={y} width={w} height={h} rx={14} fill="#141a20" stroke={stroke} strokeWidth={1.5} filter={filter} />
            <text
              x={n.cx}
              y={y + h / 2 + 7}
              textAnchor="middle"
              fontFamily="var(--font-mono, monospace)"
              fontSize={22}
              fill={TEXT}
            >
              {n.label}
            </text>
            {n.key === "commercial" && (
              <text x={n.cx} y={y + h + 20} textAnchor="middle" fontSize={14} fill="#788592">
                (/triage path only)
              </text>
            )}
          </g>
        );
      })}

      {OUTPUTS.map((n) => {
        const { x, y, w, h } = obox(n);
        const iconGap = 34;
        const iconStartX = n.cx - ((n.icons.length - 1) * iconGap) / 2;
        return (
          <g key={n.key}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={14}
              fill="#141a20"
              stroke="#454f5b"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              opacity={0.9}
            />
            {n.icons.map((icon, i) => (
              <DocIcon key={icon} cx={iconStartX + i * iconGap} cy={y + 28} kind={icon} />
            ))}
            {n.lines.map((line, i) => (
              <text key={line} x={n.cx} y={y + 62 + i * 18} textAnchor="middle" fontSize={15} fill="#a9b3bc">
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* done checkmark on /assemble */}
      <circle cx={pb.assemble.x + pb.assemble.w - 8} cy={pb.assemble.y - 2} r={16} fill={TEAL} />
      <path
        d={`M${pb.assemble.x + pb.assemble.w - 15},${pb.assemble.y - 2} l5,5 l9,-10`}
        fill="none"
        stroke="#04241c"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* legend */}
      <g transform="translate(60, 985)">
        <line x1={0} y1={0} x2={28} y2={0} stroke={BLUE} strokeWidth={2.5} />
        <text x={36} y={5} fontSize={15} fill={BLUE}>
          /triage lane
        </text>
        <line x1={190} y1={0} x2={218} y2={0} stroke={TEAL} strokeWidth={2.5} />
        <text x={226} y={5} fontSize={15} fill={TEAL}>
          /research lane
        </text>
        <line x1={400} y1={0} x2={428} y2={0} stroke="#a9b3bc" strokeWidth={2.5} />
        <text x={436} y={5} fontSize={15} fill="#a9b3bc">
          committed
        </text>
        <line x1={560} y1={0} x2={588} y2={0} stroke="#a9b3bc" strokeWidth={2} strokeDasharray="6 6" />
        <text x={596} y={5} fontSize={15} fill="#a9b3bc">
          optional, may never run
        </text>
      </g>
    </svg>
  );
}
