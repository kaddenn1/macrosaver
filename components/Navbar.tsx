"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: "/category/protein", label: "Protein" },
  { href: "/category/pre-workout", label: "Pre-Workout" },
  { href: "/category/creatine", label: "Creatine" },
  { href: "/category/weight-management", label: "Weight Management" },
  { href: "/category/food-drink", label: "Food & Drink" },
  { href: "/category/electrolytes", label: "Electrolytes" },
  { href: "/category/gut-health", label: "Gut Health" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black border-b border-neutral-900 sticky top-0 z-50 backdrop-blur-md bg-black/90 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">

        {/* LOGO IDENTITY */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="" width={40} height={40} className="rounded-lg shrink-0" />
          <div className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-black text-lime-500 tracking-tight leading-none">
              Macro<span className="text-white">Saver</span>
            </span>
            <span className="text-[9px] font-bold text-lime-500/80 tracking-widest uppercase mt-1 hidden sm:block">
              Know Where Every Dollar Goes
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS - DESKTOP ONLY */}
        <nav className="hidden xl:flex items-center gap-5 text-[13px] font-bold text-neutral-400 whitespace-nowrap">
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
          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="xl:hidden w-10 h-10 flex items-center justify-center border border-neutral-800 rounded-lg text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
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
        <nav className="xl:hidden w-full max-w-[1400px] px-4 sm:px-6 pb-6 flex flex-col gap-1 text-sm font-bold text-neutral-300 border-t border-neutral-900">
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
            className="py-3 text-lime-500 hover:text-lime-400 transition duration-150"
          >
            Best Deals
          </Link>
        </nav>
      )}
    </header>
  );
}
