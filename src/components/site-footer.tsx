import { LocaleLink as Link } from "./locale-link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { BaseStoreMark } from "./icons";
import { ProductIcon } from "./product-icon";
import { PRODUCTS, appHref } from "@/lib/products";
import { site } from "@/lib/site";
import { getDictionary } from "@/lib/locale";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export async function SiteFooter() {
  const { t } = await getDictionary();
  return (
    <footer className="border-t border-black/[0.06] bg-subtle">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 py-14 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <BaseStoreMark className="size-7" />
              {site.name}
            </Link>
            <p className="mt-4 text-sm text-muted">
              {t.footer.blurb(site.author)}
            </p>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-faint uppercase">{t.footer.apps}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link href={appHref(p.id)} className="flex items-center gap-2.5 text-muted hover:text-foreground">
                    <ProductIcon id={p.id} size={20} />
                    {p.name}
                    {p.status === "coming-soon" && (
                      <span className="rounded-full border border-black/[0.08] px-1.5 text-[11px] text-faint">{t.footer.soon}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xs font-semibold tracking-wider text-faint uppercase">Base Store</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/#apps" className="text-muted hover:text-foreground">
                  {t.footer.allApps}
                </Link>
              </li>
              <li>
                <a href={site.authorUrl} className="inline-flex items-center gap-1 text-muted hover:text-foreground">
                  {t.footer.developer}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-black/[0.06] py-6 text-xs text-faint sm:flex-row sm:justify-between">
          <p>
            © <CopyrightYear />{" "}
            <a href={site.authorUrl} className="hover:text-foreground">
              {site.author}
            </a>
          </p>
          <p>{t.footer.madeFor}</p>
        </div>
      </div>
    </footer>
  );
}
