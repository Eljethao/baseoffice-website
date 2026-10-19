import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { LocaleLink as Link } from "@/components/locale-link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, Download, Info } from "lucide-react";
import { AppWindow } from "@/components/app-window";
import { buttonClass } from "@/components/button";
import { DownloadButtons } from "@/components/download-buttons";
import { OSLogo } from "@/components/icons";
import { ProductIcon } from "@/components/product-icon";
import { RecommendedBadge } from "@/components/recommended-badge";
import { SmartScreenIllustration } from "@/components/smartscreen-illustration";
import { appDownloads, formatDownloads } from "@/lib/downloads";
import { CATEGORIES, PRODUCTS, appHref, getProduct, type Product } from "@/lib/products";
import {
  PLATFORMS,
  REQUIREMENTS,
  formatDate,
  latestLink,
  latestRelease,
  versionsHref,
  type OS,
  type PlatformId,
  type Release,
} from "@/lib/releases";
import { site } from "@/lib/site";
import { INTL_LOCALE, LOCALES, localePath, tr, withoutJoiners, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/locale";
import type { Dictionary } from "@/lib/dictionaries/en";

// Every app is prerendered from generateStaticParams, so only unknown IDs block (and get a real 404).
export const instant = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/apps/[id]">): Promise<Metadata> {
  const app = getProduct((await params).id);
  if (!app) return {};
  const { locale, t } = await getDictionary();
  const path = appHref(app.id);
  return {
    title: withoutJoiners(t.meta.appTitle(app.name, tr(app.kind, locale))),
    description: withoutJoiners(tr(app.tagline, locale)),
    alternates: {
      canonical: localePath(locale, path),
      languages: Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
    },
  };
}

export default async function AppPage({ params }: PageProps<"/[lang]/apps/[id]">) {
  const app = getProduct((await params).id);
  if (!app) notFound();
  const { locale, t } = await getDictionary();
  const release = latestRelease(app.id);
  const downloads = await appDownloads(app.id);
  const categoryName = tr(CATEGORIES[app.category].name, locale);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-black/[0.06]">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(70% 60% at 15% 0%, ${app.accent}1f, transparent 70%), radial-gradient(60% 50% at 100% 10%, rgb(79 70 229 / 0.07), transparent 70%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_30%_0%,black,transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-14">
          <Link
            href={`/#${app.category}`}
            className="inline-flex items-center gap-1 rounded-full py-1 pr-3 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            {t.app.categoryApps(categoryName)}
          </Link>

          <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center">
            <span className="w-fit drop-shadow-[0_16px_28px_rgb(15_15_25/0.2)]">
              <ProductIcon id={app.id} size={128} />
            </span>
            <div className="flex-1">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{app.name}</h1>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                <Chip>
                  <span className="size-1.5 rounded-full" style={{ background: app.accent }} />
                  {tr(app.kind, locale)}
                </Chip>
                <Chip>{categoryName}</Chip>
                <Chip>
                  {t.app.by}{" "}
                  <a href={site.authorUrl} className="font-medium text-foreground hover:underline">
                    {site.author}
                  </a>
                </Chip>
                {downloads > 0 && <Chip>{formatDownloads(downloads, locale)}</Chip>}
              </ul>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted">{tr(app.tagline, locale)}</p>
            </div>
          </div>

          <div className="mt-10">
            {release ? (
              <DownloadButtons
                product={app.id}
                productName={app.name}
                release={release}
                locale={locale}
                text={t.download}
                align="start"
              />
            ) : (
              <p className="inline-flex rounded-full border border-black/[0.08] bg-white px-4 py-2 text-sm font-medium text-muted shadow-soft">
                {t.common.comingSoon}
              </p>
            )}
          </div>

          {app.screenshot && (
            <div className="mt-14">
              <AppWindow {...app.screenshot} alt={tr(app.screenshot.alt, locale)} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0 space-y-16">
          <section>
            <SectionTitle>{t.app.about(app.name)}</SectionTitle>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{tr(app.description, locale)}</p>
          </section>

          {app.features && (
            <section>
              <SectionTitle>{t.app.features}</SectionTitle>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {app.features.map(({ icon: Icon, title, text }) => (
                  <div key={tr(title, "en")} className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
                    <div
                      className="flex size-10 items-center justify-center rounded-xl ring-1 ring-black/[0.06]"
                      style={{ background: `${app.accent}12`, color: app.accent }}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-semibold tracking-tight">{tr(title, locale)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{tr(text, locale)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {app.formats && (
            <section>
              <SectionTitle>{t.app.fileFormats}</SectionTitle>
              <div className="mt-6 grid gap-6 rounded-2xl border border-black/[0.06] bg-subtle p-6 sm:grid-cols-2">
                <FormatList label={t.app.opens} formats={app.formats.opens} />
                <FormatList label={t.app.saves} formats={app.formats.saves} />
                {app.formats.note && (
                  <p className="text-xs text-muted sm:col-span-2">{tr(app.formats.note, locale)}</p>
                )}
              </div>
            </section>
          )}

          {release && (
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <SectionTitle>{t.app.whatsNew}</SectionTitle>
                <Link href={versionsHref(app.id)} className="group inline-flex items-center gap-1 text-sm font-medium">
                  {t.app.versionHistory}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft">
                <p className="text-sm text-faint">
                  {t.common.version(release.version)} ·{" "}
                  <time dateTime={release.date}>{formatDate(release.date, locale)}</time>
                </p>
                <p className="mt-2 font-medium">{tr(release.summary, locale)}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-muted">
                  {release.notes.map((note) => (
                    <li key={tr(note, "en")} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-black/30" />
                      {tr(note, locale)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {release && <InstallSteps app={app} release={release} t={t} />}
        </div>

        <aside className="space-y-5">
          {release && <DownloadsCard release={release} t={t} />}
          <InfoCard app={app} release={release} downloads={downloads} locale={locale} t={t} />
        </aside>
      </div>
    </>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.07] bg-white/80 px-3 py-1 text-muted backdrop-blur">
      {children}
    </li>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[28px]">{children}</h2>;
}

function DownloadsCard({ release, t }: { release: Release; t: Dictionary }) {
  const groups: { os: OS; ids: PlatformId[] }[] = [
    { os: "mac", ids: ["mac-arm64", "mac-x64"] },
    { os: "windows", ids: ["win-x64"] },
  ];

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft">
      <h2 className="font-semibold tracking-tight">{t.app.downloadsTitle}</h2>
      <p className="text-sm text-faint">{t.common.version(release.version)}</p>
      {groups.map(({ os, ids }) => {
        const available = ids.filter((id) => release.files[id]);
        if (available.length === 0) return null;
        return (
          <div key={os} className="mt-5">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <OSLogo os={os} className="size-4" />
              {os === "mac" ? t.common.macos : t.common.windows}
              <span className="ml-auto">
                <RecommendedBadge os={os} label={t.download.forThisComputer} />
              </span>
            </h3>
            <div className="mt-2.5 flex flex-col gap-2">
              {available.map((id) => {
                const { arch, ext } = PLATFORMS[id];
                const size = release.files[id]!.size;
                return (
                  <a key={id} href={latestLink(release.product, id)} className={`${buttonClass("secondary", "md")} justify-between!`}>
                    <span>
                      {os === "mac" ? arch : t.app.installer(arch)}{" "}
                      <span className="font-normal text-faint">
                        {ext}
                        {size && ` · ${size}`}
                      </span>
                    </span>
                    <Download className="size-4 text-faint" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        );
      })}
      <p className="mt-5 rounded-xl bg-subtle p-3 text-xs leading-relaxed text-muted">
        {t.app.whichMac}
      </p>
      <Link
        href={versionsHref(release.product)}
        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium"
      >
        {t.app.olderVersions}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

function InfoCard({
  app,
  release,
  downloads,
  locale,
  t,
}: {
  app: Product;
  release?: Release;
  downloads: number;
  locale: Locale;
  t: Dictionary;
}) {
  const label = t.app.info;
  const rows: [string, ReactNode][] = [
    [label.developer, <a key="dev" href={site.authorUrl} className="font-medium text-link hover:underline">{site.author}</a>],
    [label.category, tr(CATEGORIES[app.category].name, locale)],
  ];
  if (release) {
    rows.push(
      [label.version, release.version],
      [label.released, formatDate(release.date, locale)],
      ...(downloads > 0
        ? [[label.downloads, downloads.toLocaleString(INTL_LOCALE[locale])] as [string, ReactNode]]
        : []),
      [label.requires, <>{tr(REQUIREMENTS.mac, locale)}<br />{tr(REQUIREMENTS.windows, locale)}</>],
    );
  }
  if (app.languages) rows.push([label.languages, app.languages.map((l) => tr(l, locale)).join(", ")]);
  if (release) rows.push([label.account, label.notNeeded]);

  return (
    <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-soft">
      <h2 className="font-semibold tracking-tight">{t.app.information}</h2>
      <dl className="mt-3 divide-y divide-black/[0.06] text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 py-3">
            <dt className="w-24 shrink-0 text-faint">{label}</dt>
            <dd className="min-w-0">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface BlockedStep {
  text: ReactNode;
  /** A screenshot or illustration of what the visitor sees at this step. */
  figure?: ReactNode;
}

interface InstallGuide {
  steps: string[];
  /** What to do when the OS blocks the first launch. */
  blocked: {
    title: string;
    /** The exact message the OS shows, so visitors recognise it. */
    message: string;
    steps: BlockedStep[];
    /** Optional shortcut for people comfortable with a terminal. */
    alternative?: { text: string; command: string };
    note?: string;
  };
}

function InstallSteps({ app, release, t }: { app: Product; release: Release; t: Dictionary }) {
  const installer = release.files["win-x64"]?.file ?? `${app.name}-${release.version}-windows-setup.exe`;
  const m = t.install.mac;
  const w = t.install.windows;
  const step2 = m.step2(app.name);
  const step3 = m.step3(app.name);
  const winStep2 = w.step2(app.name);

  const mac: InstallGuide = {
    steps: m.steps(app.name),
    blocked: {
      title: m.blockedTitle(app.name),
      message: m.message(app.name),
      steps: [
        {
          text: (
            <>
              {m.step1.before}
              <b>{m.step1.button}</b>
              {m.step1.after}
            </>
          ),
          figure: (
            <ScreenshotFigure src="/install/mac-not-opened.png" alt={m.alt.notOpened} width={1336} height={1016} />
          ),
        },
        {
          text: (
            <>
              {step2.before}
              <b>{step2.place}</b>
              {step2.middle}
              <b>{step2.button}</b>
              {step2.after}
            </>
          ),
          figure: (
            <ScreenshotFigure src="/install/mac-privacy-security.png" alt={m.alt.settings} width={1358} height={1524} />
          ),
        },
        {
          text: (
            <>
              {step3.before}
              <b>{step3.button}</b>
              {step3.after}
            </>
          ),
          figure: (
            <ScreenshotFigure src="/install/mac-open-anyway.png" alt={m.alt.openAnyway} width={1012} height={1344} />
          ),
        },
      ],
      alternative: {
        text: m.terminal(app.name),
        command: `xattr -dr com.apple.quarantine /Applications/${app.name}.app`,
      },
      note: app.id === "docbase" ? undefined : m.screenshotsNote(app.name),
    },
  };

  const windows: InstallGuide = {
    steps: w.steps(app.name),
    blocked: {
      title: w.blockedTitle,
      message: w.message,
      steps: [
        {
          text: (
            <>
              {w.step1.before}
              <b>{w.step1.button}</b>
              {w.step1.after}
            </>
          ),
          figure: <SmartScreenIllustration step="more-info" fileName={installer} caption={w.illustration} />,
        },
        {
          text: (
            <>
              {winStep2.before}
              <b>{installer}</b>
              {winStep2.middle}
              <b>{winStep2.button}</b>
              {winStep2.after}
            </>
          ),
          figure: <SmartScreenIllustration step="run-anyway" fileName={installer} caption={w.illustration} />,
        },
      ],
      note: w.browserNote,
    },
  };

  return (
    <section>
      <SectionTitle>{t.install.title(app.name)}</SectionTitle>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{t.install.intro(app.name)}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <InstallCard os="mac" name={t.common.macos} guide={mac} seeBelow={t.install.seeBelow} />
        <InstallCard os="windows" name={t.common.windows} guide={windows} seeBelow={t.install.seeBelow} />
      </div>

      <FirstLaunchGuide os="mac" guide={mac} messageReads={t.install.messageReads} />
      <FirstLaunchGuide os="windows" guide={windows} messageReads={t.install.messageReads} />
    </section>
  );
}

function firstLaunchId(os: OS) {
  return `${os}-first-launch`;
}

function InstallCard({ os, name, guide, seeBelow }: { os: OS; name: string; guide: InstallGuide; seeBelow: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft">
      <h3 className="flex items-center gap-2 font-semibold tracking-tight">
        <OSLogo os={os} className="size-4" />
        {name}
      </h3>
      <ol className="mt-5 flex-1 space-y-3.5">
        {guide.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-sm">
            <StepNumber n={i + 1} />
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      <a
        href={`#${firstLaunchId(os)}`}
        className="mt-6 flex items-center gap-2 rounded-xl bg-subtle p-4 text-sm font-medium hover:underline"
      >
        <Info className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1">
          {guide.blocked.title}? {seeBelow}
        </span>
        <ArrowRight className="size-4 shrink-0 rotate-90" aria-hidden="true" />
      </a>
    </div>
  );
}

function FirstLaunchGuide({ os, guide, messageReads }: { os: OS; guide: InstallGuide; messageReads: string }) {
  const { title, message, steps, alternative, note } = guide.blocked;
  return (
    <div
      id={firstLaunchId(os)}
      className="mt-4 scroll-mt-24 rounded-2xl border border-black/[0.06] bg-white p-6 shadow-soft"
    >
      <h3 className="flex items-center gap-2 font-semibold tracking-tight">
        <OSLogo os={os} className="size-4" />
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {messageReads} {message}
      </p>
      <ol className="mt-6 divide-y divide-black/[0.06]">
        {steps.map(({ text, figure }, i) => (
          <li
            key={i}
            className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8"
          >
            <div className="flex gap-3 text-sm">
              <StepNumber n={i + 1} />
              <span className="pt-0.5 leading-relaxed">{text}</span>
            </div>
            {figure && <div className="rounded-xl bg-subtle p-3 ring-1 ring-black/[0.06] sm:p-4">{figure}</div>}
          </li>
        ))}
      </ol>
      {alternative && (
        <div className="mt-6 rounded-xl bg-subtle p-4">
          <p className="text-xs leading-relaxed text-muted">{alternative.text}</p>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-black/[0.07] bg-white px-3 py-2 font-mono text-xs">
            <code>{alternative.command}</code>
          </pre>
        </div>
      )}
      {note && <p className="mt-4 text-xs leading-relaxed text-muted">{note}</p>}
    </div>
  );
}

/** A screenshot that opens full size in a new tab. */
function ScreenshotFigure({ src, alt, width, height }: Screenshot) {
  return (
    <a href={src} target="_blank" rel="noopener" title="Open full size" className="block">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1152px) 420px, (min-width: 640px) 60vw, 100vw"
        className="mx-auto block h-auto w-full max-w-[420px] rounded-lg"
      />
    </a>
  );
}

function StepNumber({ n, muted = false }: { n: number; muted?: boolean }) {
  return (
    <span
      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        muted ? "border border-black/[0.1] bg-white text-foreground" : "bg-ink text-white"
      }`}
    >
      {n}
    </span>
  );
}

function FormatList({ label, formats }: { label: string; formats: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{label}</h3>
      <ul className="mt-3 flex flex-wrap gap-2">
        {formats.map((f) => (
          <li
            key={f}
            className="rounded-lg border border-black/[0.07] bg-white px-2.5 py-1 font-mono text-xs shadow-[0_1px_1px_rgb(15_15_25/0.04)]"
          >
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
