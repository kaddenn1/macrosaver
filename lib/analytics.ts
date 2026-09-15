declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type RetailerClickEvent = {
  productId: string;
  retailer: string;
  price: number;
  pageType: "deals" | "product" | "compare" | "best" | "champions";
  buttonPosition: string;
};

/**
 * Pushes a `retailer_click` event to `window.dataLayer` so it's picked up the moment
 * GA4/GTM is installed on the site. A no-op (safe, does nothing) until that happens —
 * this only prepares the event shape, it doesn't stand up analytics on its own.
 */
export function trackRetailerClick(event: RetailerClickEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "retailer_click", ...event });
}
