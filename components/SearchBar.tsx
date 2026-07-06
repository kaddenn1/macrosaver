"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SearchBarInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
    // Only re-run when the user actually types. Including pathname/router/searchParams
    // here would refire this effect on every router.push (searchParams gets a new
    // object identity on every navigation), creating an infinite push loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="relative w-full sm:w-[300px]">
      <input
        type="text"
        placeholder="Search brands or products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#111] border border-gray-800 text-sm rounded-lg pl-4 pr-10 py-2.5 text-white focus:outline-none focus:border-[#a3e635] transition-all placeholder-gray-600 shadow-inner"
      />

      {/* The Clear "X" Button */}
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="w-full sm:w-[300px] h-[42px] bg-[#111] border border-gray-800 rounded-lg" />}>
      <SearchBarInner />
    </Suspense>
  );
}