import type { NextConfig } from "next";

// GitHub Pages serves this project from https://<owner>.github.io/SupplySense-Al/,
// so production builds destined for Pages need a matching basePath/assetPrefix.
// Local dev (`npm run dev`) and previews are unaffected since GITHUB_PAGES is unset.
const REPO_NAME = "SupplySense-Al";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${REPO_NAME}` : "",
  assetPrefix: isGithubPages ? `/${REPO_NAME}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
