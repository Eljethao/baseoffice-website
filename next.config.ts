import type { NextConfig } from "next";
import { RELEASES, fileUrl, latestLink, latestRelease, type PlatformId } from "./src/lib/releases";

/** Stable links like /download/docbase/win-x64 that always point to the newest file of each app. */
function latestFileRedirects() {
  const products = [...new Set(RELEASES.map((r) => r.product))];
  return products.flatMap((product) => {
    const release = latestRelease(product)!;
    return (Object.keys(release.files) as PlatformId[]).map((platform) => ({
      source: latestLink(product, platform),
      destination: fileUrl(release, platform)!,
      permanent: false,
    }));
  });
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  redirects() {
    return [
      ...latestFileRedirects(),
      // Pages from before the site became Base Store, when it only had DocBase.
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
