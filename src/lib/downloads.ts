import { cacheLife } from "next/cache";
import { INTL_LOCALE, keepLaoWords, type Locale } from "./i18n";
import { releasesFor, type Release } from "./releases";

/** "owner/repo" when DOWNLOAD_URL_TEMPLATE points at GitHub Releases. */
function githubRepo(): string | undefined {
  return process.env.DOWNLOAD_URL_TEMPLATE?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/releases\/download\//)?.[1];
}

interface GitHubRelease {
  assets: { name: string; download_count: number }[];
}

/**
 * How many times each release file has been downloaded, by file name, as counted by GitHub Releases.
 * Refreshed about once an hour. Empty when the files aren't on GitHub or GitHub can't be reached.
 */
async function fileDownloads(): Promise<Record<string, number>> {
  "use cache";
  cacheLife("hours");

  const repo = githubRepo();
  if (!repo) return {};
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  // Optional: raises GitHub's API limit from 60 to 5,000 requests an hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const counts: Record<string, number> = {};
  try {
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`, { headers });
      if (!res.ok) return counts;
      const releases = (await res.json()) as GitHubRelease[];
      for (const { assets } of releases) {
        for (const { name, download_count } of assets) counts[name] = (counts[name] ?? 0) + download_count;
      }
      if (releases.length < 100) break;
    }
  } catch {
    // Show the site without counts rather than fail.
  }
  return counts;
}

function total(counts: Record<string, number>, releases: Release[]): number {
  return releases.reduce(
    (sum, r) => sum + Object.values(r.files).reduce((n, f) => n + (counts[f.file] ?? 0), 0),
    0,
  );
}

/** Downloads of every version of an app. */
export async function appDownloads(product: string): Promise<number> {
  return total(await fileDownloads(), releasesFor(product));
}

/** Downloads of one version, all platforms. */
export async function releaseDownloads(release: Release): Promise<number> {
  return total(await fileDownloads(), [release]);
}

/** "1,234 downloads" ("ດາວໂຫຼດ 1.234 ຄັ້ງ" in Lao), or "1.2K downloads" when compact. */
export function formatDownloads(count: number, locale: Locale, compact = false): string {
  const number = new Intl.NumberFormat(
    INTL_LOCALE[locale],
    compact ? { notation: "compact", maximumFractionDigits: 1 } : {},
  ).format(count);
  if (locale === "lo") return keepLaoWords(`ດາວໂຫຼດ ${number} ຄັ້ງ`);
  return `${number} ${count === 1 ? "download" : "downloads"}`;
}
