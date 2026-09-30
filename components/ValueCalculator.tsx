"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import {
  costPerOzProtein,
  costPerServing,
  proteinPerDollar,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";

export default function ValueCalculator({ product }: { product: Product }) {
  const [priceInput, setPriceInput] = useState("");

  const servingMetricsApply = supportsServingMetrics(product);
  const proteinGramsPerServing = product.nutrition.proteinGrams ?? 0;
  const hasProtein = servingMetricsApply && proteinGramsPerServing > 0;

  const price = Number.parseFloat(priceInput);
  const hasValidPrice = priceInput.trim() !== "" && Number.isFinite(price) && price > 0;

  const perServing = hasValidPrice && servingMetricsApply
    ? costPerServing(price, product.servings)
    : null;
  const perDollar = hasValidPrice && hasProtein
    ? proteinPerDollar(price, proteinGramsPerServing, product.servings)
    : null;
  const perOzProtein = hasValidPrice && hasProtein
    ? costPerOzProtein(price, proteinGramsPerServing, product.servings)
    : null;

  if (!servingMetricsApply) return null;

  return (
    <div className="mb-8 rounded-xl border border-gray-800 bg-[#111] p-4">
      <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-1">
        Value Calculator
      </h2>
      <p className="text-xs text-gray-400 mb-3">
        Type in the price you see at the retailer to work out what it actually costs you — nothing
        is saved or tracked.
      </p>

      <label htmlFor="value-calc-price" className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1">
        Enter the price you see: $
      </label>
      <input
        id="value-calc-price"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        placeholder="0.00"
        value={priceInput}
        onChange={(event) => setPriceInput(event.target.value)}
        className="w-full max-w-[160px] rounded border border-gray-700 bg-[#0a0a0a] px-3 py-2 text-sm text-white focus:outline-none focus:border-[#a3e635]"
      />

      <div className={`mt-4 grid gap-4 ${hasProtein ? "grid-cols-3" : "grid-cols-1"}`}>
        <div>
          <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cost / Serving</div>
          <div className="text-lg font-black text-white">
            {perServing !== null ? `$${perServing.toFixed(2)}` : "—"}
          </div>
        </div>
        {hasProtein && (
          <>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Protein / $</div>
              <div className="text-lg font-black text-white">
                {perDollar !== null ? `${perDollar.toFixed(1)}g` : "—"}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Cost / Oz Protein</div>
              <div className="text-lg font-black text-white">
                {perOzProtein !== null ? `$${perOzProtein.toFixed(2)}` : "—"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
