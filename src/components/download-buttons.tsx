"use client";

import Link from "next/link";
import { OSLogo } from "./icons";
import { buttonClass } from "./button";
import { usePlatform } from "./use-platform";
import type { ProductId } from "@/lib/products";
import { latestLink, versionsHref } from "@/lib/releases";

interface Props {
  product: ProductId;
  productName: string;
  version: string;
  align?: "center" | "start";
}

/** Download buttons for the latest version that put the visitor's OS first. Before hydration (and on phones) macOS comes first. */
export function DownloadButtons({ product, productName, version, align = "center" }: Props) {
  const platform = usePlatform();
  const intel = platform?.os === "mac" && platform.arch === "x64";
  const macHref = latestLink(product, intel ? "mac-x64" : "mac-arm64");
  const winHref = latestLink(product, "win-x64");
  const order: ("mac" | "windows")[] = platform?.os === "windows" ? ["windows", "mac"] : ["mac", "windows"];
  const start = align === "start";

  return (
    <div className={`flex flex-col gap-4 ${start ? "items-start" : "items-center"}`}>
      <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${start ? "" : "justify-center"}`}>
        {order.map((os, i) => (
          <a
            key={os}
            href={os === "mac" ? macHref : winHref}
            className={buttonClass(i === 0 ? "primary" : "secondary", "lg")}
          >
            <OSLogo os={os} className="size-5" />
            Download for {os === "mac" ? "macOS" : "Windows"}
          </a>
        ))}
      </div>
      <p className="text-sm text-balance text-muted">
        {productName} {version}
        {platform?.os === "mac" && (
          <>
            {" for "}
            {intel ? "Intel" : "Apple Silicon"} ·{" "}
            <a
              href={latestLink(product, intel ? "mac-arm64" : "mac-x64")}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {intel ? "Apple Silicon Mac?" : "Intel Mac?"}
            </a>
          </>
        )}
        {platform?.os === "other" && <> · For Mac and Windows computers</>}
        {" · "}
        <Link href={versionsHref(product)} className="underline underline-offset-2 hover:text-foreground">
          All versions
        </Link>
      </p>
    </div>
  );
}
