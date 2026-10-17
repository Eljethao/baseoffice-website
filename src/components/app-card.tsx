import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductIcon } from "./product-icon";
import { CATEGORIES, appHref, type Product } from "@/lib/products";
import { latestRelease } from "@/lib/releases";

/** A store listing tile that links to the app's page. */
export function AppCard({ app }: { app: Product }) {
  const release = latestRelease(app.id);

  return (
    <Link
      href={appHref(app.id)}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-start gap-4">
        <ProductIcon id={app.id} size={64} />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold">{app.name}</h3>
          <p className="text-sm text-muted">
            {app.kind} · {CATEGORIES[app.category].name}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm">{app.tagline}</p>
      <div className="mt-5 flex items-center justify-between text-sm">
        {app.status === "available" && release ? (
          <span className="text-muted">Version {release.version}</span>
        ) : (
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted">
            Coming soon
          </span>
        )}
        <span className="inline-flex items-center gap-0.5 font-medium text-link">
          {app.status === "available" ? "Get" : "Details"}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
