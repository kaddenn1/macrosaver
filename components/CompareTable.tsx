"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getProteinPerDollar,
} from "@/lib/macrosaver-engine";
import { getTheme } from "@/lib/theme";
import { useCompare } from "./CompareContext";
import type { Product } from "@/data/types";

type Row = {
  label: string;
  render: (product: Product) => React.ReactNode;
  /** For picking a winner to highlight. Returns a comparable number, or null if not applicable. */
  metric?: (product: Product) => number | null;
  /** "min" = lowest wins, "max" = highest wins */
  better?: "min" | "max";
};

function formatMoney(value: number | null): string {
  return value !== null ? `$${value.toFixed(2)}` : "—";
}

export default function CompareTable() {
  const { ids, remove, clear } = useCompare();

  const selectedProducts = ids
    .map((id) => (products as Product[]).find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

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

  const showCreatine = selectedProducts.some((p) => p.nutrition.creatineGrams !== undefined);
  const showElectrolytes = selectedProducts.some(
    (p) => p.nutrition.electrolytesMilligrams !== undefined
  );

  const rows: Row[] = [
    {
      label: "Lowest Price",
      render: (p) => formatMoney(getBestOffer(p)?.price ?? null),
      metric: (p) => getBestOffer(p)?.price ?? null,
      better: "min",
    },
    {
      label: "Cost / Serving",
      render: (p) => formatMoney(getCostPerServing(p)),
      metric: (p) => getCostPerServing(p),
      better: "min",
    },
    {
      label: "Cost / Oz Protein",
      render: (p) => (p.nutrition.proteinGrams > 0 ? formatMoney(getCostPerOzProtein(p)) : "—"),
      metric: (p) => (p.nutrition.proteinGrams > 0 ? getCostPerOzProtein(p) : null),
      better: "min",
    },
    {
      label: "Protein / Dollar",
      render: (p) => {
        const v = getProteinPerDollar(p);
        return v !== null ? `${v.toFixed(1)}g` : "—";
      },
      metric: (p) => getProteinPerDollar(p),
      better: "max",
    },
    { label: "Servings", render: (p) => p.servings },
    { label: "Serving Size", render: (p) => p.nutrition.servingSize ?? "—" },
    {
      label: "Calories",
      render: (p) => p.nutrition.calories ?? "—",
      metric: (p) => p.nutrition.calories ?? null,
    },
    {
      label: "Protein",
      render: (p) => `${p.nutrition.proteinGrams}g`,
      metric: (p) => p.nutrition.proteinGrams,
      better: "max",
    },
    {
      label: "Carbs",
      render: (p) => (p.nutrition.carbsGrams !== undefined ? `${p.nutrition.carbsGrams}g` : "—"),
      metric: (p) => p.nutrition.carbsGrams ?? null,
    },
    {
      label: "Fat",
      render: (p) => (p.nutrition.fatGrams !== undefined ? `${p.nutrition.fatGrams}g` : "—"),
      metric: (p) => p.nutrition.fatGrams ?? null,
    },
    {
      label: "Sugar",
      render: (p) => (p.nutrition.sugarGrams !== undefined ? `${p.nutrition.sugarGrams}g` : "—"),
      metric: (p) => p.nutrition.sugarGrams ?? null,
      better: "min",
    },
    {
      label: "Sodium",
      render: (p) =>
        p.nutrition.sodiumMilligrams !== undefined ? `${p.nutrition.sodiumMilligrams}mg` : "—",
      metric: (p) => p.nutrition.sodiumMilligrams ?? null,
      better: "min",
    },
    ...(showCreatine
      ? [
          {
            label: "Creatine",
            render: (p: Product) =>
              p.nutrition.creatineGrams !== undefined ? `${p.nutrition.creatineGrams}g` : "—",
          } as Row,
        ]
      : []),
    ...(showElectrolytes
      ? [
          {
            label: "Electrolytes",
            render: (p: Product) =>
              p.nutrition.electrolytesMilligrams !== undefined
                ? `${p.nutrition.electrolytesMilligrams}mg`
                : "—",
          } as Row,
        ]
      : []),
  ];

  function winner(row: Row): string | null {
    if (!row.metric || !row.better) return null;
    const values = selectedProducts
      .map((p) => ({ id: p.id, value: row.metric!(p) }))
      .filter((v): v is { id: string; value: number } => v.value !== null);
    if (values.length < 2) return null;
    const best = values.reduce((acc, cur) =>
      row.better === "min" ? (cur.value < acc.value ? cur : acc) : cur.value > acc.value ? cur : acc
    );
    return best.id;
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <button
          onClick={clear}
          className="text-xs text-gray-400 hover:text-white uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <div
          className="grid gap-px bg-gray-800 rounded-xl overflow-hidden min-w-[640px]"
          style={{
            gridTemplateColumns: `140px repeat(${selectedProducts.length}, minmax(180px, 1fr))`,
          }}
        >
          {/* Header row */}
          <div className="bg-[#0a0a0a]" />
          {selectedProducts.map((p) => {
            const theme = getTheme(p.category);
            const bestOffer = getBestOffer(p);
            return (
              <div key={p.id} className="bg-[#111] p-3 flex flex-col items-center text-center relative">
                <button
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.name} from compare`}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-800 text-gray-300 text-xs flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                >
                  ×
                </button>
                <div className="h-20 w-20 flex items-center justify-center mb-2">
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
                    className={`mt-auto w-full py-1.5 text-[10px] font-black uppercase tracking-widest text-black rounded transition-transform hover:scale-[1.02] ${theme.bg} ${theme.hoverBg}`}
                  >
                    Buy →
                  </a>
                )}
              </div>
            );
          })}

          {/* Metric rows */}
          {rows.map((row) => {
            const winnerId = winner(row);
            return (
              <Fragment key={row.label}>
                <div className="bg-[#0a0a0a] p-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center">
                  {row.label}
                </div>
                {selectedProducts.map((p) => {
                  const theme = getTheme(p.category);
                  const isWinner = winnerId === p.id;
                  return (
                    <div
                      key={`${row.label}-${p.id}`}
                      className={`p-3 text-sm text-center flex items-center justify-center ${
                        isWinner ? "bg-[#111]" : "bg-[#0d0d0d]"
                      } ${isWinner ? `font-black ${theme.text}` : "text-gray-300"}`}
                    >
                      {row.render(p)}
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
