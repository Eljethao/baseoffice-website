import { LocaleLink as Link } from "./locale-link";
import { ArrowRight } from "lucide-react";
import { ProductIcon } from "./product-icon";
import { CATEGORIES, appHref, type Product } from "@/lib/products";
import { appDownloads, formatDownloads } from "@/lib/downloads";
import { latestRelease } from "@/lib/releases";
import { tr } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";

/** A store listing tile that links to the app's page. */
export async function AppCard({ app }: { app: Product }) {
  const release = latestRelease(app.id);
  const downloads = await appDownloads(app.id);
  const available = app.status === "available" && release;
  const { locale, t } = await getDictionary();

  return (
    <Link
      href={appHref(app.id)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 100% at 0% 0%, ${app.accent}14, transparent 70%)` }}
      />
      <div className="relative flex items-start justify-between">
        <span className="drop-shadow-[0_6px_10px_rgb(15_15_25/0.14)]">
          <ProductIcon id={app.id} size={64} />
        </span>
        {!available && (
          <span className="rounded-full border border-black/[0.08] bg-white px-2.5 py-0.5 text-xs font-medium text-muted">
            {t.appCard.comingSoon}
          </span>
        )}
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight">{app.name}</h3>
      <p className="relative text-sm text-muted">
        {tr(app.kind, locale)} · {tr(CATEGORIES[app.category].name, locale)}
      </p>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{tr(app.tagline, locale)}</p>
      <div className="relative mt-6 flex items-center justify-between border-t border-black/[0.06] pt-4 text-sm">
        <span className="text-faint">
          {available
            ? `${t.common.version(release.version)}${downloads > 0 ? ` · ${formatDownloads(downloads, locale, true)}` : ""}`
            : t.appCard.inDevelopment}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-subtle px-3 py-1 font-medium transition-colors group-hover:bg-ink group-hover:text-white">
          {available ? t.appCard.get : t.appCard.details}
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
