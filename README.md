# Shamik Mukherjee — Portfolio

A visual-first portfolio site: Next.js (App Router, static export) + Tailwind CSS + lucide-react.

## Content sourcing

Every fact, badge, and metric on this site is sourced from two documents in the private
`ai-job-search` repo and never copied verbatim into this one:

- `01-candidate-profile.md`
- `documents/cv/OpenCAM_Framework_PM_Case_Study.md`

Section B (Job Search Automation) also draws specific figures — the 7-rejection/2-lead
`/gmail-sync` run, the repost-hardening before/after, the caching mechanism — from a third,
closely related document: `documents/cv/AI_Job_Search_Fork_Feature_Spotlight.md`. That file
wasn't in the original two-file grounding list but covers exactly the project Section B
describes, so its figures were used with that noted.

All copy lives in one place — [`src/data/content.ts`](./src/data/content.ts) — so a fact that
changes upstream only needs updating there, not hunted through components. The full-text
case studies embedded in the "Copy Markdown" buttons live in
[`src/lib/case-study-markdown.ts`](./src/lib/case-study-markdown.ts).

The actual card-network client behind the Professional Experience entries is intentionally
masked as "a leading US card network" in the source profile — that masking is carried through
here unchanged. Don't un-mask it when updating content.

## Local development

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Building

```bash
bun run build
```

Static output goes to `./out` (Next.js static export — `output: "export"` in
`next.config.mjs`).

## Deployment

### Vercel (primary — zero config)

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Vercel auto-detects the Next.js framework preset. No environment variables or build
   settings need to change — deploy as-is.

### GitHub Pages (optional)

A workflow at `.github/workflows/deploy-gh-pages.yml` builds and deploys automatically on
every push to `main`, using GitHub's official Pages Actions (`upload-pages-artifact` +
`deploy-pages` — no `gh-pages` branch needed).

One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

The build sets `DEPLOY_TARGET=gh-pages`, which makes `next.config.mjs` apply the
`/shamik-mukherjee-portfolio` `basePath` GitHub Pages needs (a project page, not a
`<user>.github.io` root page, is served from a subpath). If you rename the repo, update
`repoName` in `next.config.mjs` to match.

## Before you deploy

- **`public/og-image.png`** was generated from `public/og-image.svg` via a headless-Edge
  screenshot at 1200×630 — regenerate it the same way (or in any design tool) if you change
  the SVG, since social platforms don't reliably render SVG for link previews.
- **`src/app/layout.tsx`**'s `SITE_URL` constant is currently a placeholder Vercel URL —
  update it to your real deployed domain once you have one, since it feeds the canonical
  Open Graph URL.
- No "Download CV" button is wired up. Every CV in the source repo is tailored to a specific
  employer (and one variant carries DOB/marital status, per German Lebenslauf convention) —
  none were generic enough to publish here without editing. Add one deliberately if you want
  that CTA, rather than reusing a tailored file as-is.
