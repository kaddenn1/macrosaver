import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductImageLightbox from "@/components/ProductImageLightbox";
import {
  getBestOffer,
  getCostPerServing,
  getCostPerOzProtein,
  getProteinPerDollar,
  getValueScore,
  getSavingsVsHighestOffer,
} from "@/lib/macrosaver-engine";
import { getTheme } from "@/lib/theme";
import { CATEGORY_TITLES } from "@/lib/categories";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import type { Product } from "@/data/types";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    return {};
  }

  const bestOffer = getBestOffer(product);
  const title = `Best Price for ${product.name} | ${product.brand} | Compare Deals on ${SITE_NAME}`;
  const description = bestOffer
    ? `Compare prices for ${product.name} from ${product.brand}. Lowest price $${bestOffer.price.toFixed(2)} — see cost per serving and value score on ${SITE_NAME}.`
    : `Compare prices for ${product.name} from ${product.brand} across top retailers on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/product/${product.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/product/${product.id}`,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id) as Product | undefined;

  if (!product) {
    notFound();
  }

  const theme = getTheme(product.category);
  const bestOffer = getBestOffer(product);
  const costPerServing = getCostPerServing(product);
  const costPerOzProtein = getCostPerOzProtein(product);
  const proteinPerDollar = getProteinPerDollar(product);
  const valueScore = getValueScore(product);
  const savings = getSavingsVsHighestOffer(product);

  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: product.brand },
    category: CATEGORY_TITLES[product.category] || product.category,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    url: `${SITE_URL}/product/${product.id}`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: sortedOffers[0]?.price,
      highPrice: sortedOffers[sortedOffers.length - 1]?.price,
      offerCount: sortedOffers.length,
      offers: sortedOffers.map((offer) => ({
        "@type": "Offer",
        url: offer.url,
        priceCurrency: "USD",
        price: offer.price,
        availability:
          offer.inStock === false
            ? "https://schema.org/OutOfStock"
            : "https://schema.org/InStock",
        seller: { "@type": "Organization", name: offer.retailer },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          ← Back to Best Deals
        </Link>

        <div className="mt-6 flex flex-col lg:flex-row gap-10">
          {/* Image */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="h-72 bg-[#111] border border-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden">
              {product.image ? (
                <ProductImageLightbox src={product.image} alt={product.name} />
              ) : (
                <div className="text-center opacity-50">
                  <div className={`w-10 h-12 mx-auto mb-2 border-2 rounded-sm ${theme.border}`}>
                    <div className="w-full h-2 border-b-2 bg-gray-800 border-inherit rounded-t-sm" />
                  </div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${theme.text}`}>
                    {product.category}
                  </span>
                  <p className="text-[8px] text-gray-500 uppercase mt-1">Asset Pending</p>
                </div>
              )}
            </div>
          </div>

          {/* Main details */}
          <div className="flex-1">
            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${theme.text}`}>
              {product.brand}
            </div>
            <h1 className="text-3xl font-black text-white leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className={`text-4xl font-black ${theme.text}`}>{valueScore}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest leading-tight">
                Value Score
                <br />
                out of 100
              </div>
            </div>

            {/* Value metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 border-y border-gray-800 py-6">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Lowest Price
                </div>
                <div className="text-xl font-black text-white">
                  {bestOffer ? `$${bestOffer.price.toFixed(2)}` : "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Cost / Serving
                </div>
                <div className={`text-xl font-black ${theme.text}`}>
                  {costPerServing !== null ? `$${costPerServing.toFixed(2)}` : "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Cost / Oz Protein
                </div>
                <div className={`text-xl font-black ${theme.text}`}>
                  {costPerOzProtein !== null ? `$${costPerOzProtein.toFixed(2)}` : "—"}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                  Protein / Dollar
                </div>
                <div className="text-xl font-black text-white">
                  {proteinPerDollar !== null ? `${proteinPerDollar.toFixed(1)}g` : "—"}
                </div>
              </div>
            </div>

            {/* Nutrition facts */}
            <div className="mb-8">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-3">
                Nutrition Facts
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-gray-500 uppercase">Servings</div>
                  <div className="font-bold text-white">{product.servings}</div>
                </div>
                {product.nutrition.servingSize && (
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-500 uppercase">Serving Size</div>
                    <div className="font-bold text-white">{product.nutrition.servingSize}</div>
                  </div>
                )}
                {product.nutrition.calories !== undefined && (
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-500 uppercase">Calories</div>
                    <div className="font-bold text-white">{product.nutrition.calories}</div>
                  </div>
                )}
                <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                  <div className="text-[10px] text-gray-500 uppercase">Protein</div>
                  <div className="font-bold text-white">{product.nutrition.proteinGrams}g</div>
                </div>
                {product.nutrition.carbsGrams !== undefined && (
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-500 uppercase">Carbs</div>
                    <div className="font-bold text-white">{product.nutrition.carbsGrams}g</div>
                  </div>
                )}
                {product.nutrition.sugarGrams !== undefined && (
                  <div className="bg-[#111] border border-gray-800 rounded-lg px-3 py-2">
                    <div className="text-[10px] text-gray-500 uppercase">Sugar</div>
                    <div className="font-bold text-white">{product.nutrition.sugarGrams}g</div>
                  </div>
                )}
              </div>
            </div>

            {/* Offers */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                  Compare Offers
                </h2>
                {savings !== null && (
                  <span className="text-xs text-gray-400">
                    Save <span className={`font-bold ${theme.text}`}>${savings.toFixed(2)}</span> vs
                    highest price
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {sortedOffers.map((offer) => {
                  const isBest = bestOffer?.retailer === offer.retailer && bestOffer?.price === offer.price;
                  const isOutOfStock = offer.inStock === false;

                  if (isOutOfStock) {
                    return (
                      <div
                        key={offer.retailer}
                        className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-800 bg-[#0d0d0d] opacity-50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-sm">{offer.retailer}</span>
                          <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-gray-700 text-gray-300">
                            Out of Stock
                          </span>
                        </div>
                        <span className="text-lg font-black text-gray-500">${offer.price.toFixed(2)}</span>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={offer.retailer}
                      href={offer.url}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-colors ${
                        isBest
                          ? `${theme.border} bg-[#111]`
                          : "border-gray-800 bg-[#0d0d0d] hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-sm">{offer.retailer}</span>
                        {isBest && (
                          <span
                            className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${theme.bg} text-black`}
                          >
                            Best Price
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-black text-white">${offer.price.toFixed(2)}</span>
                        <span className={`text-xs font-bold uppercase ${theme.text}`}>Buy →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed">
              As an Amazon Associate and affiliate of other retailer programs, MacroSaver earns from
              qualifying purchases made through links on this page. This does not affect the price you
              pay or the offers we show — our rankings are based purely on cost per serving and cost
              per ounce of protein.
            </p>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
