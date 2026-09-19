// Custom abstract illustrations for the case-study cards - no stock art, built from
// shapes/gradients to represent each project's actual mechanism (Maker-Checker
// verification; email-to-tracker pipeline) rather than a generic icon.

function ThumbFrame({ gradientId, children }: { gradientId: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 240" className="h-full w-full" role="img" aria-hidden>
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
      <rect width="400" height="240" rx="16" fill={`url(#${gradientId}-bg)`} />
      <rect width="400" height="240" rx="16" fill={`url(#${gradientId}-glow)`} />
      {children}
    </svg>
  );
}

export function OpenCamThumbnail() {
  const id = "opencam";
  return (
    <ThumbFrame gradientId={id}>
      {/* Maker card */}
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
      {/* Checker card */}
      <g transform="translate(168,90)">
        <rect width="150" height="108" rx="12" fill="#181c30" stroke="#343b58" />
        <rect x="16" y="18" width="70" height="8" rx="4" fill="#4ade80" />
        <rect x="16" y="38" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="52" width="118" height="6" rx="3" fill="#3a4160" />
        <rect x="16" y="66" width="90" height="6" rx="3" fill="#3a4160" />
        <text x="16" y="96" fontFamily="monospace" fontSize="9" fill="#8890b5">
          Risk Reviewer
        </text>
        {/* Check badge */}
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
      {/* Envelope */}
      <g transform="translate(48,88)">
        <rect width="72" height="52" rx="8" fill="#1e2338" stroke="#343b58" />
        <path d="M4 8l32 22 32-22" stroke="#8890b5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Dashed arrow */}
      <line x1="128" y1="114" x2="196" y2="114" stroke="#4b5372" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M190 108l8 6-8 6" stroke="#4b5372" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Status columns */}
      {[
        { x: 212, h: 46, color: "#38bdf8" },
        { x: 256, h: 70, color: "#a855f7" },
        { x: 300, h: 30, color: "#4ade80" },
      ].map((col) => (
        <rect
          key={col.x}
          x={col.x}
          y={168 - col.h}
          width="32"
          height={col.h}
          rx="6"
          fill={col.color}
          fillOpacity="0.85"
        />
      ))}
      <rect x="200" y="176" width="148" height="2" rx="1" fill="#343b58" />
    </ThumbFrame>
  );
}
