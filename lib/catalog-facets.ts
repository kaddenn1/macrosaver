import "server-only";

import { products } from "@/data/products";
import type { FilterFacets, Product } from "@/data/types";
import { extractFlavor } from "@/lib/macrosaver-engine";
import { PROTEIN_THRESHOLDS } from "@/lib/catalog-query";

export function getCatalogFacets(activeCategory?: string): FilterFacets {
  const baseProducts = activeCategory
    ? (products as Product[]).filter(
        (product) =>
          product.category === activeCategory ||
          product.additionalCategories?.includes(activeCategory as Product["category"])
      )
    : (products as Product[]);

  const flavorCounts = new Map<string, number>();

  // A site-wide flavor list is too noisy to be useful. Facets are scoped to a
  // category so the controls always match the result set users can see.
  if (activeCategory) {
    baseProducts.forEach((product) => {
      const flavor = extractFlavor(product.name);
      if (flavor) flavorCounts.set(flavor, (flavorCounts.get(flavor) ?? 0) + 1);
    });
  }

  return {
    proteinThresholds: PROTEIN_THRESHOLDS.map((value) => ({
      value,
      count: baseProducts.filter(
        (product) => (product.nutrition.proteinGrams || 0) >= value
      ).length,
    })),
    clearProteinCount: baseProducts.filter((product) =>
      product.name.toLowerCase().includes("clear")
    ).length,
    flavors: Array.from(flavorCounts, ([value, count]) => ({ value, count })).sort(
      (a, b) => a.value.localeCompare(b.value)
    ),
  };
}
