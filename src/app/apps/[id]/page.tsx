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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href={`/#${app.category}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        {category.name} apps
      </Link>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <ProductIcon id={app.id} size={112} />
        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{app.name}</h1>
          <p className="mt-1 text-muted">
            {app.kind} · {category.name} · by{" "}
            <a href={site.authorUrl} className="hover:text-foreground hover:underline">
              {site.author}
            </a>
            {downloads > 0 && <> · {formatDownloads(downloads)}</>}
          </p>
          <p className="mt-4 max-w-2xl text-lg text-pretty">{app.tagline}</p>
          <div className="mt-6">
            {release ? (
              <DownloadButtons product={app.id} productName={app.name} version={release.version} align="start" />
            ) : (
              <p className="inline-flex rounded-full border border-border px-3 py-1 text-sm font-medium text-muted">
                Coming soon
              </p>
            )}
          </div>
        </div>
      </div>

      {app.screenshot && (
        <div className="mt-12">
          <AppWindow {...app.screenshot} />
        </div>
      )}

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-14">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">About {app.name}</h2>
            <p className="mt-4 text-pretty text-muted">{app.description}</p>
          </section>

          {app.features && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
              <div className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {app.features.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-link">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-muted">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {app.formats && (
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">File formats</h2>
              <div className="mt-6 grid gap-6 rounded-2xl border border-border bg-subtle p-6 sm:grid-cols-2">
                <FormatList label="Opens" formats={app.formats.opens} />
                <FormatList label="Saves and exports" formats={app.formats.saves} />
                {app.formats.note && <p className="text-xs text-muted sm:col-span-2">{app.formats.note}</p>}
              </div>
            </section>
          )}

          {release && (
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-tight">What&apos;s new</h2>
                <Link href={versionsHref(app.id)} className="text-sm font-medium text-link hover:underline">
                  Version history
                </Link>
              </div>
              <p className="mt-2 text-sm text-muted">
                Version {release.version} · <time dateTime={release.date}>{formatDate(release.date)}</time>
              </p>
              <p className="mt-4">{release.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted marker:text-border">
                {release.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </section>
          )}

          {release && <InstallSteps app={app} />}
        </div>

        <aside className="space-y-6">
          {release && <DownloadsCard release={release} />}
          <InfoCard app={app} release={release} downloads={downloads} />
        </aside>
      </div>
    </div>
  );
}

function DownloadsCard({ release }: { release: Release }) {
  const groups: { os: OS; ids: PlatformId[] }[] = [
    { os: "mac", ids: ["mac-arm64", "mac-x64"] },
    { os: "windows", ids: ["win-x64"] },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-semibold">Downloads</h2>
      <p className="text-sm text-muted">Version {release.version}</p>
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
            <div className="mt-2 flex flex-col gap-2">
              {available.map((id) => {
                const { arch, ext } = PLATFORMS[id];
                const size = release.files[id]!.size;
                return (
                  <a key={id} href={latestLink(release.product, id)} className={buttonClass("secondary", "md")}>
                    <span>
                      {os === "mac" ? arch : `${arch} installer`}{" "}
                      <span className="font-normal text-muted">
                        {ext}
                        {size && ` · ${size}`}
                      </span>
                    </span>
                    <Download className="size-4 text-muted" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="mt-4 text-xs text-muted">
        Not sure which Mac you have? Open Apple menu › About This Mac. “Chip: Apple M…” means Apple Silicon;
        “Processor: Intel” means Intel.
      </p>
      <Link
        href={versionsHref(release.product)}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-link hover:underline"
      >
        Older versions
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function InfoCard({ app, release, downloads }: { app: Product; release?: Release; downloads: number }) {
  const rows: [string, ReactNode][] = [
    ["Developer", <a key="dev" href={site.authorUrl} className="text-link hover:underline">{site.author}</a>],
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
    <div className="rounded-2xl border border-border p-6">
      <h2 className="font-semibold">Information</h2>
      <dl className="mt-4 divide-y divide-border text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 py-2.5">
            <dt className="w-24 shrink-0 text-muted">{label}</dt>
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
      <h2 className="text-2xl font-semibold tracking-tight">Installing {app.name}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        {(Object.keys(install) as OS[]).map((os) => (
          <div key={os}>
            <h3 className="flex items-center gap-2 font-semibold">
              <OSLogo os={os} className="size-4" />
              {os === "mac" ? "macOS" : "Windows"}
            </h3>
            <ol className="mt-4 space-y-3">
              {install[os].steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-link">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex gap-2 rounded-lg border border-border bg-subtle p-3 text-sm text-muted">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
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
          <li key={f} className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
