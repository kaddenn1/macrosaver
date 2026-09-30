import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { products } from "../data/products.ts";
import { supportsServingMetrics } from "../lib/macrosaver-engine.ts";
import type { Product } from "../data/types.ts";

const FORBIDDEN_OFFER_KEYS = [
  "price",
  "listPrice",
  "priceHistory",
  "subscribeAndSavePrice",
  "verificationState",
] as const;

const AMAZON_IMAGE_HOST_PATTERNS = [/amazon\.com/i, /media-amazon\.com/i, /ssl-images-amazon\.com/i];

const errors: string[] = [];
const ids = new Set<string>();
const retailerCounts = new Map<string, number>();
let singleOfferProducts = 0;
let zeroOfferProducts = 0;
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
  // A zero-offer product is now a valid, intentional state: Amazon offers were pulled
  // sitewide (2026-09-25, Associates compliance) and 233 products have no other retailer.
  if (product.offers.length === 0) zeroOfferProducts += 1;
  if (product.offers.length === 1) singleOfferProducts += 1;
  if (product.nutritionNote) qualifiedNutritionProducts += 1;

  if (product.image) {
    if (!product.image.startsWith("/")) {
      errors.push(`${label}: image must be a root-relative public path`);
    } else if (!existsSync(resolve(process.cwd(), "public", product.image.slice(1)))) {
      errors.push(`${label}: image not found at public${product.image}`);
    }
    if (AMAZON_IMAGE_HOST_PATTERNS.some((pattern) => pattern.test(product.image!))) {
      errors.push(`${label}: image must not be hosted on an Amazon-owned domain`);
    }
  }

  for (const offer of product.offers) {
    retailerCounts.set(offer.retailer, (retailerCounts.get(offer.retailer) ?? 0) + 1);
    if (!offer.retailer.trim()) errors.push(`${label}: retailer is required`);
    try {
      const url = new URL(offer.url);
      if (url.protocol !== "https:") errors.push(`${label}: offer URL must use HTTPS`);
    } catch {
      errors.push(`${label}: invalid offer URL`);
    }
    if (/your-[a-z-]*tag/i.test(offer.url)) {
      errors.push(`${label}: placeholder affiliate tag detected`);
    }
    for (const key of FORBIDDEN_OFFER_KEYS) {
      if (Object.prototype.hasOwnProperty.call(offer, key)) {
        errors.push(`${label}: offer must not have a "${key}" property (pricing data was removed sitewide)`);
      }
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
  console.log(`${zeroOfferProducts} products currently have no offers (Amazon pulled pending Associates reinstatement).`);
  console.log(`${qualifiedNutritionProducts} products display a nutrition-data qualification.`);
}
