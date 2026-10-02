/**
 * Hand-written editorial picks shown above the ranked lists on high-intent /best pages.
 * Every claim must be traceable to the product's own label data in data/products.ts — no
 * prices, no "deal" language. tests/quick-picks.test.ts checks that each product id exists.
 */
export type QuickPick = {
  productId: string;
  bestFor: string;
  standsOut: string;
  tradeOff: string;
};

export const QUICK_PICKS: Record<string, QuickPick[]> = {
  "highest-protein-whey": [
    {
      productId: "10",
      bestFor: "First-time buyers who want a standard 2 lb tub of a widely sold whey.",
      standsOut:
        "Ties for the top protein concentration in this ranking: 24g of protein in a 30g scoop (0.80 g per g of serving) for 120 calories.",
      tradeOff:
        "It is a traditional whey, not a clear isolate, so it carries 5.0 calories per gram of protein versus 4.0 for the Myprotein clear isolate below.",
    },
    {
      productId: "176",
      bestFor: "Shoppers who want the fewest calories per gram of protein.",
      standsOut:
        "Also 0.80 g protein per g of serving, with 20g of protein for 80 calories (4.0 calories per gram of protein).",
      tradeOff:
        "The 25g scoop delivers 20g of protein, 4g less than a Gold Standard scoop, and clear isolates are built to drink like juice rather than a thick shake.",
    },
    {
      productId: "1",
      bestFor: "Regular users who would rather buy a bigger tub than reorder often.",
      standsOut:
        "The same label as the 2 lb tub (24g protein, 120 calories per scoop) in a 74-serving 5 lb size.",
      tradeOff:
        "A bigger commitment to one flavor. Try the 2 lb size first if you have not used this product before.",
    },
  ],
  "optimum-nutrition-vs-dymatize": [
    {
      productId: "10",
      bestFor: "A fast-digesting whey for general daily protein.",
      standsOut:
        "Gold Standard Double Rich Chocolate has the highest concentration in this comparison: 0.80 g protein per g of serving, 24g in one 30g scoop.",
      tradeOff:
        "Concentration varies by flavor. The Extreme Milk Chocolate and Strawberry versions are 0.75 and Cookies & Cream is 0.73, so check the exact flavor you are buying.",
    },
    {
      productId: "86",
      bestFor: "Anyone specifically looking for a slow-digesting casein instead of whey.",
      standsOut:
        "Dymatize Elite Casein (Vanilla, 4 lb) has the highest concentration of the Dymatize products here: 0.76, with 25g of protein per 33g serving for 120 calories.",
      tradeOff:
        "It is casein, not whey, and one serving is two scoops. Every Dymatize product in this comparison is casein, so this is not a like-for-like whey match-up.",
    },
  ],
  "creatine-serving-size": [
    {
      productId: "92",
      bestFor: "Shoppers who want a flavored creatine with the smallest scoop in this ranking.",
      standsOut: "5g of creatine in a 7g scoop for 5 calories, with 60 servings per container.",
      tradeOff:
        "Flavored, so about 2g of each scoop is something other than creatine. If you want an unflavored product, look at the creatine category instead.",
    },
    {
      productId: "273",
      bestFor: "Shoppers looking for a creatine product marketed to women.",
      standsOut:
        "The same 5g creatine dose per serving as the product above, in a 9g scoop with 30 servings.",
      tradeOff:
        "The 9g scoop carries more non-creatine material than the 7g option for the same 5g dose, so the label shows no nutrition advantage over standard creatine.",
    },
  ],
};
