import { amazonUrl } from "../lib/affiliate.ts";

export const products = [
  {
    id: "6",
    name: "100% Clear Whey Protein Isolate - Pineapple Coconut",
    brand: "Ascent",
    category: "protein",
    image: "/products/6.jpg",
    servings: 20,
    nutrition: {
      calories: 100,
      proteinGrams: 20,
      carbsGrams: 4,
      fatGrams: 0,
      sugarGrams: 2,
      sodiumMilligrams: 115,
      servingSize: "1 scoop (26g)",
    },
    offers: [
      { retailer: "Amazon", price: 28.79, url: amazonUrl("B0DGZHDBZT"), asin: "B0DGZHDBZT" }
    ]
  },
  {
    id: "118",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Strawberry Watermelon (16.9 oz, 12-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    image: "/products/protein2o-strawberry-watermelon.png",
    servings: 12,
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      carbsGrams: 7,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 23.91, url: amazonUrl("B0985TJ4HF"), asin: "B0985TJ4HF" }
    ]
  },
  {
    id: "119",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Orange Mango (16.9 oz, 12-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    image: "/products/protein2o-orange-mango.png",
    servings: 12,
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      carbsGrams: 7,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 30.60, url: amazonUrl("B0985S4S42"), asin: "B0985S4S42" }
    ]
  },
  {
    id: "120",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Mixed Berry (16.9 oz, 12-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    image: "/products/protein2o-mixed-berry.png",
    servings: 12,
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      carbsGrams: 8,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 32.29, url: amazonUrl("B0DT7K3LXM"), asin: "B0DT7K3LXM" }
    ]
  },
  {
    id: "121",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Variety Pack (16.9 oz, 12-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    servings: 12,
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      carbsGrams: 7,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 33.56, url: amazonUrl("B0966FG8MB"), asin: "B0966FG8MB" }
    ]
  },
  {
    id: "122",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Orange Mango + Strawberry Watermelon Bundle (16.9 oz, 24-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    servings: 24,
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      carbsGrams: 7,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 54.51, url: amazonUrl("B0F6YVBGX6"), asin: "B0F6YVBGX6" }
    ]
  },
  {
    id: "123",
    name: "Protein2o Whey Protein Isolate Hydration Drink, Mixed Berry + Strawberry Watermelon Bundle (16.9 oz, 24-Pack)",
    brand: "Protein2o",
    category: "protein",
    additionalCategories: ["electrolytes"],
    servings: 24,
    // Bundle mixes two flavors with slightly different carbsGrams (7g vs 8g) — omitted rather than guess.
    nutrition: {
      calories: 90,
      proteinGrams: 20,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 220,
      servingSize: "1 bottle (16.9 fl oz)",
    },
    offers: [
      { retailer: "Amazon", price: 56.20, url: amazonUrl("B0F6Z9F4MG"), asin: "B0F6Z9F4MG" }
    ]
  },
  {
    id: "9",
    name: "100% Clear Whey Protein Isolate - Orange Mango",
    brand: "Ascent",
    category: "protein",
    image: "/products/9.jpg",
    servings: 20,
    nutrition: {
      calories: 100,
      proteinGrams: 20,
      carbsGrams: 4,
      fatGrams: 0,
      sugarGrams: 2,
      sodiumMilligrams: 120,
      servingSize: "1 scoop (26g)",
    },
    offers: [
      { retailer: "Amazon", price: 31.99, url: amazonUrl("B0DGZGKFBT"), asin: "B0DGZGKFBT" }
    ]
  },
  {
    id: "7",
    name: "Premier Protein Powder, Vanilla Milkshake (1.46 lb)",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/premier-protein-vanilla-milkshake-146lb-transparent.png",
    servings: 17,
    nutrition: {
      calories: 150,
      proteinGrams: 30,
      carbsGrams: 3,
      fatGrams: 2,
      sugarGrams: 1,
      sodiumMilligrams: 170,
      servingSize: "2 scoops (39g)",
    },
    offers: [
      { retailer: "Amazon", price: 29.97, url: amazonUrl("B06ZZ3PJQD"), asin: "B06ZZ3PJQD" }
    ]
  },
  {
    id: "8",
    name: "Premier Protein Powder, Vanilla Milkshake (2.51 lb)",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/premier-protein-vanilla-milkshake-251lb-transparent.png",
    servings: 29,
    nutrition: {
      calories: 150,
      proteinGrams: 30,
      carbsGrams: 3,
      fatGrams: 2,
      sugarGrams: 1,
      sodiumMilligrams: 170,
      servingSize: "2 scoops (39g)",
    },
    offers: [
      { retailer: "Amazon", price: 39.12, url: amazonUrl("B0D4X2RXP8"), asin: "B0D4X2RXP8" }
    ]
  },
  {
    id: "32",
    name: "Premier Protein Powder Indulgence, Salted Caramel Truffle",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/premier-protein-salted-caramel-truffle-transparent.png",
    servings: 17,
    nutrition: {
      calories: 160,
      proteinGrams: 30,
      carbsGrams: 4,
      fatGrams: 2.5,
      sugarGrams: 2,
      sodiumMilligrams: 230,
      servingSize: "2 scoops (42g)",
    },
    offers: [
      { retailer: "Amazon", price: 38.48, url: amazonUrl("B0DLPCJ4BZ"), asin: "B0DLPCJ4BZ" }
    ]
  },
  {
    id: "33",
    name: "Premier Protein Powder, Chocolate Milkshake (24.5 oz)",
    brand: "Premier Protein",
    category: "protein",
    image: "/products/premier-protein-chocolate-milkshake-transparent.png",
    servings: 17,
    nutrition: {
      calories: 150,
      proteinGrams: 30,
      carbsGrams: 4,
      fatGrams: 2,
      sugarGrams: 1,
      sodiumMilligrams: 170,
      servingSize: "2 scoops (41g)",
    },
    offers: [
      { retailer: "Amazon", price: 25.97, url: amazonUrl("B06Y5ZG66K"), asin: "B06Y5ZG66K" }
    ]
  },
  {
    id: "1",
    name: "Gold Standard 100% Whey - Double Rich Chocolate (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-double-rich-chocolate-5lb.png",
    servings: 74,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      sugarGrams: 1,
      sodiumMilligrams: 130,
      servingSize: "1 scoop (30g)",
    },
    offers: [
      { retailer: "Amazon", price: 96.28, url: amazonUrl("B000QSNYGI"), asin: "B000QSNYGI" }
    ]
  },
  {
    id: "10",
    name: "Gold Standard 100% Whey - Double Rich Chocolate (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-double-rich-chocolate-2lb.png",
    servings: 29,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      sugarGrams: 1,
      sodiumMilligrams: 130,
      servingSize: "1 scoop (30g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.00, url: amazonUrl("B002DYIZH6"), asin: "B002DYIZH6" }
    ]
  },
  {
    id: "11",
    name: "Gold Standard 100% Whey - Extreme Milk Chocolate (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-extreme-milk-chocolate-2lb.png",
    servings: 28,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      sugarGrams: 2,
      sodiumMilligrams: 130,
      servingSize: "1 scoop (32g)",
    },
    offers: [
      { retailer: "Amazon", price: 43.86, url: amazonUrl("B002DYIZHG"), asin: "B002DYIZHG" }
    ]
  },
  {
    id: "12",
    name: "Gold Standard 100% Whey - Extreme Milk Chocolate (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-extreme-milk-chocolate-5lb.png",
    servings: 71,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      sugarGrams: 2,
      sodiumMilligrams: 130,
      servingSize: "1 scoop (32g)",
    },
    offers: [
      { retailer: "Amazon", price: 79.99, url: amazonUrl("B000QSTBNS"), asin: "B000QSTBNS" }
    ]
  },
  {
    id: "13",
    name: "Gold Standard 100% Whey - Cookies & Cream (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-cookies-cream-2lb.png",
    servings: 27,
    // Sugar/sodium not confirmed for this flavor from available sources — left unset rather than guess.
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      servingSize: "1 scoop (33g)",
    },
    offers: [
      { retailer: "Amazon", price: 50.27, url: amazonUrl("B000GIQSVG"), asin: "B000GIQSVG" }
    ]
  },
  {
    id: "14",
    name: "Gold Standard 100% Whey - Cookies & Cream (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-cookies-cream-5lb.png",
    servings: 68,
    // Sugar/sodium not confirmed for this flavor from available sources — left unset rather than guess.
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1.5,
      servingSize: "1 scoop (33g)",
    },
    offers: [
      { retailer: "Amazon", price: 96.28, url: amazonUrl("B000GIPJZ2"), asin: "B000GIPJZ2" }
    ]
  },
  {
    id: "15",
    name: "Gold Standard 100% Whey - Delicious Strawberry (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-delicious-strawberry-2lb.png",
    servings: 29,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1,
      sugarGrams: 1,
      sodiumMilligrams: 140,
      servingSize: "1 scoop (32g)",
    },
    offers: [
      { retailer: "Amazon", price: 54.03, url: amazonUrl("B000GIURIQ"), asin: "B000GIURIQ" }
    ]
  },
  {
    id: "16",
    name: "Gold Standard 100% Whey - Delicious Strawberry (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-delicious-strawberry-5lb.png",
    servings: 73,
    nutrition: {
      calories: 120,
      proteinGrams: 24,
      carbsGrams: 3,
      fatGrams: 1,
      sugarGrams: 1,
      sodiumMilligrams: 140,
      servingSize: "1 scoop (32g)",
    },
    offers: [
      { retailer: "Amazon", price: 96.28, url: amazonUrl("B000QSRO1Y"), asin: "B000QSRO1Y" }
    ]
  },
  {
    id: "17",
    name: "Gold Standard 100% Whey - French Vanilla Crème (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-french-vanilla-creme-2lb.png",
    servings: 29,
    // Calories corrected to 110 (was 120) per label lookup; sugar and exact scoop weight not confirmed.
    nutrition: {
      calories: 110,
      proteinGrams: 24,
      carbsGrams: 2,
      fatGrams: 1,
      sodiumMilligrams: 130,
      servingSize: "1 scoop",
    },
    offers: [
      { retailer: "Amazon", price: 45.32, url: amazonUrl("B002DYIZHQ"), asin: "B002DYIZHQ", inStock: false }
    ]
  },
  {
    id: "18",
    name: "Gold Standard 100% Whey - French Vanilla Crème (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-french-vanilla-creme-5lb.png",
    servings: 73,
    // Calories corrected to 110 (was 120) per label lookup; sugar and exact scoop weight not confirmed.
    nutrition: {
      calories: 110,
      proteinGrams: 24,
      carbsGrams: 2,
      fatGrams: 1,
      sodiumMilligrams: 130,
      servingSize: "1 scoop",
    },
    offers: [
      { retailer: "Amazon", price: 97.32, url: amazonUrl("B000QSO3FO"), asin: "B000QSO3FO" }
    ]
  },
  {
    id: "19",
    name: "Gold Standard 100% Whey - Chocolate Peanut Butter (2 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-chocolate-peanut-butter-2lb.png",
    servings: 27,
    // Calories corrected to 130 (was 120) per label lookup; sugar/sodium not confirmed.
    nutrition: {
      calories: 130,
      proteinGrams: 24,
      carbsGrams: 4,
      fatGrams: 2,
      servingSize: "1 scoop (33g)",
    },
    offers: [
      { retailer: "Amazon", price: 42.49, url: amazonUrl("B006E54GJG"), asin: "B006E54GJG" }
    ]
  },
  {
    id: "20",
    name: "Gold Standard 100% Whey - Chocolate Peanut Butter (5 lb)",
    brand: "Optimum Nutrition",
    category: "protein",
    image: "/products/optimum-nutrition-chocolate-peanut-butter-5lb.png",
    servings: 68,
    // Calories corrected to 130 (was 120) per label lookup; sugar/sodium not confirmed.
    nutrition: {
      calories: 130,
      proteinGrams: 24,
      carbsGrams: 4,
      fatGrams: 2,
      servingSize: "1 scoop (33g)",
    },
    offers: [
      { retailer: "Amazon", price: 99.99, url: amazonUrl("B07DJL1PJT"), asin: "B07DJL1PJT" }
    ]
  },
  {
    id: "21",
    name: "Creatine Monohydrate - Unflavored (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-unflavored.jpg",
    servings: 100,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 21.50, url: amazonUrl("B00GL2HMES"), asin: "B00GL2HMES" }
    ]
  },
  {
    id: "22",
    name: "Creatine Monohydrate - Fruit Punch (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-fruit-punch.jpg",
    servings: 76,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 23.25, url: amazonUrl("B01M3SO70X"), asin: "B01M3SO70X" }
    ]
  },
  {
    id: "23",
    name: "Creatine Monohydrate - Blue Raspberry (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-blue-raspberry.jpg",
    servings: 76,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 23.95, url: amazonUrl("B01MA6LPQR"), asin: "B01MA6LPQR" }
    ]
  },
  {
    id: "24",
    name: "Creatine Monohydrate - Watermelon (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-watermelon.jpg",
    servings: 77,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 23.95, url: amazonUrl("B0CDJ2XTQB"), asin: "B0CDJ2XTQB" }
    ]
  },
  {
    id: "25",
    name: "Creatine Monohydrate - Pineapple Mango (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-pineapple-mango.jpg",
    servings: 77,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 23.95, url: amazonUrl("B0CDFDDRCF"), asin: "B0CDFDDRCF" }
    ]
  },
  {
    id: "26",
    name: "Creatine Monohydrate - Shaq's Berry Blast (500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-shaqs-berry-blast.jpg",
    servings: 74,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 23.95, url: amazonUrl("B0FWDBG1QC"), asin: "B0FWDBG1QC" }
    ]
  },
  {
    id: "27",
    name: "Creatine Monohydrate - Unflavored (1kg)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-unflavored.jpg",
    servings: 200,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 38.95, url: amazonUrl("B01EVVQX9U"), asin: "B01EVVQX9U" }
    ]
  },
  {
    id: "28",
    name: "Creatine Monohydrate - Fruit Punch (2 x 500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-fruit-punch.jpg",
    servings: 152,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 47.90, url: amazonUrl("B0GGVW3BK2"), asin: "B0GGVW3BK2" }
    ]
  },
  {
    id: "29",
    name: "Creatine Monohydrate - Blue Raspberry (2 x 500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-blue-raspberry.jpg",
    servings: 152,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 45.50, url: amazonUrl("B0GGVC2PHT"), asin: "B0GGVC2PHT" }
    ]
  },
  {
    id: "30",
    name: "Creatine Monohydrate - Watermelon (2 x 500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-watermelon.jpg",
    servings: 154,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 45.50, url: amazonUrl("B0GGVNVV4K"), asin: "B0GGVNVV4K" }
    ]
  },
  {
    id: "31",
    name: "Creatine Monohydrate - Pineapple Mango (2 x 500g)",
    brand: "Nutricost",
    category: "creatine",
    image: "/products/nutricost-creatine-pineapple-mango.jpg",
    servings: 154,
    nutrition: {
      calories: 0,
      proteinGrams: 0,
      creatineGrams: 5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 0,
      servingSize: "5g",
    },
    offers: [
      { retailer: "Amazon", price: 47.90, url: amazonUrl("B0GGVXMBS7"), asin: "B0GGVXMBS7" }
    ]
  },
  {
    id: "34",
    name: "Legend Pre-Workout - Blue Raspberry",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-blue-raspberry.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0D9NFTNQL"), asin: "B0D9NFTNQL" }
    ]
  },
  {
    id: "36",
    name: "Legend Pre-Workout - Sonic Cherry Limeade",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-sonic-cherry-limeade.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0D9NKPH6Q"), asin: "B0D9NKPH6Q" }
    ]
  },
  {
    id: "37",
    name: "Legend Pre-Workout - Welch's Grape",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-welchs-grape.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0CS7KYSYZ"), asin: "B0CS7KYSYZ" }
    ]
  },
  {
    id: "38",
    name: "Legend Pre-Workout - Warheads Sour Watermelon",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-warheads-sour-watermelon.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0D9NLF8Z3"), asin: "B0D9NLF8Z3" }
    ]
  },
  {
    id: "39",
    name: "Legend Pre-Workout - Orange Cream",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-orange-cream.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0D9NKCBFR"), asin: "B0D9NKCBFR" }
    ]
  },
  {
    id: "40",
    name: "Legend Pre-Workout - Sour Strips Rainbow",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-sour-strips-rainbow.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0FPPP1SGH"), asin: "B0FPPP1SGH" }
    ]
  },
  {
    id: "41",
    name: "Legend Pre-Workout - Bubblicious Strawberry Splash",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-bubblicious-strawberry-splash.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0FB1TLP3P"), asin: "B0FB1TLP3P" }
    ]
  },
  {
    id: "42",
    name: "Legend Pre-Workout - Sonic Ocean Water",
    brand: "Ghost",
    category: "pre-workout",
    image: "/products/ghost-legend-sonic-ocean-water.jpg",
    servings: 30,
    // Calories corrected to 5 (was 10) per label lookup; sodium not confirmed.
    nutrition: {
      calories: 5,
      proteinGrams: 0,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 scoop (13g)",
    },
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B0FB1XGNB9"), asin: "B0FB1XGNB9" }
    ]
  },
  {
    id: "43",
    name: "Hydration Multiplier - Lemon Lime",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-lemon-lime.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.28, url: amazonUrl("B01IT9NLHW"), asin: "B01IT9NLHW" }
    ]
  },
  {
    id: "44",
    name: "Hydration Multiplier - Passion Fruit",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-passion-fruit.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.30, url: amazonUrl("B07HCNM7KQ"), asin: "B07HCNM7KQ" }
    ]
  },
  {
    id: "45",
    name: "Hydration Multiplier - Watermelon",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-watermelon.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 24.17, url: amazonUrl("B08ZYNSZZT"), asin: "B08ZYNSZZT" }
    ]
  },
  {
    id: "46",
    name: "Hydration Multiplier - Strawberry Lemonade",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-strawberry-lemonade.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.27, url: amazonUrl("B0BQ51S5BL"), asin: "B0BQ51S5BL" }
    ]
  },
  {
    id: "47",
    name: "Hydration Multiplier - Tropical Punch",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-tropical-punch.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 22.68, url: amazonUrl("B0B177N8VP"), asin: "B0B177N8VP" }
    ]
  },
  {
    id: "49",
    name: "Hydration Multiplier - Concord Grape",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-concord-grape.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 24.00, url: amazonUrl("B09VCS1YM1"), asin: "B09VCS1YM1" }
    ]
  },
  {
    id: "50",
    name: "Hydration Multiplier - Popsicle Firecracker",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-firecracker.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.28, url: amazonUrl("B0CHN5D13P"), asin: "B0CHN5D13P" }
    ]
  },
  {
    id: "51",
    name: "Hydration Multiplier - Golden Cherry",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-golden-cherry.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.46, url: amazonUrl("B0B1LN467K"), asin: "B0B1LN467K" }
    ]
  },
  {
    id: "52",
    name: "Hydration Multiplier - Arctic Raspberry",
    brand: "Liquid I.V.",
    category: "electrolytes",
    image: "/products/liquidiv-arctic-raspberry.jpg",
    servings: 16,
    nutrition: {
      calories: 45,
      proteinGrams: 0,
      carbsGrams: 11,
      fatGrams: 0,
      sugarGrams: 11,
      sodiumMilligrams: 500,
      servingSize: "1 stick pack (16g)",
    },
    offers: [
      { retailer: "Amazon", price: 23.96, url: amazonUrl("B0DNNMR2CD"), asin: "B0DNNMR2CD" }
    ]
  },
  {
    id: "53",
    name: "Mr. Hyde Signature Pre-Workout, Blue Razz (30 Servings)",
    brand: "ProSupps",
    category: "pre-workout",
    image: "/products/prosupps-mr-hyde-signature-blue-razz-30srv.jpg",
    servings: 30,
    nutritionNote: "Sodium is carried over from the same-flavor 12-stick-pack formula and was not independently verified for this package size.",
    nutrition: {
      proteinGrams: 0,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 75,
      servingSize: "1 scoop (12.6g)",
    },
    offers: [
      { retailer: "Amazon", price: 15, url: amazonUrl("B07HNFF75B"), asin: "B07HNFF75B" }
    ]
  },
  {
    id: "54",
    name: "Mr. Hyde Signature Pre-Workout, Blue Razz (12 Stick Packs)",
    brand: "ProSupps",
    category: "pre-workout",
    image: "/products/prosupps-mr-hyde-signature-blue-razz-12pack.jpg",
    servings: 12,
    nutrition: {
      proteinGrams: 0,
      sodiumMilligrams: 75,
      creatineGrams: 2.5,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 stick pack",
    },
    offers: [
      { retailer: "Amazon", price: 17, url: amazonUrl("B0F4M38KVX"), asin: "B0F4M38KVX" }
    ]
  },
  {
    id: "55",
    name: "Mr. Hyde Signature Pre-Workout, Blue Razz (60 Servings)",
    brand: "ProSupps",
    category: "pre-workout",
    image: "/products/prosupps-mr-hyde-signature-blue-razz-60srv.jpg",
    servings: 60,
    nutritionNote: "Sodium is carried over from the same-flavor 12-stick-pack formula and was not independently verified for this package size.",
    nutrition: {
      proteinGrams: 0,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
      sodiumMilligrams: 75,
      servingSize: "1 scoop (12.6g)",
    },
    offers: [
      { retailer: "Amazon", price: 38, url: amazonUrl("B07X375B4M"), asin: "B07X375B4M" }
    ]
  },
  {
    id: "56",
    name: "Sweet Sweat Workout Enhancer Gel, Original (13.5 oz)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "topical",
    image: "/products/sweet-sweat-original.jpg",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 39.95, url: amazonUrl("B00TDELNCS"), asin: "B00TDELNCS" }
    ]
  },
  {
    id: "57",
    name: "Sweet Sweat Workout Enhancer Gel, Tropical (13.5 oz)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "topical",
    image: "/products/sweet-sweat-tropical.jpg",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 39.95, url: amazonUrl("B099KPFN1B"), asin: "B099KPFN1B" }
    ]
  },
  {
    id: "58",
    name: "Sweet Sweat Workout Enhancer Gel, Coconut (13.5 oz)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "topical",
    image: "/products/sweet-sweat-coconut.jpg",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 39.95, url: amazonUrl("B00Q5CIL4Y"), asin: "B00Q5CIL4Y" }
    ]
  },
  {
    id: "59",
    name: "Sweet Sweat Workout Enhancer Gel, Citrus Mint (13.5 oz)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "topical",
    image: "/products/sweet-sweat-citrus-mint.jpg",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 39.95, url: amazonUrl("B099KP14NL"), asin: "B099KP14NL" }
    ]
  },
  {
    id: "60",
    name: "Sweet Sweat Workout Enhancer Gel, Unscented (13.5 oz)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "topical",
    image: "/products/sweet-sweat-unscented.jpg",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 39.95, url: amazonUrl("B00RC7PV5I"), asin: "B00RC7PV5I" }
    ]
  },
  {
    id: "88",
    name: "Sweet Sweat Toned Bundle with Waist Trimmer, Quartz/Vanilla (Medium)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "mixed-bundle",
    image: "/products/sports-research-toned-waist-trimmer-bundle.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 49.49, url: "https://click.linksynergy.com/link?id=zM7ArY2cJpc&offerid=1663588.534129968715509946581990&type=2&murl=https%3a%2f%2fstore.sportsresearch.com%2fproducts%2ftoned-waist-trimmer-bundle%3fvariant%3d41821669785800" }
    ]
  },
  {
    id: "89",
    name: "Sweet Sweat Toned Bundle with Waist Trimmer, Clay/Vanilla (Medium)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "mixed-bundle",
    image: "/products/sports-research-toned-waist-trimmer-bundle-clay.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 49.49, url: "https://click.linksynergy.com/link?id=zM7ArY2cJpc&offerid=1663588.534129928231164363472412&type=2&murl=https%3a%2f%2fstore.sportsresearch.com%2fproducts%2ftoned-waist-trimmer-bundle%3fvariant%3d41821670375624" }
    ]
  },
  {
    id: "90",
    name: "Sweet Sweat Core Bundle with Waist Trimmer, Pink/Tropical (Medium)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "mixed-bundle",
    image: "/products/sports-research-sweet-sweat-core-bundle-pink-tropical.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 49.49, url: "https://click.linksynergy.com/link?id=zM7ArY2cJpc&offerid=1663588.534129868765032114237007&type=2&murl=https%3a%2f%2fstore.sportsresearch.com%2fproducts%2fsweet-sweat-bundle%3fvariant%3d37596790784200" }
    ]
  },
  {
    id: "91",
    name: "MCT Oil from Coconut, 3000mg (120 Softgels)",
    brand: "Sports Research",
    category: "weight-management",
    additionalCategories: ["food-drink"],
    image: "/products/sports-research-mct-oil-120-softgels.png",
    servings: 120,
    nutritionNote: "Calories and fat are calculated from MCT oil energy density, not transcribed from this product's label.",
    nutrition: {
      proteinGrams: 0,
      calories: 9,
      fatGrams: 1,
      carbsGrams: 0,
      sugarGrams: 0,
      servingSize: "1 softgel (1000mg)",
    },
    offers: [
      { retailer: "Sports Research", price: 16.95, url: "https://click.linksynergy.com/link?id=zM7ArY2cJpc&offerid=1663588.534129959949573030687149&type=2&murl=https%3a%2f%2fstore.sportsresearch.com%2fproducts%2fmct-oil-120-softgels%3fvariant%3d42500072505544" }
    ]
  },
  {
    id: "108",
    name: "Whey Protein Isolate, Dutch Chocolate (36.32 oz)",
    brand: "Sports Research",
    category: "protein",
    image: "/products/sports-research-whey-protein-isolate.png",
    servings: 30,
    // Sodium not confirmed.
    nutrition: {
      proteinGrams: 25,
      calories: 150,
      carbsGrams: 4,
      fatGrams: 4,
      sugarGrams: 1,
    },
    offers: [
      { retailer: "Sports Research", price: 49.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fwhey-protein-isolate" }
    ]
  },
  {
    id: "109",
    name: "Organic Collagen Peptides, Unflavored (30 Servings)",
    brand: "Sports Research",
    category: "protein",
    additionalCategories: ["bariatric"],
    image: "/products/sports-research-organic-collagen.png",
    servings: 30,
    nutrition: {
      proteinGrams: 9,
      calories: 40,
      carbsGrams: 0,
      fatGrams: 0,
      servingSize: "1 scoop (11g)",
    },
    offers: [
      { retailer: "Sports Research", price: 35.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Forganic-collagen" }
    ]
  },
  {
    id: "110",
    name: "Collagen Peptides, Dark Chocolate (22 oz)",
    brand: "Sports Research",
    category: "protein",
    additionalCategories: ["bariatric"],
    image: "/products/sports-research-collagen-peptides-naturally-flavored.png",
    servings: 30,
    // Sugar/sodium not confirmed.
    nutrition: {
      proteinGrams: 11,
      calories: 50,
      carbsGrams: 2,
      fatGrams: 0.5,
      servingSize: "1 scoop (15.7g)",
    },
    offers: [
      { retailer: "Sports Research", price: 34.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fcollagen-peptides-naturally-flavored" }
    ]
  },
  {
    id: "111",
    name: "Multi Collagen Powder, 5 Types, Unflavored (10.58 oz)",
    brand: "Sports Research",
    category: "protein",
    additionalCategories: ["bariatric"],
    image: "/products/sports-research-multi-collagen-complex.png",
    servings: 30,
    nutrition: { proteinGrams: 8 },
    offers: [
      { retailer: "Sports Research", price: 33.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fmulti-collagen-complex" }
    ]
  },
  {
    id: "112",
    name: "Iron + Liposomal Vitamin C (90 Liquid Veggie Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["multivitamin", "bariatric"],
    image: "/products/sports-research-iron-liposomal-vitamin-c.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Firon-liposomal-vitamin-c" }
    ]
  },
  {
    id: "113",
    name: "Organic Fiber, Unflavored (8.47 oz)",
    brand: "Sports Research",
    category: "gut-health",
    additionalCategories: ["bariatric"],
    image: "/products/sports-research-organic-fiber.png",
    servings: 30,
    // Sodium not confirmed.
    nutrition: {
      proteinGrams: 0,
      calories: 20,
      carbsGrams: 7,
      fatGrams: 0,
      sugarGrams: 1,
      servingSize: "1 scoop (8g)",
    },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Forganic-fiber" }
    ]
  },
  {
    id: "114",
    name: "Daily Women's Probiotics 65 Billion CFU (30 Veggie Capsules)",
    brand: "Sports Research",
    category: "gut-health",
    image: "/products/sports-research-womens-probiotics.png",
    servings: 30,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fwomens-probiotics" }
    ]
  },
  {
    id: "115",
    name: "MCT C8 Oil Organic (16 oz)",
    brand: "Sports Research",
    category: "weight-management",
    additionalCategories: ["food-drink"],
    image: "/products/sports-research-keto-c8-mct-oil.png",
    servings: 32,
    nutritionNote: "Calories and fat are category-typical estimates for one tablespoon of liquid MCT oil, not independently verified from this product's label.",
    nutrition: {
      proteinGrams: 0,
      calories: 130,
      fatGrams: 14,
      carbsGrams: 0,
      sugarGrams: 0,
      servingSize: "1 tbsp (15mL)",
    },
    offers: [
      { retailer: "Sports Research", price: 23.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fketo-c8-mct-oil" }
    ]
  },
  {
    id: "116",
    name: "Magnesium Oxide, 420mg (90 Softgels)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["gut-health", "multivitamin"],
    image: "/products/sports-research-magnesium-oxide.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 18.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fmagnesium-oxide" }
    ]
  },
  {
    id: "117",
    name: "Magnesium L-Threonate (Magtein), 2000mg (90 Veggie Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["multivitamin"],
    image: "/products/sports-research-mag-lt-with-magtein-magnesium-l-threonate.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 29.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fmag-lt-with-magtein-magnesium-l-threonate" }
    ]
  },
  {
    id: "92",
    name: "Flavored Creatine Monohydrate, Fruit Punch (25 Servings)",
    brand: "Sports Research",
    category: "creatine",
    image: "/products/sports-research-flavored-creatine-monohydrate.png",
    servings: 25,
    nutrition: {
      proteinGrams: 0,
      creatineGrams: 5,
      calories: 0,
      carbsGrams: 0,
      fatGrams: 0,
      sugarGrams: 0,
    },
    offers: [
      { retailer: "Sports Research", price: 29.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fflavored-creatine-monohydrate" }
    ]
  },
  {
    id: "93",
    name: "Creatine Monohydrate Capsules (120 Capsules)",
    brand: "Sports Research",
    category: "creatine",
    image: "/products/sports-research-creatine-monohydrate-veggie-capsules.png",
    servings: 120,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 29.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fcreatine-monohydrate-veggie-capsules" }
    ]
  },
  {
    id: "94",
    name: "Hydrate Electrolytes Packets, Cherry Pomegranate (16 ct)",
    brand: "Sports Research",
    category: "electrolytes",
    image: "/products/sports-research-hydrate-electrolytes-packets.png",
    servings: 16,
    nutrition: {
      proteinGrams: 0,
      sodiumMilligrams: 400,
      calories: 5,
      carbsGrams: 1,
      fatGrams: 0,
      sugarGrams: 0,
      servingSize: "1 packet (5g)",
    },
    offers: [
      { retailer: "Sports Research", price: 22.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fhydrate-electrolytes-packets" }
    ]
  },
  {
    id: "95",
    name: "Digestive Enzymes + Probiotic (90 Veggie Capsules)",
    brand: "Sports Research",
    category: "gut-health",
    image: "/products/sports-research-digestive-enzymes.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 22.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fdigestive-enzymes" }
    ]
  },
  {
    id: "96",
    name: "Daily Probiotic 60 Billion CFU (30 Veggie Capsules)",
    brand: "Sports Research",
    category: "gut-health",
    image: "/products/sports-research-daily-probiotics.png",
    servings: 30,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fdaily-probiotics" }
    ]
  },
  {
    id: "107",
    name: "Sleep Complex with Melatonin, 5mg (60 Veggie Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["gut-health"],
    image: "/products/sports-research-sleep-complex-with-melatonin.png",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 27.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fsleep-complex-with-melatonin" }
    ]
  },
  {
    id: "97",
    name: "L-Theanine + Caffeine (60 Softgels)",
    brand: "Sports Research",
    category: "pre-workout",
    image: "/products/sports-research-l-theanine-and-caffeine.png",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 22.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fl-theanine-and-caffeine" }
    ]
  },
  {
    id: "98",
    name: "Garcinia Cambogia 60% 500mg (90 Softgels)",
    brand: "Sports Research",
    category: "weight-management",
    image: "/products/sports-research-garcinia-cambogia-65-500mg.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 17.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fgarcinia-cambogia-65-500mg" }
    ]
  },
  {
    id: "99",
    name: "Magnesium Glycinate, 160mg (60 Softgels)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["gut-health"],
    image: "/products/sports-research-magnesium-glycinate.png",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 16.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fmagnesium-glycinate" }
    ]
  },
  {
    id: "100",
    name: "Triple Magnesium Complex, 300mg (120 Veggie Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    additionalCategories: ["gut-health"],
    image: "/products/sports-research-triple-magnesium-complex.png",
    servings: 120,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Ftriple-magnesium-complex" }
    ]
  },
  {
    id: "101",
    name: "Organic Ashwagandha KSM-66, 600mg (90 Veggie Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    image: "/products/sports-research-organic-ashwagandha.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 32.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Forganic-ashwagandha" }
    ]
  },
  {
    id: "102",
    name: "Vitamin D3 + K2 (60 Plantgel Capsules)",
    brand: "Sports Research",
    category: "multivitamin",
    image: "/products/sports-research-vitamin-d3-k2.png",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 23.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fvitamin-d3-k2" }
    ]
  },
  {
    id: "103",
    name: "Organic MCT Oil Powder, Unflavored (30 Servings)",
    brand: "Sports Research",
    category: "weight-management",
    additionalCategories: ["food-drink"],
    image: "/products/sports-research-mct-oil-powder.png",
    servings: 30,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 24.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fmct-oil-powder" }
    ]
  },
  {
    id: "104",
    name: "Sweet Sweat Arm & Thigh Trimmer Bundle (4-Piece)",
    brand: "Sports Research",
    category: "weight-management",
    kind: "equipment",
    image: "/products/sports-research-arm-and-thigh-trimmer-bundle.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 48.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Farm-and-thigh-trimmer-bundle" }
    ]
  },
  {
    id: "105",
    name: "Sweet Sweat Pro Series Waist Trimmer Bundle with Stick",
    brand: "Sports Research",
    category: "weight-management",
    kind: "mixed-bundle",
    image: "/products/sports-research-pro-series-bundle.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 64.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fpro-series-bundle" }
    ]
  },
  {
    id: "106",
    name: "Sports Research Jump Rope",
    brand: "Sports Research",
    category: "multivitamin",
    kind: "equipment",
    image: "/products/sports-research-jump-rope.png",
    servings: 1,
    nutrition: { proteinGrams: 0 },
    offers: [
      { retailer: "Sports Research", price: 19.95, url: "https://click.linksynergy.com/deeplink?id=zM7ArY2cJpc&mid=53412&murl=https%3A%2F%2Fstore.sportsresearch.com%2Fproducts%2Fjump-rope" }
    ]
  },
  {
    id: "61",
    name: "Benefiber Daily Prebiotic Fiber Supplement, Unflavored (250 Teaspoons)",
    brand: "Benefiber",
    category: "bariatric",
    additionalCategories: ["gut-health"],
    image: "/products/benefiber-prebiotic-fiber-unflavored.jpg",
    servings: 250,
    // Calories/carbs per single-teaspoon serving weren't confirmed (sources conflict); fat/sugar are 0 across the whole Benefiber line.
    nutrition: { proteinGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B00CX3ASFE"), asin: "B00CX3ASFE" }
    ]
  },
  {
    id: "62",
    name: "Vital Proteins Collagen Peptides, Unflavored (9.33 oz)",
    brand: "Vital Proteins",
    category: "protein",
    additionalCategories: ["weight-management", "bariatric"],
    image: "/products/vital-proteins-collagen-peptides-unflavored.jpg",
    servings: 13,
    nutritionNote: "Calories are calculated from the listed protein amount; the remaining zero-value macros were not independently verified from this variant's label.",
    nutrition: { proteinGrams: 20, calories: 80, carbsGrams: 0, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 18.65, url: amazonUrl("B09RQBHRCT"), asin: "B09RQBHRCT" }
    ]
  },
  {
    id: "63",
    name: "Vital Proteins Collagen Peptides Advanced, Unflavored (20 oz)",
    brand: "Vital Proteins",
    category: "protein",
    image: "/products/vital-proteins-collagen-peptides-advanced-unflavored.jpg",
    servings: 27,
    nutritionNote: "Calories are calculated from the listed protein amount; the remaining zero-value macros were not independently verified from this variant's label.",
    nutrition: { proteinGrams: 20, calories: 80, carbsGrams: 0, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 42.99, url: amazonUrl("B00K6JUG4K"), asin: "B00K6JUG4K" }
    ]
  },
  {
    id: "64",
    name: "BariatricPal Multivitamin ONE, Mixed Berry (30 Chewable Tablets)",
    brand: "BariatricPal",
    category: "bariatric",
    additionalCategories: ["multivitamin"],
    image: "/products/bariatricpal-multivitamin-one-mixed-berry.jpg",
    servings: 30,
    nutritionNote: "Carbohydrates are inferred from the calorie breakdown rather than a direct label read; sodium was not confirmed.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 16.99, url: amazonUrl("B07RVK8FXW"), asin: "B07RVK8FXW" }
    ]
  },
  {
    id: "65",
    name: "BariatricPal Multivitamin ONE, Orange Citrus (30 Chewable Tablets)",
    brand: "BariatricPal",
    category: "bariatric",
    additionalCategories: ["multivitamin"],
    image: "/products/bariatricpal-multivitamin-one-orange-citrus.jpg",
    servings: 30,
    nutritionNote: "Carbohydrates are inferred from the calorie breakdown rather than a direct label read; sodium was not confirmed.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 16.99, url: amazonUrl("B08VZ5V1FV"), asin: "B08VZ5V1FV" }
    ]
  },
  {
    id: "66",
    name: "BariatricPal Calcium Citrate Soft Chews, Tropical Punch (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-tropical-punch.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B0D54PQPJQ"), asin: "B0D54PQPJQ" }
    ]
  },
  {
    id: "67",
    name: "BariatricPal Calcium Citrate Soft Chews, Belgian Chocolate Caramel (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-belgian-chocolate-caramel.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B08J1D53VM"), asin: "B08J1D53VM" }
    ]
  },
  {
    id: "68",
    name: "BariatricPal Calcium Citrate Soft Chews, Butterscotch (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-butterscotch.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B0D54MNCH2"), asin: "B0D54MNCH2" }
    ]
  },
  {
    id: "69",
    name: "BariatricPal Calcium Citrate Soft Chews, Caramel Apple (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-caramel-apple.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B09KG9ZJT6"), asin: "B09KG9ZJT6" }
    ]
  },
  {
    id: "70",
    name: "BariatricPal Calcium Citrate Soft Chews, Chocolate Mint (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-chocolate-mint.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B0985RY58P"), asin: "B0985RY58P" }
    ]
  },
  {
    id: "71",
    name: "BariatricPal Calcium Citrate Soft Chews, French Caramel Vanilla (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-french-caramel-vanilla.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B07ZDF528Q"), asin: "B07ZDF528Q" }
    ]
  },
  {
    id: "72",
    name: "BariatricPal Calcium Citrate Soft Chews, Piña Colada (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-pina-colada.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B09KGCMS3M"), asin: "B09KGCMS3M" }
    ]
  },
  {
    id: "73",
    name: "BariatricPal Calcium Citrate Soft Chews, Strawberry Twist (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-strawberry-twist.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B089MFTWF3"), asin: "B089MFTWF3" }
    ]
  },
  {
    id: "74",
    name: "BariatricPal Calcium Citrate Soft Chews, Blue Raspberry (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-blue-raspberry.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B0BRTG147X"), asin: "B0BRTG147X" }
    ]
  },
  {
    id: "75",
    name: "BariatricPal Calcium Citrate Soft Chews, Orange Creamsicle (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-orange-creamsicle.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B0985QG3SH"), asin: "B0985QG3SH" }
    ]
  },
  {
    id: "76",
    name: "BariatricPal Calcium Citrate Soft Chews, Wild Grape (90 Count)",
    brand: "BariatricPal",
    category: "bariatric",
    image: "/products/bariatricpal-calcium-citrate-chews-wild-grape.jpg",
    servings: 90,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 36.95, url: amazonUrl("B08HJRVBNY"), asin: "B08HJRVBNY" }
    ]
  },
  {
    id: "77",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Caramel (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-caramel.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B07FTNZBZQ"), asin: "B07FTNZBZQ" }
    ]
  },
  {
    id: "78",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Cranberry Grape (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-cranberry-grape.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B0817NBQKK"), asin: "B0817NBQKK" }
    ]
  },
  {
    id: "79",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Fruit Punch (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-fruit-punch.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B077THPMG6"), asin: "B077THPMG6" }
    ]
  },
  {
    id: "80",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Lemon (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-lemon.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B0D3FRR547"), asin: "B0D3FRR547" }
    ]
  },
  {
    id: "81",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Strawberry (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-strawberry.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B08HG1Y3YB"), asin: "B08HG1Y3YB" }
    ]
  },
  {
    id: "82",
    name: "Bariatric Fusion Calcium Citrate Soft Chews, Vanilla (60 Count)",
    brand: "Bariatric Fusion",
    category: "bariatric",
    image: "/products/bariatric-fusion-calcium-citrate-chews-vanilla.jpg",
    servings: 60,
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0.5, sugarGrams: 0 },
    offers: [
      { retailer: "Amazon", price: 26.99, url: amazonUrl("B089LRCF2K"), asin: "B089LRCF2K" }
    ]
  },
  {
    id: "83",
    name: "Bariatric Advantage Calcium Citrate Chewy Bite, Caramel (90 Count)",
    brand: "Bariatric Advantage",
    category: "bariatric",
    image: "/products/bariatric-advantage-calcium-citrate-chewy-bite-caramel.jpg",
    servings: 90,
    nutritionNote: "Displayed nutrition values are category-typical estimates for calcium citrate soft chews and were not independently verified for this product.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["jannette"],
    offers: [
      { retailer: "Amazon", price: 39.40, url: amazonUrl("B00O5O6VCS"), asin: "B00O5O6VCS" }
    ]
  },
  {
    id: "84",
    name: "Dymatize Elite Casein, Chocolate (4 lb)",
    brand: "Dymatize",
    category: "protein",
    image: "/products/dymatize-elite-casein-chocolate.jpg",
    servings: 50,
    // Sodium not confirmed.
    nutrition: {
      proteinGrams: 25,
      calories: 130,
      carbsGrams: 3,
      fatGrams: 2,
      sugarGrams: 0,
      servingSize: "2 scoops (34g)",
    },
    offers: [
      { retailer: "Amazon", price: 77.94, url: amazonUrl("B00JT8470S"), asin: "B00JT8470S" }
    ]
  },
  {
    id: "85",
    name: "Dymatize Elite Casein, Cookies & Cream (4 lb)",
    brand: "Dymatize",
    category: "protein",
    image: "/products/dymatize-elite-casein-cookies-cream.jpg",
    servings: 53,
    // Sodium not confirmed.
    nutrition: {
      proteinGrams: 25,
      calories: 130,
      carbsGrams: 2,
      fatGrams: 1.5,
      sugarGrams: 0,
      servingSize: "2 scoops (34g)",
    },
    offers: [
      { retailer: "Amazon", price: 69.98, url: amazonUrl("B007L4QMGO"), asin: "B007L4QMGO" }
    ]
  },
  {
    id: "86",
    name: "Dymatize Elite Casein, Vanilla (4 lb)",
    brand: "Dymatize",
    category: "protein",
    image: "/products/dymatize-elite-casein-vanilla.jpg",
    servings: 55,
    nutritionNote: "Carbohydrates are estimated from calorie math rather than a direct label read.",
    nutrition: {
      proteinGrams: 25,
      calories: 120,
      carbsGrams: 1,
      fatGrams: 2,
      sugarGrams: 0,
      sodiumMilligrams: 180,
      servingSize: "2 scoops (33g)",
    },
    offers: [
      { retailer: "Amazon", price: 83.31, url: amazonUrl("B00JXP38MU"), asin: "B00JXP38MU" }
    ]
  },
  {
    id: "124",
    name: "Bari Life Just One Multivitamin with Iron (90 Tablets)",
    brand: "Bari Life",
    category: "multivitamin",
    image: "/products/bari-life-just-one-multivitamin-90ct.png",
    servings: 90,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 44.99, url: amazonUrl("B07RNM5MZJ"), asin: "B07RNM5MZJ" }
    ]
  },
  {
    id: "130",
    name: "Ghost Whey Protein Powder, Trix Cereal Milk (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-trix-cereal-milk.png",
    servings: 27,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 25, calories: 130, carbsGrams: 3, fatGrams: 1.5, sugarGrams: 1 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B0GPB1WR26"), asin: "B0GPB1WR26" }
    ]
  },
  {
    id: "132",
    name: "Spylt High Protein Milk, Chocolate (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-chocolate.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0CS2L66H6"), asin: "B0CS2L66H6" }
    ]
  },
  {
    id: "133",
    name: "Spylt High Protein Milk, Max Chocolate with Caffeine (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-max-chocolate.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0CS2D278X"), asin: "B0CS2D278X" }
    ]
  },
  {
    id: "134",
    name: "Spylt High Protein Milk, Vanilla Milkshake (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-vanilla-milkshake.jpg",
    servings: 12,
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 290, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0CS24964G"), asin: "B0CS24964G" }
    ]
  },
  {
    id: "135",
    name: "Spylt High Protein Milk, Cookies & Cream (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-cookies-cream.jpg",
    servings: 12,
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 320, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0DQVP36RZ"), asin: "B0DQVP36RZ" }
    ]
  },
  {
    id: "136",
    name: "Spylt High Protein Milk, Strawberry (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-strawberry.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0CS27D1B9"), asin: "B0CS27D1B9" }
    ]
  },
  {
    id: "137",
    name: "Spylt High Protein Milk, Peanut Butter Chocolate (12 Pack)",
    brand: "Spylt",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/spylt-peanut-butter-chocolate.jpg",
    servings: 12,
    nutrition: { proteinGrams: 20, calories: 90, carbsGrams: 1, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 290, servingSize: "1 can (11 fl oz)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 39.99, url: amazonUrl("B0DQVMT2X3"), asin: "B0DQVMT2X3" }
    ]
  },
  {
    id: "138",
    name: "Built Puff Protein Bar, Coconut (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-coconut.jpg",
    servings: 12,
    nutrition: { proteinGrams: 17, calories: 140, carbsGrams: 13, fatGrams: 3, sugarGrams: 6, sodiumMilligrams: 85, servingSize: "1 bar (40g)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B09M968ZCM"), asin: "B09M968ZCM" }
    ]
  },
  {
    id: "141",
    name: "Built Puff Protein Bar, Brownie Batter (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-brownie-batter.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 17, calories: 140, carbsGrams: 14, fatGrams: 2.5, sugarGrams: 6, servingSize: "1 bar (40g)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 26.84, url: amazonUrl("B0BFPFBGGC"), asin: "B0BFPFBGGC" }
    ]
  },
  {
    id: "142",
    name: "Built Puff Protein Bar, Cookies 'N Cream (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-cookies-n-cream.jpg",
    servings: 12,
    // Protein corrected to 17g (was 20g), matching this flavor's label; sodium not confirmed.
    nutrition: { proteinGrams: 17, calories: 150, carbsGrams: 14, fatGrams: 3, sugarGrams: 7, servingSize: "1 bar (40g)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0D7PS26VG"), asin: "B0D7PS26VG" }
    ]
  },
  {
    id: "143",
    name: "Built Puff Protein Bar, Cookie Dough Chunk (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-cookie-dough-chunk.jpg",
    servings: 12,
    nutritionNote: "Fat is derived from the published macro-percentage breakdown; sodium was not confirmed.",
    nutrition: { proteinGrams: 15, calories: 160, carbsGrams: 19, fatGrams: 3, sugarGrams: 8, servingSize: "1 bar (44g)" },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0B7P7QNK3"), asin: "B0B7P7QNK3" }
    ]
  },
  {
    id: "145",
    name: "Built Puff Protein Bar, Salted Caramel (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-salted-caramel.jpg",
    servings: 12,
    // Fat/sodium not confirmed.
    nutrition: { proteinGrams: 17, calories: 140, carbsGrams: 14, sugarGrams: 6 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0DGMFL2TV"), asin: "B0DGMFL2TV" }
    ]
  },
  {
    id: "147",
    name: "Built Puff Protein Bar, Peanut Butter Cup (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-peanut-butter-cup.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 17, calories: 150, carbsGrams: 14, fatGrams: 2.5, sugarGrams: 6 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0FQCKYNJ3"), asin: "B0FQCKYNJ3" }
    ]
  },
  {
    id: "149",
    name: "Built Puff Protein Bar, Strawberries 'N Cream (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-strawberries-n-cream.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 15, calories: 140, carbsGrams: 15, fatGrams: 2.5, sugarGrams: 8 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0D1KD323N"), asin: "B0D1KD323N" }
    ]
  },
  {
    id: "151",
    name: "Built Sour Puff Protein Bar, Blue Razz Blast (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-sour-puff-blue-razz-blast.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 16, calories: 150, carbsGrams: 15, fatGrams: 2.5, sugarGrams: 8 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0G1K55M9K"), asin: "B0G1K55M9K" }
    ]
  },
  {
    id: "152",
    name: "Built Sour Puff Protein Bar, Green Apple Crush (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-sour-puff-green-apple-crush.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 16, calories: 150, carbsGrams: 15, fatGrams: 2.5, sugarGrams: 8 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0G1K9MMSJ"), asin: "B0G1K9MMSJ" }
    ]
  },
  {
    id: "153",
    name: "Built Sour Puff Protein Bar, Sweet Peach Punch (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-sour-puff-sweet-peach-punch.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 16, calories: 150, carbsGrams: 15, fatGrams: 2.5, sugarGrams: 8 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0G1K8X36Z"), asin: "B0G1K8X36Z" }
    ]
  },
  {
    id: "154",
    name: "Built Sour Puff Protein Bar, Variety Pack (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-sour-puff-variety-pack.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 16, calories: 150, carbsGrams: 15, fatGrams: 2.5, sugarGrams: 8 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B0G2K37XFK"), asin: "B0G2K37XFK" }
    ]
  },
  {
    id: "155",
    name: "Bari Life BariBurst Calcium Citrate Chews with 1000 IU Vitamin D3, Watermelon (90 Count)",
    brand: "Bari Life",
    category: "bariatric",
    image: "/products/bari-life-bariburst-watermelon.png",
    servings: 90,
    nutritionNote: "Displayed nutrition values are category-typical estimates for calcium citrate soft chews and were not independently verified for this product.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 38.99, url: amazonUrl("B07SV51NM6"), asin: "B07SV51NM6" }
    ]
  },
  {
    id: "156",
    name: "Bari Life BariBurst Calcium Citrate Chews with 1000 IU Vitamin D3, Sour Grape (90 Count)",
    brand: "Bari Life",
    category: "bariatric",
    image: "/products/bari-life-bariburst-sour-grape.png",
    servings: 90,
    nutritionNote: "Displayed nutrition values are category-typical estimates for calcium citrate soft chews and were not independently verified for this product.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 37.99, url: amazonUrl("B0CHH417FR"), asin: "B0CHH417FR" }
    ]
  },
  {
    id: "157",
    name: "Bari Life BariBurst Calcium Citrate Chews with 1000 IU Vitamin D3, Lemon Lime (90 Count)",
    brand: "Bari Life",
    category: "bariatric",
    image: "/products/bari-life-bariburst-lemon-lime.png",
    servings: 90,
    nutritionNote: "Displayed nutrition values are category-typical estimates for calcium citrate soft chews and were not independently verified for this product.",
    nutrition: { proteinGrams: 0, calories: 15, carbsGrams: 4, fatGrams: 0, sugarGrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 37.99, url: amazonUrl("B0DHYPHMRV"), asin: "B0DHYPHMRV" }
    ]
  },
  {
    id: "158",
    name: "Ghost Whey Protein Powder, Cinnabon (5 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-cinnabon.png",
    servings: 67,
    nutrition: { proteinGrams: 25, calories: 130, carbsGrams: 4, fatGrams: 1, sugarGrams: 1, sodiumMilligrams: 190 },
    offers: [
      { retailer: "Amazon", price: 99.99, url: amazonUrl("B0D3JDN1QF"), asin: "B0D3JDN1QF" }
    ]
  },
  {
    id: "159",
    name: "Ghost Whey Protein Powder, Coffee Ice Cream (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-coffee-ice-cream.png",
    servings: 27,
    nutritionNote: "Carbohydrates and fat are derived from the published macro-percentage breakdown; sodium was not confirmed.",
    nutrition: { proteinGrams: 25, calories: 120, carbsGrams: 3, fatGrams: 1.5, sugarGrams: 1, servingSize: "1 scoop (33g)" },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B07FQPCZ77"), asin: "B07FQPCZ77" }
    ]
  },
  {
    id: "160",
    name: "Ghost Whey Protein Powder, Lucky Charms Cereal Milk (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-lucky-charms-cereal-milk.png",
    servings: 27,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 25, calories: 130, carbsGrams: 4, fatGrams: 1.5, sugarGrams: 3 },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B0GPB91TRB"), asin: "B0GPB91TRB" }
    ]
  },
  {
    id: "161",
    name: "Ghost Whey Protein Powder, Milk Chocolate (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-milk-chocolate.png",
    servings: 27,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 25, calories: 130, carbsGrams: 4, fatGrams: 1.5, sugarGrams: 2, servingSize: "1 scoop (35g)" },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B01MQQ4RFA"), asin: "B01MQQ4RFA" }
    ]
  },
  {
    id: "162",
    name: "Ghost Whey Protein Powder, Peanut Butter Cereal Milk (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-peanut-butter-cereal-milk.png",
    servings: 26,
    nutritionNote: "Carbohydrates and fat are derived from the published macro-percentage breakdown; sugar and sodium were not confirmed.",
    nutrition: { proteinGrams: 26, calories: 140, carbsGrams: 4, fatGrams: 1.5, servingSize: "1 scoop (35.5g)" },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B07FLJYP5M"), asin: "B07FLJYP5M" }
    ]
  },
  {
    id: "163",
    name: "Ghost Whey Protein Powder, Cereal Milk (2 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-cereal-milk.png",
    servings: 27,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 25, calories: 130, carbsGrams: 4, fatGrams: 1.5, sugarGrams: 2 },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B01N9BO3SE"), asin: "B01N9BO3SE" }
    ]
  },
  {
    id: "164",
    name: "Ghost Whey Protein Powder, Count Chocula (2.12 lb)",
    brand: "Ghost",
    category: "protein",
    image: "/products/ghost-whey-count-chocula.png",
    servings: 27,
    nutrition: { proteinGrams: 25, calories: 140, carbsGrams: 6, fatGrams: 1, sugarGrams: 3, sodiumMilligrams: 210, servingSize: "1 scoop (37g)" },
    offers: [
      { retailer: "Amazon", price: 54.99, url: amazonUrl("B0FQM88VDM"), asin: "B0FQM88VDM" }
    ]
  },
  {
    id: "165",
    name: "Built Bar Puff Variety Pack, Minions & Monsters Limited Edition (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-minions-monsters.jpg",
    servings: 12,
    nutritionNote: "Displayed nutrition values are category-typical estimates for Puff bars and were not independently verified for this limited-edition variety pack.",
    nutrition: { proteinGrams: 16, calories: 140, carbsGrams: 14, fatGrams: 2.5, sugarGrams: 7 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 26.84, url: amazonUrl("B0H47VP41X"), asin: "B0H47VP41X" }
    ]
  },
  {
    id: "166",
    name: "Built Puff Protein Bar, Churro (12 Count)",
    brand: "Built Bar",
    category: "protein",
    additionalCategories: ["food-drink"],
    image: "/products/built-puff-churro.jpg",
    servings: 12,
    // Sodium not confirmed.
    nutrition: { proteinGrams: 17, calories: 140, carbsGrams: 14, fatGrams: 2.5, sugarGrams: 7 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 29.99, url: amazonUrl("B09M95V187"), asin: "B09M95V187" }
    ]
  },
  {
    id: "167",
    name: "Pin Up Girl Magnesium Glycinate for Women, 150mg Chelated (60 Capsules)",
    brand: "Pin Up Girl",
    category: "multivitamin",
    image: "/products/pin-up-girl-magnesium-glycinate.png",
    servings: 30,
    nutrition: { proteinGrams: 0, calories: 0, carbsGrams: 0, fatGrams: 0, sugarGrams: 0, sodiumMilligrams: 0 },
    approvedBy: ["geo"],
    offers: [
      { retailer: "Amazon", price: 17.95, url: amazonUrl("B0GNP37Q1C"), asin: "B0GNP37Q1C" }
    ]
  }
];
