// Custom abstract illustrations for the case-study cards and detail pages - no stock
// art, built from shapes/gradients to represent each project's actual mechanism
// (Maker-Checker verification; email-to-tracker pipeline) rather than a generic icon.

function ThumbFrame({
  gradientId,
  viewBox = "0 0 400 240",
  children,
}: {
  gradientId: string;
  viewBox?: string;
  children: React.ReactNode;
}) {
  const [, , w, h] = viewBox.split(" ");
  return (
    <svg viewBox={viewBox} className="h-full w-full" role="img" aria-hidden>
      <defs>
        <linearGradient id={`${gradientId}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1220" />
          <stop offset="100%" stopColor="#1a1530" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${gradientId}-accent`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <rect width={w} height={h} rx="16" fill={`url(#${gradientId}-bg)`} />
      <rect width={w} height={h} rx="16" fill={`url(#${gradientId}-glow)`} />
      {children}
    </svg>
  );
}

function DashPanel({ x, y, accent }: { x: number; y: number; accent: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width="140" height="200" rx="12" fill="#151933" stroke="#343b58" />
      <circle cx="70" cy="36" r="18" fill="#0f1220" stroke={accent} strokeWidth="2" />
      <path d="M62 36l6 6 12-12" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[64, 82, 100].map((rowY, i) => (
        <g key={rowY} transform={`translate(16,${rowY})`}>
          <circle cx="4" cy="4" r="4" fill={["#38bdf8", "#a855f7", "#4ade80"][i]} />
          <rect x="16" y="0" width="92" height="8" rx="4" fill="#3a4160" />
        </g>
      ))}
      {/* mini line chart */}
      <polyline
        points="16,180 40,160 64,168 88,140 112,150"
        fill="none"
        stroke={accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function OpenCamThumbnail() {
  const id = "opencam";
  return (
    <ThumbFrame gradientId={id}>
      <g transform="translate(90,58)">
        <rect width="150" height="108" rx="12" fill="#1e2338" stroke="#343b58" />
        <rect x="16" y="18" width="70" height="8" rx="4" fill={`url(#${id}-accent)`} />
        <rect x="16" y="38" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="52" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="66" width="90" height="6" rx="3" fill="#3a4160" />
        <text x="16" y="96" fontFamily="monospace" fontSize="9" fill="#8890b5">
          Underwriter
        </text>
      </g>
      <g transform="translate(168,90)">
        <rect width="150" height="108" rx="12" fill="#181c30" stroke="#343b58" />
        <rect x="16" y="18" width="70" height="8" rx="4" fill="#4ade80" />
        <rect x="16" y="38" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="52" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="66" width="90" height="6" rx="3" fill="#3a4160" />
        <text x="16" y="96" fontFamily="monospace" fontSize="9" fill="#8890b5">
          Risk Reviewer
        </text>
        <circle cx="134" cy="14" r="14" fill="#0f1220" stroke="#4ade80" strokeWidth="2" />
        <path d="M128 14l4 4 8-8" stroke="#4ade80" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </ThumbFrame>
  );
}

export function ForkThumbnail() {
  const id = "fork";
  return (
    <ThumbFrame gradientId={id}>
      <g transform="translate(48,88)">
        <rect width="72" height="52" rx="8" fill="#1e2338" stroke="#343b58" />
        <path d="M4 8l32 22 32-22" stroke="#8890b5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <line x1="128" y1="114" x2="196" y2="114" stroke="#4b5372" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M190 108l8 6-8 6" stroke="#4b5372" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[
        { x: 212, h: 46, color: "#38bdf8" },
        { x: 256, h: 70, color: "#a855f7" },
        { x: 300, h: 30, color: "#4ade80" },
      ].map((col) => (
        <rect key={col.x} x={col.x} y={168 - col.h} width="32" height={col.h} rx="6" fill={col.color} fillOpacity="0.85" />
      ))}
      <rect x="200" y="176" width="148" height="2" rx="1" fill="#343b58" />
    </ThumbFrame>
  );
}

export function OpenCamBanner() {
  const id = "opencam-banner";
  return (
    <ThumbFrame gradientId={id} viewBox="0 0 800 380">
      <g transform="translate(60,70)">
        <rect width="220" height="150" rx="14" fill="#1e2338" stroke="#343b58" />
        <rect x="20" y="24" width="100" height="10" rx="5" fill={`url(#${id}-accent)`} />
        <rect x="20" y="52" width="170" height="8" rx="4" fill="#3a4160" />
        <rect x="20" y="72" width="170" height="8" rx="4" fill="#3a4160" />
        <rect x="20" y="92" width="130" height="8" rx="4" fill="#3a4160" />
        <text x="20" y="132" fontFamily="monospace" fontSize="12" fill="#8890b5">
          Underwriter
        </text>
      </g>
      <g transform="translate(110,150)">
        <rect width="220" height="150" rx="14" fill="#181c30" stroke="#343b58" />
        <rect x="20" y="24" width="100" height="10" rx="5" fill="#4ade80" />
        <rect x="20" y="52" width="170" height="8" rx="4" fill="#3a4160" />
        <rect x="20" y="72" width="170" height="8" rx="4" fill="#3a4160" />
        <rect x="20" y="92" width="130" height="8" rx="4" fill="#3a4160" />
        <text x="20" y="132" fontFamily="monospace" fontSize="12" fill="#8890b5">
          Risk Reviewer
        </text>
        <circle cx="192" cy="20" r="20" fill="#0f1220" stroke="#4ade80" strokeWidth="2.5" />
        <path d="M182 20l7 7 13-13" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <DashPanel x={620} y={70} accent="#38bdf8" />
    </ThumbFrame>
  );
}

export function ForkBanner() {
  const id = "fork-banner";
  return (
    <ThumbFrame gradientId={id} viewBox="0 0 800 380">
      <g transform="translate(70,150)">
        <rect width="110" height="80" rx="12" fill="#1e2338" stroke="#343b58" />
        <path d="M8 12l47 33 47-33" stroke="#8890b5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <line x1="200" y1="190" x2="300" y2="190" stroke="#4b5372" strokeWidth="2.5" strokeDasharray="6 6" />
      <path d="M290 180l12 10-12 10" stroke="#4b5372" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {[
        { x: 330, h: 70, color: "#38bdf8" },
        { x: 400, h: 110, color: "#a855f7" },
        { x: 470, h: 46, color: "#4ade80" },
      ].map((col) => (
        <rect key={col.x} x={col.x} y={260 - col.h} width="48" height={col.h} rx="8" fill={col.color} fillOpacity="0.85" />
      ))}
      <rect x="320" y="272" width="210" height="3" rx="1.5" fill="#343b58" />
      <DashPanel x={620} y={70} accent="#a855f7" />
    </ThumbFrame>
  );
}

export function OpenCamSpreadingVisual() {
  const id = "opencam-spread";
  const rows = [
    { label: "TNW", w: 92 },
    { label: "EBITDA", w: 70 },
    { label: "DSCR", w: 108 },
    { label: "Net Debt/EBITDA", w: 60 },
  ];
  return (
    <ThumbFrame gradientId={id}>
      <g transform="translate(32,30)">
        {rows.map((r, i) => (
          <g key={r.label} transform={`translate(0,${i * 34})`}>
            <text x="0" y="14" fontFamily="monospace" fontSize="10" fill="#8890b5">
              {r.label}
            </text>
            <rect x="0" y="20" width="140" height="7" rx="3.5" fill="#252b46" />
            <rect x="0" y="20" width={r.w} height="7" rx="3.5" fill={`url(#${id}-accent)`} />
          </g>
        ))}
      </g>
      <g transform="translate(220,40)">
        <polyline
          points="0,110 30,80 60,95 90,50 120,65 150,20"
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="150" cy="20" r="5" fill="#4ade80" />
      </g>
      <circle cx="350" cy="200" r="18" fill="#0f1220" stroke="#4ade80" strokeWidth="2" />
      <rect x="342" y="192" width="16" height="12" rx="2" fill="none" stroke="#4ade80" strokeWidth="2" />
      <path d="M344 192v-4a4 4 0 018 0v4" fill="none" stroke="#4ade80" strokeWidth="2" />
    </ThumbFrame>
  );
}

export function ForkDedupVisual() {
  const id = "fork-dedup";
  return (
    <ThumbFrame gradientId={id}>
      <g transform="translate(60,50)">
        <rect width="160" height="60" rx="10" fill="#1e2338" stroke="#343b58" />
        <rect x="14" y="14" width="90" height="8" rx="4" fill={`url(#${id}-accent)`} />
        <rect x="14" y="32" width="120" height="6" rx="3" fill="#3a4160" />
      </g>
      <g transform="translate(90,90)" opacity="0.55">
        <rect width="160" height="60" rx="10" fill="#1e2338" stroke="#5a3c6b" strokeDasharray="4 4" />
        <rect x="14" y="14" width="90" height="8" rx="4" fill="#5a3c6b" />
        <rect x="14" y="32" width="120" height="6" rx="3" fill="#3a4160" />
      </g>
      <g transform="translate(255,105)">
        <circle cx="20" cy="20" r="18" fill="#0f1220" stroke="#a855f7" strokeWidth="2.5" />
        <circle cx="16" cy="16" r="8" fill="none" stroke="#a855f7" strokeWidth="2.5" />
        <line x1="22" y1="22" x2="30" y2="30" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <text x="255" y="165" fontFamily="monospace" fontSize="10" fill="#8890b5">
        flagged: repost
      </text>
    </ThumbFrame>
  );
}
