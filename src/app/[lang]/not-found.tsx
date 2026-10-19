import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/button";
import { LocaleLink as Link } from "@/components/locale-link";
import { getDictionary } from "@/lib/locale";

export default async function NotFound() {
  const { t } = await getDictionary();
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <p className="text-sm font-medium text-link">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{t.notFound.title}</h1>
      <p className="mt-4 text-muted">{t.notFound.text}</p>
      <Link href="/" className={`${buttonClass("primary", "lg")} mt-8`}>
        {t.notFound.home}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
