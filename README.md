# BaseOffice website

The download and release site for the BaseOffice apps (DocBase now; SheetBase and SlideBase later).
Built with Next.js 16 (App Router, Cache Components) and Tailwind CSS 4.

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
| `/` | Suite overview, DocBase features, download buttons for the latest version that put the visitor's OS first |
| `/download` | Latest macOS (Apple Silicon, Intel) and Windows downloads, requirements, install steps |
| `/releases` | All versions: release notes and download files for every release, e.g. `/releases#docbase-1.0.0` |
| `/download/<product>/<platform>` | Stable link that redirects to the newest file, e.g. `/download/docbase/win-x64` |

## Publishing a new release

1. Build the installers in the app folder (e.g. `../DocBase`) with electron-builder.
2. Upload them where the site can link to them (GitHub Releases, S3/R2, or drop them in `public/files/` for local testing).
3. Add a new entry at the **top** of `RELEASES` in `src/lib/releases.ts`: version, date, notes, and the file name for
   each platform (`mac-arm64`, `mac-x64`, `win-x64`). Optionally add `size`.
4. Redeploy. The download buttons and the `/download/...` links point to the new files. Keep the older entries (and
   their files) so they stay downloadable from `/releases`.

## Configuration

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL`: the public URL of the site (metadata, sitemap, robots.txt).
- `DOWNLOAD_URL_TEMPLATE`: where release files live, with `{product}`, `{version}` and `{file}` placeholders.
  Unset, files are served from `public/files/`. For GitHub Releases:
  `https://github.com/OWNER/REPO/releases/download/v{version}/{file}`.

## Layout

```
src/app/           pages, the /download redirect route, sitemap, robots, icon
src/components/    header, footer, download buttons (OS detection), product icons, screenshot frame
src/lib/           site info, product list, releases and download URLs
public/            DocBase icon and screenshot; files/ for local release binaries (git-ignored)
```
