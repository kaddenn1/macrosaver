"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPARE_LIMIT, useCompare } from "./CompareContext";

type ProductSummary = {
  id: string;
  name: string;
  brand: string;
  image?: string;
};

type ProductResult = {
  key: string;
  products: ProductSummary[];
  status: "idle" | "ready" | "error";
};

function isProductSummary(value: unknown): value is ProductSummary {
  if (!value || typeof value !== "object") return false;
  const summary = value as Partial<ProductSummary>;
  return (
    typeof summary.id === "string" &&
    /^[a-zA-Z0-9_-]{1,100}$/.test(summary.id) &&
    typeof summary.name === "string" &&
    typeof summary.brand === "string" &&
    (summary.image === undefined || typeof summary.image === "string")
  );
}

export default function CompareTray() {
  const { ids, remove, clear, reconcile } = useCompare();
  const pathname = usePathname();
  const idsKey = ids.join(",");
  const [result, setResult] = useState<ProductResult>({
    key: "",
    products: [],
    status: "idle",
  });
  const selectedProducts = result.key === idsKey ? result.products : [];
  const resultStatus = result.key === idsKey ? result.status : "idle";

  useEffect(() => {
    if (!idsKey || pathname === "/compare") return;

    const controller = new AbortController();
    const requestedIds = idsKey.split(",");
    const query = new URLSearchParams({ ids: idsKey });
    fetch(`/api/products?${query}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: unknown) => {
        if (!Array.isArray(data)) return Promise.reject();

        const requested = new Set(requestedIds);
        const summariesById = new Map(
          data
            .filter(isProductSummary)
            .filter((product) => requested.has(product.id))
            .map((product) => [product.id, product])
        );
        const validIds = requestedIds.filter((id) => summariesById.has(id));

        reconcile(requestedIds, validIds);
        setResult({
          key: validIds.join(","),
          products: validIds.map((id) => summariesById.get(id)!),
          status: "ready",
        });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setResult({ key: idsKey, products: [], status: "error" });
        }
      });

    return () => controller.abort();
  }, [idsKey, pathname, reconcile]);

  if (ids.length === 0 || pathname === "/compare") return null;

  return (
    <>
      <div aria-hidden className="h-36 sm:h-[152px]" />
      <aside
        aria-label="Product comparison selection"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-800 bg-[#0a0a0a]/95 backdrop-blur-md"
      >
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-3 px-3 py-3 sm:flex-nowrap sm:gap-8 sm:px-6 sm:py-6">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto sm:gap-4">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-gray-800 bg-[#111] sm:h-24 sm:w-24"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    className="object-contain p-1 sm:p-2"
                    sizes="(max-width: 640px) 48px, 96px"
                  />
                ) : (
                  <span className="px-1 text-center text-[9px] uppercase text-gray-300">
                    {product.brand}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => remove(product.id)}
                  aria-label={`Remove ${product.name} from compare`}
                  className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-base text-gray-200 transition-colors hover:bg-red-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635] sm:h-10 sm:w-10"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            ))}
            {selectedProducts.length === 0 && resultStatus === "idle" && (
              <span className="text-xs text-gray-300">Loading selected products…</span>
            )}
            {selectedProducts.length === 0 && resultStatus === "error" && (
              <span className="text-xs text-amber-200">Product previews are unavailable.</span>
            )}
          </div>

          <span className="text-xs uppercase tracking-wider text-gray-300">
            {ids.length}/{COMPARE_LIMIT}
          </span>

          <button
            type="button"
            onClick={clear}
            className="min-h-11 text-xs uppercase tracking-wider text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
          >
            Clear
          </button>

          <Link
            href="/compare"
            className="flex min-h-11 items-center rounded bg-lime-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-lime-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-8 sm:text-sm"
          >
            Compare {ids.length > 1 ? `(${ids.length})` : ""} →
          </Link>
        </div>
      </aside>
    </>
  );
}
