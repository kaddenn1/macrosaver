"use client";

import { useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { products } from "@/data/products";
import { getCostPerServing, extractFlavor } from "@/lib/macrosaver-engine";
import type { Product } from "@/data/types";

const PROTEIN_THRESHOLDS = [20, 25, 30];

function SidebarInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Derive the active category (if any) so counts reflect what's actually on screen.
  const categoryMatch = pathname.match(/^\/category\/([^/]+)/);
  const activeCategory = categoryMatch ? categoryMatch[1] : null;
  const isProteinCategory = activeCategory === "protein";
  const allProducts = products as Product[];
  const baseProducts = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  const costs = baseProducts
    .map((p) => getCostPerServing(p))
    .filter((c): c is number => c !== null);
  const minCost = costs.length ? Math.min(...costs) : 0.1;
  const maxCost = costs.length ? Math.max(...costs) : 2.0;

  const proteinCounts = PROTEIN_THRESHOLDS.map(
    (threshold) => baseProducts.filter((p) => (p.nutrition?.proteinGrams || 0) >= threshold).length
  );

  const clearProteinCount = baseProducts.filter((p) => p.name.toLowerCase().includes("clear")).length;

  // Flavors present among the current category's products (skips single-variant products
  // like "Casein Protein" that have no flavor segment in their name).
  const flavorCounts = new Map<string, number>();
  baseProducts.forEach((p) => {
    const flavor = extractFlavor(p.name);
    if (flavor) flavorCounts.set(flavor, (flavorCounts.get(flavor) || 0) + 1);
  });
  const flavors = Array.from(flavorCounts.keys()).sort();

  const handleCheck = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const isChecked = (key: string, value: string) => searchParams.get(key) === value;

  // Price slider: local state drives the visual drag, committed to the URL (debounced) so
  // navigation doesn't fire on every pixel of movement.
  const urlMaxPrice = searchParams.get("maxPrice");
  const [sliderValue, setSliderValue] = useState(
    urlMaxPrice ? parseFloat(urlMaxPrice) : maxCost
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value >= maxCost) {
        params.delete("maxPrice");
      } else {
        params.set("maxPrice", value.toFixed(2));
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 250);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-4">
          Refine Results
        </h3>

        {/* Price Per Serving Slider */}
        <div className="mb-6">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Price Per Serving</div>
          <input
            type="range"
            aria-label="Maximum price per serving"
            min={minCost}
            max={maxCost}
            step={0.01}
            value={sliderValue}
            onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
            className="w-full accent-[#a3e635]"
            disabled={minCost === maxCost}
          />
          <div className="flex justify-between text-[10px] text-[#a3e635] font-bold mt-1">
            <span>${minCost.toFixed(2)}</span>
            <span>Up to ${sliderValue.toFixed(2)}</span>
          </div>
        </div>

        {/* Protein Per Serving Filter - only relevant when browsing Protein */}
        {isProteinCategory && (
          <div className="mb-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Protein Per Serving</div>
            <div className="flex flex-col gap-2">
              {PROTEIN_THRESHOLDS.map((threshold, idx) => (
                <div
                  key={threshold}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => handleCheck('protein', String(threshold))}
                >
                  <div className={`w-3 h-3 rounded-[2px] border flex items-center justify-center transition-colors ${isChecked('protein', String(threshold)) ? 'bg-[#a3e635] border-[#a3e635]' : 'bg-[#111] border-gray-700 group-hover:border-gray-500'}`}>
                    {isChecked('protein', String(threshold)) && <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-xs ${isChecked('protein', String(threshold)) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{threshold}g+</span>
                  <span className="text-[9px] text-gray-400 ml-auto">({proteinCounts[idx]})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clear Protein - only relevant when browsing Protein */}
        {isProteinCategory && clearProteinCount > 0 && (
          <div className="mb-6">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Protein Type</div>
            <div
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => handleCheck('type', 'clear')}
            >
              <div className={`w-3 h-3 rounded-[2px] border flex items-center justify-center transition-colors ${isChecked('type', 'clear') ? 'bg-[#a3e635] border-[#a3e635]' : 'bg-[#111] border-gray-700 group-hover:border-gray-500'}`}>
                {isChecked('type', 'clear') && <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className={`text-xs ${isChecked('type', 'clear') ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>Clear Protein</span>
              <span className="text-[9px] text-gray-400 ml-auto">({clearProteinCount})</span>
            </div>
          </div>
        )}

        {/* Flavor Filter - shows whenever the current category has more than one flavor */}
        {flavors.length > 1 && (
          <div className="mb-2">
            <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-3">Flavor</div>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
              {flavors.map((flavor) => (
                <div
                  key={flavor}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => handleCheck('flavor', flavor)}
                >
                  <div className={`w-3 h-3 rounded-[2px] border flex items-center justify-center shrink-0 transition-colors ${isChecked('flavor', flavor) ? 'bg-[#a3e635] border-[#a3e635]' : 'bg-[#111] border-gray-700 group-hover:border-gray-500'}`}>
                    {isChecked('flavor', flavor) && <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-xs ${isChecked('flavor', flavor) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{flavor}</span>
                  <span className="text-[9px] text-gray-400 ml-auto">({flavorCounts.get(flavor)})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <Suspense fallback={<div className="w-full h-64" />}>
      <SidebarInner />
    </Suspense>
  );
}
