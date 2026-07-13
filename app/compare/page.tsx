import type { Metadata } from "next";
import CompareTable from "@/components/CompareTable";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Compare Products | ${SITE_NAME}`,
  description: `Compare price, cost per serving, and nutrition facts side by side on ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/compare` },
  robots: { index: false, follow: true },
};

export default function ComparePage() {
  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase mb-1">
          Compare Products
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Side-by-side pricing and nutrition facts for the products you picked.
        </p>

        <CompareTable />
      </div>
    </main>
  );
}
