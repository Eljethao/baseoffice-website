import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Download } from "lucide-react";
import { buttonClass } from "@/components/button";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { formatDownloads, releaseDownloads } from "@/lib/downloads";
import { PRODUCTS, appHref, getProduct, type Product } from "@/lib/products";
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
    <>
      <section className="relative isolate overflow-hidden border-b border-black/[0.06]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(60% 80% at 10% 0%, ${app.accent}1a, transparent 70%)` }}
        />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_20%_0%,black,transparent)]"
        />
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14">
          <Link
            href={appHref(app.id)}
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {app.name}
          </Link>
          <div className="mt-8 flex items-center gap-5">
            <span className="drop-shadow-[0_10px_18px_rgb(15_15_25/0.18)]">
              <ProductIcon id={app.id} size={72} />
            </span>
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">Version history</h1>
              <p className="mt-2 text-muted">
                {releases.length === 0
                  ? `No versions of ${app.name} released yet.`
                  : `Every version of ${app.name}, newest first. Download any of them.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-black/[0.08] sm:before:left-[11px]">
          {releases.map((r, i) => (
            <ReleaseEntry key={r.version} app={app} release={r} latest={i === 0} />
          ))}
        </ol>
      </div>
    </>
  );
}

async function ReleaseEntry({ app, release, latest }: { app: Product; release: Release; latest: boolean }) {
  const downloads = await releaseDownloads(release);
  const platforms = (Object.keys(PLATFORMS) as PlatformId[]).filter((id) => release.files[id]);

  return (
    <li id={releaseId(release)} className="relative pl-8 sm:pl-12">
      <span
        aria-hidden="true"
        className="absolute top-7 left-0 size-[15px] rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgb(15_15_25/0.1)] sm:left-1 sm:size-[15px]"
        style={{ background: latest ? app.accent : "#d4d5db" }}
      />
      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Version {release.version}</h2>
          {latest && (
            <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-white">Latest</span>
          )}
          <p className="w-full text-sm text-faint sm:ml-auto sm:w-auto">
            <time dateTime={release.date}>{formatDate(release.date)}</time>
            {downloads > 0 && ` · ${formatDownloads(downloads)}`}
          </p>
        </div>
        <p className="mt-4 font-medium">{release.summary}</p>
        <ul className="mt-4 space-y-2.5 text-sm text-muted">
          {release.notes.map((note) => (
            <li key={note} className="flex gap-3">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-black/30" />
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-black/[0.06] pt-6">
          <h3 className="text-xs font-semibold tracking-wider text-faint uppercase">Downloads</h3>
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
                      <span className="font-normal text-faint">
                        {ext}
                        {file.size && ` · ${file.size}`}
                      </span>
                      <Download className="size-4 text-faint" aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
