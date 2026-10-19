import Link from "next/link";
import { ArrowRight, History, Laptop, UserRoundX, type LucideIcon } from "lucide-react";
import { AppCard } from "@/components/app-card";
import { AppWindow } from "@/components/app-window";
import { buttonClass } from "@/components/button";
import { DownloadButtons } from "@/components/download-buttons";
import { ProductIcon } from "@/components/product-icon";
import { CATEGORIES, PRODUCTS, appHref, getProduct, type CategoryId, type Product } from "@/lib/products";
import { RELEASES, latestRelease, versionsHref, type Release } from "@/lib/releases";

const PROMISES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Laptop,
    title: "Made for your computer",
    text: "Real desktop apps for macOS, on Apple Silicon and Intel, and for Windows.",
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
  const newest = RELEASES[0];
  const newestApp = newest && getProduct(newest.product);
  const showcased = PRODUCTS.flatMap((app) => {
    const release = latestRelease(app.id);
    return app.status === "available" && release ? [{ app, release }] : [];
  });
  const categories = (Object.keys(CATEGORIES) as CategoryId[])
    .map((id) => ({ id, ...CATEGORIES[id], apps: PRODUCTS.filter((p) => p.category === id) }))
    .filter((c) => c.apps.length > 0);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[-280px] left-1/2 -z-10 h-[640px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(79_70_229/0.13),transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center sm:px-6 sm:pt-24 sm:pb-28">
          {newest && newestApp && (
            <Link
              href={appHref(newestApp.id)}
              className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 py-1 pr-3 pl-1 text-sm text-muted shadow-soft backdrop-blur transition-colors hover:text-foreground"
            >
              <ProductIcon id={newestApp.id} size={22} />
              <span>
                <span className="font-medium text-foreground">New:</span> {newestApp.name} {newest.version} is here
              </span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
          <h1 className="mx-auto mt-8 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-7xl">
            Desktop apps,
            <br />
            <span className="text-[#8b8f99]">beautifully simple.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted">
            Base Store is the home of apps made by LJ Thao for Mac and Windows. Download them straight to your
            computer, with no account and no sign-in.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#apps" className={buttonClass("primary", "lg")}>
              Browse apps
            </Link>
            {showcased[0] && (
              <Link href={appHref(showcased[0].app.id)} className={buttonClass("secondary", "lg")}>
                Get {showcased[0].app.name}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          <ul className="mx-auto mt-16 flex w-fit items-end gap-3 rounded-[28px] border border-black/[0.06] bg-white/70 p-3 shadow-lift backdrop-blur-xl sm:gap-4 sm:p-4">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <Link
                  href={appHref(p.id)}
                  className={`group flex flex-col items-center gap-2 rounded-2xl px-2 pt-1 pb-0.5 transition-transform duration-300 hover:-translate-y-1.5 ${p.status === "coming-soon" ? "opacity-55 hover:opacity-100" : ""}`}
                >
                  <span className="drop-shadow-[0_8px_14px_rgb(15_15_25/0.18)]">
                    <ProductIcon id={p.id} size={64} />
                  </span>
                  <span className="text-xs font-medium text-muted group-hover:text-foreground">
                    {p.name}
                    {p.status === "coming-soon" && <span className="text-faint"> · Soon</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {showcased.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-link">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Built for real work</h2>
            <p className="mt-3 text-muted">
              Full-featured apps that open the files you already have and work without an internet connection.
            </p>
          </div>
          <div className="space-y-6">
            {showcased.map(({ app, release }, i) => (
              <Showcase key={app.id} app={app} release={release} flip={i % 2 === 1} />
            ))}
          </div>
        </section>
      )}

      <section id="apps" className="border-t border-black/[0.06] bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-link">The store</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">All apps</h2>
          </div>
          {categories.map((c) => (
            <div key={c.id} id={c.id} className="mt-12">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-black/[0.06] pb-4">
                <h3 className="text-lg font-semibold tracking-tight">{c.name}</h3>
                <p className="text-sm text-muted">{c.summary}</p>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {c.apps.map((app) => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-black/[0.06]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-24 sm:px-6 md:grid-cols-3">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-soft">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-subtle text-foreground ring-1 ring-black/[0.06]">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Showcase({ app, release, flip }: { app: Product; release: Release; flip: boolean }) {
  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-soft lg:grid-cols-2">
      <div className={`flex flex-col justify-center p-8 sm:p-12 ${flip ? "lg:order-2" : ""}`}>
        <p className="flex items-center gap-2 text-sm font-medium text-muted">
          <span className="size-2 rounded-full" style={{ background: app.accent }} />
          {app.kind} · {CATEGORIES[app.category].name}
        </p>
        <div className="mt-6 flex items-center gap-4">
          <span className="drop-shadow-[0_10px_18px_rgb(15_15_25/0.18)]">
            <ProductIcon id={app.id} size={72} />
          </span>
          <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{app.name}</h3>
        </div>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-pretty text-muted">{app.tagline}</p>
        <div className="mt-8">
          <DownloadButtons product={app.id} productName={app.name} release={release} align="start" size="md" />
        </div>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          <Link href={appHref(app.id)} className="group inline-flex items-center gap-1 text-foreground">
            Explore {app.name}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link href={versionsHref(app.id, release)} className="text-muted hover:text-foreground">
            What&apos;s new in {release.version}
          </Link>
        </div>
      </div>
      {app.screenshot && (
        <div
          className="relative min-h-72 overflow-hidden sm:min-h-[26rem]"
          style={{
            background: `radial-gradient(110% 90% at ${flip ? "0%" : "100%"} 0%, ${app.accent}2e, transparent 65%), linear-gradient(180deg, #fbfbfc, #f2f2f5)`,
          }}
        >
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]"
          />
          <div className="absolute top-10 left-10 w-[160%] sm:top-12 sm:left-12 sm:w-[130%] lg:w-[150%]">
            <AppWindow {...app.screenshot} sizes="(min-width: 1024px) 860px, 160vw" />
          </div>
        </div>
      )}
    </div>
  );
}
