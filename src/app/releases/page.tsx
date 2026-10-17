import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { buttonClass } from "@/components/button";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { PRODUCTS } from "@/lib/products";
import {
  PLATFORMS,
  fileUrl,
  formatDate,
  releaseId,
  releasesFor,
  type PlatformId,
  type Release,
} from "@/lib/releases";

export const metadata: Metadata = {
  title: "All versions",
  description: "Download any version of the BaseOffice apps and see what changed in each one.",
};

export default function ReleasesPage() {
  const products = PRODUCTS.map((p) => ({ ...p, releases: releasesFor(p.id) })).filter(
    (p) => p.releases.length > 0,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">All versions</h1>
      <p className="mt-3 text-muted">
        Every release of the BaseOffice apps, with what changed and the files to download. For the newest version, go
        to the{" "}
        <Link href="/download" className="text-link hover:underline">
          download page
        </Link>
        .
      </p>

      {products.length === 0 && <p className="mt-12 text-muted">There is no release to download yet.</p>}

      {products.map((p) => (
        <section key={p.id} aria-labelledby={`${p.id}-versions`} className="mt-12">
          <div className="flex items-center gap-3">
            <ProductIcon id={p.id} size={40} />
            <h2 id={`${p.id}-versions`} className="text-2xl font-semibold tracking-tight">
              {p.name}
            </h2>
            <span className="text-sm text-muted">
              {p.releases.length} {p.releases.length === 1 ? "version" : "versions"}
            </span>
          </div>
          <ol className="mt-6 space-y-6">
            {p.releases.map((r, i) => (
              <ReleaseEntry key={r.version} release={r} latest={i === 0} />
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}

function ReleaseEntry({ release, latest }: { release: Release; latest: boolean }) {
  const platforms = (Object.keys(PLATFORMS) as PlatformId[]).filter((id) => release.files[id]);

  return (
    <li id={releaseId(release)} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h3 className="text-xl font-semibold">Version {release.version}</h3>
        {latest && (
          <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-link">Latest</span>
        )}
        <time dateTime={release.date} className="w-full text-sm text-muted sm:ml-auto sm:w-auto">
          {formatDate(release.date)}
        </time>
      </div>
      <p className="mt-4">{release.summary}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted marker:text-border">
        {release.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-6">
        <h4 className="text-sm font-semibold">Downloads</h4>
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
