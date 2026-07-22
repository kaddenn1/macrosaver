import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-lime-400">404</p>
        <h1 className="mt-3 text-4xl font-black text-white">That page is not in the catalog.</h1>
        <p className="mt-4 leading-relaxed text-gray-400">
          The address may be outdated, or the product, category, guide, or recipe may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-lime-400 px-5 py-3 font-black text-black transition-colors hover:bg-lime-300"
        >
          Browse the catalog
        </Link>
      </div>
    </main>
  );
}
