export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-28 text-center">
      <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-600">
        THE SMARTEST WAY TO BUY SUPPLEMENTS
      </p>

      <h1 className="mx-auto max-w-5xl text-6xl font-black leading-tight text-slate-900">
        Find the Best Supplements.
        <br />
        <span className="text-green-600">Save More.</span> Hit Your Macros.
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-600">
        Compare prices, protein per dollar, ingredients, serving sizes, trusted
        brands, and real supplement value all in one place.
      </p>

      <div className="mt-12 flex justify-center gap-5">
        <button className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700">
          View Champions
        </button>

        <button className="rounded-xl border border-slate-300 px-8 py-4 font-bold text-slate-800 transition hover:bg-slate-100">
          Browse Categories
        </button>
      </div>
    </section>
  );
}