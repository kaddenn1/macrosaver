import type { Product, SupplementCategory } from "@/data/types";
import { products } from "@/data/products";
import {
  getProteinConcentration,
  hasAvailableOffer,
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
      "Optimum Nutrition Gold Standard whey and Dymatize Elite Casein compared on protein concentration, using every product from each brand in our catalog.",
    intro:
      "A head-to-head on nutrition density, not taste, mixability, or price — we don't have reliable data on the first two, and the last one changes too often to track. Every Optimum Nutrition and Dymatize protein product in our catalog is included below, compared on protein concentration (grams of protein per gram of serving).",
    category: "protein",
    brandA: "Optimum Nutrition",
    brandB: "Dymatize",
  },
  {
    slug: "ghost-vs-optimum-nutrition",
    title: "Ghost Whey vs. Optimum Nutrition: Which Has More Protein?",
    metaDescription:
      "Ghost Whey and Optimum Nutrition Gold Standard compared on protein concentration, using every product from each brand in our catalog.",
    intro:
      "Ghost built its name on flavor collaborations and packaging; Optimum Nutrition's Gold Standard line is the longtime default. This comparison sets taste and branding aside and compares every product we carry from each brand purely on protein concentration (grams of protein per gram of serving).",
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
  products: Array<{ product: Product; proteinConcentration: number | null }>;
  bestProteinConcentration: { product: Product; value: number } | null;
  avgProteinConcentration: number | null;
};

export function getBrandStats(category: SupplementCategory, brand: string): BrandStats {
  const brandProducts = (products as Product[]).filter(
    (p) =>
      p.brand === brand &&
      (p.category === category || p.additionalCategories?.includes(category)) &&
      supportsServingMetrics(p) &&
      hasAvailableOffer(p)
  );

  const rows = brandProducts.map((product) => ({
    product,
    proteinConcentration: getProteinConcentration(product),
  }));

  const withProtein = rows.filter(
    (r): r is { product: Product; proteinConcentration: number } => r.proteinConcentration !== null
  );

  const bestProteinConcentration =
    withProtein.length > 0
      ? withProtein.reduce((best, r) => (r.proteinConcentration > best.proteinConcentration ? r : best))
      : null;

  const avgProteinConcentration =
    withProtein.length > 0
      ? Math.round(
          (withProtein.reduce((sum, r) => sum + r.proteinConcentration, 0) / withProtein.length) * 100
        ) / 100
      : null;

  return {
    brand,
    products: rows,
    bestProteinConcentration: bestProteinConcentration
      ? { product: bestProteinConcentration.product, value: bestProteinConcentration.proteinConcentration }
      : null,
    avgProteinConcentration,
  };
}
