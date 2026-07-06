import { amazonUrl } from "@/lib/affiliate";

export const products = [
  {
    id: "6",
    name: "100% Clear Whey Protein Isolate - Pineapple Coconut",
    brand: "Ascent",
    category: "protein",
    image: "/products/6.jpg",
    servings: 20,
    nutrition: { calories: 100, proteinGrams: 20 },
    offers: [
      { retailer: "Amazon", price: 28.79, url: amazonUrl("B0DGZHDBZT"), asin: "B0DGZHDBZT" }
    ]
  },
  {
    id: "9",
    name: "100% Clear Whey Protein Isolate - Orange Mango",
    brand: "Ascent",
    category: "protein",
    image: "/products/9.jpg",
    servings: 20,
    nutrition: { calories: 100, proteinGrams: 20 },
    offers: [
      { retailer: "Amazon", price: 31.99, url: amazonUrl("B0DGZGKFBT"), asin: "B0DGZGKFBT" }
    ]
  },
  {
    id: "7",
    name: "Premier Protein Powder, Chocolate (1.46 lb)",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/7.jpg",
    servings: 17,
    nutrition: { calories: 180, proteinGrams: 30 },
    offers: [
      { retailer: "Amazon", price: 23.98, url: amazonUrl("B06ZZ3PJQD"), asin: "B06ZZ3PJQD" }
    ]
  },
  {
    id: "8",
    name: "Premier Protein Powder, Chocolate (2.51 lb)",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/7.jpg",
    servings: 29,
    nutrition: { calories: 150, proteinGrams: 30 },
    offers: [
      { retailer: "Amazon", price: 42.97, url: amazonUrl("B0D4X2RXP8"), asin: "B0D4X2RXP8" }
    ]
  },
  {
    id: "1",
    name: "Gold Standard 100% Whey (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/1.jpg",
    servings: 74,
    nutrition: { calories: 120, proteinGrams: 24 },
    offers: [
      { retailer: "Amazon", price: 96.28, url: amazonUrl("B000QSNYGI"), asin: "B000QSNYGI" }
    ]
  },
  {
    id: "2",
    name: "Creatine Monohydrate",
    brand: "Nutricost",
    category: "creatine",
    servings: 100,
    nutrition: { calories: 0, proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 29.95, url: "#" },
      { retailer: "Walmart", price: 31.00, url: "#" }
    ]
  },
  {
    id: "3",
    name: "Legend Pre-Workout",
    brand: "Ghost",
    category: "pre-workout",
    servings: 30,
    nutrition: { calories: 10, proteinGrams: 0 },
    offers: [
      { retailer: "Vitamin Shoppe", price: 44.99, url: "#" },
      { retailer: "Amazon", price: 42.50, url: "#" }
    ]
  },
  {
    id: "4",
    name: "Hydration Multiplier",
    brand: "Liquid I.V.",
    category: "electrolytes",
    servings: 16,
    nutrition: { calories: 45, proteinGrams: 0 },
    offers: [
      { retailer: "Costco", price: 23.99, url: "#" },
      { retailer: "Amazon", price: 25.99, url: "#" }
    ]
  },
  {
    id: "5",
    name: "Casein Protein",
    brand: "Dymatize",
    category: "protein",
    servings: 52,
    nutrition: { calories: 120, proteinGrams: 25 },
    offers: [
      { retailer: "iHerb", price: 54.99, url: "#" },
      { retailer: "Amazon", price: 58.00, url: "#" }
    ]
  }
];