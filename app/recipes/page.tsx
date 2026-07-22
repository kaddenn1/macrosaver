import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RECIPES } from "@/lib/recipes";
import { SITE_URL } from "@/lib/site";
import { products } from "@/data/products";
import type { Product } from "@/data/types";

const title = "High-Protein & Hydration Recipes";
const description =
  "Practical protein and hydration recipes with prep times, estimated nutrition, and preparation tips.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/recipes` },
  openGraph: { title: `${title} | MacroSaver`, description, url: `${SITE_URL}/recipes` },
};

export default function RecipesPage() {
  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1600px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
            High-Protein &amp; Hydration Recipes
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-[650px]">
            Protein-forward and hydration recipes with prep time, estimated nutrition, and a
            preparation tip for each. Nutrition varies by ingredients and portion size.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RECIPES.map((recipe) => {
            const featuredProduct = recipe.featuredProductId
              ? (products as Product[]).find((p) => p.id === recipe.featuredProductId)
              : undefined;

            return (
              <Link
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="group bg-[#111] border border-gray-800 hover:border-[#a3e635] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]"
              >
                <div className="relative">
                  {recipe.image ? (
                    <div className="w-full aspect-[3/2] bg-[#0a0a0a] relative overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={`Finished ${recipe.title}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : featuredProduct?.image ? (
                    <div className="w-full aspect-[3/2] bg-[#0a0a0a] flex items-center justify-center p-8">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={featuredProduct.image}
                          alt={featuredProduct.name}
                          fill
                          className="object-contain"
                          sizes="80px"
                        />
                      </div>
                    </div>
                  ) : null}
                  {recipe.bariatricFocused && (
                    <div className="absolute top-2 left-2 bg-[#a3e635] text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                      Bariatric-Focused
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-lg font-bold text-white leading-snug mb-3">
                    {recipe.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">
                    {recipe.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                    <span>{recipe.nutrition.protein} protein</span>
                    <span className="text-gray-400 group-hover:text-[#a3e635] transition-colors">
                      View recipe →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
