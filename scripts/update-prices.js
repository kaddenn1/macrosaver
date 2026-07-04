const fs = require('fs');
const path = require('path');

// Target path to your exact data file
const dataFilePath = path.join(__dirname, '../data/products.ts');

console.log('🔄 MacroSaver Automation Engine: Fetching live affiliate rates...');

// Simulated Live API Response from Amazon Associates & iHerb Affiliate Networks
// In production, you will hook these up to live fetch() requests to their product APIs
const fetchLiveMarketPrices = () => {
  return {
    "transparent-labs-whey": { iHerb: 53.49, Amazon: 58.99 },
    "nutricost-creatine-monohydrate": { Amazon: 17.95, Walmart: 20.99 },
    "gorilla-mode-pre": { VitaminShoppe: 42.99, Amazon: 47.50 },
    "lmnt-electrolyte-drink-mix": { iHerb: 38.99, Amazon: 44.00 },
    "optimum-nutrition-glutamine": { Amazon: 28.49, VitaminShoppe: 33.99 }
  };
};

const runPriceAutomation = () => {
  try {
    const livePrices = fetchLiveMarketPrices();
    
    // The completely updated TypeScript file body ready to be written down cleanly
    const updatedFileContent = `import type { Product } from "./types";

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
      sugarGrams: 1
    },
    offers: [
      { retailer: "iHerb", price: ${livePrices["transparent-labs-whey"].iHerb}, affiliateLink: "https://www.iherb.com/your-affiliate-tag" },
      { retailer: "Amazon", price: ${livePrices["transparent-labs-whey"].Amazon}, affiliateLink: "https://amzn.to/your-amazon-tag" }
    ]
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
      proteinGrams: 0,
      creatineGrams: 5 
    },
    offers: [
      { retailer: "Amazon", price: ${livePrices["nutricost-creatine-monohydrate"].Amazon}, affiliateLink: "https://amzn.to/your-amazon-tag" },
      { retailer: "Walmart", price: ${livePrices["nutricost-creatine-monohydrate"].Walmart}, affiliateLink: "https://walmart.impactradius.com/your-tag" }
    ]
  },
  {
    id: "gorilla-mode-pre",
    name: "Gorilla Mode Pre-Workout",
    brand: "Gorilla Mind",
    category: "pre-workout",
    imagePlaceholder: "PRE",
    servings: 40,
    nutrition: { 
      servingSize: "1 scoop", 
      proteinGrams: 0
    },
    offers: [
      { retailer: "Vitamin Shoppe", price: ${livePrices["gorilla-mode-pre"].VitaminShoppe}, affiliateLink: "https://www.tkqlhce.com/your-cj-tag" },
      { retailer: "Amazon", price: ${livePrices["gorilla-mode-pre"].Amazon}, affiliateLink: "https://amzn.to/your-amazon-tag" }
    ]
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
      sodiumMilligrams: 1000
    },
    offers: [
      { retailer: "iHerb", price: ${livePrices["lmnt-electrolyte-drink-mix"].iHerb}, affiliateLink: "https://www.iherb.com/your-affiliate-tag" },
      { retailer: "Amazon", price: ${livePrices["lmnt-electrolyte-drink-mix"].Amazon}, affiliateLink: "https://amzn.to/your-amazon-tag" }
    ]
  },
  {
    id: "optimum-nutrition-glutamine",
    name: "Glutamine Muscle Recovery",
    brand: "Optimum Nutrition",
    category: "other",
    imagePlaceholder: "REC",
    servings: 60,
    nutrition: { 
      servingSize: "1 tsp", 
      proteinGrams: 0 
    },
    offers: [
      { retailer: "Amazon", price: ${livePrices["optimum-nutrition-glutamine"].Amazon}, affiliateLink: "https://amzn.to/your-amazon-tag" },
      { retailer: "Vitamin Shoppe", price: ${livePrices["optimum-nutrition-glutamine"].VitaminShoppe}, affiliateLink: "https://www.tkqlhce.com/your-cj-tag" }
    ]
  }
];
`;

    // Overwrite the original static database file with our fresh entries
    fs.writeFileSync(dataFilePath, updatedFileContent, 'utf8');
    console.log('✅ Success! data/products.ts has been updated with optimized values.');

  } catch (error) {
    console.error('❌ Error executing price sync:', error);
  }
};

runPriceAutomation();