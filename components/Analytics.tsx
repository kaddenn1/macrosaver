"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * GA4 page views plus one aggregate `retailer_click` event per paid outbound link.
 * A single capture-phase listener covers every sponsored link on the site, so new buttons
 * are tracked without extra wiring. Only the retailer, ASIN, page and link text are sent —
 * never prices, and no per-user identifiers.
 */
export default function Analytics() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const link = target?.closest?.('a[rel~="sponsored"]') as HTMLAnchorElement | null;
      if (!link || !window.gtag) return;

      let host = "";
      try {
        host = new URL(link.href).hostname.replace(/^www\./, "");
      } catch {
        return;
      }
      const asin = link.href.match(/\/dp\/([A-Z0-9]{10})/)?.[1];
      const path = window.location.pathname;
      const section = path.split("/")[1] || "home";

      window.gtag("event", "retailer_click", {
        retailer: host.includes("amazon.") ? "Amazon" : host,
        product_asin: asin,
        page_path: path,
        page_type: section,
        link_text: (link.textContent ?? "").trim().slice(0, 80),
        in_quick_picks: !!link.closest('[aria-labelledby="quick-picks-heading"]'),
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
    </>
  );
}
