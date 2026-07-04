import React from 'react';

export default function Footer() {
  return (
    <footer className="pt-16 border-t border-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <p className="text-3xl font-black tracking-tight text-white">
            Macro<span className="text-lime-500">Saver</span>
          </p>
          <p className="text-xs font-semibold text-neutral-500 mt-1">
            Know Where Every Dollar Goes.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-400">
            We do the math so you don't have to. Compare. Save. Buy smart.
          </p>
        </div>

        <div className="border-neutral-900 lg:border-x lg:px-12">
          <p className="text-base font-black text-white">
            Get the best supplement deals in your inbox.
          </p>
          <form className="mt-4 flex max-w-md overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
            <input
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs text-white outline-none placeholder:text-neutral-700"
              placeholder="Enter your email"
              type="email"
            />
            <button
              className="bg-lime-500 px-5 py-3 text-xs font-black text-black transition hover:bg-lime-400"
              type="button"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-8 text-xs">
          <div>
            <p className="font-bold tracking-wide uppercase text-[10px] text-neutral-500">Categories</p>
            <div className="mt-4 grid gap-2 font-medium text-neutral-400">
              <a href="#protein" className="hover:text-lime-500 transition">Protein</a>
              <a href="#creatine" className="hover:text-cyan-400 transition">Creatine</a>
              <a href="#pre-workout" className="hover:text-purple-400 transition">Pre-Workout</a>
              <a href="#electrolytes" className="hover:text-sky-400 transition">Electrolytes</a>
              <a href="#recovery" className="hover:text-orange-400 transition">Recovery</a>
            </div>
          </div>

          <div>
            <p className="font-bold tracking-wide uppercase text-[10px] text-neutral-500">Company</p>
            <div className="mt-4 grid gap-2 font-medium text-neutral-400">
              <a href="#" className="hover:text-white transition">About Us</a>
              <a href="#" className="hover:text-white transition">How It Works</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>

          <div>
            <p className="font-bold tracking-wide uppercase text-[10px] text-neutral-500">Legal</p>
            <div className="mt-4 grid gap-2 font-medium text-neutral-400">
              <a href="#" className="hover:text-white transition">Terms of Use</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-lime-500 transition">Affiliate Disclosure</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-neutral-900 py-6 text-center text-xs text-neutral-600">
        © 2026 MacroSaver. All rights reserved.
      </div>
    </footer>
  );
}