import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";
import { BaseStoreMark } from "./icons";
import { PRODUCTS, appHref } from "@/lib/products";
import { site } from "@/lib/site";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const available = PRODUCTS.filter((p) => p.status === "available");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-2">
          <BaseStoreMark className="size-6" />
          <span>
            <span className="font-medium text-foreground">{site.name}</span> · © <CopyrightYear />{" "}
            <a href={site.authorUrl} className="underline-offset-2 hover:text-foreground hover:underline">
              {site.author}
            </a>
          </span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 sm:ml-auto">
          <Link href="/#apps" className="hover:text-foreground">
            All apps
          </Link>
          {available.map((p) => (
            <Link key={p.id} href={appHref(p.id)} className="hover:text-foreground">
              {p.name}
            </Link>
          ))}
          <a href={site.authorUrl} className="inline-flex items-center gap-1 hover:text-foreground">
            Developer
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
