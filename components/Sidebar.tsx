"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FilterFacets } from "@/data/types";

const FILTER_KEYS = ["protein", "maxPrice", "flavor", "type"] as const;

function ChoiceButton({
  checked,
  count,
  label,
  onClick,
}: {
  checked: boolean;
  count: number;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onClick}
      className="group flex min-h-11 w-full items-center gap-2 rounded px-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
    >
      <span
        aria-hidden="true"
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-[#a3e635] bg-[#a3e635]"
            : "border-gray-600 bg-[#111] group-hover:border-gray-400"
        }`}
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
      </span>
      <span className={checked ? "text-xs text-white" : "text-xs text-gray-300"}>{label}</span>
      <span className="ml-auto text-[10px] text-gray-400">({count})</span>
    </button>
  );
}

function SidebarInner({
  activeCategory,
  facets,
}: {
  activeCategory?: string;
  facets: FilterFacets;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idPrefix = useId();
  const maxPriceId = `${idPrefix}-max-price-filter`;
  const proteinLabelId = `${idPrefix}-protein-filter-label`;
  const proteinTypeLabelId = `${idPrefix}-protein-type-filter-label`;
  const flavorLabelId = `${idPrefix}-flavor-filter-label`;
  const paramsString = searchParams.toString();

  const isProteinCategory = activeCategory === "protein";
  const urlMaxPrice = searchParams.get("maxPrice");
  const parsedUrlMax = urlMaxPrice ? Number.parseFloat(urlMaxPrice) : facets.maxCost;
  const urlSliderValue = Number.isFinite(parsedUrlMax)
    ? Math.min(facets.maxCost, Math.max(facets.minCost, parsedUrlMax))
    : facets.maxCost;
  const sliderSource = `${urlMaxPrice ?? ""}:${facets.minCost}:${facets.maxCost}`;
  const [sliderDraft, setSliderDraft] = useState({
    value: urlSliderValue,
    source: sliderSource,
  });
  const sliderValue =
    sliderDraft.source === sliderSource ? sliderDraft.value : urlSliderValue;

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    []
  );

  const replaceParams = (params: URLSearchParams) => {
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleChoice = (key: string, value: string) => {
    const params = new URLSearchParams(paramsString);
    params.delete("page");
    if (params.get(key) === value) params.delete(key);
    else params.set(key, value);
    replaceParams(params);
  };

  const handleSliderChange = (value: number) => {
    setSliderDraft({ value, source: sliderSource });
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(paramsString);
      params.delete("page");
      if (value >= facets.maxCost) params.delete("maxPrice");
      else params.set("maxPrice", value.toFixed(2));
      replaceParams(params);
    }, 250);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(paramsString);
    FILTER_KEYS.forEach((key) => params.delete(key));
    replaceParams(params);
  };

  const hasFilters = FILTER_KEYS.some((key) => searchParams.has(key));
  const isChecked = (key: string, value: string) => searchParams.get(key) === value;
  const canSlide = facets.maxCost > facets.minCost;

  return (
    <aside className="flex w-full flex-col gap-6" aria-label="Product filters">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-white">
          Refine Results
        </h2>
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-11 text-[10px] font-bold uppercase tracking-wider text-[#a3e635] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <label
          htmlFor={maxPriceId}
          className="mb-2 block text-[10px] uppercase tracking-widest text-gray-300"
        >
          Maximum cost per serving
        </label>
        <input
          id={maxPriceId}
          type="range"
          min={facets.minCost}
          max={facets.maxCost}
          step={0.01}
          value={sliderValue}
          onChange={(event) => handleSliderChange(Number.parseFloat(event.target.value))}
          className="w-full accent-[#a3e635] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]"
          disabled={!canSlide}
        />
        <div className="mt-1 flex justify-between text-[10px] font-bold text-[#a3e635]">
          <span>${facets.minCost.toFixed(2)}</span>
          <span>Up to ${sliderValue.toFixed(2)}</span>
        </div>
      </div>

      {isProteinCategory && (
        <div role="group" aria-labelledby={proteinLabelId}>
          <div
            id={proteinLabelId}
            className="mb-1 text-[10px] uppercase tracking-widest text-gray-300"
          >
            Minimum protein per serving
          </div>
          {facets.proteinThresholds.map(({ value, count }) => (
            <ChoiceButton
              key={value}
              checked={isChecked("protein", String(value))}
              count={count}
              label={`${value}g+`}
              onClick={() => handleChoice("protein", String(value))}
            />
          ))}
        </div>
      )}

      {isProteinCategory && facets.clearProteinCount > 0 && (
        <div role="group" aria-labelledby={proteinTypeLabelId}>
          <div
            id={proteinTypeLabelId}
            className="mb-1 text-[10px] uppercase tracking-widest text-gray-300"
          >
            Protein type
          </div>
          <ChoiceButton
            checked={isChecked("type", "clear")}
            count={facets.clearProteinCount}
            label="Clear protein"
            onClick={() => handleChoice("type", "clear")}
          />
        </div>
      )}

      {facets.flavors.length > 1 && (
        <div role="group" aria-labelledby={flavorLabelId}>
          <div
            id={flavorLabelId}
            className="mb-1 text-[10px] uppercase tracking-widest text-gray-300"
          >
            Flavor
          </div>
          <div className="max-h-72 overflow-y-auto pr-1">
            {facets.flavors.map(({ value, count }) => (
              <ChoiceButton
                key={value}
                checked={isChecked("flavor", value)}
                count={count}
                label={value}
                onClick={() => handleChoice("flavor", value)}
              />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default function Sidebar(props: { activeCategory?: string; facets: FilterFacets }) {
  return (
    <Suspense fallback={<div className="h-64 w-full" />}>
      <SidebarInner {...props} />
    </Suspense>
  );
}
