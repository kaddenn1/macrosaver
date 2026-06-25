const champions = [
  {
    title: "Best Whey Protein",
    product: "Transparent Labs Whey",
    badge: "Best Overall",
    protein: "25g",
    servings: "30",
    price: "$54.99",
    score: "98",
    emoji: "🥇",
  },
  {
    title: "Best Creatine",
    product: "Nutricost Creatine",
    badge: "Best Value",
    protein: "5g",
    servings: "100",
    price: "$18.99",
    score: "96",
    emoji: "💪",
  },
  {
    title: "Best Electrolytes",
    product: "LMNT Electrolytes",
    badge: "Best Hydration",
    protein: "0g",
    servings: "30",
    price: "$39.99",
    score: "94",
    emoji: "⚡",
  },
];

export default function Champions() {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24">
      <div className="mb-12 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-green-600">
          Champions Corner
        </p>

        <h2 className="mt-4 text-5xl font-black text-slate-900">
          Today&apos;s Top Picks
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
          Standout products ranked by value, macros, quality, and real-world usefulness.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {champions.map((item) => (
          <div
            key={item.product}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-4 py-2 text-xs font-black uppercase text-green-700">
                {item.badge}
              </span>

              <span className="text-4xl">{item.emoji}</span>
            </div>

            <div className="mt-6 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-green-50 text-7xl transition duration-300 group-hover:scale-[1.02]">
              {item.emoji}
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-wide text-green-600">
              {item.title}
            </p>

            <h3 className="mt-2 text-2xl font-black text-slate-900">
              {item.product}
            </h3>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Protein</p>
                <p className="font-black text-slate-900">{item.protein}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Servings</p>
                <p className="font-black text-slate-900">{item.servings}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Score</p>
                <p className="font-black text-green-600">{item.score}</p>
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-500">From</p>
                <p className="text-3xl font-black text-slate-900">
                  {item.price}
                </p>
              </div>

              <button className="rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-green-600">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}