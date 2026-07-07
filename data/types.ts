export type SupplementCategory =
  | "protein"
  | "creatine"
  | "pre-workout"
  | "weight-management"
  | "food-drink"
  | "electrolytes"
  | "gut-health"
  | "bariatric"
  | "other";

export type RetailerOffer = {
  retailer: string;
  price: number;
  url: string;
  /** Amazon Standard Identification Number, used to build the tagged affiliate link. */
  asin?: string;
  /** Defaults to true. Set to false when the retailer has temporarily sold out. */
  inStock?: boolean;
};

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
  image?: string;
  nutrition: NutritionFacts;
  servings: number;
  offers: RetailerOffer[];
};

export type ProductWithValueMetrics = Product & {
  bestOffer: RetailerOffer | null;
  costPerServing: number | null;
  proteinPerDollar: number | null;
  costPerOzProtein: number | null;
  valueScore: number;
  savingsVsHighestOffer: number | null;
};