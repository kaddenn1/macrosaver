import { products } from "@/data/products";
import {
  getBestOffer,
  getCostPerServing,
  getProteinPerDollar,
  getSavingsVsHighestOffer,
  getValueScore,
} from "@/lib/macrosaver-engine";

function formatCurrency(value: number | null): string {
  return value === null ? "N/A" : `$${value.toFixed(2)}`;
}

function formatNumber(value: number | null): string {
  return value === null ? "N/A" : value.toFixed(1);
}

function formatCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Champions() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-600">
          Today&apos;s Best Values
        </p>

        <h2 className="mt-4 text-4xl font-black text-slate-950 sm:text-5xl">
          Today&apos;s Best Values
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Compare retailers, uncover overpriced supplements, and instantly see
          which products give you the most for your money.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {products.map((item) => {
          const bestOffer = getBestOffer(item);
          const costPerServing = getCostPerServing(item);
          const proteinPerDollar = getProteinPerDollar(item);
          const savingsVsHighestOffer = getSavingsVsHighestOffer(item);
          const valueScore = getValueScore(item);

          return (
            <div
              key={item.id}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-green-50 px-4 py-2 text-xs font-black uppercase text-green-700 ring-1 ring-green-200">
                  {bestOffer ? bestOffer.retailer : "No retailer"}
                </span>

                <span className="rounded-full bg-slate-950 px-3 py-2 text-sm font-black text-green-300">
                  {valueScore}
                </span>
              </div>

              <div className="mt-6 flex h-48 items-center justify-center rounded-2xl bg-slate-950 text-6xl font-black text-green-300 transition duration-300 group-hover:scale-[1.02]">
                <span className="rounded-2xl border border-green-400/30 bg-green-400/10 px-6 py-5">
                  {item.imagePlaceholder}
                </span>
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-wide text-green-600">
                Best {formatCategory(item.category)}
              </p>

              <h3 className="mt-2 text-2xl font-black text-slate-900">
                {item.brand}
              </h3>

              <p className="text-slate-500">{item.name}</p>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p className="text-xs text-slate-500">Cost/Serving</p>
                  <p className="font-black text-slate-900">
                    {formatCurrency(costPerServing)}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-100">
                  <p className="text-xs text-slate-500">Protein/$</p>
                  <p className="font-black text-slate-900">
                    {formatNumber(proteinPerDollar)}g
                  </p>
                </div>

                <div className="rounded-2xl bg-green-50 p-3 ring-1 ring-green-100">
                  <p className="text-xs text-slate-500">Value Score</p>
                  <p className="font-black text-green-600">{valueScore}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-500">
                  Lowest Price
                </p>

                <p className="text-3xl font-black text-slate-900">
                  {formatCurrency(bestOffer ? bestOffer.price : null)}
                </p>

                <p className="mt-2 text-sm font-bold text-green-600">
                  Save {formatCurrency(savingsVsHighestOffer)} compared to the
                  highest retailer.
                </p>
              </div>

              <button className="mt-6 w-full rounded-xl bg-slate-950 py-3 font-bold text-white transition hover:bg-green-500 hover:text-slate-950">
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
