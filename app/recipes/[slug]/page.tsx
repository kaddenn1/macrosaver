import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Champions from "@/components/Champions";
import Breadcrumbs from "@/components/Breadcrumbs";
import { RECIPES, getRecipeBySlug } from "@/lib/recipes";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/json-ld";
import { products } from "@/data/products";
import { getBestOffer, getBestValueProduct } from "@/lib/macrosaver-engine";
import { getGuideByCategory } from "@/lib/guides";
import { CATEGORY_TITLES } from "@/lib/categories";
import type { Product } from "@/data/types";

function toIsoDuration(text: string): string | undefined {
  const match = text.match(/\d+/);
  if (!match) return undefined;
  return `PT${match[0]}M`;
}

/** Parses hand-authored totalTime strings like "2 hrs 15 min (includes chilling)" into an ISO 8601 duration. */
function totalTimeToIsoDuration(text: string): string | undefined {
  const hourMatch = text.match(/(\d+)\s*hrs?/i);
  const minMatch = text.match(/(\d+)\s*min/i);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
  if (!hours && !minutes) return undefined;
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}`;
}

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};

  const title = `${recipe.title} | MacroSaver`;

  return {
    title,
    description: recipe.summary,
    alternates: { canonical: `${SITE_URL}/recipes/${slug}` },
    openGraph: { title, description: recipe.summary, url: `${SITE_URL}/recipes/${slug}` },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const featuredProduct = recipe.featuredProductId
    ? (products as Product[]).find((p) => p.id === recipe.featuredProductId)
    : undefined;
  const featuredOffer = featuredProduct ? getBestOffer(featuredProduct) : undefined;

  const category = featuredProduct?.category ?? "protein";
  const categoryLabel = CATEGORY_TITLES[category] ?? category;
  const guide = getGuideByCategory(category);

  const categoryProducts = (products as Product[]).filter(
    (p) => p.category === category || p.additionalCategories?.includes(category)
  );
  const bestValueProduct = getBestValueProduct(categoryProducts, featuredProduct?.id);
  const bestValueOffer = bestValueProduct ? getBestOffer(bestValueProduct) : undefined;

  const recipeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.summary,
    recipeYield: recipe.servings,
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    totalTime: totalTimeToIsoDuration(recipe.totalTime),
    recipeCategory: recipe.recipeCategory,
    keywords: recipe.bariatricFocused
      ? "bariatric-friendly recipe, high protein"
      : "protein powder recipe",
    image: recipe.image ? `${SITE_URL}${recipe.image}` : undefined,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step) => ({
      "@type": "HowToStep",
      text: step,
    })),
    nutrition: {
      "@type": "NutritionInformation",
      calories: recipe.nutrition.calories,
      proteinContent: recipe.nutrition.protein,
      carbohydrateContent: recipe.nutrition.carbs,
      fatContent: recipe.nutrition.fat,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Recipes", item: `${SITE_URL}/recipes` },
      {
        "@type": "ListItem",
        position: 3,
        name: recipe.title,
        item: `${SITE_URL}/recipes/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(recipeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <main className="min-h-screen text-gray-100 font-sans">
        <div className="w-full max-w-[900px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Recipes", href: "/recipes" },
              { label: recipe.title },
            ]}
          />
          <div className="mb-10 border-b border-gray-800 pb-6">
            <Link
              href="/recipes"
              className="text-[11px] font-bold uppercase tracking-widest text-[#a3e635] hover:text-white transition-colors"
            >
              ← All Recipes
            </Link>

            {recipe.image && (
              <div className="w-full aspect-[3/2] mt-4 bg-[#0a0a0a] border border-gray-800 rounded-xl relative overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={`Finished ${recipe.title}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                />
              </div>
            )}

            <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase mt-4">
              {recipe.title}
            </h1>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {recipe.summary}
            </p>

            {recipe.bariatricFocused && (
              <div className="mt-4 flex items-start gap-3 bg-[#111] border border-[#a3e635]/30 rounded-lg p-3">
                <div className="shrink-0 bg-[#a3e635] text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full">
                  Bariatric-Focused Note
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Built around common post-op basics — protein first, low or no added sugar, small portions. Guidelines vary by surgery type and stage, so check with your bariatric team before trying something new.
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-6 mt-6 text-xs">
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Prep</div>
                <div className="text-white font-bold mt-1">{recipe.prepTime}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Cook</div>
                <div className="text-white font-bold mt-1">{recipe.cookTime}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Total</div>
                <div className="text-white font-bold mt-1">{recipe.totalTime}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Servings</div>
                <div className="text-white font-bold mt-1">{recipe.servings}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-gray-800 text-xs">
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Calories</div>
                <div className="text-[#a3e635] font-bold mt-1">{recipe.nutrition.calories}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Protein</div>
                <div className="text-[#a3e635] font-bold mt-1">{recipe.nutrition.protein}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Carbs</div>
                <div className="text-[#a3e635] font-bold mt-1">{recipe.nutrition.carbs}</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Fat</div>
                <div className="text-[#a3e635] font-bold mt-1">{recipe.nutrition.fat}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10">
            <div className="sm:col-span-1">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} className="text-sm text-gray-400 leading-relaxed flex gap-2">
                    <span className="text-[#a3e635]">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={step} className="text-sm text-gray-400 leading-relaxed flex gap-3">
                    <span className="text-[#a3e635] font-black shrink-0">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 pb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-2">
              Tip
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">{recipe.tip}</p>
          </div>

          {featuredProduct && (
            <div className="pb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                  Made With
                </h2>
                {guide && (
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="text-[11px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#a3e635] transition-colors"
                  >
                    {guide.categoryLabel} Buying Guide →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RecipeProductPick
                  product={featuredProduct}
                  offer={featuredOffer}
                  reason="Used in this recipe"
                />
                {bestValueProduct && (
                  <RecipeProductPick
                    product={bestValueProduct}
                    offer={bestValueOffer}
                    reason={`Best value pick for ${categoryLabel.toLowerCase()}`}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <Champions
            filterCategory={category}
            limit={4}
            title={`Shop ${categoryLabel}`}
            viewAllHref={`/category/${category}`}
          />
        </div>
      </main>
    </>
  );
}

function RecipeProductPick({
  product,
  offer,
  reason,
}: {
  product: Product;
  offer: ReturnType<typeof getBestOffer> | undefined;
  reason: string;
}) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex items-center gap-4 bg-[#111] border border-gray-800 hover:border-[#a3e635] rounded-xl p-4 transition-all duration-300"
    >
      <div className="w-16 h-16 shrink-0 bg-[#0a0a0a] border border-gray-800 rounded-lg relative overflow-hidden">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-1.5"
            sizes="64px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#a3e635] mb-1">
          {reason}
        </div>
        <div className="text-sm font-bold text-white leading-snug truncate">
          {product.brand} {product.name}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-lg font-black text-white">
          {offer ? `$${offer.price.toFixed(2)}` : "View"}
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-[#a3e635] transition-colors">
          Shop →
        </div>
      </div>
    </Link>
  );
}
