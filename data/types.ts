export type SupplementCategory =
  | "protein"
  | "creatine"
  | "electrolytes"
  | "pre-workout"
  | "vitamins"
  | "other";

export type RetailerOffer = {
  retailer: string;
  price: number;
  url: string;
  /** Amazon Standard Identification Number, used to build the tagged affiliate link. */
  asin?: string;
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