"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { normalizeCatalogSort } from "@/lib/catalog-query";

function SortDropdownInner({ allowProteinSort }: { allowProteinSort: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value === "price-low") params.delete("sort");
    else params.set("sort", e.target.value);
    params.delete("page");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // Check the URL to see what the current sort is (default to "price-low")
  const requestedSort = searchParams.get("sort");
  const currentSort = normalizeCatalogSort(requestedSort ?? undefined, allowProteinSort);

  return (
    <select
      aria-label="Sort products by"
      value={currentSort}
      onChange={handleSort}
      className="min-h-11 w-full cursor-pointer rounded border border-gray-700 bg-[#111] px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[#a3e635] sm:w-auto"
    >
      <option value="price-low">Sort by: Lowest cost per serving</option>
      {allowProteinSort && <option value="protein-high">Sort by: Highest protein</option>}
    </select>
  );
}

export default function SortDropdown({ allowProteinSort = true }: { allowProteinSort?: boolean }) {
  return (
    <Suspense fallback={<div className="w-full sm:w-auto h-[38px] bg-[#111] border border-gray-800 rounded" />}>
      <SortDropdownInner allowProteinSort={allowProteinSort} />
    </Suspense>
  );
}
