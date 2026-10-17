import Image from "next/image";

/** A screenshot framed as a desktop window. */
export function AppWindow({
  src,
  alt,
  title,
  sizes = "(min-width: 1152px) 1088px, 100vw",
}: {
  src: string;
  alt: string;
  title: string;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40">
      <div className="flex h-9 items-center gap-2 border-b border-border bg-subtle px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="flex-1 truncate text-center text-xs text-muted">{title}</span>
        <span className="w-[52px]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={2640}
        height={1704}
        sizes={sizes}
        fetchPriority="high"
        className="block h-auto w-full"
      />
    </div>
  );
}
