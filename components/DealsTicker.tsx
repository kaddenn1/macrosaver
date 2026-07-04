import React from 'react';

interface Deal {
  retailer: string;
  price: number;
  icon: string;
  affiliateUrl: string;
}

interface DealsTickerProps {
  deals: Deal[];
}

export default function DealsTicker({ deals }: DealsTickerProps) {
  return (
    <div className="w-full bg-neutral-950/40 border border-neutral-900 rounded-2xl p-6 mt-6 backdrop-blur-md">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="text-lime-500 font-bold text-xl">|</span>
          <h2 className="text-sm font-black uppercase tracking-wider text-white">Best Deals Right Now</h2>
        </div>
        <a href="#categories" className="text-lime-500 hover:text-lime-400 text-xs font-black uppercase tracking-wider flex items-center gap-1 transition">
          View All Best Deals <span className="text-sm">→</span>
        </a>
      </div>

      {/* Horizontal Store Grid matching the bottom ticker in the reference image */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {deals.map((deal, idx) => (
          <a
            key={idx}
            href={deal.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-3 flex items-center justify-between transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-900"
          >
            {/* Retailer Identity */}
            <div className="flex items-center gap-2.5">
              <span className="text-base filter drop-shadow-sm">{deal.icon}</span>
              <span className="font-bold text-xs text-neutral-200">{deal.retailer}</span>
            </div>
            
            {/* Live Money Price Tag */}
            <div className="bg-lime-500 text-[10px] font-black text-black px-2.5 py-1 rounded-md tracking-wide">
              ${deal.price.toFixed(2)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}