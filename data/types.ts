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

export type RetailerOffer = {
  retailer: string;
  url: string;
  /** Amazon Standard Identification Number, used to build the tagged affiliate link. */
  asin?: string;
  /** Defaults to true. Set to false when the retailer has temporarily sold out. */
  inStock?: boolean;
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

export type FilterFacetOption = {
  value: string;
  count: number;
};

export type FilterFacets = {
  proteinThresholds: Array<{ value: number; count: number }>;
  clearProteinCount: number;
  flavors: FilterFacetOption[];
};