import Link from "next/link";
import type { ComponentProps } from "react";
import { localePath } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";

/** next/link that adds the current language prefix to site paths ("/apps/docbase" → "/lo/apps/docbase"). */
export async function LocaleLink({ href, ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link href={localePath(await getLocale(), href)} {...props} />;
}
