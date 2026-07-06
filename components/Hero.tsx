import React from 'react';

export default function Hero() {
  return (
    <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] lg:w-[600px] lg:h-[600px] bg-[#a3e635] opacity-[0.15] blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Column: Huge Typography */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-6xl sm:text-7xl lg:text-[90px] font-black text-white leading-[0.9] tracking-tight mb-6">
            Know<br />
            Where<br />
            <span className="text-[#a3e635]">Every</span><br />
            <span className="text-[#a3e635]">Dollar</span><br />
            Goes.
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-gray-300 mb-8">
            Stop Overpaying<br />for Supplements.
          </p>
        </div>

        {/* Center Column: The Product Showcase (CSS Placeholder until you have the image) */}
        <div className="flex-1 flex justify-center relative w-full max-w-[400px]">
          <div className="relative w-full aspect-[3/4] flex flex-col items-center justify-end pb-8">
            {/* The Glowing Base/Pedestal */}
            <div className="absolute bottom-0 w-[120%] h-12 bg-gradient-to-t from-[#a3e635]/40 to-transparent blur-md rounded-[100%]"></div>
            <div className="absolute bottom-4 w-full h-2 bg-[#a3e635] blur-[2px] rounded-[100%] shadow-[0_0_30px_#a3e635]"></div>
            
            {/* The Jar Placeholder */}
            <div className="relative z-10 w-3/4 h-[80%] bg-gradient-to-b from-[#222] to-[#0a0a0a] border border-gray-800 rounded-t-3xl rounded-b-xl flex flex-col items-center justify-center shadow-2xl overflow-hidden">
               {/* Jar Cap */}
               <div className="absolute top-0 w-[110%] h-12 bg-[#111] border-b border-gray-900 rounded-t-2xl -ml-[5%]"></div>
               <div className="z-10 text-center mt-8">
                 <div className="text-4xl font-black text-white uppercase tracking-tighter">WHEY</div>
                 <div className="text-xl font-bold text-[#a3e635] uppercase tracking-widest">PROTEIN</div>
                 <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1 mb-4">ISOLATE</div>
                 <div className="w-16 h-1 mx-auto bg-gray-800 mb-4"></div>
                 <div className="text-[10px] text-gray-500 uppercase tracking-widest">Asset Pending</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Savings Card */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-[#a3e635]/30 rounded-2xl p-8 w-full max-w-[360px] shadow-[0_0_40px_rgba(163,230,53,0.15)] transform transition-transform hover:scale-105">
            <h3 className="text-xl font-bold text-white mb-2">Average Savings</h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">with MacroSaver</p>
            <div className="text-6xl font-black text-[#a3e635] tracking-tighter mb-2">$18.47</div>
            <div className="text-sm font-bold text-white uppercase tracking-widest mb-6">Per Order</div>
            
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-[#a3e635]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              <span className="text-white font-bold">4.9/5</span> from 2,400+ Verified Users
            </p>
          </div>
        </div>

      </div>

      {/* 4 Feature Icons Row */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 border-t border-gray-800 pt-8">
        {[
          { title: "Lowest Price", desc: "We find it." },
          { title: "Cost Per Serving", desc: "We calculate it." },
          { title: "Protein Per Dollar", desc: "We compare it." },
          { title: "Value Score", desc: "We rank it." }
        ].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#a3e635] text-[#a3e635] flex items-center justify-center rounded shadow-[0_0_15px_rgba(163,230,53,0.2)]">
              {/* Fake Icon Box */}
              <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight">{feature.title}</div>
              <div className="text-xs text-gray-500">{feature.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}