# Base Store

The website for Base Store, the home of LJ Thao's desktop apps for macOS and Windows (DocBase now; SheetBase,
SlideBase and more later). Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Store home: featured app with download buttons for its latest version, then every app grouped by category |
| `/apps/<app>` | App page: download the latest version (the visitor's OS first), screenshot, features, file formats, what's new, install steps, information |
| `/apps/<app>/versions` | Every version of the app with release notes and download files, e.g. `/apps/docbase/versions#v1.0.0` |
| `/download/<app>/<platform>` | Stable link that redirects to the newest file, e.g. `/download/docbase/win-x64` |

`/download` and `/releases` (from before the site became Base Store) redirect to the DocBase pages.

## Adding an app

1. Add it to `PRODUCTS` in `src/lib/products.ts`: name, category, kind, tagline, description, and optionally a
   screenshot (in `public/screenshots/`), features, file formats and languages. Use `status: "coming-soon"` until the
   first release. Add a new category to `CATEGORIES` if it needs one.
2. Add its id to `ProductId` and give it an icon in `src/components/product-icon.tsx`.
3. When it ships, set `status: "available"` and publish its first release (below).

## Publishing a new release

1. Build the installers in the app folder (e.g. `../DocBase`) with electron-builder.
2. Upload them where the site can link to them. With GitHub Releases, use the tag `<app>-v<version>`, e.g.
   `docbase-v1.1.0`.
3. Add a new entry at the **top** of `RELEASES` in `src/lib/releases.ts`: app, version, date, notes, and the file name
   for each platform (`mac-arm64`, `mac-x64`, `win-x64`). Optionally add `size`.
4. Redeploy. The download buttons and the `/download/...` links point to the new files. Keep the older entries (and
   their files) so they stay downloadable from the app's versions page.

## Configuration

Create `.env.local` (locally) or set these in Vercel's Environment Variables:

- `NEXT_PUBLIC_SITE_URL`: the public URL of the site (metadata, sitemap, robots.txt).
- `DOWNLOAD_URL_TEMPLATE`: where release files live, with `{product}`, `{version}` and `{file}` placeholders.
  Unset, files are served from `public/files/`. For GitHub Releases:
  `https://github.com/OWNER/REPO/releases/download/{product}-v{version}/{file}`.
  With GitHub Releases, the site also shows download counts (from GitHub, refreshed hourly) on app cards, app pages
  and the versions page. Counts are hidden while they are 0.
- `GITHUB_TOKEN` (optional): a GitHub token with no scopes, to raise GitHub's API limit if counts stop showing.

## Layout

```
src/app/           store home, app and versions pages, sitemap, robots, icon (the /download links live in next.config.ts)
src/components/    header, footer, app card, download buttons (OS detection), app icons, screenshot frame
src/lib/           site info, apps and categories, releases and download URLs
public/            DocBase icon and screenshot; files/ for local release binaries (git-ignored)
```
