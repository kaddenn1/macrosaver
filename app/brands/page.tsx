import type { Metadata } from "next";
import Link from "next/link";
import { BRANDS, getBrandProductCount } from "@/lib/brands";
import { SITE_URL } from "@/lib/site";

const title = "Brands We Carry | MacroSaver";
const description =
  "Every supplement brand MacroSaver compares prices for, with a quick intro to each one and links to their full product lineup.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/brands` },
  openGraph: { title, description, url: `${SITE_URL}/brands` },
};

export default function BrandsPage() {
  const brands = [...BRANDS].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1600px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
            Brands We Carry
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-[650px]">
            Every brand we track prices for, in one place. Pick one to see its full lineup and compare deals across retailers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => {
            const count = getBrandProductCount(brand.name);
            return (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-[#111] border border-gray-800 hover:border-[#a3e635] rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h2 className="text-lg font-bold text-white leading-snug">
                    {brand.name}
                  </h2>
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#a3e635] border border-[#a3e635]/30 rounded-full px-2 py-1">
                    {count} {count === 1 ? "item" : "items"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {brand.intro}
                </p>
                <div className="mt-4 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#a3e635] transition-colors">
                  Shop {brand.name} →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
