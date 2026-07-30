export type ProductLine = {
  id: string;
  /** Canonical variant for this line. Defaults to the lowest product id, overridden
   *  only where Search Console data showed Google had already indexed a different
   *  sibling — picking that one as primary avoids an unnecessary reshuffle. */
  primaryProductId: string;
  memberProductIds: string[];
};

// Generated from scripts/detect-variant-groups.ts and reviewed by hand.
// Each entry groups flavor/size variants of one underlying product so the
// product page can render a single Amazon-style selector between them and
// the sitemap can submit one URL per line instead of one per variant.
export const PRODUCT_LINES: ProductLine[] = [
  {
    id: "optimum-nutrition-gold-standard-whey",
    primaryProductId: "1",
    memberProductIds: ["1", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  },
  {
    id: "nutricost-creatine-monohydrate",
    primaryProductId: "27",
    memberProductIds: ["21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
  },
  {
    id: "bariatricpal-calcium-citrate-soft-chews",
    primaryProductId: "66",
    memberProductIds: ["66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76"],
  },
  {
    id: "liquid-iv-hydration-multiplier",
    primaryProductId: "43",
    memberProductIds: ["43", "44", "45", "46", "47", "49", "50", "51", "52"],
  },
  {
    id: "ghost-legend-pre-workout",
    primaryProductId: "34",
    memberProductIds: ["34", "36", "37", "38", "39", "40", "41", "42"],
  },
  {
    id: "ghost-whey-protein-powder",
    primaryProductId: "130",
    memberProductIds: ["130", "158", "159", "160", "161", "162", "163", "164"],
  },
  {
    id: "built-bar-puff-protein-bar",
    primaryProductId: "138",
    memberProductIds: ["138", "141", "142", "143", "145", "147", "149", "166"],
  },
  {
    id: "protein2o-whey-protein-isolate-hydration-drink",
    primaryProductId: "118",
    memberProductIds: ["118", "119", "120", "121", "122", "123"],
  },
  {
    id: "bariatric-fusion-calcium-citrate-soft-chews",
    primaryProductId: "79",
    memberProductIds: ["77", "78", "79", "80", "81", "82"],
  },
  {
    id: "spylt-high-protein-milk",
    primaryProductId: "132",
    memberProductIds: ["132", "133", "134", "135", "136", "137"],
  },
  {
    id: "sports-research-sweet-sweat-workout-enhancer-gel",
    primaryProductId: "57",
    memberProductIds: ["56", "57", "58", "59", "60"],
  },
  {
    id: "built-bar-sour-puff-protein-bar",
    primaryProductId: "151",
    memberProductIds: ["151", "152", "153", "154"],
  },
  {
    id: "premier-protein-powder",
    primaryProductId: "8",
    memberProductIds: ["7", "8", "33"],
  },
  {
    id: "prosupps-mr-hyde-signature-pre-workout",
    primaryProductId: "53",
    memberProductIds: ["53", "54", "55"],
  },
  {
    id: "dymatize-elite-casein",
    primaryProductId: "84",
    memberProductIds: ["84", "85", "86"],
  },
  {
    id: "bari-life-bariburst-calcium-citrate-chews",
    primaryProductId: "155",
    memberProductIds: ["155", "156", "157"],
  },
  {
    id: "ascent-100-clear-whey-protein-isolate",
    primaryProductId: "6",
    memberProductIds: ["6", "9"],
  },
  {
    id: "sports-research-sweet-sweat-toned-bundle",
    primaryProductId: "88",
    memberProductIds: ["88", "89"],
  },
  {
    id: "bariatricpal-multivitamin-one",
    primaryProductId: "64",
    memberProductIds: ["64", "65"],
  },
  {
    id: "core-power-protein-shake",
    primaryProductId: "170",
    memberProductIds: ["170", "171", "172"],
  },
  {
    id: "core-power-elite-high-protein-shake",
    primaryProductId: "173",
    memberProductIds: ["173", "174", "175"],
  },
];

const lineByProductId = new Map<string, ProductLine>(
  PRODUCT_LINES.flatMap((line) => line.memberProductIds.map((id) => [id, line] as const))
);

export function getProductLine(productId: string): ProductLine | undefined {
  return lineByProductId.get(productId);
}
