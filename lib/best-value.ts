import type { Product, SupplementCategory } from "@/data/types";
import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getProteinPerDollar,
  supportsServingMetrics,
} from "@/lib/macrosaver-engine";

export type BestValueSortMetric = "proteinPerDollar" | "costPerServing";

export type BestValueArticle = {
  slug: string;
  title: string;
  metaDescription: string;
  intro: string;
  category: SupplementCategory;
  /** Extra eligibility filter beyond category and having the sort metric available. */
  filter?: (product: Product) => boolean;
  sortBy: BestValueSortMetric;
  sortDirection: "asc" | "desc";
  limit: number;
  metricLabel: string;
};

export const BEST_VALUE_ARTICLES: BestValueArticle[] = [
  {
    slug: "cheapest-whey-protein-per-serving",
    title: "Cheapest Whey Protein per Serving",
    metaDescription:
      "Every whey protein in our catalog — identified by \"whey\" in the product name — ranked from lowest to highest cost per serving using recorded retailer prices.",
    intro:
      "This list is limited to products with \"whey\" in their own product name — we're not classifying formulas ourselves, just filtering to what the label already claims. They're ranked by cost per serving (price divided by servings per container), the number that actually determines what one scoop costs you, not the price on the tub.",
    category: "protein",
    filter: (product) => /whey/i.test(product.name),
    sortBy: "costPerServing",
    sortDirection: "asc",
    limit: 15,
    metricLabel: "Cost / Serving",
  },
  {
    slug: "best-protein-powder-under-30",
    title: "Best Protein Powder Under $30",
    metaDescription:
      "Protein powders with a recorded retailer price under $30, ranked by protein per dollar so you can see which cheap tubs are actually the best deal.",
    intro:
      "Every product below has a recorded retailer price under $30. They're ranked by protein per dollar — total grams of protein in the container divided by price — not by sticker price alone, since a cheaper tub with a smaller scoop or fewer servings can be a worse deal than a slightly pricier one.",
    category: "protein",
    filter: (product) => {
      const offer = getBestOffer(product);
      return offer !== null && offer.price < 30;
    },
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
  },
  {
    slug: "best-protein-powder-under-50",
    title: "Best Protein Powder Under $50",
    metaDescription:
      "Protein powders with a recorded retailer price under $50, ranked by protein per dollar to find the best real value once you allow for bigger tubs.",
    intro:
      "Every product below has a recorded retailer price under $50 — enough headroom to include bigger tubs that a strict $30 cutoff would exclude. They're ranked by protein per dollar, not price, since a bigger container is only a better deal if it actually delivers more protein for the money.",
    category: "protein",
    filter: (product) => {
      const offer = getBestOffer(product);
      return offer !== null && offer.price < 50;
    },
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 15,
    metricLabel: "Protein / $",
  },
  {
    slug: "highest-protein-per-dollar",
    title: "Highest Protein Per Dollar: Ranked",
    metaDescription:
      "Every protein powder in our catalog with a recorded price, ranked from highest to lowest protein per dollar — no price ceiling, just the raw value ranking.",
    intro:
      "This is the full ranking, no price ceiling: every protein powder in our catalog with a recorded retailer price, sorted purely by protein per dollar. It's the same metric used in our $30 and $50 lists, just without a cutoff, so you can see exactly where a specific product lands against everything else we track.",
    category: "protein",
    sortBy: "proteinPerDollar",
    sortDirection: "desc",
    limit: 25,
    metricLabel: "Protein / $",
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
    (p) => supportsServingMetrics(p) && (!article.filter || article.filter(p))
  );

  const getMetric = article.sortBy === "proteinPerDollar" ? getProteinPerDollar : getCostPerServing;

  const ranked = eligible
    .map((product) => ({ product, metricValue: getMetric(product) }))
    .filter((entry): entry is RankedProduct => entry.metricValue !== null);

  ranked.sort((a, b) =>
    article.sortDirection === "desc" ? b.metricValue - a.metricValue : a.metricValue - b.metricValue
  );

  return ranked.slice(0, article.limit);
}
