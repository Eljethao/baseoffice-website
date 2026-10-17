import type { Metadata } from "next";
import Link from "next/link";
import { Download, Info } from "lucide-react";
import { buttonClass } from "@/components/button";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { RecommendedBadge } from "@/components/recommended-badge";
import { PRODUCTS } from "@/lib/products";
import {
  PLATFORMS,
  REQUIREMENTS,
  formatDate,
  latestLink,
  latestRelease,
  releaseId,
  type OS,
  type PlatformId,
  type Release,
} from "@/lib/releases";

export const metadata: Metadata = {
  title: "Download",
  description: "Download DocBase for macOS (Apple Silicon and Intel) and Windows.",
};

const INSTALL: Record<OS, { steps: string[]; warning: string }> = {
  mac: {
    steps: [
      "Open the downloaded .dmg file.",
      "Drag DocBase into the Applications folder.",
      "Open DocBase from Applications or Launchpad.",
    ],
    warning:
      "If macOS says it can't check DocBase for malicious software, open System Settings › Privacy & Security, scroll down and click Open Anyway.",
  },
  windows: {
    steps: [
      "Run the downloaded .exe installer.",
      "Follow the steps in the installer.",
      "Open DocBase from the Start menu.",
    ],
    warning: "If Windows SmartScreen shows “Windows protected your PC”, click More info, then Run anyway.",
  },
};

export default function DownloadPage() {
  const release = latestRelease("docbase");
  const upcoming = PRODUCTS.filter((p) => p.status === "coming-soon");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <ProductIcon id="docbase" size={72} />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Download DocBase</h1>
          {release && (
            <p className="mt-2 text-muted">
              Version {release.version} · Released {formatDate(release.date)} ·{" "}
              <Link href={`/releases#${releaseId(release)}`} className="text-link hover:underline">
                What&apos;s new
              </Link>{" "}
              ·{" "}
              <Link href="/releases" className="text-link hover:underline">
                Older versions
              </Link>
            </p>
          )}
        </div>
      </div>

      {release ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <PlatformCard
            os="mac"
            release={release}
            platforms={["mac-arm64", "mac-x64"]}
            hint="Not sure which Mac you have? Open Apple menu › About This Mac. “Chip: Apple M…” means Apple Silicon; “Processor: Intel” means Intel."
          />
          <PlatformCard os="windows" release={release} platforms={["win-x64"]} />
        </div>
      ) : (
        <p className="mt-10 text-muted">There is no release to download yet.</p>
      )}

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Installing DocBase</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {(Object.keys(INSTALL) as OS[]).map((os) => (
            <div key={os}>
              <h3 className="flex items-center gap-2 font-semibold">
                <OSLogo os={os} className="size-4" />
                {os === "mac" ? "macOS" : "Windows"}
              </h3>
              <ol className="mt-4 space-y-3">
                {INSTALL[os].steps.map((step, i) => (
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
                {INSTALL[os].warning}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Differences between macOS and Windows</h2>
        <p className="mt-2 text-sm text-muted">
          DocBase works the same on both. The one exception: opening and saving .doc, .rtf and .odt files uses a
          converter built into macOS, so those formats are available on Mac only. Word (.docx), PDF, HTML, Markdown
          and plain text work everywhere.
        </p>
      </section>

      {upcoming.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Coming soon</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {upcoming.map((p) => (
              <div key={p.id} className="flex items-center gap-4 rounded-2xl border border-border p-5">
                <ProductIcon id={p.id} size={48} />
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-muted">{p.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PlatformCard({
  os,
  release,
  platforms,
  hint,
}: {
  os: OS;
  release: Release;
  platforms: PlatformId[];
  hint?: string;
}) {
  const available = platforms.filter((p) => release.files[p]);

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <OSLogo os={os} className="size-7" />
        <h2 className="text-xl font-semibold">{os === "mac" ? "macOS" : "Windows"}</h2>
        <span className="ml-auto">
          <RecommendedBadge os={os} />
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">{REQUIREMENTS[os]}</p>
      <div className="mt-6 flex flex-col gap-3">
        {available.length === 0 && <p className="text-sm text-muted">Not available for this version.</p>}
        {available.map((id, i) => {
          const file = release.files[id]!;
          const { arch, ext } = PLATFORMS[id];
          return (
            <a key={id} href={latestLink(release.product, id)} className={buttonClass(i === 0 ? "primary" : "secondary", "lg")}>
              <Download className="size-4" aria-hidden="true" />
              {os === "mac" ? `${arch} (${ext})` : `Installer, ${arch} (${ext})`}
              {file.size && <span className="font-normal opacity-75">· {file.size}</span>}
            </a>
          );
        })}
      </div>
      {hint && <p className="mt-4 text-xs text-muted">{hint}</p>}
    </div>
  );
}
