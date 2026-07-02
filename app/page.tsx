import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Champions from "@/components/Champions";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />

      <div className="rounded-t-[2rem] bg-slate-50">
        <Champions />
      </div>
    </main>
  );
}
