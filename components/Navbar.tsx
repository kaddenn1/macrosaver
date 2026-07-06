"use client";

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: "/category/protein", label: "Protein" },
  { href: "/category/creatine", label: "Creatine" },
  { href: "/category/preworkout", label: "Pre-Workout" },
  { href: "/category/electrolytes", label: "Electrolytes" },
  { href: "/category/recovery", label: "Recovery" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black border-b border-neutral-900 sticky top-0 z-50 backdrop-blur-md bg-black/90 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">

        {/* LOGO IDENTITY */}
        <Link href="/" className="flex flex-col" onClick={() => setMenuOpen(false)}>
          <span className="text-2xl font-black text-lime-500 tracking-tight leading-none">
            Macro<span className="text-white">Saver</span>
          </span>
          <span className="text-[9px] font-bold text-lime-500/80 tracking-widest uppercase mt-1 hidden sm:block">
            Know Where Every Dollar Goes
          </span>
        </Link>

        {/* NAVIGATION LINKS - DESKTOP ONLY */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-neutral-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition duration-150">
              {link.label}
            </Link>
          ))}
          <Link href="/#best-deals" className="hover:text-white transition duration-150 text-lime-500">
            Best Deals
          </Link>
        </nav>

        {/* CTA ACTIONS */}
        <div className="flex items-center gap-4">
          <Link
            href="/#categories"
            className="hidden sm:flex border border-lime-500/50 text-lime-400 bg-lime-500/5 px-4 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase hover:bg-lime-500 hover:text-black hover:border-lime-500 transition-all duration-200 items-center gap-2 shadow-[0_0_15px_rgba(132,204,22,0.05)]"
          >
            <span className="text-sm">⠿</span> Browse All Categories
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="lg:hidden w-10 h-10 flex items-center justify-center border border-neutral-800 rounded-lg text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

      </div>

      {/* MOBILE MENU PANEL */}
      {menuOpen && (
        <nav className="lg:hidden w-full max-w-[1400px] px-4 sm:px-6 pb-6 flex flex-col gap-1 text-sm font-bold text-neutral-300 border-t border-neutral-900">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 border-b border-neutral-900 hover:text-white transition duration-150"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#best-deals"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-900 text-lime-500 hover:text-lime-400 transition duration-150"
          >
            Best Deals
          </Link>
          <Link
            href="/#categories"
            onClick={() => setMenuOpen(false)}
            className="py-3 text-lime-400 font-black uppercase tracking-wider text-xs"
          >
            ⠿ Browse All Categories
          </Link>
        </nav>
      )}
    </header>
  );
}
