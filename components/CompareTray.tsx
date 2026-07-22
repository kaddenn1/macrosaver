"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { COMPARE_LIMIT, useCompare } from "./CompareContext";
import type { Product } from "@/data/types";

export default function CompareTray() {
  const { ids, remove, clear } = useCompare();

  if (ids.length === 0) return null;

  const selectedProducts = ids
    .map((id) => (products as Product[]).find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      {/* Spacer so the fixed bar doesn't cover footer content/links */}
      <div aria-hidden className="h-[152px]" />
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-800 bg-[#0a0a0a]/95 backdrop-blur-md">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 flex items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className="relative shrink-0 w-24 h-24 bg-[#111] border border-gray-800 rounded-md flex items-center justify-center"
              >
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-contain p-2" sizes="96px" />
                ) : (
                  <span className="text-[14px] text-gray-400 uppercase text-center px-1 leading-tight">
                    {p.brand}
                  </span>
                )}
                <button
                  onClick={() => remove(p.id)}
                  aria-label={`Remove ${p.name} from compare`}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gray-800 text-gray-300 text-lg leading-none flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
            {Array.from({ length: COMPARE_LIMIT - selectedProducts.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="hidden sm:block shrink-0 w-24 h-24 border border-dashed border-gray-800 rounded-md"
              />
            ))}
          </div>

          <span className="hidden sm:block text-sm text-gray-400 uppercase tracking-wider shrink-0">
            {selectedProducts.length}/{COMPARE_LIMIT} selected
          </span>

          <button
            onClick={clear}
            className="text-sm text-gray-400 hover:text-white uppercase tracking-wider shrink-0"
          >
            Clear
          </button>

          <Link
            href="/compare"
            className="shrink-0 px-10 py-4 rounded bg-lime-500 hover:bg-lime-400 text-black text-base font-black uppercase tracking-widest transition-colors"
          >
            Compare {selectedProducts.length > 1 ? `(${selectedProducts.length})` : ""} →
          </Link>
        </div>
      </div>
    </>
  );
}
