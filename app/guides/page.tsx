import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

const title = "Supplement Buying Guides";
const description =
  "Straightforward buying guides for protein, creatine, pre-workout, and electrolytes — what actually matters before you buy, without the marketing fluff.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: { title: `${title} | MacroSaver`, description, url: `${SITE_URL}/guides` },
};

export default function GuidesPage() {
  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[1600px] mx-auto pt-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-10 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
            Buying Guides
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-[650px]">
            What actually matters before you buy — no marketing fluff, just how to compare products in each category.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group bg-[#111] border border-gray-800 hover:border-[#a3e635] rounded-xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]"
            >
              <h2 className="text-lg font-bold text-white leading-snug mb-3">
                {guide.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {guide.summary}
              </p>
              <div className="mt-4 text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#a3e635] transition-colors">
                Read the guide →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
