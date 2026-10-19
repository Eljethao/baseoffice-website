"use client";

import { usePlatform } from "./use-platform";

/** Shows "For this computer" (`label`, in the page's language) on the download card that matches the visitor's OS. */
export function RecommendedBadge({ os, label }: { os: "mac" | "windows"; label: string }) {
  const platform = usePlatform();
  if (platform?.os !== os) return null;
  return (
    <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-link">
      {label}
    </span>
  );
}
