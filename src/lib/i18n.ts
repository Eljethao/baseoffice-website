/**
 * Languages of the site. English lives at the plain URLs (/apps/docbase); every other language is under its own
 * prefix (/lo/apps/docbase). `src/proxy.ts` rewrites plain URLs to the internal /en route and remembers the
 * visitor's choice in LOCALE_COOKIE.
 *
 * Plain TypeScript with no Next.js imports: next.config.ts, client components and src/proxy.ts all use it.
 */
export const LOCALES = ["en", "lo"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Set by the language switch; read by the proxy so the choice sticks on later visits. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Each language's name in that language, for the language switch. */
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", lo: "ລາວ" };
export const LOCALE_SHORT: Record<Locale, string> = { en: "EN", lo: "ລາວ" };

/** BCP 47 tags for Intl date and number formatting. */
export const INTL_LOCALE: Record<Locale, string> = { en: "en-US", lo: "lo-LA" };

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Text in data files (products, releases): a plain string is English only and is shown as-is in every language;
 * an object gives a translation per language and falls back to English for a missing one.
 */
export type Text = string | ({ en: string } & Partial<Record<Locale, string>>);

export function tr(text: Text, locale: Locale): string {
  if (typeof text === "string") return text;
  const value = text[locale];
  return value === undefined ? text.en : locale === "lo" ? keepLaoWords(value) : value;
}

/**
 * Lao is written without spaces between words, so browsers find line breaks with a built-in word list. That
 * list lacks loanwords, and Chrome splits them mid-word ("ດາວໂຫຼ / ດ"). keepLaoWords puts an invisible
 * WORD JOINER (U+2060) between the letters of each word below, and a ZERO WIDTH SPACE (U+200B) on each side so
 * the browser still segments the neighbouring words correctly (without it "ແອັບສຳລັບ" broke as "ແອັບສຳ / ລັບ").
 * Joiners never go before a vowel sign or tone mark, so the font still stacks the marks on their letters.
 * Add a word here if it breaks badly on the site.
 */
const LAO_UNBREAKABLE = [
  "ດາວໂຫຼດ",
  "ຄອມພິວເຕີ",
  "ອິນເຕີເນັດ",
  "ອອບລາຍ",
  "ເວີຊັນ",
  "ໂປຣແກຣມ",
  "ເບົາເຊີ",
  "ເດັສທັອບ",
  "ແອັບ",
  "ໄຟລ໌",
  "ຟອນ",
  "ໂຟນເດີ",
  "ເມນູ",
  "ຟັງຊັນ",
  "ໄອຄອນ",
  "ສະໄລ້",
  "ເຊວ",
  "ຊິບ",
];
const LAO_MARK = /[\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE]/;
const LAO_JOINED = LAO_UNBREAKABLE.map(
  (word) =>
    [word, `\u200B${[...word].map((ch, i) => (i > 0 && !LAO_MARK.test(ch) ? `\u2060${ch}` : ch)).join("")}\u200B`] as const,
);

export function keepLaoWords(text: string): string {
  let out = text;
  for (const [word, joined] of LAO_JOINED) out = out.replaceAll(word, joined);
  return out;
}

/** Removes what keepLaoWords added, for text that is not laid out on the page: titles, meta descriptions. */
export function withoutJoiners(text: string): string {
  return text.replace(/[\u2060\u200B]/g, "");
}

/** keepLaoWords applied to every string in a dictionary, including the strings its functions return. */
export function keepLaoWordsDeep<T>(value: T): T {
  if (typeof value === "string") return keepLaoWords(value) as T;
  if (typeof value === "function") {
    const fn = value as (...args: unknown[]) => unknown;
    return ((...args: unknown[]) => keepLaoWordsDeep(fn(...args))) as T;
  }
  if (Array.isArray(value)) return value.map(keepLaoWordsDeep) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keepLaoWordsDeep(v)])) as T;
  }
  return value;
}

/**
 * A site path for a language: "/apps/docbase" → "/lo/apps/docbase" for Lao, unchanged for English.
 * Hash-only links ("#apps") and absolute URLs are returned unchanged.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE || !path.startsWith("/") || path.startsWith("//")) return path;
  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? "" : path.slice(cut);
  return `/${locale}${pathname === "/" ? "" : pathname}${rest}`;
}

/** Removes a language prefix: "/lo/apps/docbase" → "/apps/docbase", "/lo" → "/". */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  if (!match || !hasLocale(match[1])) return pathname;
  return pathname.slice(match[0].length) || "/";
}
