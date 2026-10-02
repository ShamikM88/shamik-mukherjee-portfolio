import { Check, Circle, X } from "lucide-react";

type ItemStatus = "done" | "pending" | "wont";

type LaneItem = string | { text: string; status: ItemStatus };

type Lane = {
  label: string;
  sublabel: string;
  tone: "brand-strong" | "blue" | "ember" | "muted";
  items: LaneItem[];
};

// Icon SHAPE carries the status (done/pending/wont); icon COLOR follows the
// lane's own tone instead of a fixed per-status palette, so a checkmark in
// the ember-toned "Could have" lane reads ember, not an unrelated teal - the
// same color already used for that lane's heading and bullet dot.
// Size is per-icon, not shared: Circle is a filled ring that reads visually
// heavier than Check/X at the same box size, so it needs a smaller box to
// look the same weight as the other two at a glance.
const STATUS_ICON: Record<ItemStatus, { Icon: typeof Check; label: string; size: string }> = {
  done: { Icon: Check, label: "Delivered", size: "h-3.5 w-3.5" },
  pending: { Icon: Circle, label: "Not yet built / still open", size: "h-2.5 w-2.5" },
  wont: { Icon: X, label: "Decided against", size: "h-3.5 w-3.5" },
};

const LEGEND: { status: ItemStatus; text: string }[] = [
  { status: "done", text: "Delivered" },
  { status: "pending", text: "Not yet built / still open" },
  { status: "wont", text: "Decided against" },
];

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
  // Only show the legend when at least one lane actually uses tracked
  // (status-bearing) items - a lanes set that's still all plain-string
  // bullets has nothing for the legend to explain.
  const hasTrackedItems = lanes.some((lane) => lane.items.some((item) => typeof item !== "string"));

  return (
    <div>
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
                        (() => {
                          const { Icon, label, size } = STATUS_ICON[item.status];
                          return <Icon className={`mt-0.5 ${size} flex-shrink-0 ${s.label}`} aria-label={label} />;
                        })()
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
      {hasTrackedItems && (
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-400">
          {LEGEND.map(({ status, text }) => {
            const { Icon, size } = STATUS_ICON[status];
            return (
              <span key={status} className="inline-flex items-center gap-1.5">
                {/* Neutral color here deliberately - the legend explains the shape
                    convention, which holds across every lane's own tone, not one
                    lane's color specifically. */}
                <Icon className={`${size} flex-shrink-0 text-ink-400 dark:text-ink-500`} aria-hidden />
                {text}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
