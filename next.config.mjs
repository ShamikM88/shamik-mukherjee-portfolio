/** @type {import('next').NextConfig} */

// GitHub Pages serves this site from /<repo-name>/, so asset URLs need that prefix
// there — but Vercel (the primary target) serves from the domain root and must NOT
// get a prefix. Only apply it when the GH Pages workflow sets DEPLOY_TARGET=gh-pages.
const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";
const repoName = "shamik-mukherjee-portfolio";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGhPages ? `/${repoName}` : "",
  assetPrefix: isGhPages ? `/${repoName}/` : "",
  trailingSlash: true,
};

export default nextConfig;
