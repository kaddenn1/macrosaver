"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getValueScore,
  getSavingsVsHighestOffer,
  extractFlavor,
} from "@/lib/macrosaver-engine";
import type { Product } from "@/data/types";
import { getTheme } from "@/lib/theme";

interface ChampionsProps {
  filterCategory?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Champions({ filterCategory, searchParams }: ChampionsProps) {
  let displayProducts = [...products] as Product[];

  if (filterCategory) {
    displayProducts = displayProducts.filter((p) => p.category.toLowerCase() === filterCategory.toLowerCase());
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

  const currentSort = (searchParams?.sort as string) || 'value';
  displayProducts.sort((a, b) => {
    if (currentSort === 'price-low') {
      const costA = getCostPerServing(a) ?? 999;
      const costB = getCostPerServing(b) ?? 999;
      return costA - costB;
    }
    if (currentSort === 'protein-high') {
      const proA = a.nutrition?.proteinGrams || 0;
      const proB = b.nutrition?.proteinGrams || 0;
      return proB - proA;
    }
    return getValueScore(b) - getValueScore(a);
  });

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
          🔥 Best Deals Right Now
        </h2>
        <a href="#" className="text-xs text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
          View All Best Deals →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 text-sm border-2 border-dashed border-gray-800 rounded-xl">
            No products found matching those filters. Try adjusting your selections!
          </div>
        )}

        {displayProducts.map((item) => {
          const bestOffer = getBestOffer(item);
          const costPerServing = getCostPerServing(item);
          const costPerOzProtein = getCostPerOzProtein(item);
          const valueScore = getValueScore(item);
          const savings = getSavingsVsHighestOffer(item);

          const theme = getTheme(item.category);

          return (<Link
              href={`/product/${item.id}`}
              key={item.id}
              className={`bg-[#111] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 group flex flex-col relative ${theme.hoverBorder} ${theme.glow}`}
            >

              <div className="flex justify-between items-center p-3 absolute w-full top-0 left-0 z-10">
                <div className="text-center">
                  <div className={`text-sm font-black ${valueScore > 90 ? theme.text : 'text-gray-300'}`}>
                    {valueScore}
                  </div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest leading-none">
                    Value Score
                  </div>
                </div>
                {valueScore > 90 && (
                   <div className={`text-[10px] uppercase tracking-wider font-bold bg-[#111]/80 px-2 py-1 rounded backdrop-blur-sm ${theme.text}`}>
                     Most Popular
                   </div>
                )}
              </div>

              <div className="h-48 bg-[#0a0a0a] flex items-center justify-center border-b border-gray-800 relative pt-8">
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
                    <p className="text-[8px] text-gray-500 uppercase mt-1">Asset Pending</p>
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
                     <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Lowest Price</div>
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
                     <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">
                        {savings !== null ? `Save $${savings.toFixed(2)} vs highest` : '\u00A0'}
                     </div>
                     <div className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider text-right">
                       Cost / Oz Protein
                     </div>
                     <div className={`text-sm font-bold mt-0.5 text-right ${theme.text}`}>
                        {costPerOzProtein !== null ? `$${costPerOzProtein.toFixed(2)}` : '—'}
                     </div>
                   </div>
                </div>

                <div className={`w-full mt-4 py-2 text-[11px] font-black uppercase tracking-widest text-black rounded transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 ${theme.bg} ${theme.hoverBg}`}>
                  <div className="w-3 h-3 bg-black rounded-full flex items-center justify-center text-white text-[8px]">a</div>
                  Compare →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}