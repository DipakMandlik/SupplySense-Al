import type { NextConfig } from "next";

// GitHub Pages serves this project from https://<owner>.github.io/SupplySense-Al/,
// so production builds destined for Pages need a matching basePath/assetPrefix.
// Local dev (`npm run dev`) and previews are unaffected since GITHUB_PAGES is unset.
const REPO_NAME = "SupplySense-Al";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const basePath = isGithubPages ? `/${REPO_NAME}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? `/${REPO_NAME}/` : "",
  images: {
    unoptimized: true,
  },
  // next/image does not auto-prefix `src` with basePath when unoptimized
  // (required for static export), so components that reference /public
  // assets directly read this to build the correct path themselves.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
