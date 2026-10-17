"use client";

import { useSyncExternalStore } from "react";

export interface DetectedPlatform {
  os: "mac" | "windows" | "other";
  /** Only known on Chromium browsers; Safari and Firefox report "unknown" on a Mac. */
  arch: "arm64" | "x64" | "unknown";
}

interface UADataNavigator extends Navigator {
  userAgentData?: {
    platform?: string;
    getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string }>;
  };
}

let current: DetectedPlatform | null = null;
let archRequested = false;
const listeners = new Set<() => void>();

function detect(): DetectedPlatform {
  const nav = navigator as UADataNavigator;
  const ua = nav.userAgent;
  const platform = nav.userAgentData?.platform ?? "";
  // iPhones say "like Mac OS X", and iPadOS Safari claims to be a Mac; touch support gives the iPad away.
  if (/iPhone|iPad|iPod|Android/.test(ua)) return { os: "other", arch: "unknown" };
  const isIPad = /Macintosh/.test(ua) && nav.maxTouchPoints > 1;
  if (!isIPad && (platform === "macOS" || /Macintosh/.test(ua))) return { os: "mac", arch: "unknown" };
  if (platform === "Windows" || /Windows NT/.test(ua)) return { os: "windows", arch: "x64" };
  return { os: "other", arch: "unknown" };
}

function requestMacArch() {
  if (archRequested || current?.os !== "mac") return;
  archRequested = true;
  const nav = navigator as UADataNavigator;
  nav.userAgentData
    ?.getHighEntropyValues?.(["architecture"])
    .then(({ architecture }) => {
      const arch = architecture === "arm" ? "arm64" : architecture === "x86" ? "x64" : "unknown";
      if (current && arch !== current.arch) {
        current = { ...current, arch };
        listeners.forEach((notify) => notify());
      }
    })
    .catch(() => {});
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  requestMacArch();
  return () => {
    listeners.delete(notify);
  };
}

function getSnapshot() {
  current ??= detect();
  return current;
}

/** The visitor's OS, or null during server rendering and before hydration. */
export function usePlatform(): DetectedPlatform | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
