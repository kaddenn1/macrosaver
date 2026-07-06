"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button (Hidden on Desktop) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full lg:hidden mb-6 py-3 flex items-center justify-center gap-2 bg-[#111] border border-gray-800 rounded-lg text-sm font-bold text-white tracking-widest uppercase hover:bg-gray-900 transition-colors shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        Filter & Refine
      </button>

      {/* Mobile Dark Overlay (Click to close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* The Drawer (Slide out on mobile, standard block on desktop) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-[#0a0a0a] border-r border-gray-800 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl
        lg:relative lg:transform-none lg:translate-x-0 lg:w-full lg:p-0 lg:border-none lg:bg-transparent lg:z-auto lg:overflow-visible lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        
        {/* Mobile Header & Close Button (Hidden on Desktop) */}
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <span className="text-lg font-black text-white uppercase tracking-widest">Filters</span>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center bg-[#111] border border-gray-800 rounded text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* The Actual Sidebar We Already Built */}
        <Sidebar />

      </div>
    </>
  );
}