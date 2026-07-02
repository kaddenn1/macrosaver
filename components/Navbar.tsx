export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <div>
          <div className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            MacroSaver
          </div>
          <p className="hidden text-[0.68rem] font-semibold uppercase tracking-wide text-green-300 sm:block">
            Save More on Every Supplement
          </p>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-300 md:flex">
          <a href="#">Best Values</a>
          <a href="#">Categories</a>
          <a href="#">Compare</a>
          <a href="#">Deals & Coupons</a>
        </nav>

        <button className="rounded-xl bg-green-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-green-300">
          Find the Best Deal
        </button>
      </div>
    </header>
  );
}
