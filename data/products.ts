import { Product } from "./types";

export const products: Product[] = [
  {
    id: "prod_001",
    brand: "Nutricost",
    name: "Clear Whey Isolate Protein Powder",
    category: "protein", // 👈 Lowercase to match your system's SupplementCategory
    imagePlaceholder: "", 
    servings: 30,
    nutrition: {
      proteinGrams: 20,
      servingsPerContainer: 30,
    },
    offers: [
      {
        retailer: "Amazon",
        price: 34.99,
        affiliateLink: "https://www.amazon.com/dp/EXAMPLE_TAG1",
      },
    ],
  },
  {
    id: "prod_002",
    brand: "Transparent Labs",
    name: "100% Grass-Fed Whey Protein Isolate",
    category: "protein",
    imagePlaceholder: "", 
    servings: 30,
    nutrition: {
      proteinGrams: 28,
      servingsPerContainer: 30,
    },
    offers: [
      {
        retailer: "Amazon",
        price: 59.99,
        affiliateLink: "https://www.amazon.com/dp/EXAMPLE_TAG2",
      },
    ],
  },
  {
    id: "prod_003",
    brand: "Optimum Nutrition",
    name: "Micronized Creatine Monohydrate",
    category: "creatine",
    imagePlaceholder: "", 
    servings: 120,
    nutrition: {
      proteinGrams: 0, 
      servingsPerContainer: 120,
    },
    offers: [
      {
        retailer: "Amazon",
        price: 38.49,
        affiliateLink: "https://www.amazon.com/dp/EXAMPLE_TAG3",
      },
    ],
  }
];