import Link from "next/link";
import { Download } from "lucide-react";
import { BaseOfficeMark } from "./icons";
import { buttonClass } from "./button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <BaseOfficeMark className="size-7" />
          BaseOffice
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm text-muted sm:gap-2">
          <Link href="/#apps" className="hidden rounded-full px-3 py-2 hover:text-foreground sm:block">
            Apps
          </Link>
          <Link href="/#features" className="hidden rounded-full px-3 py-2 hover:text-foreground sm:block">
            Features
          </Link>
          <Link href="/releases" className="hidden rounded-full px-3 py-2 hover:text-foreground sm:block">
            All versions
          </Link>
          <Link href="/download" className={`${buttonClass("primary", "md")} ml-1`}>
            <Download className="size-4" aria-hidden="true" />
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}
