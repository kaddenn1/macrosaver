export const AFFILIATE_CONFIG = {
  amazonTrackingId: "your-amazon-tag-20",
  iherbTrackingId: "your-iherb-tag",
  walmartTrackingId: "your-walmart-tag",
  vitaminShoppeTrackingId: "your-cj-tag",
};

export function buildAffiliateLink(retailer: string, fallbackUrl: string): string {
  const cleanRetailer = retailer.toLowerCase();

  switch (cleanRetailer) {
    case "amazon":
      return `https://www.amazon.com/dp/B07K68FP78?tag=${AFFILIATE_CONFIG.amazonTrackingId}`;
    
    case "iherb":
      return `https://www.iherb.com/c/supplements?rcode=${AFFILIATE_CONFIG.iherbTrackingId}`;
    
    case "walmart":
      return `https://walmart.com?affsiteid=${AFFILIATE_CONFIG.walmartTrackingId}`;
    
    case "vitamin shoppe":
      return `https://www.vitaminshoppe.com?utm_source=affiliate&sid=${AFFILIATE_CONFIG.vitaminShoppeTrackingId}`;
    
    default:
      return fallbackUrl;
  }
}