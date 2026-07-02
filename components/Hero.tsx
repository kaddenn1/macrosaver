export default function Hero() {
  return (
    <section className="bg-slate-950 px-5 pb-16 pt-14 text-white sm:px-8 lg:pb-20 lg:pt-18">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-green-300">
          Stop overpaying for supplements
        </p>

        <h1 className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Know Where Every Dollar Goes.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
          Supplement prices change every day. MacroSaver compares retailers,
          servings, and protein per dollar so you can find the best value
          before you buy.
        </p>

        <form className="mt-9 flex w-full max-w-4xl flex-col gap-3 rounded-2xl border border-white/10 bg-white p-2 shadow-2xl shadow-green-950/30 sm:flex-row">
          <input
            aria-label="Search supplements"
            className="min-h-16 flex-1 rounded-xl px-5 text-lg font-semibold text-slate-950 outline-none placeholder:text-slate-400"
            placeholder="Search whey protein, creatine, electrolytes..."
            type="search"
          />
          <button className="min-h-16 rounded-xl bg-green-500 px-9 text-base font-black text-slate-950 transition hover:bg-green-400">
            Find Best Value
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-400">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Price per serving
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Protein per dollar
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Best retailer
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Savings found
          </span>
        </div>

        <div className="mt-10 grid w-full max-w-5xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-3xl font-black text-green-300">$0.63</p>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              saved by choosing the best offer
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-3xl font-black text-green-300">12.5g</p>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              more protein per dollar surfaced
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-3xl font-black text-green-300">100</p>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              clear value score before checkout
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
