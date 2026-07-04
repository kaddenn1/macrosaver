import React from 'react';

export default function Navbar() {
  return (
    <header className="w-full bg-black border-b border-neutral-900 sticky top-0 z-50 backdrop-blur-md bg-black/90 flex justify-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        
        {/* LOGO IDENTITY */}
        <div className="flex flex-col">
          <span className="text-2xl font-black text-lime-500 tracking-tight leading-none">
            Macro<span className="text-white">Saver</span>
          </span>
          <span className="text-[9px] font-bold text-lime-500/80 tracking-widest uppercase mt-1 hidden sm:block">
            Know Where Every Dollar Goes
          </span>
        </div>

        {/* NAVIGATION LINKS - USING GAP CLOSURES TO PREVENT TEXT SQUISHING */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-neutral-400">
          <a href="#protein" className="hover:text-white transition duration-150">Protein</a>
          <a href="#creatine" className="hover:text-white transition duration-150">Creatine</a>
          <a href="#pre-workout" className="hover:text-white transition duration-150">Pre-Workout</a>
          <a href="#electrolytes" className="hover:text-white transition duration-150">Electrolytes</a>
          <a href="#recovery" className="hover:text-white transition duration-150">Recovery</a>
          <a href="#best-deals" className="hover:text-white transition duration-150 text-lime-500">Best Deals</a>
        </nav>

        {/* CTA ACTIONS */}
        <div className="flex items-center gap-4">
          <button className="border border-lime-500/50 text-lime-400 bg-lime-500/5 px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase hover:bg-lime-500 hover:text-black hover:border-lime-500 transition-all duration-200 flex items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.05)]">
            <span className="text-sm">⠿</span> Browse All Categories
          </button>
        </div>

      </div>
    </header>
  );
}