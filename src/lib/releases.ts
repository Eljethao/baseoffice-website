import { INTL_LOCALE, type Locale, type Text } from "./i18n";
import type { ProductId } from "./products";

export type OS = "mac" | "windows";
export type PlatformId = "mac-arm64" | "mac-x64" | "win-x64";

export const PLATFORMS: Record<PlatformId, { os: OS; name: string; arch: string; ext: string }> = {
  "mac-arm64": { os: "mac", name: "macOS", arch: "Apple Silicon", ext: ".dmg" },
  "mac-x64": { os: "mac", name: "macOS", arch: "Intel", ext: ".dmg" },
  "win-x64": { os: "windows", name: "Windows", arch: "64-bit", ext: ".exe" },
};

/** Minimum OS versions. Electron 43 needs macOS 12; Electron 44+ needs macOS 13. */
export const REQUIREMENTS: Record<OS, Text> = {
  mac: { en: "macOS 12 Monterey or later", lo: "macOS 12 Monterey ຫຼື ໃໝ່ກວ່າ" },
  windows: { en: "Windows 10 or 11, 64-bit", lo: "Windows 10 ຫຼື 11, 64-bit" },
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
  /** English, or { en, lo } — see Text in i18n.ts. Untranslated text is shown in English. */
  summary: Text;
  notes: Text[];
  files: Partial<Record<PlatformId, ReleaseFile>>;
}

/** Newest first. Add a new entry here for every release. */
export const RELEASES: Release[] = [
  {
    product: "docbase",
    version: "1.0.2",
    date: "2026-11-12",
    summary: { en: "Footnotes at the bottom of each page, Word tab stops, and a dark mode where every document stays readable.", lo: "ໝາຍເຫດທ້າຍໜ້າຢູ່ລຸ່ມສຸດຂອງແຕ່ລະໜ້າ, ແທັບແບບ Word ແລະ ໂໝດມືດທີ່ອ່ານເອກະສານໄດ້ທຸກສະບັບ." },
    notes: [
      { en: "Footnotes now appear at the bottom of the page that cites them, on screen and in PDFs, so pages break like in Word and Google Docs.", lo: "ໝາຍເຫດທ້າຍໜ້າສະແດງຢູ່ລຸ່ມສຸດຂອງໜ້າທີ່ອ້າງອີງແລ້ວ, ທັງໃນໜ້າຈໍ ແລະ ໃນ PDF, ການແບ່ງໜ້າຈຶ່ງຄືກັບ Word ແລະ Google Docs." },
      { en: "Tab stops from Word documents are kept: text lines up at left, center, right and decimal tabs, with dot leaders, and underlined blanks such as “Name: ______” show again.", lo: "ຮັກສາຕຳແໜ່ງແທັບຈາກເອກະສານ Word: ຂໍ້ຄວາມລຽງຕາມແທັບຊ້າຍ, ກາງ, ຂວາ ແລະ ຈຸດທົດສະນິຍົມ ພ້ອມເສັ້ນຈຸດ, ແລະ ຊ່ອງວ່າງທີ່ມີເສັ້ນກ້ອງ ເຊັ່ນ “ຊື່: ______” ສະແດງອີກຄັ້ງ." },
      { en: "In dark mode, text and tables with their own colours stay readable: near-black text turns light, and light cell shading, highlights and borders are adjusted to the dark page.", lo: "ໃນໂໝດມືດ, ຂໍ້ຄວາມ ແລະ ຕາຕະລາງທີ່ມີສີຂອງຕົວເອງ ຍັງອ່ານໄດ້: ຂໍ້ຄວາມສີເກືອບດຳຈະເປັນສີອ່ອນ, ແລະ ສີພື້ນເຊວ, ສີໄຮໄລທ໌ ແລະ ເສັ້ນຂອບຈະປັບໃຫ້ເຂົ້າກັບໜ້າມືດ." },
      { en: "PDFs exported in dark mode now have black text instead of light grey.", lo: "PDF ທີ່ສົ່ງອອກໃນໂໝດມືດ ມີຂໍ້ຄວາມສີດຳແລ້ວ ແທນສີເທົາອ່ອນ." },
      { en: "Lines with footnote numbers no longer grow taller, and footnotes use Word's line spacing, so each page holds as much text as in Word.", lo: "ແຖວທີ່ມີເລກໝາຍເຫດ ບໍ່ສູງຂຶ້ນອີກແລ້ວ, ແລະ ໝາຍເຫດທ້າຍໜ້າໃຊ້ໄລຍະຫ່າງແຖວຄືກັບ Word, ແຕ່ລະໜ້າຈຶ່ງບັນຈຸຂໍ້ຄວາມໄດ້ເທົ່າກັບ Word." },
      { en: "Page numbers in a footer text box show in the right place, without a frame.", lo: "ເລກໜ້າທີ່ຢູ່ໃນກ່ອງຂໍ້ຄວາມຂອງສ່ວນທ້າຍໜ້າ ສະແດງຢູ່ບ່ອນທີ່ຖືກຕ້ອງ ໂດຍບໍ່ມີກອບ." },
    ],
    files: {
      "mac-arm64": { file: "DocBase-1.0.2-mac-arm64.dmg", size: "131 MB" },
      "mac-x64": { file: "DocBase-1.0.2-mac-x64.dmg", size: "138 MB" },
      "win-x64": { file: "DocBase-1.0.2-windows-setup.exe", size: "117 MB" },
    },
  },
  {
    product: "sheetbase",
    version: "1.0.1",
    date: "2026-11-09",
    summary: { en: "Undo, copy and paste now work while you're typing in a cell or a text box.", lo: "Undo, ສຳເນົາ ແລະ ວາງ ໃຊ້ໄດ້ແລ້ວ ໃນຂະນະທີ່ພິມຢູ່ໃນເຊວ ຫຼື ຊ່ອງຂໍ້ຄວາມ." },
    notes: [
      { en: "Undo and Redo now work while you're typing in a cell or the formula bar.", lo: "Undo ແລະ Redo ໃຊ້ໄດ້ແລ້ວ ໃນຂະນະທີ່ກຳລັງພິມຢູ່ໃນເຊວ ຫຼື ແຖບສູດ." },
      { en: "Pasting while you're typing in a cell now puts the text into the cell.", lo: "ການວາງ ໃນຂະນະທີ່ກຳລັງພິມຢູ່ໃນເຊວ ຈະວາງຂໍ້ຄວາມລົງໃນເຊວນັ້ນແລ້ວ." },
      { en: "In the Name Box, Find and Replace, and dialog boxes, copy, cut, paste and undo now apply to the text you're editing. They no longer change the cells.", lo: "ໃນ Name Box, Find and Replace ແລະ ກ່ອງໂຕ້ຕອບ, ການສຳເນົາ, ຕັດ, ວາງ ແລະ Undo ຈະເຮັດກັບຂໍ້ຄວາມທີ່ກຳລັງແກ້ໄຂ. ບໍ່ປ່ຽນແປງເຊວອີກແລ້ວ." },
      { en: "The Home tab now starts with Undo and Redo buttons.", lo: "ແຖບ Home ມີປຸ່ມ Undo ແລະ Redo ຢູ່ທາງຕົ້ນແລ້ວ." },
      { en: "Right-clicking in a cell you're editing, the formula bar or a text box now shows Cut, Copy and Paste.", lo: "ຄລິກຂວາໃນເຊວທີ່ກຳລັງແກ້ໄຂ, ແຖບສູດ ຫຼື ຊ່ອງຂໍ້ຄວາມ ຈະສະແດງ Cut, Copy ແລະ Paste ແລ້ວ." },
      { en: "Keyboard shortcuts no longer change the cells behind an open dialog box.", lo: "ປຸ່ມລັດບໍ່ປ່ຽນແປງເຊວທີ່ຢູ່ຫຼັງກ່ອງໂຕ້ຕອບທີ່ເປີດຢູ່ອີກແລ້ວ." },
    ],
    files: {
      "mac-arm64": { file: "SheetBase-1.0.1-mac-arm64.dmg", size: "133 MB" },
      "mac-x64": { file: "SheetBase-1.0.1-mac-x64.dmg", size: "141 MB" },
      "win-x64": { file: "SheetBase-1.0.1-windows-setup.exe", size: "119 MB" },
    },
  },
  {
    product: "slidebase",
    version: "1.0.0",
    date: "2026-10-30",
    summary: { en: "The first release of SlideBase for macOS and Windows.", lo: "ເວີຊັນທຳອິດຂອງ SlideBase ສຳລັບ macOS ແລະ Windows." },
    notes: [
      { en: "Open and save PowerPoint presentations (.pptx, .ppsx, .potx) with shapes, pictures, tables, charts, transitions, animations and speaker notes.", lo: "ເປີດ ແລະ ບັນທຶກງານນຳສະເໜີ PowerPoint (.pptx, .ppsx, .potx) ພ້ອມຮູບຮ່າງ, ຮູບພາບ, ຕາຕະລາງ, ແຜນພູມ, ການປ່ຽນສະໄລ້, ພາບເຄື່ອນໄຫວ ແລະ ບັນທຶກຂອງຜູ້ນຳສະເໜີ." },
      { en: "20 built-in designs, slide layouts, sections and Slide Master view.", lo: "ມີ 20 ແບບດີໄຊນ໌ໃນຕົວ, ໂຄງຮ່າງສະໄລ້, ພາກ ແລະ ມຸມມອງ Slide Master." },
      { en: "45 transitions, and entrance, emphasis, exit and motion-path animations.", lo: "ການປ່ຽນສະໄລ້ 45 ແບບ ແລະ ພາບເຄື່ອນໄຫວແບບເຂົ້າ, ເນັ້ນ, ອອກ ແລະ ເຄື່ອນທີ່ຕາມເສັ້ນທາງ." },
      { en: "Slide Show with Presenter View, pen and laser pointer, and rehearsed timings.", lo: "ສະແດງສະໄລ້ພ້ອມ Presenter View, ປາກກາ ແລະ ຕົວຊີ້ເລເຊີ, ແລະ ການຊ້ອມຈັບເວລາ." },
      { en: "Export to PDF and images, AutoRecover, and Version History on every save.", lo: "ສົ່ງອອກເປັນ PDF ແລະ ຮູບພາບ, ກູ້ຄືນອັດຕະໂນມັດ (AutoRecover) ແລະ ປະຫວັດເວີຊັນທຸກຄັ້ງທີ່ບັນທຶກ." },
      { en: "Built-in Lao fonts (Phetsarath OT and Noto Sans Lao).", lo: "ມີຟອນພາສາລາວໃນຕົວ (Phetsarath OT ແລະ Noto Sans Lao)." },
    ],
    files: {
      "mac-arm64": { file: "SlideBase-1.0.0-mac-arm64.dmg", size: "127 MB" },
      "mac-x64": { file: "SlideBase-1.0.0-mac-x64.dmg", size: "133 MB" },
      "win-x64": { file: "SlideBase-1.0.0-windows-setup.exe", size: "114 MB" },
    },
  },
  {
    product: "docbase",
    version: "1.0.1",
    date: "2026-10-30",
    summary: { en: "Word documents with tables now open with the right layout.", lo: "ເອກະສານ Word ທີ່ມີຕາຕະລາງ ເປີດໄດ້ຖືກຮູບແບບແລ້ວ." },
    notes: [
      { en: "Table rows break across pages like in Word, so documents no longer open with hundreds of pages when a row is taller than a page.", lo: "ແຖວຕາຕະລາງແບ່ງຂ້າມໜ້າໄດ້ຄືກັບ Word, ເອກະສານຈຶ່ງບໍ່ເປີດອອກມາເປັນຫຼາຍຮ້ອຍໜ້າ ເມື່ອມີແຖວທີ່ສູງກວ່າໜຶ່ງໜ້າ." },
      { en: "Tables keep their column widths when the first row has merged cells.", lo: "ຕາຕະລາງຮັກສາຄວາມກວ້າງຂອງຖັນໄວ້ ເມື່ອແຖວທຳອິດມີເຊວທີ່ລວມກັນ." },
      { en: "A table row set to start on a new page now does, and cell margins from Word are kept.", lo: "ແຖວຕາຕະລາງທີ່ຕັ້ງໃຫ້ຂຶ້ນໜ້າໃໝ່ ຈະເລີ່ມຢູ່ໜ້າໃໝ່ແທ້, ແລະ ໄລຍະຫ່າງພາຍໃນເຊວຈາກ Word ຖືກຮັກສາໄວ້." },
      { en: "Tables without set column widths no longer shrink when a row moves to the next page.", lo: "ຕາຕະລາງທີ່ບໍ່ໄດ້ກຳນົດຄວາມກວ້າງຖັນ ບໍ່ຫົດແຄບລົງອີກ ເມື່ອແຖວຍ້າຍໄປໜ້າຕໍ່ໄປ." },
    ],
    files: {
      "mac-arm64": { file: "DocBase-1.0.1-mac-arm64.dmg", size: "131 MB" },
      "mac-x64": { file: "DocBase-1.0.1-mac-x64.dmg", size: "138 MB" },
      "win-x64": { file: "DocBase-1.0.1-windows-setup.exe", size: "117 MB" },
    },
  },
  {
    product: "sheetbase",
    version: "1.0.0",
    date: "2026-10-19",
    summary: { en: "The first release of SheetBase for macOS and Windows.", lo: "ເວີຊັນທຳອິດຂອງ SheetBase ສຳລັບ macOS ແລະ Windows." },
    notes: [
      { en: "Open and save Excel workbooks (.xlsx, .xlsm) with formulas, styles, number formats, merged cells, frozen panes, notes, data validation and conditional formatting.", lo: "ເປີດ ແລະ ບັນທຶກໄຟລ໌ Excel (.xlsx, .xlsm) ພ້ອມສູດ, ຮູບແບບເຊວ, ຮູບແບບຕົວເລກ, ເຊວທີ່ລວມກັນ, ການຕຶງແຖວ, ບັນທຶກ, ການກວດສອບຂໍ້ມູນ ແລະ ການຈັດຮູບແບບຕາມເງື່ອນໄຂ." },
      { en: "418 built-in functions, including XLOOKUP, LET and dynamic arrays that spill (SEQUENCE, UNIQUE, SORT, FILTER).", lo: "ມີ 418 ຟັງຊັນໃນຕົວ, ລວມທັງ XLOOKUP, LET ແລະ dynamic arrays ທີ່ກະຈາຍຜົນອອກເອງ (SEQUENCE, UNIQUE, SORT, FILTER)." },
      { en: "Column, bar, line, area, pie, doughnut and scatter charts.", lo: "ແຜນພູມຖັນ, ແທ່ງ, ເສັ້ນ, ພື້ນທີ່, ວົງມົນ, ໂດນັດ ແລະ ກະແຈກກະຈາຍ." },
      { en: "Sort, AutoFilter, Text to Columns, Remove Duplicates, Flash Fill, Goal Seek and PivotTables.", lo: "ຈັດລຽງ, AutoFilter, Text to Columns, ລຶບຂໍ້ມູນຊ້ຳ, Flash Fill, Goal Seek ແລະ PivotTable." },
      { en: "Format as Table, cell styles, and conditional formatting with data bars, colour scales and icon sets.", lo: "Format as Table, ຮູບແບບເຊວ ແລະ ການຈັດຮູບແບບຕາມເງື່ອນໄຂດ້ວຍແຖບຂໍ້ມູນ, ລະດັບສີ ແລະ ຊຸດໄອຄອນ." },
      { en: "Templates for a monthly budget, invoice, to-do list, loan calculator and sales report.", lo: "ແມ່ແບບສຳລັບງົບປະມານລາຍເດືອນ, ໃບແຈ້ງໜີ້, ລາຍການສິ່ງທີ່ຕ້ອງເຮັດ, ຄິດໄລ່ເງິນກູ້ ແລະ ລາຍງານຍອດຂາຍ." },
      { en: "Print and export to PDF, AutoRecover, and Version History on every save.", lo: "ພິມ ແລະ ສົ່ງອອກເປັນ PDF, ກູ້ຄືນອັດຕະໂນມັດ (AutoRecover) ແລະ ປະຫວັດເວີຊັນທຸກຄັ້ງທີ່ບັນທຶກ." },
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
    summary: { en: "The first release of DocBase for macOS and Windows.", lo: "ເວີຊັນທຳອິດຂອງ DocBase ສຳລັບ macOS ແລະ Windows." },
    notes: [
      { en: "Open and save Word documents (.docx), including password-protected files, tracked changes, comments, equations and charts.", lo: "ເປີດ ແລະ ບັນທຶກເອກະສານ Word (.docx), ລວມທັງໄຟລ໌ທີ່ມີລະຫັດຜ່ານ, ການຕິດຕາມການແກ້ໄຂ, ຄຳເຫັນ, ສົມຜົນ ແລະ ແຜນພູມ." },
      { en: "Print Layout with real page breaks, sections, headers and footers, columns, watermarks and page borders.", lo: "ມຸມມອງ Print Layout ພ້ອມການຂຶ້ນໜ້າໃໝ່ແທ້, ພາກ, ຫົວ ແລະ ທ້າຍເອກະສານ, ຖັນ, ລາຍນ້ຳ ແລະ ຂອບໜ້າ." },
      { en: "Tables of contents, footnotes and endnotes, captions, citations, bibliography and index.", lo: "ສາລະບານ, ໝາຍເຫດທ້າຍໜ້າ ແລະ ທ້າຍເອກະສານ, ຄຳບັນຍາຍ, ການອ້າງອີງ, ບັນນານຸກົມ ແລະ ດັດຊະນີ." },
      { en: "Track Changes, comments, Compare, spelling and grammar checks, and Version History on every save.", lo: "Track Changes, ຄຳເຫັນ, ການປຽບທຽບ, ກວດການສະກົດຄຳ ແລະ ໄວຍາກອນ, ແລະ ປະຫວັດເວີຊັນທຸກຄັ້ງທີ່ບັນທຶກ." },
      { en: "Mail merge for letters, labels and envelopes.", lo: "ລວມຈົດໝາຍ (Mail merge) ສຳລັບຈົດໝາຍ, ປ້າຍ ແລະ ຊອງຈົດໝາຍ." },
      { en: "Built-in Lao fonts (Phetsarath OT and Noto Sans Lao).", lo: "ມີຟອນພາສາລາວໃນຕົວ (Phetsarath OT ແລະ Noto Sans Lao)." },
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

export function formatDate(iso: string, locale: Locale = "en"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(INTL_LOCALE[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
