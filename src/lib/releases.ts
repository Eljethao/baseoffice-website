import type { ProductId } from "./products";

export type OS = "mac" | "windows";
export type PlatformId = "mac-arm64" | "mac-x64" | "win-x64";

export const PLATFORMS: Record<PlatformId, { os: OS; name: string; arch: string; ext: string }> = {
  "mac-arm64": { os: "mac", name: "macOS", arch: "Apple Silicon", ext: ".dmg" },
  "mac-x64": { os: "mac", name: "macOS", arch: "Intel", ext: ".dmg" },
  "win-x64": { os: "windows", name: "Windows", arch: "64-bit", ext: ".exe" },
};

/** Minimum OS versions. Electron 43 needs macOS 12; Electron 44+ needs macOS 13. */
export const REQUIREMENTS: Record<OS, string> = {
  mac: "macOS 12 Monterey or later",
  windows: "Windows 10 or 11, 64-bit",
};

export interface ReleaseFile {
  /** File name as produced by electron-builder, e.g. "DocBase-1.0.0-mac-arm64.dmg". */
  file: string;
  /** Optional display size, e.g. "112 MB". */
  size?: string;
}

export interface Release {
  product: ProductId;
  version: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  notes: string[];
  files: Partial<Record<PlatformId, ReleaseFile>>;
}

/** Newest first. Add a new entry here for every release. */
export const RELEASES: Release[] = [
  {
    product: "sheetbase",
    version: "1.0.0",
    date: "2026-10-19",
    summary: "The first release of SheetBase for macOS and Windows.",
    notes: [
      "Open and save Excel workbooks (.xlsx, .xlsm) with formulas, styles, number formats, merged cells, frozen panes, notes, data validation and conditional formatting.",
      "418 built-in functions, including XLOOKUP, LET and dynamic arrays that spill (SEQUENCE, UNIQUE, SORT, FILTER).",
      "Column, bar, line, area, pie, doughnut and scatter charts.",
      "Sort, AutoFilter, Text to Columns, Remove Duplicates, Flash Fill, Goal Seek and PivotTables.",
      "Format as Table, cell styles, and conditional formatting with data bars, colour scales and icon sets.",
      "Templates for a monthly budget, invoice, to-do list, loan calculator and sales report.",
      "Print and export to PDF, AutoRecover, and Version History on every save.",
    ],
    files: {
      "mac-arm64": { file: "SheetBase-1.0.0-mac-arm64.dmg", size: "131 MB" },
      "mac-x64": { file: "SheetBase-1.0.0-mac-x64.dmg", size: "138 MB" },
      "win-x64": { file: "SheetBase-1.0.0-windows-setup.exe", size: "110 MB" },
    },
  },
  {
    product: "docbase",
    version: "1.0.0",
    date: "2026-10-17",
    summary: "The first release of DocBase for macOS and Windows.",
    notes: [
      "Open and save Word documents (.docx), including password-protected files, tracked changes, comments, equations and charts.",
      "Print Layout with real page breaks, sections, headers and footers, columns, watermarks and page borders.",
      "Tables of contents, footnotes and endnotes, captions, citations, bibliography and index.",
      "Track Changes, comments, Compare, spelling and grammar checks, and Version History on every save.",
      "Mail merge for letters, labels and envelopes.",
      "Built-in Lao fonts (Phetsarath OT and Noto Sans Lao).",
    ],
    files: {
      "mac-arm64": { file: "DocBase-1.0.0-mac-arm64.dmg", size: "129 MB" },
      "mac-x64": { file: "DocBase-1.0.0-mac-x64.dmg", size: "136 MB" },
      "win-x64": { file: "DocBase-1.0.0-windows-setup.exe", size: "108 MB" },
    },
  },
];

/**
 * Where release files are hosted. Placeholders: {product}, {version}, {file}.
 * GitHub Releases example:
 *   https://github.com/<owner>/<repo>/releases/download/{product}-v{version}/{file}
 * The default serves files placed in public/files/.
 */
const DOWNLOAD_URL_TEMPLATE = process.env.DOWNLOAD_URL_TEMPLATE ?? "/files/{file}";

export function latestRelease(product: string): Release | undefined {
  return RELEASES.find((r) => r.product === product);
}

/** Every release of a product, newest first. */
export function releasesFor(product: string): Release[] {
  return RELEASES.filter((r) => r.product === product);
}

/** Anchor for a release on its app's versions page, e.g. "v1.0.0". */
export function releaseId(release: Release): string {
  return `v${release.version}`;
}

/** An app's versions page, optionally scrolled to one release, e.g. /apps/docbase/versions#v1.0.0. */
export function versionsHref(product: ProductId, release?: Release): string {
  return `/apps/${product}/versions${release ? `#${releaseId(release)}` : ""}`;
}

export function fileUrl(release: Release, platform: PlatformId): string | undefined {
  const entry = release.files[platform];
  if (!entry) return undefined;
  return DOWNLOAD_URL_TEMPLATE.replaceAll("{product}", release.product)
    .replaceAll("{version}", release.version)
    .replaceAll("{file}", encodeURIComponent(entry.file));
}

/** Stable link that always redirects to the newest file, e.g. /download/docbase/mac-arm64. */
export function latestLink(product: ProductId, platform: PlatformId): string {
  return `/download/${product}/${platform}`;
}

export function isPlatformId(value: string): value is PlatformId {
  return value in PLATFORMS;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
