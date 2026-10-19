import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, Download, Info } from "lucide-react";
import { AppWindow } from "@/components/app-window";
import { buttonClass } from "@/components/button";
import { DownloadButtons } from "@/components/download-buttons";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { RecommendedBadge } from "@/components/recommended-badge";
import { appDownloads, formatDownloads } from "@/lib/downloads";
import { CATEGORIES, PRODUCTS, getProduct, type Product } from "@/lib/products";
import {
  PLATFORMS,
  REQUIREMENTS,
  formatDate,
  latestLink,
  latestRelease,
  versionsHref,
  type OS,
  type PlatformId,
  type Release,
} from "@/lib/releases";
import { site } from "@/lib/site";

// Every app is prerendered from generateStaticParams, so only unknown IDs block (and get a real 404).
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[id]">): Promise<Metadata> {
  const app = getProduct((await params).id);
  if (!app) return {};
  return { title: `${app.name}: ${app.kind.toLowerCase()} for Mac and Windows`, description: app.tagline };
}

export default async function AppPage({ params }: PageProps<"/apps/[id]">) {
  const app = getProduct((await params).id);
  if (!app) notFound();
  const release = latestRelease(app.id);
  const downloads = await appDownloads(app.id);
  const category = CATEGORIES[app.category];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-black/[0.06]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(70% 60% at 15% 0%, ${app.accent}1f, transparent 70%), radial-gradient(60% 50% at 100% 10%, rgb(79 70 229 / 0.07), transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_30%_0%,black,transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14">
          <Link
            href={`/#${app.category}`}
            className="inline-flex items-center gap-1 rounded-full py-1 pr-3 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {category.name} apps
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
            <span className="w-fit drop-shadow-[0_16px_28px_rgb(15_15_25/0.2)]">
              <ProductIcon id={app.id} size={128} />
            </span>
            <div className="flex-1">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{app.name}</h1>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                <Chip>
                  <span className="size-1.5 rounded-full" style={{ background: app.accent }} />
                  {app.kind}
                </Chip>
                <Chip>{category.name}</Chip>
                <Chip>
                  by{" "}
                  <a href={site.authorUrl} className="font-medium text-foreground hover:underline">
                    {site.author}
                  </a>
                </Chip>
                {downloads > 0 && <Chip>{formatDownloads(downloads)}</Chip>}
              </ul>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{app.tagline}</p>
            </div>
          </div>

          <div className="mt-10">
            {release ? (
              <DownloadButtons product={app.id} productName={app.name} release={release} align="start" />
            ) : (
              <p className="inline-flex rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-muted shadow-soft">
                Coming soon
              </p>
            )}
          </div>

          {app.screenshot && (
            <div className="mt-14">
              <AppWindow {...app.screenshot} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-16">
          <section>
            <SectionTitle>About {app.name}</SectionTitle>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{app.description}</p>
          </section>

          {app.features && (
            <section>
              <SectionTitle>Features</SectionTitle>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {app.features.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
                    <div
                      className="flex size-10 items-center justify-center rounded-xl ring-1 ring-black/[0.06]"
                      style={{ background: `${app.accent}12`, color: app.accent }}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-semibold tracking-tight">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {app.formats && (
            <section>
              <SectionTitle>File formats</SectionTitle>
              <div className="mt-6 grid gap-6 rounded-2xl border border-black/[0.06] bg-subtle p-6 sm:grid-cols-2">
                <FormatList label="Opens" formats={app.formats.opens} />
                <FormatList label="Saves and exports" formats={app.formats.saves} />
                {app.formats.note && <p className="text-xs text-muted sm:col-span-2">{app.formats.note}</p>}
              </div>
            </section>
          )}

          {release && (
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <SectionTitle>What&apos;s new</SectionTitle>
                <Link href={versionsHref(app.id)} className="group inline-flex items-center gap-1 text-sm font-medium">
                  Version history
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft">
                <p className="text-sm text-faint">
                  Version {release.version} · <time dateTime={release.date}>{formatDate(release.date)}</time>
                </p>
                <p className="mt-2 font-medium">{release.summary}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  {release.notes.map((note) => (
                    <li key={note} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-black/30" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {release && <InstallSteps app={app} />}
        </div>

        <aside className="space-y-5">
          {release && <DownloadsCard release={release} />}
          <InfoCard app={app} release={release} downloads={downloads} />
        </aside>
      </div>
    </>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/80 px-3 py-1 text-muted backdrop-blur">
      {children}
    </li>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">{children}</h2>;
}

function DownloadsCard({ release }: { release: Release }) {
  const groups: { os: OS; ids: PlatformId[] }[] = [
    { os: "mac", ids: ["mac-arm64", "mac-x64"] },
    { os: "windows", ids: ["win-x64"] },
  ];

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft">
      <h2 className="font-semibold tracking-tight">Downloads</h2>
      <p className="text-sm text-faint">Version {release.version}</p>
      {groups.map(({ os, ids }) => {
        const available = ids.filter((id) => release.files[id]);
        if (available.length === 0) return null;
        return (
          <div key={os} className="mt-5">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <OSLogo os={os} className="size-4" />
              {os === "mac" ? "macOS" : "Windows"}
              <span className="ml-auto">
                <RecommendedBadge os={os} />
              </span>
            </h3>
            <div className="mt-2.5 flex flex-col gap-2">
              {available.map((id) => {
                const { arch, ext } = PLATFORMS[id];
                const size = release.files[id]!.size;
                return (
                  <a key={id} href={latestLink(release.product, id)} className={`${buttonClass("secondary", "md")} justify-between!`}>
                    <span>
                      {os === "mac" ? arch : `${arch} installer`}{" "}
                      <span className="font-normal text-faint">
                        {ext}
                        {size && ` · ${size}`}
                      </span>
                    </span>
                    <Download className="size-4 text-faint" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="mt-5 rounded-xl bg-subtle p-3 text-xs leading-relaxed text-muted">
        Not sure which Mac you have? Open Apple menu › About This Mac. “Chip: Apple M…” means Apple Silicon;
        “Processor: Intel” means Intel.
      </p>
      <Link
        href={versionsHref(release.product)}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        Older versions
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function InfoCard({ app, release, downloads }: { app: Product; release?: Release; downloads: number }) {
  const rows: [string, ReactNode][] = [
    ["Developer", <a key="dev" href={site.authorUrl} className="font-medium text-link hover:underline">{site.author}</a>],
    ["Category", CATEGORIES[app.category].name],
  ];
  if (release) {
    rows.push(
      ["Version", release.version],
      ["Released", formatDate(release.date)],
      ...(downloads > 0 ? [["Downloads", downloads.toLocaleString("en-US")] as [string, ReactNode]] : []),
      ["Requires", <>{REQUIREMENTS.mac}<br />{REQUIREMENTS.windows}</>],
    );
  }
  if (app.languages) rows.push(["Languages", app.languages.join(", ")]);
  if (release) rows.push(["Account", "Not needed"]);

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft">
      <h2 className="font-semibold tracking-tight">Information</h2>
      <dl className="mt-3 divide-y divide-black/[0.06] text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 py-3">
            <dt className="w-24 shrink-0 text-faint">{label}</dt>
            <dd className="min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function InstallSteps({ app }: { app: Product }) {
  const install: Record<OS, { steps: string[]; warning: string }> = {
    mac: {
      steps: [
        "Open the downloaded .dmg file.",
        `Drag ${app.name} into the Applications folder.`,
        `Open ${app.name} from Applications or Launchpad.`,
      ],
      warning: `If macOS says it can't check ${app.name} for malicious software, open System Settings › Privacy & Security, scroll down and click Open Anyway.`,
    },
    windows: {
      steps: [
        "Run the downloaded .exe installer.",
        "Follow the steps in the installer.",
        `Open ${app.name} from the Start menu.`,
      ],
      warning: "If Windows SmartScreen shows “Windows protected your PC”, click More info, then Run anyway.",
    },
  };

  return (
    <section>
      <SectionTitle>Installing {app.name}</SectionTitle>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(Object.keys(install) as OS[]).map((os) => (
          <div key={os} className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft">
            <h3 className="flex items-center gap-2 font-semibold tracking-tight">
              <OSLogo os={os} className="size-4" />
              {os === "mac" ? "macOS" : "Windows"}
            </h3>
            <ol className="mt-5 flex-1 space-y-3.5">
              {install[os].steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex gap-2 rounded-xl bg-subtle p-3 text-xs leading-relaxed text-muted">
              <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              {install[os].warning}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormatList({ label, formats }: { label: string; formats: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{label}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {formats.map((f) => (
          <li
            key={f}
            className="rounded-lg border border-black/[0.07] bg-white px-2.5 py-1 font-mono text-xs shadow-[0_1px_1px_rgb(15_15_25/0.04)]"
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
