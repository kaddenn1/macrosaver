import Link from "next/link";
import { extractFlavor } from "@/lib/macrosaver-engine";
import type { Product } from "@/data/types";

function variantLabel(product: Product): string {
  const size = product.name.match(/\(([^)]*)\)\s*$/)?.[1];
  const flavor = extractFlavor(product.name);
  if (flavor && size) return `${flavor} — ${size}`;
  return flavor ?? size ?? product.name;
}

export default function ProductVariantSelector({
  currentProductId,
  variants,
}: {
  currentProductId: string;
  variants: Product[];
}) {
  if (variants.length < 2) return null;

  const sorted = [...variants].sort((a, b) => Number(a.id) - Number(b.id));

  return (
    <div className="mb-5">
      <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
        Choose Flavor / Size ({sorted.length} options)
      </div>
      <div className="flex flex-wrap gap-2">
        {sorted.map((variant) => {
          const isCurrent = variant.id === currentProductId;
          return isCurrent ? (
            <span
              key={variant.id}
              aria-current="true"
              className="inline-flex items-center rounded-full border border-[#a3e635] bg-[#a3e635]/10 px-3 py-1.5 text-xs font-bold text-[#a3e635]"
            >
              {variantLabel(variant)}
            </span>
          ) : (
            <Link
              key={variant.id}
              href={`/product/${variant.id}`}
              className="inline-flex items-center rounded-full border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-300 hover:border-[#a3e635] hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
            >
              {variantLabel(variant)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
