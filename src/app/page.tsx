import Link from "next/link";
import { ArrowRight, History, Laptop, UserRoundX, type LucideIcon } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { AppWindow } from "@/components/app-window";
import { DownloadButtons } from "@/components/download-buttons";
import { ProductIcon } from "@/components/product-icon";
import { CATEGORIES, PRODUCTS, appHref, getProduct, type CategoryId } from "@/lib/products";
import { latestRelease, versionsHref } from "@/lib/releases";

/** The app shown in the big card at the top of the store. */
const FEATURED = "docbase";

const PROMISES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Laptop,
    title: "Made for your computer",
    text: "Every app is a real desktop app for macOS (Apple Silicon and Intel) and Windows.",
  },
  {
    icon: UserRoundX,
    title: "No account needed",
    text: "Download and start working. No sign-up, no sign-in, and your files stay on your computer.",
  },
  {
    icon: History,
    title: "Every version, kept",
    text: "Need an older version? Each app keeps every release, with notes on what changed.",
  },
];

export default function Home() {
  const featured = getProduct(FEATURED);
  const featuredRelease = featured && latestRelease(featured.id);
  const available = PRODUCTS.filter((p) => p.status === "available").length;
  const upcoming = PRODUCTS.length - available;
  const categories = (Object.keys(CATEGORIES) as CategoryId[])
    .map((id) => ({ id, ...CATEGORIES[id], apps: PRODUCTS.filter((p) => p.category === id) }))
    .filter((c) => c.apps.length > 0);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-gradient-to-b from-primary-soft to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <p className="text-sm font-medium text-link">Base Store</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Apps for your Mac and Windows PC
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">
            Base Store is the home of desktop apps made by LJ Thao. Download any app straight to your computer, with
            no account and no sign-in.
          </p>
          <p className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full border border-border bg-card px-3 py-1">
              {available} {available === 1 ? "app" : "apps"} available
            </span>
            {upcoming > 0 && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-muted">
                {upcoming} coming soon
              </span>
            )}
          </p>
        </div>

        {featured && featuredRelease && (
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <div className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-2">
              <div className="flex flex-col p-6 sm:p-10">
                <p className="text-xs font-semibold tracking-wider text-link uppercase">Featured app</p>
                <div className="mt-5 flex items-center gap-4">
                  <ProductIcon id={featured.id} size={72} />
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight">{featured.name}</h2>
                    <p className="text-sm text-muted">
                      {featured.kind} · {CATEGORIES[featured.category].name}
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-pretty">{featured.tagline}</p>
                <div className="mt-8">
                  <DownloadButtons
                    product={featured.id}
                    productName={featured.name}
                    release={featuredRelease}
                    align="start"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium lg:mt-auto lg:pt-8">
                  <Link href={appHref(featured.id)} className="inline-flex items-center gap-1 text-link hover:underline">
                    See features
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                  <Link href={versionsHref(featured.id, featuredRelease)} className="text-muted hover:text-foreground">
                    What&apos;s new in {featuredRelease.version}
                  </Link>
                </div>
              </div>
              {featured.screenshot && (
                <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-primary-soft to-subtle sm:min-h-96">
                  <div className="absolute top-8 left-8 w-[160%] sm:top-10 sm:left-10 sm:w-[130%] lg:w-[150%]">
                    <AppWindow {...featured.screenshot} sizes="(min-width: 1024px) 860px, 160vw" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <section id="apps" className="border-t border-border bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">All apps</h2>
          {categories.map((c) => (
            <div key={c.id} id={c.id} className="mt-10">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl font-semibold">{c.name}</h3>
                <p className="text-sm text-muted">{c.summary}</p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {c.apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-link">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
