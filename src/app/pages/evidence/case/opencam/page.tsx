import type { Metadata } from "next";
import { GoldenCase } from "../../golden/template";
import { goldenCase } from "../../golden/cases";

const c = goldenCase("opencam");

export const metadata: Metadata = {
  title: `${c.name} — Shamik Mukherjee`,
  description: c.proposition,
  robots: { index: false, follow: false },
};

export default function OpencamCase() {
  return <GoldenCase c={c} />;
}
