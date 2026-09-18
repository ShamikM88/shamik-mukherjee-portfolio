import { governanceComparison } from "@/data/content";
import { Card } from "@/components/ui";

export function GovernanceSection() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          {governanceComparison.heading}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          {governanceComparison.intro}
        </p>
      </div>

      <Card hover={false} className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-ink-200 dark:border-ink-800">
              {governanceComparison.columns.map((col, i) => (
                <th
                  key={col}
                  className={`px-5 py-4 font-display text-xs font-semibold uppercase tracking-wider ${
                    i === 0
                      ? "text-ink-500 dark:text-ink-400"
                      : i === 1
                        ? "text-brand-700 dark:text-brand-400"
                        : "text-ember-600 dark:text-ember-400"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {governanceComparison.rows.map((row, rIdx) => (
              <tr
                key={row[0]}
                className={rIdx % 2 === 0 ? "bg-white dark:bg-ink-900" : "bg-ink-50 dark:bg-ink-900/50"}
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cell}
                    className={`px-5 py-4 align-top leading-relaxed ${
                      cIdx === 0
                        ? "font-medium text-ink-700 dark:text-ink-200"
                        : "text-ink-600 dark:text-ink-300"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
