import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Column: The MacroSaver Wordmark */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6 mb-6">
            <Image
              src="/logo.png"
              alt=""
              width={140}
              height={140}
              className="rounded-2xl w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 shrink-0"
            />
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-tighter">
              <span className="text-[#a3e635]">Macro</span><span className="text-white">Saver</span>
            </h1>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-300 mb-4">
            Know Where Every Dollar Goes.
          </p>
          <p className="text-lg sm:text-xl font-bold text-gray-500">
            Stop Overpaying for Supplements.
          </p>
        </div>

        {/* Right Column: Feature List (desktop only, cramped/redundant on mobile) */}
        <div className="hidden lg:flex flex-col gap-6 w-full lg:w-auto lg:min-w-[340px]">
          {[
            {
              title: "Lowest Price",
              desc: "We find it.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 9V4a1 1 0 011-1z" />
                </svg>
              )
            },
            {
              title: "Cost Per Serving",
              desc: "We calculate it.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m-6 4h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )
            },
            {
              title: "Protein Per Dollar",
              desc: "We compare it.",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3 .672 3 1.5-1.343 1.5-3 1.5m0-6c1.11 0 2.08.402 2.599 1M12 8V6m0 2v6m0 0v2m0-2c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )
            }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-10 h-10 border border-[#a3e635] text-[#a3e635] flex items-center justify-center rounded shadow-[0_0_15px_rgba(163,230,53,0.2)] shrink-0">
                {feature.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-tight">{feature.title}</div>
                <div className="text-xs text-gray-500">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}