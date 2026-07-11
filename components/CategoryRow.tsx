"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const categories = [
  { id: "protein", title: "Protein", image: "/categories/protein.png" },
  { id: "pre-workout", title: "Pre-Workout", image: "/categories/pre-workout.png" },
  { id: "creatine", title: "Creatine", image: "/categories/creatine.png" },
  { id: "electrolytes", title: "Electrolytes", image: "/categories/electrolytes.png" },
  { id: "weight-management", title: "Weight Management", image: "/categories/weight-management.png" },
  { id: "bariatric", title: "Bariatric Support", image: "/categories/bariatric.png" },
  { id: "multivitamin", title: "Multivitamin", image: "/categories/multivitamin.png" },
  { id: "food-drink", title: "Food & Drink", image: "/categories/food-drink.png" },
  { id: "gut-health", title: "Gut Health", image: "/categories/gut-health.png" },
];

const EDGE_ZONE = 90; // px from either edge that triggers auto-scroll
const MAX_SCROLL_SPEED = 12; // px per animation frame at the very edge

export default function CategoryRow() {
  const pathname = usePathname();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const speedRef = useRef(0);

  const tick = () => {
    if (scrollerRef.current && speedRef.current !== 0) {
      scrollerRef.current.scrollLeft += speedRef.current;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xFromLeft = e.clientX - rect.left;
    const xFromRight = rect.right - e.clientX;

    if (xFromLeft < EDGE_ZONE) {
      speedRef.current = -MAX_SCROLL_SPEED * (1 - xFromLeft / EDGE_ZONE);
    } else if (xFromRight < EDGE_ZONE) {
      speedRef.current = MAX_SCROLL_SPEED * (1 - xFromRight / EDGE_ZONE);
    } else {
      speedRef.current = 0;
    }

    if (speedRef.current !== 0 && rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const handleMouseLeave = () => {
    speedRef.current = 0;
  };

  return (
    <div className="w-full mb-4 mt-6">
      <h2 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase leading-none mb-1">
        Shop By Category
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Compare the best prices, save more, and fuel your goals.
      </p>

      <div
        ref={scrollerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]"
      >
        {categories.map((cat, index) => {
          const isActive = pathname === `/category/${cat.id}`;

          return (
            <Link
              href={`/category/${cat.id}`}
              key={cat.id}
              className={`group relative block rounded-xl overflow-hidden border transition-all duration-300 aspect-[7/20] w-32 sm:w-40 lg:w-44 shrink-0 ${
                isActive ? "border-[#a3e635]" : "border-gray-800 hover:border-gray-600"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
