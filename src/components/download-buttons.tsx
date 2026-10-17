"use client";

import Link from "next/link";
import { OSLogo } from "./icons";
import { buttonClass } from "./button";
import { usePlatform } from "./use-platform";
import type { ProductId } from "@/lib/products";
import { PLATFORMS, latestLink, versionsHref, type PlatformId, type Release } from "@/lib/releases";

interface Props {
  product: ProductId;
  productName: string;
  release: Release;
  align?: "center" | "start";
}

const LABELS: Record<PlatformId, string> = {
  "mac-arm64": "Mac (Apple Silicon)",
  "mac-x64": "Mac (Intel)",
  "win-x64": "Windows",
};

/**
 * One download button per file of the latest version. The visitor's own platform comes first and is highlighted;
 * before hydration (and on phones) Apple Silicon does.
 */
export function DownloadButtons({ product, productName, release, align = "center" }: Props) {
  const platform = usePlatform();
  const mine: PlatformId =
    platform?.os === "windows" ? "win-x64" : platform?.os === "mac" && platform.arch === "x64" ? "mac-x64" : "mac-arm64";
  const ids = (Object.keys(LABELS) as PlatformId[]).filter((id) => release.files[id]);
  const order = ids.includes(mine) ? [mine, ...ids.filter((id) => id !== mine)] : ids;
  const start = align === "start";

  return (
    <div className={`flex flex-col gap-4 ${start ? "items-start" : "items-center"}`}>
      <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${start ? "" : "justify-center"}`}>
        {order.map((id, i) => {
          const size = release.files[id]!.size;
          return (
            <a
              key={id}
              href={latestLink(product, id)}
              className={buttonClass(i === 0 ? "primary" : "secondary", "lg")}
            >
              <OSLogo os={PLATFORMS[id].os} className="size-5" />
              {LABELS[id]}
              {size && <span className="text-sm font-normal opacity-70">{size}</span>}
            </a>
          );
        })}
      </div>
      <p className="text-sm text-balance text-muted">
        {productName} {release.version}
        {ids.includes("mac-x64") && <> · Apple Silicon is for Macs with an M-series chip; older Macs use Intel</>}
        {" · "}
        <Link href={versionsHref(product)} className="underline underline-offset-2 hover:text-foreground">
          All versions
        </Link>
      </p>
    </div>
  );
}
