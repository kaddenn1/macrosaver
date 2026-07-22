"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/category/protein", label: "Protein" },
  { href: "/category/pre-workout", label: "Pre-Workout" },
  { href: "/category/creatine", label: "Creatine" },
  { href: "/category/electrolytes", label: "Electrolytes" },
  { href: "/category/weight-management", label: "Weight Management" },
  { href: "/category/bariatric", label: "Bariatric Support" },
  { href: "/category/food-drink", label: "Food & Drink" },
  { href: "/category/gut-health", label: "Gut Health" },
  { href: "/category/multivitamin", label: "Multivitamin" },
  { href: "/brands", label: "Brands" },
  { href: "/guides", label: "Guides" },
  { href: "/recipes", label: "Recipes" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-black border-b border-neutral-900 sticky top-0 z-50 backdrop-blur-md bg-black/90 flex flex-col items-center">
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">

        {/* LOGO IDENTITY */}
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="" width={48} height={48} className="rounded-lg shrink-0" />
          <div className="flex flex-col">
            <span className="text-3xl font-black leading-none tracking-tight text-lime-500 sm:text-4xl xl:text-3xl 2xl:text-4xl">
              Macro<span className="text-white">Saver</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-bold uppercase tracking-widest text-lime-500/80 2xl:block">
              Know Where Every Dollar Goes
            </span>
          </div>
        </Link>

        {/* NAVIGATION LINKS - DESKTOP ONLY */}
        <nav className="hidden items-center gap-3 whitespace-nowrap text-[11px] font-bold text-neutral-400 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="hover:text-white transition duration-150 aria-[current=page]:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#best-deals" className="hover:text-white transition duration-150 text-lime-500">
            Best Value
          </Link>
        </nav>

        {/* CTA ACTIONS */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-800 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white xl:hidden"
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
        <nav id="mobile-navigation" className="flex max-h-[calc(100vh-5rem)] w-full max-w-[1400px] flex-col gap-1 overflow-y-auto border-t border-neutral-900 px-4 pb-6 text-sm font-bold text-neutral-300 sm:px-6 xl:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
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
            Best Value
          </Link>
        </nav>
      )}
    </header>
  );
}
