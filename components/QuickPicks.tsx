import Link from "next/link";
import { products } from "@/data/products";
import { QUICK_PICKS, type QuickPick } from "@/lib/quick-picks";
import type { Product } from "@/data/types";

export default function QuickPicks({ slug }: { slug: string }) {
  const picks = (QUICK_PICKS[slug] ?? [])
    .map((pick) => ({
      pick,
      product: (products as Product[]).find((p) => p.id === pick.productId),
    }))
    .filter((entry): entry is { pick: QuickPick; product: Product } => !!entry.product);

  if (picks.length === 0) return null;

  return (
    <section className="mb-10" aria-labelledby="quick-picks-heading">
      <h2 id="quick-picks-heading" className="text-xl font-black text-white mb-1">
        Quick picks
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Our read of the label data below. Each pick comes with its trade-off.
      </p>
      <div className="flex flex-col gap-3">
        {picks.map(({ pick, product }) => {
          const offer = product.offers.find((o) => o.inStock !== false);
          return (
            <div key={product.id} className="bg-[#111] border border-gray-800 rounded-xl p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#a3e635]">
                {product.brand}
              </div>
              <Link
                href={`/product/${product.id}`}
                className="text-sm font-bold text-white hover:text-[#a3e635] transition-colors"
              >
                {product.name}
              </Link>
              <dl className="mt-3 space-y-2 text-xs leading-relaxed">
                <div>
                  <dt className="inline font-black uppercase tracking-wider text-gray-400">Best for: </dt>
                  <dd className="inline text-gray-300">{pick.bestFor}</dd>
                </div>
                <div>
                  <dt className="inline font-black uppercase tracking-wider text-gray-400">Why it stands out: </dt>
                  <dd className="inline text-gray-300">{pick.standsOut}</dd>
                </div>
                <div>
                  <dt className="inline font-black uppercase tracking-wider text-gray-400">Trade-off: </dt>
                  <dd className="inline text-gray-300">{pick.tradeOff}</dd>
                </div>
              </dl>
              {offer && (
                <a
                  href={offer.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-block mt-4 rounded border border-gray-700 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-200 hover:border-[#a3e635] hover:text-white transition-colors"
                >
                  Check current price at {offer.retailer} (paid link) →
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
