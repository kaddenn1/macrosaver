import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Champions from "@/components/Champions";
import DealsTicker from "@/components/DealsTicker";
import Footer from "@/components/Footer";

const trustItems = [
  { icon: "⚙️", title: "We rank by value,", body: "not commission." },
  { icon: "🧮", title: "Real math.", body: "Real savings." },
  { icon: "🔄", title: "Always up to date", body: "prices and deals." },
  { icon: "🛡️", title: "No fluff.", body: "Just value." },
  { icon: "🧠", title: "Built for people", body: "who shop smart." },
];

export default function Home() {
  const mockLiveDeals = [
    { retailer: "iHerb", price: 46.79, icon: "🌿", affiliateUrl: "https://www.iherb.com/your-tag" },
    { retailer: "Amazon", price: 49.99, icon: "📦", affiliateUrl: "https://amzn.to/your-tag" },
    { retailer: "Walmart", price: 51.97, icon: "☀️", affiliateUrl: "https://walmart.com/your-tag" },
    { retailer: "Vitamin Shoppe", price: 53.99, icon: "Ⓥ", affiliateUrl: "https://vitaminshoppe.com/your-tag" },
    { retailer: "iHerb Tier-2", price: 58.45, icon: "🍃", affiliateUrl: "https://www.iherb.com/your-tag" },
  ];

  return (
    <div className="w-full bg-black min-h-screen flex flex-col items-center justify-start text-white antialiased selection:bg-lime-500 selection:text-black overflow-x-hidden">
      <Navbar />
      <Hero />

      {/* Global Center Constraint Boundary Box */}
      <div className="w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pb-16 space-y-4">
        <Champions />

        <div className="pt-4">
          <DealsTicker deals={mockLiveDeals} />
        </div>

        {/* Horizontal Trust Value Matrix Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs text-neutral-400 border-t border-neutral-900/60 mt-8">
          <div className="flex items-center gap-3 bg-neutral-950/30 border border-neutral-900/50 p-4 rounded-xl">
            <span className="text-lime-500 text-lg">🛡️</span>
            <div>
              <p className="font-black text-white uppercase tracking-wider">2,400+</p>
              <p className="text-neutral-500 font-medium mt-0.5">Verified Reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-950/30 border border-neutral-900/50 p-4 rounded-xl">
            <span className="text-lime-500 text-lg">🔍</span>
            <div>
              <p className="font-black text-white uppercase tracking-wider">Price Checked</p>
              <p className="text-neutral-500 font-medium mt-0.5">Multiple Retailers Daily</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-950/30 border border-neutral-900/50 p-4 rounded-xl">
            <span className="text-lime-500 text-lg">🎟️</span>
            <div>
              <p className="font-black text-white uppercase tracking-wider">No Membership</p>
              <p className="text-neutral-500 font-medium mt-0.5">100% Free to Use</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-neutral-950/30 border border-neutral-900/50 p-4 rounded-xl">
            <span className="text-lime-500 text-lg">🔒</span>
            <div>
              <p className="font-black text-white uppercase tracking-wider">Secure & Private</p>
              <p className="text-neutral-500 font-medium mt-0.5">Your data is never sold</p>
            </div>
          </div>
        </div>

        {/* Secondary Info Layout Grids */}
        <section id="trust" className="pt-12">
          <div className="grid gap-6 rounded-2xl border border-neutral-900 bg-neutral-950/40 px-6 py-8 sm:grid-cols-2 lg:grid-cols-5 lg:px-10 shadow-xl">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-2xl font-black text-lime-500 shadow-md">
                  {item.icon}
                </span>
                <p className="text-sm font-bold leading-6 text-neutral-200">
                  {item.title}
                  <br />
                  <span className="text-neutral-500 font-medium">{item.body}</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}