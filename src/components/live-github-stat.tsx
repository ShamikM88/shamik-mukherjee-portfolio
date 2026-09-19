"use client";

import * as React from "react";

/**
 * Fetches a live count from GitHub's public REST API on mount and swaps it in
 * over the given fallback (the last-known-good static number). No auth, no
 * server involved - this is a static-export site, so "live" means "the
 * visitor's own browser asks GitHub," not "rebuilt on a schedule." Silently
 * keeps the fallback if the fetch fails or GitHub's rate limit is hit -
 * never shows an error state, since the fallback is always a real number.
 */

function useLiveCount(url: string, extract: (data: unknown) => number | undefined, fallback: number) {
  const [value, setValue] = React.useState(fallback);
  const [isLive, setIsLive] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    fetch(url, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (cancelled) return;
        const n = extract(data);
        if (typeof n === "number" && Number.isFinite(n)) {
          setValue(n);
          setIsLive(true);
        }
      })
      .catch(() => {
        /* keep the static fallback - no visible error state */
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { value, isLive };
}

export function LiveMergedPRCount({ repo, fallback }: { repo: string; fallback: number }) {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repo} is:pr is:merged`)}`;
  const { value, isLive } = useLiveCount(
    url,
    (data) => (data as { total_count?: number }).total_count,
    fallback,
  );
  return (
    <span title={isLive ? "Fetched live from GitHub" : "Last known count"}>
      {value}+ PRs merged
    </span>
  );
}

export function LiveCommitsAhead({
  repo,
  base,
  fallback,
}: {
  repo: string;
  /** "owner:branch" of the upstream to compare against, e.g. "MadsLorentzen:master" */
  base: string;
  fallback: number;
}) {
  const url = `https://api.github.com/repos/${repo}/compare/${base}...master`;
  const { value, isLive } = useLiveCount(
    url,
    (data) => (data as { ahead_by?: number }).ahead_by,
    fallback,
  );
  return <span title={isLive ? "Fetched live from GitHub" : "Last known count"}>{value}</span>;
}
