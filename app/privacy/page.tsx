import React from 'react';
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const title = "Privacy Policy | MacroSaver";
const description =
  "MacroSaver's privacy policy, including our affiliate and advertising disclosures.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { title, description, url: `${SITE_URL}/privacy` },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="border-b border-[#1a1a1a] pb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Last Updated: July 2026
          </p>
        </div>

        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">1. Overview</h2>
          <p className="leading-relaxed text-gray-400">
            Welcome to MacroSaver (hereinafter referred to as &quot;the Website,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). 
            We respect your privacy and are committed to protecting any personal data or information collected through your use of our performance nutrition dashboard and calculator tool.
          </p>
        </section>

        {/* Section 2: Affiliate Disclosure */}
        <section className="space-y-3 bg-[#111] p-5 rounded-lg border border-[#222]">
          <h2 className="text-xl font-semibold text-amber-400">2. Affiliate & Advertising Disclosure</h2>
          <p className="leading-relaxed text-gray-300">
            MacroSaver is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
          <p className="leading-relaxed text-gray-300 mt-2">
            As part of this program, when users click on external retail product links provided across our price-tracking dashboards, we may receive a small financial referral commission on qualifying subsequent purchases. This process occurs at absolutely no additional cost to you.
          </p>
          <p className="leading-relaxed text-gray-300 mt-2">
            Product prices, nutritional descriptions, and inventory data displayed on this platform are pulled dynamically and are subject to immediate alteration based on store updates.
          </p>
        </section>

        {/* Section 3: Cookies & Tracking */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">3. Cookies and Tracking Technologies</h2>
          <p className="leading-relaxed text-gray-400">
            We, alongside our third-party retail partners (such as Amazon), utilize tracking identifiers known as &quot;cookies&quot; to monitor the performance of inbound consumer web traffic and to ensure that referral tracking credits are appropriately assigned for qualified consumer transactions. 
          </p>
          <p className="leading-relaxed text-gray-400">
            Cookies are minuscule text data modules preserved natively within your web browser device. You possess the continuous legal capacity to systematically alter your individual system browser settings to reject or purge cookie history at any time.
          </p>
        </section>

        {/* Section 4: Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-white">4. Information We Collect</h2>
          <p className="leading-relaxed text-gray-400">
            MacroSaver operates strictly as a data calculation dashboard interface. We do not explicitly require personal client profiles, credit card processing info, or account memberships to review baseline supplement metrics. Any usage metadata parsed via standard logging systems is used exclusively to optimize user interface speeds and backend server performance.
          </p>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-3 border-t border-[#1a1a1a] pt-6">
          <h2 className="text-xl font-semibold text-white">5. Compliance and Inquiries</h2>
          <p className="leading-relaxed text-gray-400">
            For further clarification regarding any systemic policy provisions listed herein, please reach out directly through our administrative dashboard channels or contact support at <span className="text-white font-mono">support@macrosaver.com</span>.
          </p>
        </section>

      </div>
    </main>
  );
}