import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getValueScore,
} from "@/lib/macrosaver-engine";

function formatCurrency(value: number | null): string {
  return value === null ? "N/A" : `$${value.toFixed(2)}`;
}

const categoryAccents: Record<
  string,
  {
    border: string;
    text: string;
    glow: string;
    bgGlow: string;
    btn: string;
    label: string;
  }
> = {
  protein: {
    border: "border-lime-500/20 hover:border-lime-500/60",
    text: "text-lime-400",
    glow: "hover:shadow-[0_0_40px_rgba(132,204,22,0.15)]",
    bgGlow: "from-lime-500/10 via-transparent to-transparent",
    btn: "bg-lime-500 hover:bg-lime-400 text-black",
    label: "Protein",
  },
  creatine: {
    border: "border-cyan-500/20 hover:border-cyan-500/60",
    text: "text-cyan-400",
    glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]",
    bgGlow: "from-cyan-500/10 via-transparent to-transparent",
    btn: "bg-cyan-500 hover:bg-cyan-400 text-black",
    label: "Creatine",
  },
  "pre-workout": {
    border: "border-purple-500/20 hover:border-purple-500/60",
    text: "text-purple-400",
    glow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
    bgGlow: "from-purple-500/10 via-transparent to-transparent",
    btn: "bg-purple-500 hover:bg-purple-400 text-black",
    label: "Pre-Workout",
  },
  electrolytes: {
    border: "border-teal-500/20 hover:border-teal-500/60",
    text: "text-teal-400",
    glow: "hover:shadow-[0_0_40px_rgba(20,184,166,0.15)]",
    bgGlow: "from-teal-500/10 via-transparent to-transparent",
    btn: "bg-teal-500 hover:bg-teal-400 text-black",
    label: "Electrolytes",
  },
  other: {
    border: "border-orange-500/20 hover:border-orange-500/60",
    text: "text-orange-400",
    glow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.15)]",
    bgGlow: "from-orange-500/10 via-transparent to-transparent",
    btn: "bg-orange-500 hover:bg-orange-400 text-black",
    label: "Recovery",
  }
};

export default function Champions() {
  return (
    <section id="categories" className="w-full bg-black py-6 text-white flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        
        <div className="flex justify-between items-center mb-6 border-b border-neutral-900 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-lime-500 text-xl">🔥</span>
            <h2 className="text-xl font-black uppercase tracking-wider">Best Deals Right Now</h2>
          </div>
          <a href="#" className="text-lime-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition">
            View All Best Deals <span>→</span>
          </a>
        </div>

        <div className="flex flex-wrap justify-center xl:grid xl:grid-cols-5 gap-5">
          {products.map((item) => {
            const bestOffer = getBestOffer(item);
            const costPerServing = getCostPerServing(item);
            const valueScore = getValueScore(item);
            const normalizedCategory = item.category.toLowerCase();
            const accent = categoryAccents[normalizedCategory] ?? categoryAccents.protein;

            const msrpPrice = bestOffer ? bestOffer.price * 1.2 : 39.99;
            const savingsAmt = msrpPrice - (bestOffer ? bestOffer.price : 0);
            const macroRatio = item.nutrition.proteinGrams ? item.nutrition.proteinGrams : 16.3;

            return (
              <article
                key={item.id}
                className={`bg-neutral-950 border ${accent.border} rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-300 w-full sm:w-[260px] xl:w-auto ${accent.glow}`}
              >
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b ${accent.bgGlow} blur-xl pointer-events-none rounded-full opacity-60`}></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start w-full mb-3">
                    <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-1.5 px-2.5 text-center flex flex-col justify-center items-center shadow-md">
                      <span className={`text-base font-black tracking-tight ${accent.text}`}>{valueScore}</span>
                      <span className="text-[7px] text-neutral-500 uppercase tracking-widest font-extrabold">Value Score</span>
                    </div>
                    {normalizedCategory === 'protein' && (
                      <span className="bg-lime-500/10 border border-lime-500/20 text-lime-400 font-black tracking-widest uppercase text-[8px] px-2 py-0.5 rounded-md">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Upgraded Container Rendering Crisp Transparent Supplement Tubs */}
                  <div className="w-full h-44 flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
                    <img 
                      src={item.imagePlaceholder} 
                      alt={item.name} 
                      className="max-h-36 object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${accent.text}`}>
                      {item.brand}
                    </p>
                    <h3 className="text-base font-black tracking-tight leading-snug text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-lime-500 text-[10px] font-black">
                      <span>★★★★★</span>
                      <span className="text-neutral-500 text-[9px] font-bold">4.9 (12k)</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-neutral-900 pt-3">
                    <div className="bg-neutral-900/30 border border-neutral-900/60 rounded-xl p-2">
                      <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Lowest Price</p>
                      <p className="text-lg font-black text-white tracking-tight mt-0.5">
                        {formatCurrency(bestOffer ? bestOffer.price : null)}
                      </p>
                    </div>
                    <div className="bg-neutral-900/30 border border-neutral-900/60 rounded-xl p-2 flex flex-col justify-center">
                      <p className="text-[8px] font-bold text-neutral-500">Was <span className="line-through">{formatCurrency(msrpPrice)}</span></p>
                      <p className="text-[9px] font-black text-lime-400 mt-0.5">Save {formatCurrency(savingsAmt)}</p>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 pb-2">
                    <div className="bg-neutral-900/40 border border-neutral-900/60 rounded-xl p-2">
                      <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Per Serving</p>
                      <p className={`text-base font-black tracking-tight mt-0.5 ${accent.text}`}>
                        {formatCurrency(costPerServing)}
                      </p>
                    </div>
                    <div className="bg-neutral-900/40 border border-neutral-900/60 rounded-xl p-2">
                      <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">
                        {normalizedCategory === 'protein' ? 'Protein / $' : 'Active / $'}
                      </p>
                      <p className="text-base font-black text-neutral-200 tracking-tight mt-0.5">
                        {macroRatio.toFixed(1)}g
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 border-t border-neutral-900 pt-3 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs">📦</span>
                    <span className="text-[10px] font-black text-neutral-400 truncate max-w-[65px] uppercase tracking-wider">
                      {bestOffer ? bestOffer.retailer : "Amazon"}
                    </span>
                  </div>
                  <a
                    href={bestOffer ? bestOffer.affiliateLink : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2.5 rounded-xl text-center font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-1 ${accent.btn} shadow-md`}
                  >
                    Compare <span className="text-xs">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}