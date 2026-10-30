import Image from "next/image";
import type { ProductId } from "@/lib/products";

/** Each app's real icon (its build/icon.png scaled to 512 px, in public/products/). */
export function ProductIcon({ id, size = 48 }: { id: ProductId; size?: number }) {
  return <Image src={`/products/${id}.png`} alt="" width={size} height={size} />;
}
