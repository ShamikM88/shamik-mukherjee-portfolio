import type { Metadata } from "next";
import { GoldenCase } from "../../golden/template";
import { goldenCase } from "../../golden/cases";

const c = goldenCase("opencam");

export const metadata: Metadata = {
  title: `${c.name} — Shamik Mukherjee`,
  description: c.proposition,
  alternates: { canonical: "/case/opencam/" },
  openGraph: {
    title: c.name,
    description: c.proposition,
    url: "/case/opencam/",
    siteName: "Shamik Mukherjee — Portfolio",
    locale: "en_GB",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: c.name,
    description: c.proposition,
    images: ["/opengraph-image"],
  },
};

export default function OpencamCase() {
  return <GoldenCase c={c} />;
}
