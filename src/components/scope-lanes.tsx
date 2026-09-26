import { Check, X } from "lucide-react";

type LaneItem = string | { text: string; delivered: boolean };

type Lane = {
  label: string;
  sublabel: string;
  tone: "brand-strong" | "blue" | "ember" | "muted";
  items: LaneItem[];
};

const toneStyles: Record<Lane["tone"], { border: string; label: string; dot: string; item: string }> = {
  "brand-strong": {
    border: "border-t-4 border-brand-500",
    label: "text-brand-700 dark:text-brand-400",
    dot: "bg-brand-500",
    item: "text-ink-700 dark:text-ink-200",
  },
  blue: {
    border: "border-t-4 border-blue-400",
    label: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-400",
    item: "text-ink-700 dark:text-ink-200",
  },
  ember: {
    border: "border-t-4 border-ember-400",
    label: "text-ember-600 dark:text-ember-400",
    dot: "bg-ember-400",
    item: "text-ink-700 dark:text-ink-200",
  },
  muted: {
    border: "border-t-4 border-ink-300 dark:border-white/15",
    label: "text-ink-500 dark:text-ink-400",
    dot: "bg-ink-300 dark:bg-white/25",
    item: "text-ink-500 dark:text-ink-400",
  },
};

export function ScopeLanes({ lanes }: { lanes: Lane[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {lanes.map((lane) => {
        const s = toneStyles[lane.tone];
        return (
          <div
            key={lane.label}
            className={`rounded-2xl ${s.border} border-x border-b border-ink-200 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]`}
          >
            <h3 className={`font-display text-sm font-semibold ${s.label}`}>{lane.label}</h3>
            <p className="mt-0.5 text-xs text-ink-400">{lane.sublabel}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {lane.items.map((item) => {
                const isTracked = typeof item !== "string";
                const text = isTracked ? item.text : item;
                return (
                  <li key={text} className={`flex gap-2.5 text-sm leading-relaxed ${s.item}`}>
                    {isTracked ? (
                      item.delivered ? (
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-500 dark:text-brand-400"
                          aria-label="Delivered"
                        />
                      ) : (
                        <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-400 dark:text-ink-500" aria-label="Not built" />
                      )
                    ) : (
                      <span className={`mt-2 h-1 w-1 flex-shrink-0 rounded-full ${s.dot}`} aria-hidden />
                    )}
                    {text}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
