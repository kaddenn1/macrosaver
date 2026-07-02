import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "transparent-labs-whey",
    name: "100% Grass-Fed Whey Protein Isolate",
    brand: "Transparent Labs",
    category: "protein",
    imagePlaceholder: "WHEY",
    servings: 30,
    nutrition: {
      servingSize: "1 scoop",
      calories: 120,
      proteinGrams: 25,
      carbsGrams: 2,
      fatGrams: 0,
      sugarGrams: 1,
    },
    offers: [
      {
        retailer: "Transparent Labs",
        price: 59.99,
        affiliateLink: "#affiliate-transparent-labs-whey",
      },
      {
        retailer: "Amazon",
        price: 64.99,
        affiliateLink: "#affiliate-amazon-transparent-labs-whey",
      },
    ],
  },
  {
    id: "nutricost-creatine-monohydrate",
    name: "Creatine Monohydrate",
    brand: "Nutricost",
    category: "creatine",
    imagePlaceholder: "CRE",
    servings: 100,
    nutrition: {
      servingSize: "1 scoop",
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
    },
    offers: [
      {
        retailer: "Nutricost",
        price: 21.99,
        affiliateLink: "#affiliate-nutricost-creatine",
      },
      {
        retailer: "Amazon",
        price: 18.99,
        affiliateLink: "#affiliate-amazon-nutricost-creatine",
      },
    ],
  },
  {
    id: "lmnt-electrolyte-drink-mix",
    name: "Electrolyte Drink Mix",
    brand: "LMNT",
    category: "electrolytes",
    imagePlaceholder: "HYD",
    servings: 30,
    nutrition: {
      servingSize: "1 stick pack",
      calories: 10,
      proteinGrams: 0,
      carbsGrams: 2,
      sugarGrams: 0,
      sodiumMilligrams: 1000,
      electrolytesMilligrams: 1200,
    },
    offers: [
      {
        retailer: "LMNT",
        price: 45,
        affiliateLink: "#affiliate-lmnt-electrolytes",
      },
      {
        retailer: "Amazon",
        price: 39.99,
        affiliateLink: "#affiliate-amazon-lmnt-electrolytes",
      },
    ],
  },
];
