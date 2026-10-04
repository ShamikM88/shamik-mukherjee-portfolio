import type { Metadata } from "next";
import { ChromeAutofillBanner } from "@/components/project-thumbnails";
import { GoldenCase } from "../../golden/template";
import { goldenCase } from "../../golden/cases";

const c = goldenCase("chrome");

export const metadata: Metadata = {
  title: `${c.name} — Shamik Mukherjee`,
  robots: { index: false, follow: false },
};

export default function ChromeCase() {
  return <GoldenCase c={c} hero={<ChromeAutofillBanner />} />;
}
