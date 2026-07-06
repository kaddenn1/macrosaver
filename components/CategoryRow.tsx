"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  {
    id: "protein",
    title: "Protein Powder",
    subtitle: "Whey, Casein & More",
    price: "$0.94",
    accent: "text-[#a3e635]",
    border: "border-[#a3e635]",
    hoverBorder: "hover:border-[#a3e635]",
    bgGlow: "bg-[#a3e635]/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: "creatine",
    title: "Creatine",
    subtitle: "Monohydrate & More",
    price: "$0.19",
    accent: "text-[#38bdf8]",
    border: "border-[#38bdf8]",
    hoverBorder: "hover:border-[#38bdf8]",
    bgGlow: "bg-[#38bdf8]/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    )
  },
  {
    id: "preworkout",
    title: "Pre-Workout",
    subtitle: "Energy, Focus & Pumps",
    price: "$0.43",
    accent: "text-[#c084fc]",
    border: "border-[#c084fc]",
    hoverBorder: "hover:border-[#c084fc]",
    bgGlow: "bg-[#c084fc]/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "electrolytes",
    title: "Electrolytes",
    subtitle: "Hydration & Minerals",
    price: "$0.32",
    accent: "text-[#22d3ee]",
    border: "border-[#22d3ee]",
    hoverBorder: "hover:border-[#22d3ee]",
    bgGlow: "bg-[#22d3ee]/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: "recovery",
    title: "Recovery",
    subtitle: "BCAA, EAA & Sleep",
    price: "$0.56",
    accent: "text-[#fb923c]",
    border: "border-[#fb923c]",
    hoverBorder: "hover:border-[#fb923c]",
    bgGlow: "bg-[#fb923c]/10",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    )
  }
];

export default function CategoryRow() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6 mb-4 mt-6">
      
      {/* Left Title Area */}
      <div className="w-full xl:w-64 shrink-0 flex flex-col justify-center">
        <h2 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase leading-none mb-2">
          Shop By<br />Category
        </h2>
        <p className="text-xs text-gray-400 pr-4">
          Compare the best prices, save more, and fuel your goals.
        </p>
      </div>

      {/* Right Grid Area */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {categories.map((cat) => {
          // Check if the current URL matches this category's ID
          const isActive = pathname === `/category/${cat.id}`;

          return (
            <Link 
              href={`/category/${cat.id}`}
              key={cat.id}
              className={`group relative flex flex-col p-4 rounded-xl bg-[#0a0a0a] border transition-all duration-300 overflow-hidden 
                ${isActive ? cat.border : 'border-gray-800'} 
                ${cat.hoverBorder} 
                ${isActive ? `shadow-[0_0_15px_currentColor]` : ''} 
                ${isActive ? cat.accent : ''}
              `}
            >
              {/* Background Glow Effect - Only show if active or hovered */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-colors duration-500 ${isActive ? cat.bgGlow : 'opacity-0 group-hover:opacity-100'} ${!isActive && cat.bgGlow.replace('bg-', 'group-hover:bg-')}`} />

              {/* Icon & Title */}
              <div className="relative z-10 flex-1">
                <div className={`${isActive ? cat.accent : 'text-gray-500 group-hover:' + cat.accent.split('-')[1]} mb-3 transition-transform duration-300 group-hover:scale-110 origin-left`}>
                  {cat.icon}
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {cat.title}
                </h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                  {cat.subtitle}
                </p>
              </div>

              {/* Price & Arrow */}
              <div className="relative z-10 mt-8 flex justify-between items-end">
                <div>
                  <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">
                    From
                  </div>
                  <div className={`text-lg font-black leading-none ${isActive ? cat.accent : 'text-gray-400 group-hover:' + cat.accent.split('-')[1]}`}>
                    {cat.price}
                  </div>
                  <div className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">
                    Per Serving
                  </div>
                </div>
                
                {/* Circular Arrow Button */}
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors 
                  ${isActive ? 'border-current ' + cat.accent : 'border-gray-700 text-gray-500 group-hover:border-current group-hover:' + cat.accent.split('-')[1]}
                `}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}