import type { MetadataRoute } from "next";
import { PRODUCTS, appHref } from "@/lib/products";
import { releasesFor, versionsHref } from "@/lib/releases";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...PRODUCTS.flatMap((p) => (releasesFor(p.id).length > 0 ? [appHref(p.id), versionsHref(p.id)] : [appHref(p.id)])),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
