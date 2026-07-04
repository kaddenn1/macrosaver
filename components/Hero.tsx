import React from 'react';

export default function Hero() {
  return (
    <section className="relative w-full bg-black text-white pt-12 pb-12 overflow-hidden flex justify-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-lime-500/[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-4 space-y-6 z-10">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.02] text-white">
              Know <br /> 
              Where <br /> 
              <span className="text-lime-500 drop-shadow-[0_0_30px_rgba(132,204,22,0.15)]">Every <br /> Dollar</span> <br /> 
              Goes.
            </h1>
            <p className="text-xl font-extrabold text-neutral-300 tracking-tight">
              Stop Overpaying for Supplements.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 bg-neutral-950/60 border border-neutral-900/80 rounded-xl p-3">
              <span className="text-lime-500 text-lg">🏷️</span> 
              <div>
                <p className="text-[11px] font-black uppercase text-white tracking-wider">Lowest Price</p>
                <p className="text-[10px] text-neutral-500 font-medium mt-0.5">We find it.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-neutral-950/60 border border-neutral-900/80 rounded-xl p-3">
              <span className="text-lime-500 text-lg">🧮</span> 
              <div>
                <p className="text-[11px] font-black uppercase text-white tracking-wider">Cost Per Serving</p>
                <p className="text-[10px] text-neutral-500 font-medium mt-0.5">We calculate it.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-neutral-950/60 border border-neutral-900/80 rounded-xl p-3">
              <span className="text-lime-500 text-lg">💲</span> 
              <div>
                <p className="text-[11px] font-black uppercase text-white tracking-wider">Protein Per Dollar</p>
                <p className="text-[10px] text-neutral-500 font-medium mt-0.5">We compare it.</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-neutral-950/60 border border-neutral-900/80 rounded-xl p-3">
              <span className="text-lime-500 text-lg">📊</span> 
              <div>
                <p className="text-[11px] font-black uppercase text-white tracking-wider">Value Score</p>
                <p className="text-[10px] text-neutral-500 font-medium mt-0.5">We rank it.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[420px]">
          <div className="absolute bottom-16 w-72 h-16 bg-lime-500/20 blur-[50px] rounded-full pointer-events-none"></div>
          
          <div className="w-68 h-88 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-800/80 rounded-3xl flex flex-col items-center justify-center relative z-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] border-t-neutral-700/50 p-6">
            {/* Real asset image render on center pedestal */}
            <img 
              src="https://s3.images-iherb.com/tlb/tlb00322/v/10.jpg" 
              alt="Whey Protein Isolate" 
              className="max-h-44 object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-105"
            />
            <div className="text-center mt-5 px-6 space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-lime-400 bg-lime-500/10 border border-lime-500/20 px-2.5 py-0.5 rounded-md inline-block">
                LIVE CHAMPION PICK
              </span>
              <h4 className="text-base font-black text-white tracking-tight pt-1">
                Whey Protein Isolate
              </h4>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">30 Servings</p>
            </div>
          </div>

          <div className="w-80 h-5 border-2 border-lime-500/40 rounded-full mt-4 bg-neutral-950 shadow-[0_0_30px_rgba(132,204,22,0.25)] flex items-center justify-center">
            <div className="w-[97%] h-[50%] border border-lime-500/20 rounded-full bg-lime-500/5"></div>
          </div>
          <div className="w-88 h-3 border border-neutral-900 rounded-full mt-1 bg-black/60 shadow-inner"></div>
        </div>

        <div className="lg:col-span-3 z-10">
          <div className="bg-neutral-950/90 border border-lime-500/20 rounded-2xl p-6 space-y-6 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-lime-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-lime-500/[0.02] to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="space-y-1.5">
              <p className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest leading-none">
                Average Savings with MacroSaver
              </p>
              <h2 className="text-5xl font-black text-lime-500 tracking-tighter drop-shadow-[0_0_15px_rgba(132,204,22,0.25)] leading-none pt-1">
                $18.47
              </h2>
              <p className="text-[10px] font-black tracking-widest text-neutral-200 uppercase pt-0.5">
                PER ORDER
              </p>
            </div>

            <div className="border-t border-neutral-900 pt-5 space-y-3">
              <div className="flex items-center gap-1 text-lime-500 text-xs tracking-wider font-black">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-xs text-neutral-400 font-bold leading-relaxed">
                4.9/5 from <span className="text-white font-black">2,400+ Verified Users</span> tracking supplement macros this week.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}