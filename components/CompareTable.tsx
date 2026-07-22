"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getProteinPerDollar,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";
import { getTheme } from "@/lib/theme";
import { getMetricHighlights, type ComparisonDirection } from "@/lib/compare";
import { useCompare } from "./CompareContext";
import type { Product } from "@/data/types";

type Row = {
  label: string;
  render: (product: Product) => React.ReactNode;
  /** Factual numeric comparison used for optional lowest/highest highlighting. */
  metric?: (product: Product) => number | null;
  direction?: ComparisonDirection;
  highlightLabel?: string;
};

function formatMoney(value: number | null): string {
  return value !== null ? `$${value.toFixed(2)}` : "—";
}

export default function CompareTable() {
  const { ids, remove, clear, reconcile } = useCompare();
  const idsKey = ids.join(",");

  const selectedProducts = ids
    .map((id) => (products as Product[]).find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  useEffect(() => {
    const requestedIds = idsKey ? idsKey.split(",") : [];
    const validIds = requestedIds.filter((id) =>
      (products as Product[]).some((product) => product.id === id)
    );
    reconcile(requestedIds, validIds);
  }, [idsKey, reconcile]);

  if (selectedProducts.length === 0) {
    return (
      <div className="py-20 text-center border-2 border-dashed border-gray-800 rounded-xl">
        <p className="text-gray-400 text-sm mb-4">
          Nothing to compare yet. Browse any category and hit{" "}
          <span className="text-lime-500 font-bold">Compare</span> on up to 4 products.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded bg-lime-500 hover:bg-lime-400 text-black text-xs font-black uppercase tracking-widest transition-colors"
        >
          Browse Products →
        </Link>
      </div>
    );
  }

  const showCreatine = selectedProducts.some(
    (p) => supportsServingMetrics(p) && p.nutrition.creatineGrams !== undefined
  );
  const showElectrolytes = selectedProducts.some(
    (p) => supportsServingMetrics(p) && p.nutrition.electrolytesMilligrams !== undefined
  );
  const comparesDifferentCategories =
    new Set(selectedProducts.map((product) => product.category)).size > 1;

  const rows: Row[] = [
    {
      label: "Undated Price Snapshot",
      render: (p) => formatMoney(getBestOffer(p)?.price ?? null),
      metric: (p) => getBestOffer(p)?.price ?? null,
      direction: "min",
      highlightLabel: "lowest listed package price",
    },
    {
      label: "Cost / Serving",
      render: (p) => formatMoney(getCostPerServing(p)),
      metric: (p) => getCostPerServing(p),
      direction: "min",
      highlightLabel: "lowest listed cost per serving",
    },
    {
      label: "Cost / Oz Protein",
      render: (p) =>
        supportsServingMetrics(p) && p.nutrition.proteinGrams > 0
          ? formatMoney(getCostPerOzProtein(p))
          : "—",
      metric: (p) =>
        supportsServingMetrics(p) && p.nutrition.proteinGrams > 0
          ? getCostPerOzProtein(p)
          : null,
      direction: "min",
      highlightLabel: "lowest cost per ounce of protein",
    },
    {
      label: "Protein / Dollar",
      render: (p) => {
        const v = getProteinPerDollar(p);
        return v !== null ? `${v.toFixed(1)}g` : "—";
      },
      metric: (p) => getProteinPerDollar(p),
      direction: "max",
      highlightLabel: "highest protein per dollar",
    },
    {
      label: "Servings",
      render: (p) => (supportsServingMetrics(p) ? p.servings : "—"),
    },
    {
      label: "Serving Size",
      render: (p) => (supportsServingMetrics(p) ? p.nutrition.servingSize ?? "—" : "—"),
    },
    {
      label: "Calories",
      render: (p) =>
        supportsServingMetrics(p) ? p.nutrition.calories ?? "—" : "—",
      metric: (p) =>
        supportsServingMetrics(p) ? p.nutrition.calories ?? null : null,
    },
    {
      label: "Protein",
      render: (p) =>
        supportsServingMetrics(p) ? `${p.nutrition.proteinGrams}g` : "—",
    },
    {
      label: "Carbs",
      render: (p) =>
        supportsServingMetrics(p) && p.nutrition.carbsGrams !== undefined
          ? `${p.nutrition.carbsGrams}g`
          : "—",
      metric: (p) =>
        supportsServingMetrics(p) ? p.nutrition.carbsGrams ?? null : null,
    },
    {
      label: "Fat",
      render: (p) =>
        supportsServingMetrics(p) && p.nutrition.fatGrams !== undefined
          ? `${p.nutrition.fatGrams}g`
          : "—",
      metric: (p) =>
        supportsServingMetrics(p) ? p.nutrition.fatGrams ?? null : null,
    },
    {
      label: "Sugar",
      render: (p) =>
        supportsServingMetrics(p) && p.nutrition.sugarGrams !== undefined
          ? `${p.nutrition.sugarGrams}g`
          : "—",
    },
    {
      label: "Sodium",
      render: (p) =>
        supportsServingMetrics(p) && p.nutrition.sodiumMilligrams !== undefined
          ? `${p.nutrition.sodiumMilligrams}mg`
          : "—",
    },
    ...(showCreatine
      ? [
          {
            label: "Creatine",
            render: (p: Product) =>
              supportsServingMetrics(p) && p.nutrition.creatineGrams !== undefined
                ? `${p.nutrition.creatineGrams}g`
                : "—",
          } as Row,
        ]
      : []),
    ...(showElectrolytes
      ? [
          {
            label: "Electrolytes",
            render: (p: Product) =>
              supportsServingMetrics(p) && p.nutrition.electrolytesMilligrams !== undefined
                ? `${p.nutrition.electrolytesMilligrams}mg`
                : "—",
          } as Row,
        ]
      : []),
  ];

  function highlights(row: Row): { ids: Set<string>; isTie: boolean } {
    if (!row.metric || !row.direction || !row.highlightLabel || comparesDifferentCategories) {
      return { ids: new Set(), isTie: false };
    }

    return getMetricHighlights(
      selectedProducts.map((product) => ({ id: product.id, value: row.metric!(product) })),
      row.direction
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          type="button"
          onClick={clear}
          className="min-h-11 text-xs text-gray-400 hover:text-white uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      {comparesDifferentCategories && (
        <p className="mb-4 rounded-lg border border-amber-400/25 bg-amber-400/5 p-3 text-xs leading-relaxed text-gray-300">
          These products use different serving definitions. Compare package price and label values
          carefully; a lower cost per serving is not automatically a like-for-like value advantage.
          Lowest/highest highlights are disabled for mixed-category comparisons.
        </p>
      )}

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="min-w-[640px] overflow-hidden rounded-xl bg-gray-800">
          <table
            className="w-full border-separate text-left"
            style={{ borderSpacing: "1px" }}
          >
            <caption className="sr-only">
              Side-by-side price, serving value, and nutrition comparison
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[140px] bg-[#0a0a0a] p-3 text-xs text-gray-300">
                  Metric
                </th>
          {selectedProducts.map((p) => {
            const theme = getTheme(p.category);
            const bestOffer = getBestOffer(p);
            return (
              <th
                key={p.id}
                scope="col"
                className="relative min-w-[180px] bg-[#111] p-3 text-center align-top font-normal"
              >
                <button
                  type="button"
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.name} from compare`}
                  className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <span aria-hidden="true">×</span>
                </button>
                <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={80}
                      height={80}
                      className="object-contain h-full w-auto"
                    />
                  ) : (
                    <span className="text-[9px] text-gray-400 uppercase">No Image</span>
                  )}
                </div>
                <div className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${theme.text}`}>
                  {p.brand}
                </div>
                <Link
                  href={`/product/${p.id}`}
                  className="text-xs text-white font-bold leading-snug line-clamp-3 hover:underline mb-2"
                >
                  {p.name}
                </Link>
                {bestOffer && (
                  <a
                    href={bestOffer.url}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    aria-label={`View ${p.name} at ${bestOffer.retailer} for $${bestOffer.price.toFixed(2)} (opens in a new tab)`}
                    className={`mt-auto inline-flex min-h-11 w-full items-center justify-center rounded py-2 text-[10px] font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.02] ${theme.bg} ${theme.hoverBg}`}
                  >
                    View offer →
                  </a>
                )}
              </th>
            );
          })}
              </tr>
            </thead>

            <tbody>
          {rows.map((row) => {
            const highlighted = highlights(row);
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="bg-[#0a0a0a] p-3 text-[10px] font-bold text-gray-300 uppercase tracking-wider"
                >
                  {row.label}
                </th>
                {selectedProducts.map((p) => {
                  const theme = getTheme(p.category);
                  const isHighlighted = highlighted.ids.has(p.id);
                  return (
                    <td
                      key={`${row.label}-${p.id}`}
                      className={`p-3 text-center text-sm ${
                        isHighlighted ? "bg-[#111]" : "bg-[#0d0d0d]"
                      } ${isHighlighted ? `font-black ${theme.text}` : "text-gray-300"}`}
                    >
                      {row.render(p)}
                      {isHighlighted && (
                        <span className="sr-only">
                          {highlighted.isTie ? " — tied for " : " — "}
                          {row.highlightLabel}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
