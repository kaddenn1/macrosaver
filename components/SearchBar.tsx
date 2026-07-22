"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SearchBarInner({ label }: { label: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchTerm = searchParams.get("q") || "";
  const [draft, setDraft] = useState({ value: urlSearchTerm, source: urlSearchTerm });
  const searchTerm = draft.source === urlSearchTerm ? draft.value : urlSearchTerm;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const normalizedSearchTerm = searchTerm.trim();
      if (normalizedSearchTerm === urlSearchTerm) return;

      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");
      if (normalizedSearchTerm) {
        params.set("q", normalizedSearchTerm);
      } else {
        params.delete("q");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [pathname, router, searchParams, searchTerm, urlSearchTerm]);

  return (
    <div className="relative w-full sm:w-[300px]">
      <input
        type="search"
        aria-label={label}
        placeholder={`${label}...`}
        value={searchTerm}
        onChange={(e) => setDraft({ value: e.target.value, source: urlSearchTerm })}
        className="min-h-11 w-full bg-[#111] border border-gray-700 text-sm rounded-lg pl-4 pr-12 py-2.5 text-white focus:outline-none focus:border-[#a3e635] transition-all placeholder:text-gray-500 shadow-inner"
      />

      {/* The Clear "X" Button */}
      {searchTerm && (
        <button
          type="button"
          onClick={() => setDraft({ value: "", source: urlSearchTerm })}
          aria-label="Clear product search"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-gray-400 transition-colors hover:text-white"
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function SearchBar({
  label = "Search brands or products",
}: {
  label?: string;
}) {
  return (
    <Suspense fallback={<div className="w-full sm:w-[300px] h-[42px] bg-[#111] border border-gray-800 rounded-lg" />}>
      <SearchBarInner label={label} />
    </Suspense>
  );
}
