import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL } from "@/lib/site";
import { amazonUrl } from "@/lib/affiliate";

const ASIN = "B0HCTFQ6MM";
const PRICE = 75;
const TITLE = "95kPa Commercial Vacuum Sealer";

export const metadata: Metadata = {
  title: TITLE,
  description: "Cheyenne's pick — 2X-strength commercial vacuum sealer with built-in cutter and bag storage.",
  alternates: { canonical: `${SITE_URL}/cheyenne` },
  robots: { index: false, follow: false },
};

export default function CheyennePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
        Cheyenne&apos;s Pick
      </p>
      <h1 className="max-w-xl text-2xl font-black tracking-tight text-white sm:text-3xl">
        {TITLE}
      </h1>

      <div className="relative mt-8 h-72 w-72 overflow-hidden rounded-2xl border border-gray-800 bg-[#111] sm:h-96 sm:w-96">
        <Image src="/products/cheyenne.jpg" alt={TITLE} fill className="object-cover" priority />
      </div>

      <div className="mt-8 text-4xl font-black text-white">${PRICE.toFixed(2)}</div>

      <a
        href={amazonUrl(ASIN)}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="mt-6 rounded-lg bg-lime-400 px-10 py-4 text-lg font-black uppercase tracking-wide text-black transition-colors hover:bg-lime-300"
      >
        Buy Now →
      </a>

      <p className="mt-4 text-xs text-gray-500">
        As an Amazon Associate, MacroSaver earns from qualifying purchases.
      </p>
    </main>
  );
}
