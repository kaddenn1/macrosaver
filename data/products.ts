import type { Product } from "./types";
import { buildAffiliateLink } from "../config/affiliate";

export const products: Product[] = [
  {
    id: "transparent-labs-whey",
    name: "100% Grass-Fed Whey Protein Isolate",
    brand: "Transparent Labs",
    category: "protein",
    imagePlaceholder: "https://s3.images-iherb.com/tlb/tlb00322/v/10.jpg",
    servings: 30,
    nutrition: { 
      servingSize: "1 scoop", 
      calories: 120, 
      proteinGrams: 25,
      carbsGrams: 2,
      fatGrams: 0,
      sugarGrams: 1
    },
    offers: [
      { retailer: "iHerb", price: 54.99, affiliateLink: buildAffiliateLink("iHerb", "#") },
      { retailer: "Amazon", price: 59.99, affiliateLink: buildAffiliateLink("Amazon", "#") }
    ]
  },
  {
    id: "nutricost-creatine-monohydrate",
    name: "Creatine Monohydrate",
    brand: "Nutricost",
    category: "creatine",
    imagePlaceholder: "https://s3.images-iherb.com/ncs/ncs00406/v/19.jpg",
    servings: 100,
    nutrition: { 
      servingSize: "1 scoop", 
      proteinGrams: 0,
      creatineGrams: 5 
    },
    offers: [
      { retailer: "Amazon", price: 18.99, affiliateLink: buildAffiliateLink("Amazon", "#") },
      { retailer: "Walmart", price: 21.99, affiliateLink: buildAffiliateLink("Walmart", "#") }
    ]
  },
  {
    id: "gorilla-mode-pre",
    name: "Original 7g BCAA Muscle Recovery",
    brand: "XTEND",
    category: "pre-workout",
    imagePlaceholder: "https://s3.images-iherb.com/scv/scv03023/v/39.jpg",
    servings: 30,
    nutrition: { 
      servingSize: "1 scoop", 
      proteinGrams: 0
    },
    offers: [
      { retailer: "Vitamin Shoppe", price: 24.99, affiliateLink: buildAffiliateLink("Vitamin Shoppe", "#") },
      { retailer: "Amazon", price: 29.99, affiliateLink: buildAffiliateLink("Amazon", "#") }
    ]
  },
  {
    id: "lmnt-electrolyte-drink-mix",
    name: "Electrolyte Drink Mix",
    brand: "LMNT",
    category: "electrolytes",
    imagePlaceholder: "https://cdn.shopify.com/s/files/1/0014/4031/7501/files/ValueCard_Citrus_2x_ef7cc888-25f0-4fa3-ad88-062e5b8d2bb2.png?v=1712168541",
    servings: 30,
    nutrition: { 
      servingSize: "1 stick pack", 
      calories: 10, 
      proteinGrams: 0, 
      carbsGrams: 2, 
      sugarGrams: 0, 
      sodiumMilligrams: 1000
    },
    offers: [
      { retailer: "iHerb", price: 39.99, affiliateLink: buildAffiliateLink("iHerb", "#") },
      { retailer: "Amazon", price: 45.00, affiliateLink: buildAffiliateLink("Amazon", "#") }
    ]
  },
  {
    id: "optimum-nutrition-glutamine",
    name: "Recharge Post-Workout",
    brand: "Legion",
    category: "other",
    imagePlaceholder: "https://s3.images-iherb.com/leg/leg03551/v/2.jpg",
    servings: 30,
    nutrition: { 
      servingSize: "1 scoop", 
      proteinGrams: 0 
    },
    offers: [
      { retailer: "Amazon", price: 49.99, affiliateLink: buildAffiliateLink("Amazon", "#") },
      { retailer: "Vitamin Shoppe", price: 54.99, affiliateLink: buildAffiliateLink("Vitamin Shoppe", "#") }
    ]
  }
];