import type { Product, SupplementCategory } from "@/data/types";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getProteinPerDollar,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";

export type BrandComparisonArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  category: SupplementCategory;
  brandA: string;
  brandB: string;
};

export const BRAND_COMPARISON_ARTICLES: BrandComparisonArticle[] = [
  {
    slug: "optimum-nutrition-vs-dymatize",
    title: "Optimum Nutrition vs. Dymatize: Value Comparison",
    metaDescription:
      "Optimum Nutrition and Dymatize whey protein compared on cost per serving and protein per dollar, using every product from each brand in our catalog.",
    intro:
      "A head-to-head on price and protein value, not taste or mixability — we don't have reliable data on either. Every Optimum Nutrition and Dymatize protein product in our catalog is included below, compared on cost per serving and protein per dollar using recorded retailer prices.",
    category: "protein",
    brandA: "Optimum Nutrition",
    brandB: "Dymatize",
  },
  {
    slug: "ghost-vs-optimum-nutrition",
    title: "Ghost Whey vs. Optimum Nutrition: Which Is the Better Buy?",
    metaDescription:
      "Ghost Whey and Optimum Nutrition Gold Standard compared on cost per serving and protein per dollar, using every product from each brand in our catalog.",
    intro:
      "Ghost built its name on flavor collaborations and packaging; Optimum Nutrition's Gold Standard line is the longtime default. This comparison sets taste and branding aside and compares every product we carry from each brand purely on cost per serving and protein per dollar.",
    category: "protein",
    brandA: "Ghost",
    brandB: "Optimum Nutrition",
  },
];

export function getBrandComparisonBySlug(slug: string): BrandComparisonArticle | undefined {
  return BRAND_COMPARISON_ARTICLES.find((a) => a.slug === slug);
}

export type BrandStats = {
  brand: string;
  products: Array<{ product: Product; costPerServing: number | null; proteinPerDollar: number | null }>;
  cheapestByServing: { product: Product; value: number } | null;
  bestProteinPerDollar: { product: Product; value: number } | null;
  avgCostPerServing: number | null;
};

export function getBrandStats(category: SupplementCategory, brand: string): BrandStats {
  const brandProducts = (products as Product[]).filter(
    (p) =>
      p.brand === brand &&
      (p.category === category || p.additionalCategories?.includes(category)) &&
      supportsServingMetrics(p) &&
      getBestOffer(p) !== null
  );

  const rows = brandProducts.map((product) => ({
    product,
    costPerServing: getCostPerServing(product),
    proteinPerDollar: getProteinPerDollar(product),
  }));

  const withCost = rows.filter(
    (r): r is { product: Product; costPerServing: number; proteinPerDollar: number | null } =>
      r.costPerServing !== null
  );
  const withProtein = rows.filter(
    (r): r is { product: Product; costPerServing: number | null; proteinPerDollar: number } =>
      r.proteinPerDollar !== null
  );

  const cheapestByServing =
    withCost.length > 0
      ? withCost.reduce((best, r) => (r.costPerServing < best.costPerServing ? r : best))
      : null;

  const bestProteinPerDollar =
    withProtein.length > 0
      ? withProtein.reduce((best, r) => (r.proteinPerDollar > best.proteinPerDollar ? r : best))
      : null;

  const avgCostPerServing =
    withCost.length > 0
      ? Math.round((withCost.reduce((sum, r) => sum + r.costPerServing, 0) / withCost.length) * 100) / 100
      : null;

  return {
    brand,
    products: rows,
    cheapestByServing: cheapestByServing
      ? { product: cheapestByServing.product, value: cheapestByServing.costPerServing }
      : null,
    bestProteinPerDollar: bestProteinPerDollar
      ? { product: bestProteinPerDollar.product, value: bestProteinPerDollar.proteinPerDollar }
      : null,
    avgCostPerServing,
  };
}
