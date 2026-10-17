import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/download", "/releases"].map((path) => ({ url: `${site.url}${path}` }));
}
