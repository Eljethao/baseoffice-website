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
  size?: "md" | "lg";
}

const LABELS: Record<PlatformId, string> = {
  "mac-arm64": "Mac (Apple Silicon)",
  "mac-x64": "Mac (Intel)",
  "win-x64": "Windows",
};

/**
 * One download button per file of the latest version, always in the same order so nothing moves under the cursor.
 * The button for the visitor's own platform is highlighted; before hydration (and on phones) Apple Silicon is.
 */
export function DownloadButtons({ product, productName, release, align = "center", size = "lg" }: Props) {
  const platform = usePlatform();
  const mine: PlatformId =
    platform?.os === "windows" ? "win-x64" : platform?.os === "mac" && platform.arch === "x64" ? "mac-x64" : "mac-arm64";
  const ids = (Object.keys(LABELS) as PlatformId[]).filter((id) => release.files[id]);
  const start = align === "start";

  return (
    <div className={`flex flex-col gap-4 ${start ? "items-start" : "items-center"}`}>
      <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${start ? "" : "justify-center"}`}>
        {ids.map((id) => {
          const fileSize = release.files[id]!.size;
          return (
            <a
              key={id}
              href={latestLink(product, id)}
              className={buttonClass(id === mine ? "primary" : "secondary", size)}
            >
              <OSLogo os={PLATFORMS[id].os} className={size === "lg" ? "size-[18px]" : "size-4"} />
              {LABELS[id]}
              {fileSize && <span className="font-normal opacity-60">{fileSize}</span>}
            </a>
          );
        })}
      </div>
      <p className="text-[13px] text-balance text-faint">
        {productName} {release.version}
        {ids.includes("mac-x64") && <> · Apple Silicon is for Macs with an M-series chip; older Macs use Intel</>}
        {" · "}
        <Link href={versionsHref(product)} className="font-medium text-muted underline decoration-black/20 underline-offset-[3px] hover:text-foreground">
          All versions
        </Link>
      </p>
    </div>
  );
}
