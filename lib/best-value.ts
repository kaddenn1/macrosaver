import type { Product, SupplementCategory } from "@/data/types";
import { products } from "@/data/products";
import {
  getCaloriesPerGramProtein,
  getProteinConcentration,
  getServingSizeGrams,
  hasAvailableOffer,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";

export type BestValueSortMetric = "proteinConcentration" | "caloriesPerGramProtein" | "servingSizeGrams";

const METRIC_GETTERS: Record<BestValueSortMetric, (product: Product) => number | null> = {
  proteinConcentration: getProteinConcentration,
  caloriesPerGramProtein: getCaloriesPerGramProtein,
  servingSizeGrams: getServingSizeGrams,
};

/**
 * The "protein" category also holds collagen peptides, RTD protein milk/drinks,
 * and protein bars — all genuinely protein products, but not "protein powder" in
 * the sense someone searching that term means. Pages framed around protein powder
 * specifically should exclude these rather than silently including them because
 * they share a category tag.
 */
function isPowderFormat(product: Product): boolean {
  if (product.brand === "Built Bar") return false;
  if (/collagen/i.test(product.name)) return false;
  const servingSize = product.nutrition.servingSize ?? "";
  if (/\b(bottle|can)\b/i.test(servingSize)) return false;
  return true;
}

export type BestValueArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  category: SupplementCategory;
  /** Extra eligibility filter beyond category and having the sort metric available. */
  filter?: (product: Product) => boolean;
  /** Excludes collagen, RTD protein drinks/milk, and protein bars — for pages specifically about protein powder. */
  powderOnly?: boolean;
  sortBy: BestValueSortMetric;
  sortDirection: "asc" | "desc";
  limit: number;
  metricLabel: string;
  metricFormat: "grams" | "decimal";
  /** Short decision aids that explain how to use the ranking without inventing new ranking factors. */
  decisionGuide?: { label: string; guidance: string }[];
  /** Page-specific questions answered from the same catalog methodology used by the ranking. */
  faqs?: { question: string; answer: string }[];
};

export const BEST_VALUE_ARTICLES: BestValueArticle[] = [
  {
    slug: "highest-protein-whey",
    title: "Highest-Protein Whey Powders, Ranked",
    metaDescription:
      "Every whey protein in our catalog — identified by \"whey\" in the product name — ranked by protein grams per gram of serving, the nutrition-density figure that matters more than scoop size.",
    intro:
      "This list is limited to products with \"whey\" in their own product name — we're not classifying formulas ourselves, just filtering to what the label already claims. They're ranked by protein concentration (grams of protein per gram of serving), the number that shows how much of each scoop is actually protein versus filler.",
    category: "protein",
    // Everyday retail sizes only: no multipacks, 10 lb bulk tubs, or sub-1 lb trial sizes.
    filter: (product) =>
      /whey/i.test(product.name) && !/pack of|10 (lb|pound)|0\.68/i.test(product.name),
    powderOnly: true,
    sortBy: "proteinConcentration",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / g Serving",
    metricFormat: "decimal",
  },
  {
    slug: "highest-protein-concentration",
    title: "Highest Protein Concentration: Ranked",
    metaDescription:
      "Every protein powder in our catalog ranked from highest to lowest protein concentration — grams of protein per gram of serving, with no price data involved.",
    intro:
      "This is the full ranking: every protein powder in our catalog, sorted purely by protein concentration — grams of protein per gram of serving. It's a nutrition-density metric, not a price comparison, so you can see exactly how a specific product's formula stacks up against everything else we track.",
    category: "protein",
    powderOnly: true,
    sortBy: "proteinConcentration",
    sortDirection: "desc",
    limit: 25,
    metricLabel: "Protein / g Serving",
    metricFormat: "decimal",
  },
  {
    slug: "best-value-clear-protein-powder",
    title: "Best-Value Clear Protein Powder",
    metaDescription:
      "Clear whey protein isolate products in our catalog, ranked by protein concentration, for anyone who wants a juice-like protein drink instead of a milky shake.",
    intro:
      "Clear whey isolate is still a small category in our catalog — this list is limited to products explicitly labeled \"clear\" in their own name, so it may only show a couple of results today. They're ranked by protein concentration (grams of protein per gram of serving), same as our other protein rankings.",
    category: "protein",
    filter: (product) => /clear/i.test(product.name),
    powderOnly: true,
    sortBy: "proteinConcentration",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / g Serving",
    metricFormat: "decimal",
  },
  {
    slug: "best-value-protein-powder-bariatric",
    title: "Best-Value Protein Powder for Bariatric Patients",
    metaDescription:
      "Protein products in our bariatric category, ranked by protein concentration, for post-op shoppers prioritizing protein first in small portions.",
    intro:
      "Filtered to products tagged in our bariatric category that actually contain protein — mostly collagen and protein powders sized for small portions, not the full bariatric vitamin and supplement lineup. Ranked by protein concentration (grams of protein per gram of serving). This is a newer part of our catalog, so the list may be short; always confirm with your bariatric team before changing what you use post-op.",
    category: "bariatric",
    filter: (product) => product.nutrition.proteinGrams > 0,
    sortBy: "proteinConcentration",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / g Serving",
    metricFormat: "decimal",
  },
  {
    slug: "best-protein-powder-small-serving-sizes",
    title: "Best Protein Powder for Small Serving Sizes",
    metaDescription:
      "Protein powders ranked by grams per serving, smallest first, for anyone who wants a lighter scoop to mix into a small glass or add to another recipe.",
    intro:
      "Ranked by the labeled grams-per-serving figure, smallest first — pulled directly from each product's serving size, not estimated. Only products with a parseable gram serving size on the label are included, so this list skips products sold by stick pack, bottle, or capsule instead of a scoop.",
    category: "protein",
    powderOnly: true,
    sortBy: "servingSizeGrams",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Grams / Serving",
    metricFormat: "grams",
  },
  {
    slug: "creatine-serving-size",
    title: "Creatine Monohydrate by Serving Size: Ranked",
    metaDescription:
      "Every creatine monohydrate product in our catalog, ranked by labeled serving size — powder tubs and capsules alike, smallest dose first.",
    intro:
      "Creatine monohydrate is close to a commodity — a 5g dose is a 5g dose regardless of brand. This list ranks every creatine product we track by labeled grams per serving, smallest first, covering different sizes and flavors of the same formula as well as capsule versions.",
    category: "creatine",
    sortBy: "servingSizeGrams",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Grams / Serving",
    metricFormat: "grams",
  },
];

export function getBestValueArticleBySlug(slug: string): BestValueArticle | undefined {
  return BEST_VALUE_ARTICLES.find((a) => a.slug === slug);
}

export function getBestValueArticlesByCategory(category: string): BestValueArticle[] {
  return BEST_VALUE_ARTICLES.filter((a) => a.category === category);
}

export type RankedProduct = { product: Product; metricValue: number };

export function getRankedProducts(article: BestValueArticle): RankedProduct[] {
  const categoryProducts = (products as Product[]).filter(
    (p) => p.category === article.category || p.additionalCategories?.includes(article.category)
  );

  const eligible = categoryProducts.filter(
    (p) =>
      supportsServingMetrics(p) &&
      hasAvailableOffer(p) &&
      (!article.powderOnly || isPowderFormat(p)) &&
      (!article.filter || article.filter(p))
  );

  const getMetric = METRIC_GETTERS[article.sortBy];

  const ranked = eligible
    .map((product) => ({ product, metricValue: getMetric(product) }))
    .filter((entry): entry is RankedProduct => entry.metricValue !== null);

  ranked.sort((a, b) =>
    article.sortDirection === "desc" ? b.metricValue - a.metricValue : a.metricValue - b.metricValue
  );

  return ranked.slice(0, article.limit);
}
