import Link from "next/link";
import { BaseStoreMark } from "./icons";
import { PRODUCTS, appHref } from "@/lib/products";
import { buttonClass } from "./button";

export function SiteHeader() {
  const available = PRODUCTS.filter((p) => p.status === "available");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <BaseStoreMark className="size-7" />
          Base Store
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm text-muted sm:gap-2">
          {available.map((p) => (
            <Link
              key={p.id}
              href={appHref(p.id)}
              className="hidden rounded-full px-3 py-2 hover:text-foreground sm:block"
            >
              {p.name}
            </Link>
          ))}
          <Link href="/#apps" className={`${buttonClass("primary", "md")} ml-1`}>
            Browse apps
          </Link>
        </nav>
      </div>
    </header>
  );
}
