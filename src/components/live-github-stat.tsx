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

export function LiveClosedIssueCount({ repo, fallback }: { repo: string; fallback: number }) {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repo} is:issue is:closed`)}`;
  const { value, isLive } = useLiveCount(
    url,
    (data) => (data as { total_count?: number }).total_count,
    fallback,
  );
  return (
    <span title={isLive ? "Fetched live from GitHub" : "Last known count"}>
      {value}+ issues closed
    </span>
  );
}

/**
 * Counts every issue ever tagged gap-analysis, open or closed - not just the
 * original named 19-issue audit. Gap-analysis passes are periodic and
 * ongoing, so this grows across future audits without any code change here;
 * it only depends on the label being applied consistently on the repo side.
 * Bare number only (matches LiveTestCount/LiveCommitsAhead) - caller supplies
 * its own label text.
 */
export function LiveGapAnalysisCount({ repo, fallback }: { repo: string; fallback: number }) {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(`repo:${repo} is:issue label:gap-analysis`)}`;
  const { value, isLive } = useLiveCount(
    url,
    (data) => (data as { total_count?: number }).total_count,
    fallback,
  );
  return <span title={isLive ? "Fetched live from GitHub" : "Last known count"}>{value}</span>;
}

/**
 * Test count has no GitHub API of its own - it's a CI-time fact, not repo
 * metadata. OpenCAM's CI code-enforces a checked-in badges/test-count.json
 * against the real pytest count (PR #118), so this fetches that file's raw
 * content from the default branch instead of a GitHub API endpoint.
 * Renders the bare number only (matches LiveCommitsAhead) - callers pair it
 * with their own label text rather than a baked-in suffix.
 */
export function LiveTestCount({ repo, fallback }: { repo: string; fallback: number }) {
  const url = `https://raw.githubusercontent.com/${repo}/main/badges/test-count.json`;
  const { value, isLive } = useLiveCount(
    url,
    (data) => (data as { passed?: number }).passed,
    fallback,
  );
  return (
    <span title={isLive ? "Fetched live from GitHub" : "Last known count"}>{value}+</span>
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
