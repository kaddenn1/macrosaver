export type SupplementCategory =
  | "protein"
  | "creatine"
  | "pre-workout"
  | "weight-management"
  | "food-drink"
  | "electrolytes"
  | "gut-health"
  | "bariatric"
  | "multivitamin"
  | "other";

export type PricePoint = {
  /** ISO date the price was observed. */
  date: string;
  price: number;
};

/**
 * "verified" is the only state eligible for a Verified badge, deal ranking, or campaign
 * inclusion — it means `priceObservedAt` reflects a directly confirmed current price.
 * The other three states may still carry an old `priceObservedAt` for historical display,
 * but never license calling the price current.
 */
export type VerificationState = "verified" | "checked_stale" | "unavailable" | "review_required";

export type RetailerOffer = {
  retailer: string;
  price: number;
  url: string;
  /** Amazon Standard Identification Number, used to build the tagged affiliate link. */
  asin?: string;
  /** Defaults to true. Set to false when the retailer has temporarily sold out. */
  inStock?: boolean;
  /** ISO timestamp of the most recent retailer-link check attempt, successful or not. Never implies the price is current. */
  lastCheckedAt?: string;
  /** ISO timestamp for a direct retailer price observation. Only meaningful when verificationState is "verified". */
  priceObservedAt?: string;
  /** What the most recent check actually established. Omitted only for offers that predate this field. */
  verificationState?: VerificationState;
  /** Pre-sale/typical price. Present only while `price` reflects an active discount off this value. */
  listPrice?: number;
  /** Retailer's Subscribe & Save (or equivalent recurring-order) price. Present only while it's lower than `price`. */
  subscribeAndSavePrice?: number;
  /** Chronological price observations for this offer, oldest first. Appended on each verified re-check. */
  priceHistory?: PricePoint[];
};

export type ProductKind = "consumable" | "topical" | "equipment" | "mixed-bundle";

export type NutritionFacts = {
  servingSize?: string;
  calories?: number;
  proteinGrams: number;
  carbsGrams?: number;
  fatGrams?: number;
  sugarGrams?: number;
  sodiumMilligrams?: number;
  creatineGrams?: number;
  electrolytesMilligrams?: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: SupplementCategory;
  /** Extra category pages this product should also show up under, beyond its primary `category`. */
  additionalCategories?: SupplementCategory[];
  /** Keys into APPROVAL_BADGES (lib/approvals.ts) for influencers who've endorsed this product. */
  approvedBy?: string[];
  /** Defaults to consumable. Non-consumables never use serving or nutrition value metrics. */
  kind?: ProductKind;
  image?: string;
  nutrition: NutritionFacts;
  /** Visible qualification when one or more nutrition values were calculated or not label-verified. */
  nutritionNote?: string;
  /** Manufacturer-declared servings for consumables; ignored for every other product kind. */
  servings: number;
  offers: RetailerOffer[];
};

export type ProductWithValueMetrics = Product & {
  bestOffer: RetailerOffer | null;
  costPerServing: number | null;
  proteinPerDollar: number | null;
  costPerOzProtein: number | null;
  savingsVsHighestOffer: number | null;
};

export type FilterFacetOption = {
  value: string;
  count: number;
};

export type FilterFacets = {
  minCost: number;
  maxCost: number;
  proteinThresholds: Array<{ value: number; count: number }>;
  clearProteinCount: number;
  flavors: FilterFacetOption[];
};