export type ProductOverview = {
  productId: string;
  /** 1-2 sentence factual description: format, category context, what makes this specific listing distinct. */
  summary: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  /** Slug into BEST_VALUE_ARTICLES, when this product genuinely qualifies for that ranking. */
  relatedBestValueSlug?: string;
};

// Hand-written for our 15 most complete, best-documented product pages (dated price
// or verified nutrition, real image, not a buried flavor variant). Deliberately not
// generated for the full catalog — see macrosaver-fixes.md and the SEO diagnostic:
// thin, templated copy across hundreds of pages is worse than none at all.
export const PRODUCT_OVERVIEWS: ProductOverview[] = [
  {
    productId: "1",
    summary:
      "Gold Standard 100% Whey is Optimum Nutrition's flagship whey blend, mixing whey isolate, concentrate, and peptides. This is the 5 lb tub of Double Rich Chocolate, priced for buyers who want the larger size over a 2 lb tub of the same flavor.",
    bestFor: "Shoppers who go through protein powder quickly enough that a 74-serving tub is worth the bigger upfront price.",
    pros: [
      "24g protein per scoop at a moderate 120 calories",
      "Low sugar (1g) and low fat (1.5g) per serving",
      "One of the best-known, most reviewed whey powders on the market",
    ],
    cons: [
      "Only one tracked retailer (Amazon), so this isn't a cross-seller price comparison",
      "5 lb is a bigger commitment than 2 lb if you haven't tried the flavor first",
    ],
    relatedBestValueSlug: "highest-protein-per-dollar",
  },
  {
    productId: "8",
    summary:
      "Premier Protein's powder line pairs a high 30g protein-per-scoop figure with a mild vanilla milkshake flavor. This is the 2.51 lb tub, Premier's larger powder size.",
    bestFor: "Shoppers who want the highest protein-per-scoop number in our catalog without paying isolate-tier prices.",
    pros: [
      "30g protein per serving, among the higher counts we track",
      "Only 1g sugar and 3g carbs per serving",
      "Recorded price falls under our $50 price-point ranking",
    ],
    cons: [
      "Single retailer tracked",
      "170mg sodium per serving is on the higher side for a protein powder",
    ],
    relatedBestValueSlug: "best-protein-powder-under-50",
  },
  {
    productId: "27",
    summary:
      "A plain creatine monohydrate powder with no flavoring beyond the base creatine and a standard 5g scoop. The 1kg size is Nutricost's largest single tub, roughly 4x the servings of their base 500g tubs.",
    bestFor: "Anyone who wants unflavored creatine to mix into an existing shake or drink rather than a pre-flavored version.",
    pros: [
      "Zero calories, sugar, carbs, or sodium per serving",
      "Largest, typically lowest-cost-per-serving size in the Nutricost lineup we track",
      "Price was verified directly at the retailer, not an undated snapshot",
    ],
    cons: [
      "Unflavored only — a flavored creatine means picking a different size/flavor in the same lineup",
      "Single retailer tracked",
    ],
    relatedBestValueSlug: "creatine-cost-per-serving",
  },
  {
    productId: "34",
    summary:
      "Ghost Legend is a flavor-forward pre-workout line; this is the Blue Raspberry scoop, one of eight flavors we track from the same formula.",
    bestFor: "Shoppers who want to compare Ghost's own flavor lineup against each other rather than switching brands.",
    pros: [
      "Very low calories (5) and virtually no sugar or fat per scoop",
      "Recognizable brand with flavor collaborations (Sonic, Warheads, Welch's) across the line",
    ],
    cons: [
      "Single retailer tracked",
      "We don't carry a stimulant/caffeine breakdown in our data — check the label before buying",
    ],
  },
  {
    productId: "43",
    summary:
      "Liquid I.V.'s original electrolyte drink mix, sold as single-serving stick packs. Lemon Lime is the line's original, most widely stocked flavor.",
    bestFor: "Shoppers who want a well-known, widely available electrolyte mix over a newer or smaller brand.",
    pros: [
      "500mg sodium per stick for meaningful electrolyte replacement",
      "Price was verified directly at the retailer",
      "Nine flavors in the line if you want to compare or switch it up",
    ],
    cons: [
      "11g sugar per stick, the highest sugar figure among the products on this page",
      "Single retailer tracked",
    ],
  },
  {
    productId: "61",
    summary:
      "An unflavored, taste-free soluble fiber powder meant to dissolve into any drink or food rather than be taken on its own. The 250-serving container is Benefiber's largest single package.",
    bestFor: "Anyone who wants to add fiber to an existing drink or meal without adding its own flavor, sugar, or calories.",
    pros: [
      "Zero fat, sugar, and sodium",
      "250-serving container lowers the effective cost of adding fiber daily",
      "Community-endorsed pick in our bariatric-relevant lineup",
    ],
    cons: [
      "We haven't independently confirmed calories/carbs per single teaspoon — check the label",
      "Single retailer tracked",
    ],
  },
  {
    productId: "66",
    summary:
      "A chewable calcium citrate supplement in soft-chew form rather than a pill, aimed at people who have trouble swallowing large tablets — common after bariatric surgery.",
    bestFor: "Bariatric patients whose care team has specifically recommended calcium citrate in a chewable format.",
    pros: [
      "Chewable format avoids the large-pill swallowing issue some post-op patients report",
      "Only 15 calories and 0g sugar per chew",
      "90-count container",
    ],
    cons: [
      "Single retailer tracked",
      "Confirm the elemental calcium dose and your care team's recommended daily total — labels vary on this",
    ],
  },
  {
    productId: "79",
    summary:
      "Bariatric Fusion's version of the same chewable calcium citrate format as BariatricPal's, in a smaller 60-count package.",
    bestFor: "Shoppers comparing calcium citrate chew brands side by side rather than committing to the first one they find.",
    pros: [
      "Lower total price than the 90-count alternative, useful for trying the format before committing to a bigger container",
      "15 calories, 0g sugar per chew",
    ],
    cons: [
      "60-count package is a shorter supply than the 90-count alternative",
      "Single retailer tracked",
    ],
  },
  {
    productId: "84",
    summary:
      "Casein digests more slowly than whey, which is why it's commonly taken before bed rather than right after a workout. This is Dymatize's chocolate casein — a different protein type than the whey powders elsewhere in our catalog.",
    bestFor: "Shoppers specifically looking for a slow-digesting casein protein rather than another whey tub.",
    pros: [
      "25g protein per serving with 0g sugar",
      "Distinct use case from whey — a bedtime protein rather than a duplicate of your post-workout shake",
    ],
    cons: [
      "Highest per-tub price of the flagship products on this page",
      "Single retailer tracked",
    ],
    relatedBestValueSlug: "highest-protein-per-dollar",
  },
  {
    productId: "103",
    summary:
      "MCT oil converted to a powder instead of liquid oil, meant to mix into coffee or shakes without the oil separating on top.",
    bestFor: "Shoppers who want MCT oil's format convenience in coffee or shakes over pouring liquid MCT oil.",
    pros: [
      "Price was verified directly at the retailer",
      "Unflavored, so it doesn't change the taste of what you mix it into",
    ],
    cons: [
      "Single retailer tracked",
      "We don't carry a full calorie/fat breakdown for this product in our nutrition panel — check the label directly",
    ],
  },
  {
    productId: "108",
    summary:
      "Whey isolate is filtered further than standard whey concentrate to strip out more fat, lactose, and carbs — this is Sports Research's Dutch Chocolate isolate.",
    bestFor: "Shoppers who specifically want isolate over concentrate, often for easier digestion or a leaner macro profile.",
    pros: [
      "25g protein with only 4g carbs and 4g fat, consistent with isolate's leaner profile",
      "Sold direct from an ingredient-focused brand rather than a mass-market label",
    ],
    cons: [
      "Single retailer tracked (the brand's own store, not Amazon)",
      "We haven't independently confirmed sodium content for this product",
    ],
    relatedBestValueSlug: "highest-protein-per-dollar",
  },
  {
    productId: "109",
    summary:
      "Collagen peptides aren't a complete protein the way whey or casein are — they're commonly used as a protein add-in for coffee or smoothies rather than a stand-alone shake. This is the unflavored version.",
    bestFor: "Shoppers who want to add protein to a drink without changing its flavor, not a complete post-workout protein source.",
    pros: [
      "Price was verified directly at the retailer",
      "Unflavored and low-calorie (40 cal) per scoop",
      "Qualifies for our bariatric-relevant protein-per-dollar ranking",
    ],
    cons: [
      "Not a complete protein source — check with your care team if you're relying on it to hit a protein target",
      "Single retailer tracked",
    ],
    relatedBestValueSlug: "best-value-protein-powder-bariatric",
  },
  {
    productId: "110",
    summary:
      "The flavored counterpart to Sports Research's unflavored collagen line, in Dark Chocolate, with a larger scoop size and slightly more protein per serving than the unflavored version.",
    bestFor: "Shoppers who want the same collagen format as the unflavored version but prefer an actual flavor.",
    pros: [
      "Price was verified directly at the retailer",
      "11g protein per scoop, more than the unflavored version's 9g",
      "Qualifies for our bariatric-relevant protein-per-dollar ranking",
    ],
    cons: [
      "Same collagen limitation as the unflavored version — not a complete protein source",
      "Single retailer tracked",
    ],
    relatedBestValueSlug: "best-value-protein-powder-bariatric",
  },
  {
    productId: "130",
    summary:
      "Ghost's whey line leans into novelty cereal-inspired flavors licensed from real cereal brands — this is Trix Cereal Milk, one of eight flavors we track.",
    bestFor: "Shoppers who want a dessert/cereal-flavored whey instead of a standard chocolate or vanilla.",
    pros: [
      "25g protein per serving with only 1g sugar despite the cereal-flavor branding",
      "Community-endorsed pick",
      "Eight flavors in the line if this specific one doesn't appeal to you",
    ],
    cons: [
      "Priciest whey per-tub among the flagship products on this page",
      "Single retailer tracked",
    ],
    relatedBestValueSlug: "highest-protein-per-dollar",
  },
  {
    productId: "138",
    summary:
      "A puffed protein bar format rather than a dense bar or a powder — Built's Puff line is closer to a crispy snack bar. This is Coconut, one of eight flavors in the line.",
    bestFor: "Shoppers who want a grab-and-go bar instead of mixing a shake.",
    pros: [
      "17g protein per bar in a snack format",
      "Community-endorsed pick",
      "12-count box, not a single-bar commitment",
    ],
    cons: [
      "6g sugar and 13g carbs per bar, higher than the powders in our protein lineup",
      "Single retailer tracked",
    ],
  },
];

export function getProductOverview(productId: string): ProductOverview | undefined {
  return PRODUCT_OVERVIEWS.find((o) => o.productId === productId);
}
