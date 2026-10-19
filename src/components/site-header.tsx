import { BaseStoreMark } from "./icons";
import { LanguageSwitch } from "./language-switch";
import { LocaleLink as Link } from "./locale-link";
import { ProductIcon } from "./product-icon";
import { PRODUCTS, appHref } from "@/lib/products";
import { getDictionary } from "@/lib/locale";
import { buttonClass } from "./button";

export async function SiteHeader() {
  const { locale, t } = await getDictionary();
  const available = PRODUCTS.filter((p) => p.status === "available");

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-tight">
          <BaseStoreMark className="size-7" />
          <span className="hidden min-[400px]:inline">Base Store</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm text-muted">
          {available.map((p) => (
            <Link
              key={p.id}
              href={appHref(p.id)}
              className="hidden items-center gap-2 rounded-full px-3 py-2 transition-colors hover:bg-black/[0.04] hover:text-foreground md:flex"
            >
              <ProductIcon id={p.id} size={18} />
              {p.name}
            </Link>
          ))}
          <LanguageSwitch locale={locale} label={t.header.language} />
          <Link href="/#apps" className={`${buttonClass("primary", "sm")} ml-1 sm:ml-2`}>
            {t.header.browseApps}
          </Link>
        </nav>
      </div>
    </header>
  );
}
