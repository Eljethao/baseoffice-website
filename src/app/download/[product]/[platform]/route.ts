import { RELEASES, fileUrl, isPlatformId, latestRelease, type PlatformId } from "@/lib/releases";

export function generateStaticParams() {
  const seen = new Set<string>();
  const params: { product: string; platform: string }[] = [];
  for (const release of RELEASES) {
    if (seen.has(release.product)) continue;
    seen.add(release.product);
    for (const platform of Object.keys(release.files) as PlatformId[]) {
      params.push({ product: release.product, platform });
    }
  }
  return params;
}

/** Redirects to the newest file for a product and platform, so links like /download/docbase/win-x64 never go stale. */
export async function GET(_request: Request, ctx: RouteContext<"/download/[product]/[platform]">) {
  const { product, platform } = await ctx.params;
  const release = latestRelease(product);
  const url = release && isPlatformId(platform) ? fileUrl(release, platform) : undefined;
  if (!url) return new Response("Not found", { status: 404 });
  return new Response(null, { status: 302, headers: { Location: url } });
}
