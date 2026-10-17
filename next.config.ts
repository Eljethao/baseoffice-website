import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Pages from before the site became Base Store, when it only had DocBase.
  redirects() {
    return [
      { source: "/download", destination: "/apps/docbase", permanent: true },
      { source: "/releases", destination: "/apps/docbase/versions", permanent: true },
    ];
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
