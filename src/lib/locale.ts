import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { en } from "./dictionaries/en";
import { lo } from "./dictionaries/lo";
import { hasLocale, type Locale } from "./i18n";
import type { Dictionary } from "./dictionaries/en";

const DICTIONARIES: Record<Locale, Dictionary> = { en, lo };

/** The language of the page being rendered, from the [lang] root segment. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Interface text for the page being rendered. */
export async function getDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: DICTIONARIES[locale] };
}
