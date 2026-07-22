import type { Metadata } from "next";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";
import { CompareProvider } from "@/components/CompareContext";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { serializeJsonLd } from "@/lib/json-ld";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MacroSaver | Performance Nutrition Price Tracker",
  description: "Automated macro calculation and price tracking dashboard for fitness supplements, clear whey isolates, and workout gear.",
  alternates: { canonical: SITE_URL },
  verification: {
    google: "HVBqnvFCZN2ebssSR01qGiPu9iollfp8N_1zlEQk9OI",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="relative bg-[#0a0a0a] text-gray-100 antialiased min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-lime-400 px-4 py-3 font-bold text-black shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Script
          id="impact-radius-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7461971-3238-450a-ad61-d5073711ba501.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <CompareProvider>
          <SiteChrome>{children}</SiteChrome>
        </CompareProvider>
      </body>
    </html>
  );
}