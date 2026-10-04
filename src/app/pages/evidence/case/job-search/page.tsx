import type { Metadata } from "next";
import { GoldenCase } from "../../golden/template";
import { goldenCase } from "../../golden/cases";

const c = goldenCase("job-search");

export const metadata: Metadata = {
  title: `${c.short} (review variant) — Shamik Mukherjee`,
  robots: { index: false, follow: false },
};

export default function JobSearchCase() {
  return <GoldenCase c={c} />;
}
