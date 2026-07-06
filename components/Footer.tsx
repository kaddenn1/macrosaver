import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-[#1a1a1a] py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center space-y-4">
        
        {/* Navigation Links / Brand */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
          <span className="font-semibold text-white tracking-wide">MacroSaver</span>
          <a href="/" className="hover:text-white transition-colors">Dashboard</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          &copy; {currentYear} MacroSaver. All rights reserved.
        </p>

        {/* Mandatory Amazon Affiliate Disclosure */}
        <div className="w-full max-w-2xl border-t border-[#151515] pt-4 mt-2">
          <p className="text-[11px] text-gray-600 text-center leading-relaxed">
            <strong>Disclaimer:</strong> As an Amazon Associate, I earn from qualifying purchases. 
            Product prices, descriptions, and availability are pulled dynamically and are subject to change. 
            All links to external retail platforms may generate a small referral commission at absolutely no extra cost to you.
          </p>
        </div>

      </div>
    </footer>
  );
}