import {
  BookOpen,
  ChartColumn,
  Columns3,
  FileText,
  Languages,
  Mail,
  MessageSquareText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type ProductId = "docbase" | "sheetbase" | "slidebase";
export type CategoryId = "office";

/** Store categories, in the order they appear on the home page. */
export const CATEGORIES: Record<CategoryId, { name: string; summary: string }> = {
  office: { name: "Office", summary: "Write documents, crunch numbers and build presentations." },
};

export interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface Product {
  id: ProductId;
  name: string;
  category: CategoryId;
  /** What the app is, shown under its name, e.g. "Word processor". */
  kind: string;
  /** One sentence for app cards. */
  tagline: string;
  /** The "About" paragraph on the app page. */
  description: string;
  status: "available" | "coming-soon";
  screenshot?: { src: string; alt: string; title: string };
  features?: Feature[];
  formats?: { opens: string[]; saves: string[]; note?: string };
  languages?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "docbase",
    name: "DocBase",
    category: "office",
    kind: "Word processor",
    tagline: "A full word processor for letters, reports and books. Opens and saves Word documents.",
    description:
      "DocBase is a desktop word processor that opens and saves Word files and works without an internet connection. It has the tools of a full word processor in a familiar ribbon with File, Home, Insert, Design, Layout, References, Review, View and Mailings tabs.",
    status: "available",
    screenshot: {
      src: "/screenshots/docbase.png",
      alt: "DocBase editing a report, with the Home ribbon, styles gallery and a page with headings, lists and a table",
      title: "Report.docx — DocBase",
    },
    features: [
      {
        icon: FileText,
        title: "Works with Word files",
        text: "Open and save .docx with styles, headers, tables, images, comments and tracked changes intact. Password-protected files open too.",
      },
      {
        icon: Columns3,
        title: "Real page layout",
        text: "Margins, columns, sections with their own page setup, page borders, watermarks and true page breaks.",
      },
      {
        icon: BookOpen,
        title: "References",
        text: "Tables of contents, footnotes and endnotes, captions, citations, a bibliography and an index with page numbers.",
      },
      {
        icon: MessageSquareText,
        title: "Review and track changes",
        text: "Comments, Track Changes, Compare, spelling and grammar checks, and a version history kept on every save.",
      },
      {
        icon: Mail,
        title: "Mail merge",
        text: "Merge a list of recipients into letters, labels and envelopes, then preview each one before you finish.",
      },
      {
        icon: ChartColumn,
        title: "Charts, shapes and equations",
        text: "Insert tables, pictures, charts, shapes, SmartArt, WordArt, text boxes and equations.",
      },
      {
        icon: Languages,
        title: "Lao text done right",
        text: "Phetsarath OT and Noto Sans Lao are built in, so Lao text displays correctly, even in files from Google Docs.",
      },
      {
        icon: ShieldCheck,
        title: "Private by design",
        text: "No account and no sign-in. DocBase works offline and your documents stay on your computer.",
      },
    ],
    formats: {
      opens: ["DOCX", "DOC*", "RTF*", "ODT*", "HTML", "Markdown", "TXT"],
      saves: ["DOCX", "PDF", "HTML", "Markdown", "TXT", "RTF*"],
      note: "* Uses a converter built into macOS, so available on Mac only.",
    },
    languages: ["English", "Lao text"],
  },
  {
    id: "sheetbase",
    name: "SheetBase",
    category: "office",
    kind: "Spreadsheet",
    tagline: "Tables, formulas and charts for budgets, lists and data.",
    description: "SheetBase is a spreadsheet app for budgets, lists and data, with formulas and charts.",
    status: "coming-soon",
  },
  {
    id: "slidebase",
    name: "SlideBase",
    category: "office",
    kind: "Presentations",
    tagline: "Build slide decks and present them full screen.",
    description: "SlideBase is a presentation app for building slide decks and presenting them full screen.",
    status: "coming-soon",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function appHref(id: ProductId): string {
  return `/apps/${id}`;
}
