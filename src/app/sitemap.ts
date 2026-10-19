import type { MetadataRoute } from "next";
import { LOCALES, localePath } from "@/lib/i18n";
import { PRODUCTS, appHref } from "@/lib/products";
import { releasesFor, versionsHref } from "@/lib/releases";
import { site } from "@/lib/site";

/** Every page in every language, each listing its translations. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...PRODUCTS.flatMap((p) => (releasesFor(p.id).length > 0 ? [appHref(p.id), versionsHref(p.id)] : [appHref(p.id)])),
  ];
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  return paths.flatMap((path) => {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, url(localePath(l, path))]));
    return LOCALES.map((l) => ({ url: url(localePath(l, path)), alternates: { languages } }));
  });
}
