import type { MetadataRoute } from "next";

// Required under `output: "export"` - Next treats metadata routes as dynamic by default.
export const dynamic = "force-static";

const SITE_URL = "https://shamik.mukherjee.pro";

// Mirrors the per-page robots metadata set during the evidence-to-root migration: the evidence
// site (root and below) is indexable, /archive is kept out of search results.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/archive/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
