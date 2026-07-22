import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1a1a1a] py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4">

        {/* Navigation Links / Brand */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span className="flex items-center gap-2 font-semibold text-white tracking-wide">
            <Image src="/logo.png" alt="" width={20} height={20} className="rounded shrink-0" />
            MacroSaver
          </span>
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
          <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
          <Link href="/about" className="hover:text-white transition-colors">About &amp; Methodology</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <a href="mailto:support@macrosaver.com" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          &copy; {currentYear} MacroSaver. All rights reserved.
        </p>

        {/* Mandatory Amazon Affiliate Disclosure */}
        <div className="w-full max-w-2xl border-t border-[#151515] pt-4 mt-2">
          <p className="text-[11px] text-gray-400 text-center leading-relaxed">
            <strong>Disclaimer:</strong> As an Amazon Associate, MacroSaver earns from qualifying purchases.
            Prices are undated snapshots from cataloged retailer offers and can change at any time.
            Some products have only one retailer offer; always verify price and availability with the retailer.
            External retailer links may generate a referral commission at no extra cost to you.
          </p>
        </div>

      </div>
    </footer>
  );
}
