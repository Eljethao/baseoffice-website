import Image from "next/image";

/** A screenshot framed as a desktop window. */
export function AppWindow({
  src,
  alt,
  title,
  width,
  height,
  sizes = "(min-width: 1152px) 1088px, 100vw",
}: {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  sizes?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-window ring-1 ring-black/[0.08]">
      <div className="flex h-9 items-center gap-2 border-b border-black/[0.06] bg-[#f6f6f8] px-4">
        <span className="size-3 rounded-full bg-[#ff5f57] ring-1 ring-black/10 ring-inset" />
        <span className="size-3 rounded-full bg-[#febc2e] ring-1 ring-black/10 ring-inset" />
        <span className="size-3 rounded-full bg-[#28c840] ring-1 ring-black/10 ring-inset" />
        <span className="flex-1 truncate text-center text-xs font-medium text-faint">{title}</span>
        <span className="w-[52px]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        fetchPriority="high"
        className="block h-auto w-full"
      />
    </div>
  );
}
