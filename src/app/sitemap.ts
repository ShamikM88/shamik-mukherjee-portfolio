import type { MetadataRoute } from "next";

// Required under `output: "export"` - lastModified below reads the build-time clock, which Next
// otherwise treats as a dynamic (per-request) value incompatible with static export.
export const dynamic = "force-static";

const SITE_URL = "https://shamik.mukherjee.pro";

// Evidence-site routes only (the indexable half of the site post-migration). /archive/* is kept
// out deliberately - see robots.ts and each archive page's own noindex metadata.
const ROUTES = ["/", "/about/", "/approach/", "/case/chrome/", "/case/wallet/", "/case/opencam/", "/case/job-search/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
