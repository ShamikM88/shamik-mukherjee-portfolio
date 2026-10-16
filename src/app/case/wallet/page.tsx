import type { Metadata } from "next";
import { GoldenCase } from "../../golden/template";
import { goldenCase } from "../../golden/cases";

const c = goldenCase("wallet");

export const metadata: Metadata = {
  title: `${c.name} — Shamik Mukherjee`,
  description: c.proposition,
};

export default function WalletCase() {
  return <GoldenCase c={c} />;
}
