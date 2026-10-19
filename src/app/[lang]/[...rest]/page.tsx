import { notFound } from "next/navigation";

/**
 * Every URL is routed into app/[lang] by src/proxy.ts, so an unknown path such as /en/nope lands here instead
 * of the global 404, and gets the site's header, footer and language through [lang]/not-found.tsx.
 */
export default function CatchAll() {
  notFound();
}
