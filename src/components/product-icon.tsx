import Image from "next/image";
import type { ProductId } from "@/lib/products";

/** DocBase uses its real app icon; SheetBase and SlideBase use matching placeholders until they have their own. */
export function ProductIcon({ id, size = 48 }: { id: ProductId; size?: number }) {
  if (id === "docbase") {
    return <Image src="/products/docbase.png" alt="" width={size} height={size} />;
  }
  if (id === "sheetbase") {
    return (
      <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="sheetbase-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4ade80" />
            <stop offset="1" stopColor="#15803d" />
          </linearGradient>
        </defs>
        <rect x="5.5" y="5.5" width="53" height="53" rx="13" fill="url(#sheetbase-bg)" />
        <rect x="16" y="17" width="32" height="30" rx="3.5" fill="#fff" />
        <path d="M16 20.5a3.5 3.5 0 0 1 3.5-3.5h25a3.5 3.5 0 0 1 3.5 3.5V25H16z" fill="#bbf7d0" />
        <path d="M16 25h32M16 32.5h32M16 40h32M26.5 17v30M37.5 17v30" stroke="#16a34a" strokeWidth="1.6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="slidebase-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
      </defs>
      <rect x="5.5" y="5.5" width="53" height="53" rx="13" fill="url(#slidebase-bg)" />
      <rect x="14" y="17" width="36" height="25" rx="3" fill="#fff" />
      <rect x="19" y="22" width="15" height="3" rx="1.5" fill="#ea580c" />
      <rect x="19" y="31" width="4" height="6" rx="1" fill="#fb923c" />
      <rect x="25" y="28.5" width="4" height="8.5" rx="1" fill="#f97316" />
      <rect x="31" y="26" width="4" height="11" rx="1" fill="#ea580c" />
      <path d="M32 42v5M26 47h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
