"use client";

import { useEffect, useRef, useState } from "react";
import type { FilterFacets } from "@/data/types";
import Sidebar from "./Sidebar";

export default function FilterDrawer({
  activeCategory,
  facets,
}: {
  activeCategory?: string;
  facets: FilterFacets;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const openButton = openButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(
          drawerRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href]'
          ) ?? []
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openButton?.focus();
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Filter Button (Hidden on Desktop) */}
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-product-filters"
        className="mb-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-[#111] py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635] lg:hidden"
      >
        <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        Filter & Refine
      </button>

      {/* Mobile Dark Overlay (Click to close) */}
      {isOpen && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* The Drawer (Slide out on mobile, standard block on desktop) */}
      <div
        ref={drawerRef}
        id="mobile-product-filters"
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "true" : undefined}
        aria-labelledby={isOpen ? "mobile-product-filters-title" : undefined}
        className={`
        fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-[#0a0a0a] border-r border-gray-800 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl
        lg:relative lg:transform-none lg:translate-x-0 lg:w-full lg:p-0 lg:border-none lg:bg-transparent lg:z-auto lg:overflow-visible lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>

        {/* Mobile Header & Close Button (Hidden on Desktop) */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <span id="mobile-product-filters-title" className="text-lg font-black text-white uppercase tracking-widest">Filters</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close product filters"
            className="w-11 h-11 flex items-center justify-center bg-[#111] border border-gray-800 rounded text-gray-400 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3e635]"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>

        {/* The Actual Sidebar We Already Built */}
        <Sidebar activeCategory={activeCategory} facets={facets} />

      </div>
    </>
  );
}
