"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getSavingsVsHighestOffer,
  extractFlavor,
} from "@/lib/macrosaver-engine";
import type { Product } from "@/data/types";
import { getTheme } from "@/lib/theme";
import { APPROVAL_BADGES } from "@/lib/approvals";
import CompareButton from "@/components/CompareButton";

interface ChampionsProps {
  filterCategory?: string;
  filterBrand?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  /** Caps how many products are shown (e.g. a 4-up homepage preview row). */
  limit?: number;
  title?: string;
  viewAllHref?: string;
}

export default function Champions({
  filterCategory,
  filterBrand,
  searchParams,
  limit,
  title = "🔥 Best Deals Right Now",
  viewAllHref = "#",
}: ChampionsProps) {
  let displayProducts = [...products] as Product[];

  if (filterCategory) {
    const target = filterCategory.toLowerCase();
    displayProducts = displayProducts.filter(
      (p) =>
        p.category.toLowerCase() === target ||
        p.additionalCategories?.some((c) => c.toLowerCase() === target)
    );
  }

  if (filterBrand) {
    const target = filterBrand.toLowerCase();
    displayProducts = displayProducts.filter((p) => p.brand.toLowerCase() === target);
  }

  if (searchParams?.protein) {
    const minProtein = parseInt(searchParams.protein as string);
    displayProducts = displayProducts.filter((p) => (p.nutrition?.proteinGrams || 0) >= minProtein);
  }

  if (searchParams?.maxPrice) {
    const maxPrice = parseFloat(searchParams.maxPrice as string);
    displayProducts = displayProducts.filter((p) => {
      const cost = getCostPerServing(p);
      return cost !== null && cost <= maxPrice;
    });
  }

  if (searchParams?.flavor) {
    const flavor = searchParams.flavor as string;
    displayProducts = displayProducts.filter((p) => extractFlavor(p.name) === flavor);
  }

  if (searchParams?.type === "clear") {
    displayProducts = displayProducts.filter((p) => p.name.toLowerCase().includes("clear"));
  }

  if (searchParams?.q) {
    const query = (searchParams.q as string).toLowerCase();
    displayProducts = displayProducts.filter((p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
  }

  const currentSort = (searchParams?.sort as string) || 'price-low';
  displayProducts.sort((a, b) => {
    if (currentSort === 'protein-high') {
      const proA = a.nutrition?.proteinGrams || 0;
      const proB = b.nutrition?.proteinGrams || 0;
      return proB - proA;
    }
    const costA = getCostPerServing(a) ?? 999;
    const costB = getCostPerServing(b) ?? 999;
    return costA - costB;
  });

  if (limit) {
    displayProducts = displayProducts.slice(0, limit);
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          {title}
        </h2>
        <Link href={viewAllHref} className="text-xs text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-800 rounded-xl">
            No products found matching those filters. Try adjusting your selections!
          </div>
        )}

        {displayProducts.map((item) => {
          const bestOffer = getBestOffer(item);
          const costPerServing = getCostPerServing(item);
          const costPerOzProtein = getCostPerOzProtein(item);
          const savings = getSavingsVsHighestOffer(item);

          const theme = getTheme(item.category);

          return (<div
              key={item.id}
              className={`bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 group flex flex-col relative ${theme.hoverBorder} ${theme.glow}`}
            >
              <CompareButton productId={item.id} />

              <Link href={`/product/${item.id}`} className="contents">
              <div className="h-48 bg-[#0a0a0a] flex items-center justify-center border-b border-gray-800 relative">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                ) : (
                  <div className="text-center opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className={`w-8 h-10 mx-auto mb-2 border-2 rounded-sm ${theme.border}`}>
                      <div className="w-full h-2 border-b-2 bg-gray-800 border-inherit rounded-t-sm" />
                    </div>
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${theme.text}`}>
                      {item.category}
                    </span>
                    <p className="text-[8px] text-gray-400 uppercase mt-1">Asset Pending</p>
                  </div>
                )}
                {item.approvedBy && item.approvedBy.length > 0 && (
                  <div className="absolute bottom-2 left-2 z-10 flex gap-1">
                    {item.approvedBy
                      .filter((key) => APPROVAL_BADGES[key])
                      .map((key) => (
                        <div key={key} className="relative h-5 w-24 drop-shadow-md">
                          <Image src={APPROVAL_BADGES[key]} alt={`${key} approved`} fill className="object-contain" />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.text}`}>
                  {item.brand}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug mb-2 line-clamp-2 flex-1">
                  {item.name}
                </h3>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                   <div>
                     <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lowest Price</div>
                     <div className="text-xl font-black text-white">
                        ${bestOffer ? bestOffer.price.toFixed(2) : '---'}
                     </div>
                     <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                       Per Serving
                     </div>
                     <div className={`text-sm font-bold mt-0.5 ${theme.text}`}>
                        ${costPerServing !== null ? costPerServing.toFixed(2) : '---'}
                     </div>
                   </div>

                   <div className="text-right">
                     <div className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">
                        {savings !== null ? `Save $${savings.toFixed(2)} vs highest` : '\u00A0'}
                     </div>
                     {(item.nutrition?.proteinGrams || 0) > 0 && (
                       <>
                         <div className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider text-right">
                           Cost / Oz Protein
                         </div>
                         <div className={`text-sm font-bold mt-0.5 text-right ${theme.text}`}>
                            {costPerOzProtein !== null ? `$${costPerOzProtein.toFixed(2)}` : '—'}
                         </div>
                       </>
                     )}
                   </div>
                </div>

                <div className={`w-full mt-4 py-2 text-[11px] font-black uppercase tracking-widest text-black rounded transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.bg} ${theme.hoverBg}`}>
                  <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center text-white text-[8px]">a</div>
                  View Deal →
                </div>
              </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}