import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import { CompareProvider } from "@/components/CompareContext";
import CompareTray from "@/components/CompareTray";
import { SITE_URL, SITE_NAME } from "@/lib/site";
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <AmbientBackground />
        <CompareProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <CompareTray />
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}