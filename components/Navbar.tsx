export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="text-3xl font-black text-green-600">
          MacroSaver
        </div>

        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 md:flex">
          <a href="#">Champions</a>
          <a href="#">Categories</a>
          <a href="#">Compare</a>
          <a href="#">Deals</a>
        </nav>

        <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700">
          Start Comparing
        </button>
      </div>
    </header>
  );
}