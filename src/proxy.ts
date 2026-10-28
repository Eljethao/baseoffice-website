import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, hasLocale, stripLocale, type Locale } from "@/lib/i18n";

/**
 * Language routing. Every page lives under app/[lang]; English keeps the plain public URLs.
 * - /lo/...  → served as is.
 * - /en/...  → redirected to the plain URL, so English has one address.
 * - /...     → Lao visitors (chosen with the language switch, or a browser that prefers Lao on a first visit)
 *              are redirected to /lo/...; everyone else gets the English page through a rewrite to /en/....
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const prefix = pathname.split("/")[1] ?? "";

  if (hasLocale(prefix)) {
    if (prefix !== DEFAULT_LOCALE) return NextResponse.next();
    return NextResponse.redirect(new URL(`${stripLocale(pathname)}${search}`, request.url));
  }

  if (preferredLocale(request) === "lo") {
    return NextResponse.redirect(new URL(`/lo${pathname === "/" ? "" : pathname}${search}`, request.url));
  }
  return NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname}${search}`, request.url));
}

function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && hasLocale(saved)) return saved;

  // First visit: the highest-ranked language in Accept-Language that the site has.
  const ranked = (request.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { lang: tag.split("-")[0], q: q ? Number(q.trim().slice(2)) || 0 : 1 };
    })
    .filter((entry) => entry.lang && entry.q > 0)
    .sort((a, b) => b.q - a.q);
  return ranked.map((entry) => entry.lang).find(hasLocale) ?? DEFAULT_LOCALE;
}

export const config = {
  // Skip Next internals, the /download/... redirects (next.config.ts) and any file with an extension:
  // images in public/, favicon.ico, icon.png, apple-icon.png, robots.txt, sitemap.xml.
  matcher: ["/((?!_next/|download(?:/|$)|releases$|.*\\..*).*)"],
};
