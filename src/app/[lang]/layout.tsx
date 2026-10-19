import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Lao } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LOCALES } from "@/lib/i18n";
import { getDictionary, getLocale } from "@/lib/locale";
import { site } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Geist has no Lao glyphs; the font stack in globals.css falls back to this for Lao text. */
const notoSansLao = Noto_Sans_Lao({
  variable: "--font-lao",
  subsets: ["lao"],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.siteTitle,
      template: "%s · Base Store",
    },
    description: t.meta.siteDescription,
    authors: [{ name: site.author, url: site.authorUrl }],
    creator: site.author,
    openGraph: {
      siteName: site.name,
      type: "website",
      locale: locale === "lo" ? "lo_LA" : "en_US",
      images: [{ url: "/screenshots/docbase.png", width: 2640, height: 1704, alt: "DocBase, a word processor from Base Store" }],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansLao.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
