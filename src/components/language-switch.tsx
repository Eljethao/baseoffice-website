"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, LOCALE_NAMES, LOCALE_SHORT, localePath, stripLocale, type Locale } from "@/lib/i18n";

/**
 * EN | ລາວ toggle in the header. Links to the same page in the other language and remembers the choice in a
 * cookie, which src/proxy.ts reads so plain URLs keep showing the chosen language.
 */
export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  // The server sees the internal path (/en/apps/docbase), the browser the public one (/apps/docbase);
  // stripping the prefix gives both the same value, so the links hydrate without a mismatch.
  const path = stripLocale(usePathname());

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-white/70 p-0.5 text-xs font-medium"
    >
      <Languages className="mx-1.5 size-3.5 text-faint" aria-hidden="true" />
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            title={LOCALE_NAMES[l]}
            aria-current={active ? "true" : undefined}
            scroll={false}
            onClick={(e) => {
              document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
              if (active) e.preventDefault();
            }}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              active ? "bg-ink text-white" : "text-muted hover:bg-black/[0.04] hover:text-foreground"
            }`}
          >
            {LOCALE_SHORT[l]}
          </Link>
        );
      })}
    </div>
  );
}
