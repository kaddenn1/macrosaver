import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../data/products.ts";
import { supportsServingMetrics } from "../lib/macrosaver-engine.ts";
import type { Product } from "../data/types.ts";

const errors: string[] = [];
const ids = new Set<string>();
const retailerCounts = new Map<string, number>();
let singleOfferProducts = 0;
let qualifiedNutritionProducts = 0;

for (const product of products as Product[]) {
  const label = `Product ${product.id || "(missing id)"}`;

  if (!product.id.trim()) errors.push(`${label}: id is required`);
  if (ids.has(product.id)) errors.push(`${label}: duplicate id`);
  ids.add(product.id);

  if (!product.name.trim()) errors.push(`${label}: name is required`);
  if (!product.brand.trim()) errors.push(`${label}: brand is required`);
  if (supportsServingMetrics(product)) {
    if (!Number.isFinite(product.servings) || product.servings <= 0) {
      errors.push(`${label}: consumable servings must be positive`);
    }
  } else {
    const nutritionKeys = Object.keys(product.nutrition);
    if (
      product.servings !== 1 ||
      product.nutrition.proteinGrams !== 0 ||
      nutritionKeys.some((key) => key !== "proteinGrams")
    ) {
      errors.push(
        `${label}: non-consumables must use compatibility placeholders (servings 1 and proteinGrams 0 only)`
      );
    }
  }
  if (product.offers.length === 0) errors.push(`${label}: at least one offer is required`);
  if (product.offers.length === 1) singleOfferProducts += 1;
  if (product.nutritionNote) qualifiedNutritionProducts += 1;

  if (product.image) {
    if (!product.image.startsWith("/")) {
      errors.push(`${label}: image must be a root-relative public path`);
    } else if (!existsSync(resolve(process.cwd(), "public", product.image.slice(1)))) {
      errors.push(`${label}: image not found at public${product.image}`);
    }
  }

  for (const offer of product.offers) {
    const priceObservedAt = (offer as { priceObservedAt?: unknown }).priceObservedAt;
    retailerCounts.set(offer.retailer, (retailerCounts.get(offer.retailer) ?? 0) + 1);
    if (!offer.retailer.trim()) errors.push(`${label}: retailer is required`);
    if (!Number.isFinite(offer.price) || offer.price <= 0) {
      errors.push(`${label}: offer price must be positive`);
    }
    try {
      const url = new URL(offer.url);
      if (url.protocol !== "https:") errors.push(`${label}: offer URL must use HTTPS`);
    } catch {
      errors.push(`${label}: invalid offer URL`);
    }
    if (/your-[a-z-]*tag/i.test(offer.url)) {
      errors.push(`${label}: placeholder affiliate tag detected`);
    }
    if (
      priceObservedAt !== undefined &&
      (typeof priceObservedAt !== "string" || !Number.isFinite(Date.parse(priceObservedAt)))
    ) {
      errors.push(`${label}: priceObservedAt must be a valid ISO timestamp`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Catalog validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const coverage = Array.from(retailerCounts, ([retailer, count]) => `${retailer}: ${count}`).join(
    ", "
  );
  console.log(`Catalog valid: ${products.length} products, ${ids.size} unique IDs.`);
  console.log(`Offer coverage: ${coverage}.`);
  console.log(`${singleOfferProducts} products currently have a single retailer offer.`);
  console.log(`${qualifiedNutritionProducts} products display a nutrition-data qualification.`);
}
