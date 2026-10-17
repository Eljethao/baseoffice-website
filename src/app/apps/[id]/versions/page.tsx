import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";
import { buttonClass } from "@/components/button";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { formatDownloads, releaseDownloads } from "@/lib/downloads";
import { PRODUCTS, appHref, getProduct } from "@/lib/products";
import {
  PLATFORMS,
  fileUrl,
  formatDate,
  releaseId,
  releasesFor,
  type PlatformId,
  type Release,
} from "@/lib/releases";

// Every app is prerendered from generateStaticParams, so only unknown IDs block (and get a real 404).
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/apps/[id]/versions">): Promise<Metadata> {
  const app = getProduct((await params).id);
  if (!app) return {};
  return {
    title: `${app.name} versions`,
    description: `Download any version of ${app.name} and see what changed in each one.`,
  };
}

export default async function VersionsPage({ params }: PageProps<"/apps/[id]/versions">) {
  const app = getProduct((await params).id);
  if (!app) notFound();
  const releases = releasesFor(app.id);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href={appHref(app.id)} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        {app.name}
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <ProductIcon id={app.id} size={56} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{app.name} versions</h1>
          <p className="mt-1 text-muted">
            {releases.length === 0
              ? "No versions released yet."
              : `${releases.length} ${releases.length === 1 ? "version" : "versions"}, newest first. Download any of them.`}
          </p>
        </div>
      </div>

      <ol className="mt-10 space-y-6">
        {releases.map((r, i) => (
          <ReleaseEntry key={r.version} release={r} latest={i === 0} />
        ))}
      </ol>
    </div>
  );
}

async function ReleaseEntry({ release, latest }: { release: Release; latest: boolean }) {
  const downloads = await releaseDownloads(release);
  const platforms = (Object.keys(PLATFORMS) as PlatformId[]).filter((id) => release.files[id]);

  return (
    <li id={releaseId(release)} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-xl font-semibold">Version {release.version}</h2>
        {latest && (
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-link">Latest</span>
        )}
        <time dateTime={release.date} className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {formatDate(release.date)}
          {downloads > 0 && ` · ${formatDownloads(downloads)}`}
        </time>
      </div>
      <p className="mt-4">{release.summary}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted marker:text-border">
        {release.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-sm font-semibold">Downloads</h3>
        {platforms.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No files are available for this version.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-2">
            {platforms.map((id) => {
              const { os, name, arch, ext } = PLATFORMS[id];
              const file = release.files[id]!;
              return (
                <li key={id}>
                  <a href={fileUrl(release, id)} title={file.file} className={buttonClass("secondary", "md")}>
                    <OSLogo os={os} className="size-4" />
                    {name} {arch}
                    <span className="font-normal text-muted">
                      {ext}
                      {file.size && ` · ${file.size}`}
                    </span>
                    <Download className="size-4 text-muted" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
}
