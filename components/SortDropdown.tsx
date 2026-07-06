"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    
    // Push the new URL without reloading the page
    router.push(`${pathname}?${params.toString()}`);
  };

  // Check the URL to see what the current sort is (default to "value")
  const currentSort = searchParams.get("sort") || "value";

  return (
    <select 
      value={currentSort}
      onChange={handleSort}
      className="w-full sm:w-auto bg-[#111] border border-gray-800 text-sm rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-gray-500 cursor-pointer"
    >
      <option value="value">Sort by: Best Value</option>
      <option value="price-low">Sort by: Lowest Price (Per Serving)</option>
      <option value="protein-high">Sort by: Highest Protein</option>
    </select>
  );
}