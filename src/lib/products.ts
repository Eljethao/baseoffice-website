import {
  BookOpen,
  ChartColumn,
  Columns3,
  FileText,
  Languages,
  Mail,
  MessageSquareText,
  MonitorPlay,
  Palette,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { Text } from "./i18n";

export type ProductId = "docbase" | "sheetbase" | "slidebase";
export type CategoryId = "office";

/** Store categories, in the order they appear on the home page. */
export const CATEGORIES: Record<CategoryId, { name: Text; summary: Text }> = {
  office: {
    name: { en: "Office", lo: "ຫ້ອງການ" },
    summary: { en: "Write documents, crunch numbers and build presentations.", lo: "ພິມເອກະສານ, ຄິດໄລ່ຕົວເລກ ແລະ ສ້າງການນຳສະເໜີ." },
  },
};

export interface Feature {
  icon: LucideIcon;
  title: Text;
  text: Text;
}

export interface Product {
  id: ProductId;
  name: string;
  category: CategoryId;
  /** What the app is, shown under its name, e.g. "Word processor". */
  kind: Text;
  /** One sentence for app cards. */
  tagline: Text;
  /** The "About" paragraph on the app page. */
  description: Text;
  status: "available" | "coming-soon";
  /** The app's colour, used to tint its showcase panel and page header. */
  accent: string;
  screenshot?: { src: string; alt: Text; title: string; width: number; height: number };
  features?: Feature[];
  formats?: { opens: string[]; saves: string[]; note?: Text };
  languages?: Text[];
}

export const PRODUCTS: Product[] = [
  {
    id: "docbase",
    name: "DocBase",
    category: "office",
    kind: { en: "Word processor", lo: "ໂປຣແກຣມພິມເອກະສານ" },
    accent: "#2563eb",
    tagline: {
      en: "A full word processor for letters, reports and books. Opens and saves Word documents.",
      lo: "ໂປຣແກຣມພິມເອກະສານຄົບຊຸດ ສຳລັບຈົດໝາຍ, ລາຍງານ ແລະ ປຶ້ມ. ເປີດ ແລະ ບັນທຶກໄຟລ໌ Word ໄດ້.",
    },
    description: {
      en: "DocBase is a desktop word processor that opens and saves Word files and works without an internet connection. It has the tools of a full word processor in a familiar ribbon with File, Home, Insert, Design, Layout, References, Review, View and Mailings tabs.",
      lo: "DocBase ເປັນໂປຣແກຣມພິມເອກະສານສຳລັບຄອມພິວເຕີ ທີ່ເປີດ ແລະ ບັນທຶກໄຟລ໌ Word ໄດ້ ແລະ ໃຊ້ງານໄດ້ໂດຍບໍ່ຕ້ອງເຊື່ອມຕໍ່ອິນເຕີເນັດ. ມີເຄື່ອງມືຄົບຄືກັບໂປຣແກຣມພິມເອກະສານເຕັມຮູບແບບ ໃນແຖບ Ribbon ທີ່ຄຸ້ນເຄີຍ ມີແຖບ File, Home, Insert, Design, Layout, References, Review, View ແລະ Mailings.",
    },
    status: "available",
    screenshot: {
      src: "/screenshots/docbase.png",
      alt: {
        en: "DocBase editing a report, with the Home ribbon, styles gallery and a page with headings, lists and a table",
        lo: "DocBase ກຳລັງແກ້ໄຂລາຍງານ ມີແຖບ Home, ຊຸດຮູບແບບຂໍ້ຄວາມ ແລະ ໜ້າເອກະສານທີ່ມີຫົວຂໍ້, ລາຍການ ແລະ ຕາຕະລາງ",
      },
      title: "Report.docx — DocBase",
      width: 2640,
      height: 1704,
    },
    features: [
      {
        icon: FileText,
        title: { en: "Works with Word files", lo: "ໃຊ້ກັບໄຟລ໌ Word ໄດ້" },
        text: {
          en: "Open and save .docx with styles, headers, tables, images, comments and tracked changes intact. Password-protected files open too.",
          lo: "ເປີດ ແລະ ບັນທຶກ .docx ໂດຍຮັກສາຮູບແບບ, ຫົວເອກະສານ, ຕາຕະລາງ, ຮູບພາບ, ຄຳເຫັນ ແລະ ການຕິດຕາມການແກ້ໄຂໄວ້ຄົບ. ເປີດໄຟລ໌ທີ່ມີລະຫັດຜ່ານໄດ້ນຳ.",
        },
      },
      {
        icon: Columns3,
        title: { en: "Real page layout", lo: "ຈັດໜ້າແບບແທ້" },
        text: {
          en: "Margins, columns, sections with their own page setup, page borders, watermarks and true page breaks.",
          lo: "ຂອບໜ້າ, ຖັນ, ພາກທີ່ຕັ້ງຄ່າໜ້າແຍກກັນ, ຂອບໜ້າເອກະສານ, ລາຍນ້ຳ ແລະ ການຂຶ້ນໜ້າໃໝ່ແທ້.",
        },
      },
      {
        icon: BookOpen,
        title: { en: "References", lo: "ການອ້າງອີງ" },
        text: {
          en: "Tables of contents, footnotes and endnotes, captions, citations, a bibliography and an index with page numbers.",
          lo: "ສາລະບານ, ໝາຍເຫດທ້າຍໜ້າ ແລະ ທ້າຍເອກະສານ, ຄຳບັນຍາຍ, ການອ້າງອີງ, ບັນນານຸກົມ ແລະ ດັດຊະນີພ້ອມເລກໜ້າ.",
        },
      },
      {
        icon: MessageSquareText,
        title: { en: "Review and track changes", lo: "ກວດທານ ແລະ ຕິດຕາມການແກ້ໄຂ" },
        text: {
          en: "Comments, Track Changes, Compare, spelling and grammar checks, and a version history kept on every save.",
          lo: "ຄຳເຫັນ, Track Changes, ການປຽບທຽບ, ກວດການສະກົດຄຳ ແລະ ໄວຍາກອນ, ແລະ ປະຫວັດເວີຊັນທີ່ເກັບໄວ້ທຸກຄັ້ງທີ່ບັນທຶກ.",
        },
      },
      {
        icon: Mail,
        title: { en: "Mail merge", lo: "ລວມຈົດໝາຍ (Mail merge)" },
        text: {
          en: "Merge a list of recipients into letters, labels and envelopes, then preview each one before you finish.",
          lo: "ລວມລາຍຊື່ຜູ້ຮັບເຂົ້າໃນຈົດໝາຍ, ປ້າຍ ແລະ ຊອງຈົດໝາຍ, ແລ້ວເບິ່ງຕົວຢ່າງແຕ່ລະສະບັບກ່ອນສຳເລັດ.",
        },
      },
      {
        icon: ChartColumn,
        title: { en: "Charts, shapes and equations", lo: "ແຜນພູມ, ຮູບຮ່າງ ແລະ ສົມຜົນ" },
        text: {
          en: "Insert tables, pictures, charts, shapes, SmartArt, WordArt, text boxes and equations.",
          lo: "ແຊກຕາຕະລາງ, ຮູບພາບ, ແຜນພູມ, ຮູບຮ່າງ, SmartArt, WordArt, ກ່ອງຂໍ້ຄວາມ ແລະ ສົມຜົນ.",
        },
      },
      {
        icon: Languages,
        title: { en: "Lao text done right", lo: "ພາສາລາວສະແດງຖືກຕ້ອງ" },
        text: {
          en: "Phetsarath OT and Noto Sans Lao are built in, so Lao text displays correctly, even in files from Google Docs.",
          lo: "ມີຟອນ Phetsarath OT ແລະ Noto Sans Lao ໃນຕົວ, ສະນັ້ນ ຂໍ້ຄວາມພາສາລາວຈຶ່ງສະແດງໄດ້ຖືກຕ້ອງ ເຖິງແມ່ນຈະເປັນໄຟລ໌ຈາກ Google Docs.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Private by design", lo: "ຮັກສາຄວາມເປັນສ່ວນຕົວ" },
        text: {
          en: "No account and no sign-in. DocBase works offline and your documents stay on your computer.",
          lo: "ບໍ່ຕ້ອງມີບັນຊີ ແລະ ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ. DocBase ໃຊ້ງານແບບອອບລາຍ ແລະ ເອກະສານຂອງທ່ານຢູ່ໃນຄອມພິວເຕີຂອງທ່ານເອງ.",
        },
      },
    ],
    formats: {
      opens: ["DOCX", "DOC*", "RTF*", "ODT*", "HTML", "Markdown", "TXT"],
      saves: ["DOCX", "PDF", "HTML", "Markdown", "TXT", "RTF*"],
      note: { en: "* Uses a converter built into macOS, so available on Mac only.", lo: "* ໃຊ້ຕົວແປງທີ່ມີໃນ macOS, ສະນັ້ນ ໃຊ້ໄດ້ສະເພາະ Mac." },
    },
    languages: [{ en: "English", lo: "ອັງກິດ" }, { en: "Lao text", lo: "ຂໍ້ຄວາມພາສາລາວ" }],
  },
  {
    id: "sheetbase",
    name: "SheetBase",
    category: "office",
    kind: { en: "Spreadsheet", lo: "ໂປຣແກຣມຕາຕະລາງຄຳນວນ" },
    accent: "#16a34a",
    tagline: {
      en: "A full spreadsheet for budgets, lists and data. Opens and saves Excel workbooks.",
      lo: "ໂປຣແກຣມຕາຕະລາງຄຳນວນຄົບຊຸດ ສຳລັບງົບປະມານ, ລາຍການ ແລະ ຂໍ້ມູນ. ເປີດ ແລະ ບັນທຶກໄຟລ໌ Excel ໄດ້.",
    },
    description: {
      en: "SheetBase is a desktop spreadsheet that opens and saves Excel files and works without an internet connection. It has the tools of a full spreadsheet in a familiar ribbon with Home, Insert, Page Layout, Formulas, Data, Review and View tabs.",
      lo: "SheetBase ເປັນໂປຣແກຣມຕາຕະລາງຄຳນວນສຳລັບຄອມພິວເຕີ ທີ່ເປີດ ແລະ ບັນທຶກໄຟລ໌ Excel ໄດ້ ແລະ ໃຊ້ງານໄດ້ໂດຍບໍ່ຕ້ອງເຊື່ອມຕໍ່ອິນເຕີເນັດ. ມີເຄື່ອງມືຄົບຄືກັບໂປຣແກຣມຕາຕະລາງຄຳນວນເຕັມຮູບແບບ ໃນແຖບ Ribbon ທີ່ຄຸ້ນເຄີຍ ມີແຖບ Home, Insert, Page Layout, Formulas, Data, Review ແລະ View.",
    },
    status: "available",
    screenshot: {
      src: "/screenshots/sheetbase.png",
      alt: {
        en: "SheetBase showing a quarterly sales sheet with formatted headers, totals and a column chart",
        lo: "SheetBase ສະແດງຕາຕະລາງຍອດຂາຍລາຍໄຕມາດ ມີຫົວຕາຕະລາງທີ່ຈັດຮູບແບບ, ຍອດລວມ ແລະ ແຜນພູມຖັນ",
      },
      title: "Sales.xlsx — SheetBase",
      width: 2560,
      height: 1640,
    },
    features: [
      {
        icon: FileText,
        title: { en: "Works with Excel files", lo: "ໃຊ້ກັບໄຟລ໌ Excel ໄດ້" },
        text: {
          en: "Open and save .xlsx with formulas, number formats, styles, merged cells, frozen panes, notes, validation and conditional formatting intact.",
          lo: "ເປີດ ແລະ ບັນທຶກ .xlsx ໂດຍຮັກສາສູດ, ຮູບແບບຕົວເລກ, ຮູບແບບເຊວ, ເຊວທີ່ລວມກັນ, ການຕຶງແຖວ, ບັນທຶກ, ການກວດສອບຂໍ້ມູນ ແລະ ການຈັດຮູບແບບຕາມເງື່ອນໄຂໄວ້ຄົບ.",
        },
      },
      {
        icon: ChartColumn,
        title: { en: "418 functions and charts", lo: "418 ຟັງຊັນ ແລະ ແຜນພູມ" },
        text: {
          en: "Math, statistics, text, lookup (XLOOKUP, INDEX/MATCH), dates, financial and more, with dynamic arrays that spill. Column, bar, line, area, pie and scatter charts.",
          lo: "ຄະນິດສາດ, ສະຖິຕິ, ຂໍ້ຄວາມ, ການຄົ້ນຫາ (XLOOKUP, INDEX/MATCH), ວັນທີ, ການເງິນ ແລະ ອື່ນໆ, ພ້ອມ dynamic arrays ທີ່ກະຈາຍຜົນອອກເອງ. ແຜນພູມຖັນ, ແທ່ງ, ເສັ້ນ, ພື້ນທີ່, ວົງມົນ ແລະ ກະແຈກກະຈາຍ.",
        },
      },
      {
        icon: Columns3,
        title: { en: "Data tools", lo: "ເຄື່ອງມືຂໍ້ມູນ" },
        text: {
          en: "Sort, AutoFilter, Text to Columns, Remove Duplicates, Flash Fill, Data Validation, Goal Seek and PivotTables.",
          lo: "ຈັດລຽງ, AutoFilter, Text to Columns, ລຶບຂໍ້ມູນຊ້ຳ, Flash Fill, ການກວດສອບຂໍ້ມູນ, Goal Seek ແລະ PivotTable.",
        },
      },
      {
        icon: BookOpen,
        title: { en: "Formatting you expect", lo: "ຈັດຮູບແບບໄດ້ຄົບ" },
        text: {
          en: "Number formats, borders, cell styles, Format as Table, conditional formatting with data bars, colour scales and icon sets.",
          lo: "ຮູບແບບຕົວເລກ, ເສັ້ນຂອບ, ຮູບແບບເຊວ, Format as Table, ການຈັດຮູບແບບຕາມເງື່ອນໄຂດ້ວຍແຖບຂໍ້ມູນ, ລະດັບສີ ແລະ ຊຸດໄອຄອນ.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Private by design", lo: "ຮັກສາຄວາມເປັນສ່ວນຕົວ" },
        text: {
          en: "No account and no sign-in. SheetBase works offline and your workbooks stay on your computer.",
          lo: "ບໍ່ຕ້ອງມີບັນຊີ ແລະ ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ. SheetBase ໃຊ້ງານແບບອອບລາຍ ແລະ ໄຟລ໌ຂອງທ່ານຢູ່ໃນຄອມພິວເຕີຂອງທ່ານເອງ.",
        },
      },
    ],
    formats: {
      opens: ["XLSX", "XLSM", "CSV", "TSV", "TXT", "SBX"],
      saves: ["XLSX", "SBX", "CSV", "TSV", "HTML", "PDF"],
      note: {
        en: "SBX is SheetBase's own format; it also keeps charts, which Excel files from SheetBase do not include.",
        lo: "SBX ເປັນຮູບແບບໄຟລ໌ຂອງ SheetBase ເອງ; ມັນເກັບແຜນພູມໄວ້ນຳ, ເຊິ່ງໄຟລ໌ Excel ທີ່ບັນທຶກຈາກ SheetBase ບໍ່ມີ.",
      },
    },
    languages: [{ en: "English", lo: "ອັງກິດ" }],
  },
  {
    id: "slidebase",
    name: "SlideBase",
    category: "office",
    kind: { en: "Presentations", lo: "ໂປຣແກຣມນຳສະເໜີ" },
    accent: "#ea580c",
    tagline: {
      en: "Build slide decks and present them full screen. Opens and saves PowerPoint files.",
      lo: "ສ້າງສະໄລ້ ແລະ ນຳສະເໜີແບບເຕັມຈໍ. ເປີດ ແລະ ບັນທຶກໄຟລ໌ PowerPoint ໄດ້.",
    },
    description: {
      en: "SlideBase is a desktop presentation app that opens and saves PowerPoint files and works without an internet connection. It has the tools of a full presentation app in a familiar ribbon with Home, Insert, Design, Transitions, Animations, Slide Show, Review and View tabs.",
      lo: "SlideBase ເປັນໂປຣແກຣມນຳສະເໜີສຳລັບຄອມພິວເຕີ ທີ່ເປີດ ແລະ ບັນທຶກໄຟລ໌ PowerPoint ໄດ້ ແລະ ໃຊ້ງານໄດ້ໂດຍບໍ່ຕ້ອງເຊື່ອມຕໍ່ອິນເຕີເນັດ. ມີເຄື່ອງມືຄົບຄືກັບໂປຣແກຣມນຳສະເໜີເຕັມຮູບແບບ ໃນແຖບ Ribbon ທີ່ຄຸ້ນເຄີຍ ມີແຖບ Home, Insert, Design, Transitions, Animations, Slide Show, Review ແລະ View.",
    },
    status: "available",
    screenshot: {
      src: "/screenshots/slidebase.png",
      alt: {
        en: "SlideBase editing a project status deck, with the Home ribbon, slide thumbnails and a slide with a column chart",
        lo: "SlideBase ກຳລັງແກ້ໄຂສະໄລ້ລາຍງານສະຖານະໂຄງການ ມີແຖບ Home, ຮູບຫຍໍ້ຂອງສະໄລ້ ແລະ ສະໄລ້ທີ່ມີແຜນພູມຖັນ",
      },
      title: "Project Status.pptx — SlideBase",
      width: 2560,
      height: 1576,
    },
    features: [
      {
        icon: FileText,
        title: { en: "Works with PowerPoint files", lo: "ໃຊ້ກັບໄຟລ໌ PowerPoint ໄດ້" },
        text: {
          en: "Open and save .pptx with shapes, pictures, tables, charts, SmartArt, media, masters and layouts, transitions, animations, sections, notes and comments.",
          lo: "ເປີດ ແລະ ບັນທຶກ .pptx ພ້ອມຮູບຮ່າງ, ຮູບພາບ, ຕາຕະລາງ, ແຜນພູມ, SmartArt, ວິດີໂອ ແລະ ສຽງ, ແມ່ແບບ ແລະ ໂຄງຮ່າງ, ການປ່ຽນສະໄລ້, ພາບເຄື່ອນໄຫວ, ພາກ, ບັນທຶກ ແລະ ຄຳເຫັນ.",
        },
      },
      {
        icon: Palette,
        title: { en: "Designs and layouts", lo: "ດີໄຊນ໌ ແລະ ໂຄງຮ່າງ" },
        text: {
          en: "20 built-in designs with colour variants, slide layouts, themes, about 130 shapes, WordArt, icons and Slide Master view.",
          lo: "ມີ 20 ແບບດີໄຊນ໌ໃນຕົວ ພ້ອມສີຫຼາຍແບບ, ໂຄງຮ່າງສະໄລ້, ທີມ, ຮູບຮ່າງປະມານ 130 ແບບ, WordArt, ໄອຄອນ ແລະ ມຸມມອງ Slide Master.",
        },
      },
      {
        icon: Sparkles,
        title: { en: "Transitions and animations", lo: "ການປ່ຽນສະໄລ້ ແລະ ພາບເຄື່ອນໄຫວ" },
        text: {
          en: "45 transitions, and entrance, emphasis, exit and motion-path animations with timing, triggers and the Animation Pane.",
          lo: "ການປ່ຽນສະໄລ້ 45 ແບບ ແລະ ພາບເຄື່ອນໄຫວແບບເຂົ້າ, ເນັ້ນ, ອອກ ແລະ ເຄື່ອນທີ່ຕາມເສັ້ນທາງ ພ້ອມການຕັ້ງເວລາ, ຕົວກະຕຸ້ນ ແລະ Animation Pane.",
        },
      },
      {
        icon: MonitorPlay,
        title: { en: "Present with Presenter View", lo: "ນຳສະເໜີດ້ວຍ Presenter View" },
        text: {
          en: "Full-screen Slide Show with your notes, a timer and the next slide on a second screen, plus pen, highlighter and laser pointer.",
          lo: "ສະແດງສະໄລ້ແບບເຕັມຈໍ ພ້ອມບັນທຶກ, ໂມງຈັບເວລາ ແລະ ສະໄລ້ຖັດໄປ ຢູ່ໜ້າຈໍທີສອງ, ມີປາກກາ, ປາກກາເນັ້ນຂໍ້ຄວາມ ແລະ ຕົວຊີ້ເລເຊີ.",
        },
      },
      {
        icon: ShieldCheck,
        title: { en: "Private by design", lo: "ຮັກສາຄວາມເປັນສ່ວນຕົວ" },
        text: {
          en: "No account and no sign-in. SlideBase works offline and your presentations stay on your computer.",
          lo: "ບໍ່ຕ້ອງມີບັນຊີ ແລະ ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ. SlideBase ໃຊ້ງານແບບອອບລາຍ ແລະ ໄຟລ໌ຂອງທ່ານຢູ່ໃນຄອມພິວເຕີຂອງທ່ານເອງ.",
        },
      },
    ],
    formats: {
      opens: ["PPTX", "PPSX", "POTX", "SBP"],
      saves: ["PPTX", "PPSX", "POTX", "SBP", "PDF", "PNG", "JPEG"],
      note: {
        en: "SBP is SlideBase's own format. Outlines can also be saved as TXT or RTF.",
        lo: "SBP ເປັນຮູບແບບໄຟລ໌ຂອງ SlideBase ເອງ. ໂຄງຮ່າງເນື້ອຫາ ບັນທຶກເປັນ TXT ຫຼື RTF ໄດ້ນຳ.",
      },
    },
    languages: [{ en: "English", lo: "ອັງກິດ" }, { en: "Lao text", lo: "ຂໍ້ຄວາມພາສາລາວ" }],
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function appHref(id: ProductId): string {
  return `/apps/${id}`;
}
