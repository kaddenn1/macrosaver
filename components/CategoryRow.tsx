"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  {
    id: "protein",
    title: "Protein",
    accent: "text-[#a3e635]",
    border: "border-[#a3e635]",
    hoverBorder: "hover:border-[#a3e635]",
    bgGlow: "bg-[#a3e635]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: "pre-workout",
    title: "Pre-Workout",
    accent: "text-[#c084fc]",
    border: "border-[#c084fc]",
    hoverBorder: "hover:border-[#c084fc]",
    bgGlow: "bg-[#c084fc]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: "creatine",
    title: "Creatine",
    accent: "text-[#38bdf8]",
    border: "border-[#38bdf8]",
    hoverBorder: "hover:border-[#38bdf8]",
    bgGlow: "bg-[#38bdf8]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    )
  },
  {
    id: "weight-management",
    title: "Weight Management",
    accent: "text-[#fb7185]",
    border: "border-[#fb7185]",
    hoverBorder: "hover:border-[#fb7185]",
    bgGlow: "bg-[#fb7185]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    )
  },
  {
    id: "food-drink",
    title: "Food & Drink",
    accent: "text-[#2dd4bf]",
    border: "border-[#2dd4bf]",
    hoverBorder: "hover:border-[#2dd4bf]",
    bgGlow: "bg-[#2dd4bf]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4h10v9a4 4 0 01-4 4H9a4 4 0 01-4-4V4z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 8h2a2 2 0 012 2v1a2 2 0 01-2 2h-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2v2m3-2v2m3-2v2" />
      </svg>
    )
  },
  {
    id: "gut-health",
    title: "Gut Health",
    accent: "text-[#818cf8]",
    border: "border-[#818cf8]",
    hoverBorder: "hover:border-[#818cf8]",
    bgGlow: "bg-[#818cf8]/10",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3C6 3 3 8 3 13c0 4 3 7 7 7 1 0 2-3 2-8s-1-9-1-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 7c2 2 3 5 3 9" />
      </svg>
    )
  }
];

export default function CategoryRow() {
  const pathname = usePathname();

  return (
    <div className="w-full mb-4 mt-6">
      <h2 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase leading-none mb-1">
        Shop By Category
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Compare the best prices, save more, and fuel your goals.
      </p>

      <div className="flex gap-6 overflow-x-auto sm:overflow-visible sm:grid sm:grid-cols-3 lg:grid-cols-6 pb-2 sm:pb-0">
        {categories.map((cat) => {
          const isActive = pathname === `/category/${cat.id}`;

          return (
            <Link
              href={`/category/${cat.id}`}
              key={cat.id}
              className="group flex flex-col items-center gap-3 shrink-0 w-20 sm:w-auto"
            >
              <div
                className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 overflow-hidden
                  ${isActive ? cat.border : "border-gray-800"}
                  ${cat.hoverBorder}
                `}
              >
                <div
                  className={`absolute inset-0 rounded-full blur-md transition-opacity duration-300 ${cat.bgGlow} ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
                <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${cat.accent}`}>
                  {cat.icon}
                </div>
              </div>
              <span
                className={`text-[11px] font-bold uppercase tracking-wide text-center leading-tight transition-colors ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                }`}
              >
                {cat.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
