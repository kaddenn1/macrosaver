import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Derm-Deals | Top Skincare, Lowest Prices",
  robots: { index: false, follow: false },
};

const CATEGORIES = [
  { label: "Cleansers", icon: "bottle" },
  { label: "Serums", icon: "dropper" },
  { label: "Moisturizers", icon: "jar" },
  { label: "Suncare", icon: "sun" },
  { label: "Eye Care", icon: "eye" },
  { label: "Masks", icon: "mask" },
  { label: "Lip Care", icon: "lips" },
  { label: "Tools", icon: "tool" },
  { label: "Toners", icon: "toner" },
] as const;

const PRODUCTS = [
  {
    brand: "Elemis",
    name: "Pro-Collagen Cleansing Balm",
    price: 38.99,
    original: 67.0,
    off: 42,
    retailer: "Amazon",
    rating: 4.5,
    reviews: 4892,
    hue: "from-amber-200 to-orange-300",
  },
  {
    brand: "The Ordinary",
    name: "Hyaluronic Acid 2% + B5",
    price: 6.7,
    original: 10.0,
    off: 33,
    retailer: "Ulta Beauty",
    rating: 4.5,
    reviews: 7126,
    hue: "from-slate-100 to-slate-300",
  },
  {
    brand: "La Roche-Posay",
    name: "Toleriane Purifying Cleanser",
    price: 14.99,
    original: 21.42,
    off: 30,
    retailer: "SkinStore",
    rating: 4.5,
    reviews: 3421,
    tag: "Best Value",
    hue: "from-sky-100 to-blue-200",
  },
  {
    brand: "Laneige",
    name: "Water Sleeping Mask",
    price: 29.0,
    original: 39.0,
    off: 25,
    retailer: "Sephora",
    rating: 4.5,
    reviews: 6231,
    hue: "from-blue-300 to-indigo-400",
  },
  {
    brand: "Supergoop!",
    name: "Unseen Sunscreen SPF 40",
    price: 22.0,
    original: 35.0,
    off: 37,
    retailer: "Sephora",
    rating: 4.5,
    reviews: 4210,
    hue: "from-yellow-100 to-amber-200",
  },
  {
    brand: "Caudalie",
    name: "Vinoperfect Radiance Serum",
    price: 49.0,
    original: 83.0,
    off: 41,
    retailer: "Bluemercury",
    rating: 4.5,
    reviews: 1987,
    hue: "from-rose-100 to-pink-200",
  },
];

const TRUST_POINTS = [
  { title: "100% Authentic", desc: "We only list trusted retailers and authentic products.", icon: "shield" },
  { title: "Secure & Private", desc: "Your information is safe with us. Always.", icon: "lock" },
  { title: "Real Savings", desc: "We compare prices so you save more.", icon: "piggy" },
  { title: "Loved by Thousands", desc: "Join thousands of skincare lovers who save daily.", icon: "people" },
];

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  switch (name) {
    case "leaf":
      return <svg className={className} {...common}><path d="M5 21c8-2 14-8 14-16-8 0-14 6-14 14v2z" /><path d="M5 21c2-4 5-8 10-11" /></svg>;
    case "search":
      return <svg className={className} {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case "user":
      return <svg className={className} {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" /></svg>;
    case "heart":
      return <svg className={className} {...common}><path d="M12 20s-7-4.4-9.5-8.8C.7 7.8 2.4 4 6.2 4c2 0 3.6 1 5.8 3.2C14.2 5 15.8 4 17.8 4c3.8 0 5.5 3.8 3.7 7.2C19 15.6 12 20 12 20z" /></svg>;
    case "bag":
      return <svg className={className} {...common}><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></svg>;
    case "tag":
      return <svg className={className} {...common}><path d="M12 2l9 9-9 9-8-8V4a2 2 0 012-2h6z" /><circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" /></svg>;
    case "shield":
      return <svg className={className} {...common}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "dollar":
      return <svg className={className} {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 3 6 1.6 6 4.5 0 1.4-1.3 2.5-3 2.5s-3-1.1-3-2.5" /></svg>;
    case "lock":
      return <svg className={className} {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></svg>;
    case "piggy":
      return <svg className={className} {...common}><path d="M4 12a6 6 0 016-6h4a6 6 0 016 6v1h2l-2 3v2a2 2 0 01-2 2h-1l-1 2h-4l-.5-2H9l-1 2H5l1-2c-2-1-3-3-3-5v-1z" /><circle cx="15" cy="10" r=".8" fill="currentColor" stroke="none" /></svg>;
    case "people":
      return <svg className={className} {...common}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.6" /><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5" /><path d="M14.5 15.2c2.3.2 4 1.7 4.5 4.8" /></svg>;
    case "bottle":
      return <svg className={className} {...common}><rect x="8" y="9" width="8" height="12" rx="1.5" /><path d="M10 9V6a1 1 0 011-1h2a1 1 0 011 1v3" /><path d="M8 13h8" /></svg>;
    case "dropper":
      return <svg className={className} {...common}><path d="M9 3h6l-1 6-3 12-3-12-1-6z" /><path d="M9.5 9h5" /></svg>;
    case "jar":
      return <svg className={className} {...common}><rect x="6" y="9" width="12" height="11" rx="2" /><path d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2" /></svg>;
    case "sun":
      return <svg className={className} {...common}><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>;
    case "eye":
      return <svg className={className} {...common}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>;
    case "mask":
      return <svg className={className} {...common}><path d="M4 10c0-4 3.6-7 8-7s8 3 8 7-3.6 9-8 9-8-5-8-9z" /><circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" /></svg>;
    case "lips":
      return <svg className={className} {...common}><path d="M3 11c2-3 5-4 9-4s7 1 9 4c-2 1-3 3-9 3s-7-2-9-3z" /><path d="M6 12c2 2 4 3 6 3s4-1 6-3" /></svg>;
    case "tool":
      return <svg className={className} {...common}><path d="M14 7a3 3 0 104 4l4 4-2 2-4-4a3 3 0 00-4-4L8 13l-4-4 6-6 4 4z" /></svg>;
    case "toner":
      return <svg className={className} {...common}><rect x="7" y="4" width="10" height="16" rx="2" /><path d="M10 4V3h4v1" /></svg>;
    case "grid":
      return <svg className={className} {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "arrow":
      return <svg className={className} {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "star":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.8 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6L12 2z" /></svg>;
    case "sparkle":
      return <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" /></svg>;
    default:
      return null;
  }
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5 text-pink-400">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon key={i} name="star" className={`w-3 h-3 ${i <= full ? "text-pink-400" : "text-neutral-700"}`} />
      ))}
    </span>
  );
}

function ProductArt({ hue }: { hue: string }) {
  return (
    <div className={`relative w-full aspect-square rounded-lg bg-gradient-to-br ${hue} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 bg-white/10" />
      <Icon name="bottle" className="w-12 h-12 text-black/30" />
    </div>
  );
}

export default function CassiePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="w-full bg-black border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400">
              <Icon name="leaf" className="w-6 h-6" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-pink-400">DERM</span>
                <span className="text-white">-DEALS</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-pink-300/70 uppercase mt-1 flex items-center gap-1">
                Skincare Savings You&apos;ll Love <Icon name="heart" className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold tracking-wide text-neutral-300 whitespace-nowrap">
            {["Cleansers", "Serums", "Moisturizers", "Suncare", "Tools", "Brands"].map((l) => (
              <span key={l} className="hover:text-white transition-colors cursor-default">{l.toUpperCase()}</span>
            ))}
            <span className="text-pink-400">BEST DEALS</span>
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-2 py-2 w-56">
              <span className="text-xs text-neutral-500 flex-1">Search skincare deals...</span>
              <span className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-black shrink-0">
                <Icon name="search" className="w-3.5 h-3.5" />
              </span>
            </div>
            <Icon name="user" className="w-5 h-5 text-neutral-300" />
            <Icon name="heart" className="w-5 h-5 text-neutral-300" />
            <div className="relative">
              <Icon name="bag" className="w-5 h-5 text-neutral-300" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-pink-500 text-[9px] font-bold flex items-center justify-center text-black">3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black to-pink-950/40">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-[120px]" />
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16 lg:py-20 relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="italic text-pink-300 text-xl mb-2">Your Skin Deserves More.</p>
            <h1 className="text-5xl sm:text-6xl font-black leading-[0.95] tracking-tight mb-5">
              Top Skincare.<br />
              <span className="text-pink-400">Lowest Prices.</span>
            </h1>
            <p className="text-neutral-400 max-w-md mb-8">
              We compare prices across top retailers so you can glow more and spend less.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-9">
              {[
                { icon: "tag", title: "Best Prices", sub: "Everyday" },
                { icon: "shield", title: "Trusted Retailers", sub: "100% Authentic" },
                { icon: "dollar", title: "Real Savings", sub: "Compare & Save" },
                { icon: "heart", title: "Loved by Skin", sub: "Backed by Reviews" },
              ].map((f) => (
                <div key={f.title} className="flex flex-col items-start gap-2">
                  <div className="w-9 h-9 rounded-full border border-pink-400/40 text-pink-400 flex items-center justify-center">
                    <Icon name={f.icon} className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-white leading-tight">{f.title}</div>
                  <div className="text-[11px] text-neutral-500">{f.sub}</div>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 bg-pink-500 text-black font-black text-sm uppercase tracking-wide px-6 py-3.5 rounded-full hover:bg-pink-400 transition-colors">
              Shop Best Deals <Icon name="arrow" className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <p className="font-serif italic text-pink-300 text-3xl mb-2 flex items-center gap-2">
              by Cassie <Icon name="heart" className="w-5 h-5" />
            </p>
            <blockquote className="text-neutral-300 text-sm italic mb-6 max-w-xs">
              &ldquo;I&apos;m passionate about skincare and finding the best deals for you!&rdquo;
              <br />
              <span className="not-italic text-pink-300">Xo, Cassie ♡</span>
            </blockquote>

            <div className="relative rounded-3xl bg-gradient-to-br from-pink-100/10 via-pink-300/10 to-rose-400/10 border border-pink-400/20 p-8">
              <div className="grid grid-cols-4 gap-3">
                {["from-neutral-200 to-neutral-400", "from-pink-100 to-pink-200", "from-pink-300 to-pink-400", "from-rose-200 to-rose-300"].map((hue, i) => (
                  <div key={i} className={`aspect-[1/2.2] rounded-xl bg-gradient-to-b ${hue} shadow-lg`} />
                ))}
              </div>
              <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-pink-500 text-black flex flex-col items-center justify-center text-center leading-none shadow-xl">
                <span className="text-[9px] font-bold uppercase">Save up to</span>
                <span className="text-xl font-black">60%</span>
                <span className="text-[8px] font-bold uppercase">Off Retail</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category bar */}
      <section className="bg-black border-y border-white/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-6 flex items-center gap-8 overflow-x-auto">
          {CATEGORIES.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2 shrink-0 text-neutral-400 hover:text-pink-300 transition-colors cursor-default">
              <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center">
                <Icon name={c.icon} className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide whitespace-nowrap">{c.label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2 shrink-0 text-black ml-auto">
            <div className="w-11 h-11 rounded-full bg-pink-500 flex items-center justify-center">
              <Icon name="grid" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wide text-pink-300">View All</span>
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="max-w-[1500px] mx-auto px-6 lg:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="flex items-center gap-3 text-lg sm:text-xl font-black tracking-wide uppercase">
            <Icon name="sparkle" className="w-4 h-4 text-pink-400" />
            Best Skincare Deals Right Now
            <Icon name="sparkle" className="w-4 h-4 text-pink-400" />
          </h2>
          <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-pink-400 whitespace-nowrap">
            View All Deals <Icon name="arrow" className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-[#0d0d0d] border border-white/10 rounded-xl p-3 flex flex-col">
              <div className="relative mb-3">
                <span className="absolute top-2 left-2 z-10 bg-pink-500 text-black text-[10px] font-black px-2 py-1 rounded-full">
                  {p.off}% OFF
                </span>
                {p.tag && (
                  <span className="absolute top-2 right-9 z-10 bg-pink-300/90 text-black text-[9px] font-bold px-2 py-1 rounded-full">
                    {p.tag}
                  </span>
                )}
                <span className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white">
                  <Icon name="heart" className="w-3 h-3" />
                </span>
                <ProductArt hue={p.hue} />
              </div>
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-0.5">{p.brand}</div>
              <div className="text-xs text-neutral-200 leading-snug mb-2 line-clamp-2">{p.name}</div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-pink-400 font-black text-sm">${p.price.toFixed(2)}</span>
                <span className="text-neutral-600 text-xs line-through">${p.original.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-neutral-500 font-bold mb-1.5">{p.retailer}</div>
              <div className="flex items-center gap-1.5">
                <Stars rating={p.rating} />
                <span className="text-[10px] text-neutral-600">({p.reviews.toLocaleString()})</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TRUST_POINTS.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full border border-pink-400/30 text-pink-400 flex items-center justify-center shrink-0">
                <Icon name={t.icon} className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-pink-300">{t.title}</div>
                <div className="text-xs text-neutral-500 leading-snug">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
