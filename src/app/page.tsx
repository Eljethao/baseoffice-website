import Link from "next/link";
import {
  ArrowRight,
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
import { AppWindow } from "@/components/app-window";
import { DownloadButtons } from "@/components/download-buttons";
import { ProductIcon } from "@/components/product-icon";
import { PRODUCTS } from "@/lib/products";
import { REQUIREMENTS, latestRelease, releaseId } from "@/lib/releases";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
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
];

const OPENS = ["DOCX", "DOC*", "RTF*", "ODT*", "HTML", "Markdown", "TXT"];
const SAVES = ["DOCX", "PDF", "HTML", "Markdown", "TXT", "RTF*"];

export default function Home() {
  const release = latestRelease("docbase");

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-primary-soft to-transparent"
        />
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-24">
          {release && (
            <Link
              href={`/releases#${releaseId(release)}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted hover:text-foreground"
            >
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-fg">New</span>
              DocBase {release.version} is out
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          )}
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            The office suite that lives on your computer
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">
            BaseOffice is a family of desktop apps for documents, spreadsheets and presentations. It starts with
            DocBase, a word processor that opens and saves Word files and works without an internet connection.
          </p>
          {release && (
            <div className="mt-8">
              <DownloadButtons product="docbase" productName="DocBase" version={release.version} />
            </div>
          )}
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <AppWindow
            src="/screenshots/docbase.png"
            alt="DocBase editing a report, with the Home ribbon, styles gallery and a page with headings, lists and a table"
            title="Report.docx — DocBase"
          />
        </div>
      </section>

      <section id="apps" className="border-t border-border bg-subtle">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-link">The apps</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">One family, three apps</h2>
            <p className="mt-4 text-muted">DocBase is available now. SheetBase and SlideBase are on the way.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <ProductIcon id={p.id} size={56} />
                  {p.status === "available" ? (
                    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-link">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-muted">{p.category}</p>
                <p className="mt-3 flex-1 text-sm">{p.summary}</p>
                {p.status === "available" && (
                  <Link
                    href="/download"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-link hover:underline"
                  >
                    Download {p.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-link">DocBase</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you expect from a word processor
            </h2>
            <p className="mt-4 text-muted">
              The tools of a full desktop word processor, in a familiar ribbon with File, Home, Insert, Design,
              Layout, References, Review, View and Mailings tabs.
            </p>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-link">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-4 rounded-2xl border border-border bg-subtle p-6 sm:grid-cols-2 sm:p-8">
            <FormatList label="Opens" formats={OPENS} />
            <FormatList label="Saves and exports" formats={SAVES} />
            <p className="text-xs text-muted sm:col-span-2">* Uses a converter built into macOS, so available on Mac only.</p>
          </div>
        </div>
      </section>

      {release && (
        <section className="border-t border-border bg-subtle">
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Get DocBase for your computer</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Runs on {REQUIREMENTS.mac} and {REQUIREMENTS.windows}.
            </p>
            <div className="mt-8">
              <DownloadButtons product="docbase" productName="DocBase" version={release.version} />
            </div>
          </div>
        </section>
      )}
    </>
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
