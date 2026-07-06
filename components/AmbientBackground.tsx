"use client";

import { useEffect, useRef } from "react";

const BLOBS = [
  { color: "#a3e635", top: "0%", left: "15%", size: 650, parallax: 0.08, duration: 22 },
  { color: "#a3e635", top: "18%", left: "85%", size: 580, parallax: 0.14, duration: 26 },
  { color: "#a3e635", top: "40%", left: "5%", size: 600, parallax: 0.05, duration: 24 },
  { color: "#a3e635", top: "58%", left: "75%", size: 560, parallax: 0.12, duration: 20 },
  { color: "#a3e635", top: "76%", left: "20%", size: 620, parallax: 0.07, duration: 28 },
  { color: "#a3e635", top: "92%", left: "80%", size: 580, parallax: 0.1, duration: 23 },
];

export default function AmbientBackground() {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        wrapperRefs.current.forEach((el, idx) => {
          if (!el) return;
          const offset = scrollY * BLOBS[idx].parallax;
          el.style.transform = `translateY(${offset}px)`;
        });
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {BLOBS.map((blob, idx) => (
        <div
          key={idx}
          ref={(el) => { wrapperRefs.current[idx] = el; }}
          className="absolute"
          style={{ top: blob.top, left: blob.left }}
        >
          <div
            className="rounded-full blur-[110px] animate-blob-drift"
            style={{
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
              opacity: 0.22,
              animationDuration: `${blob.duration}s`,
              animationDelay: `${idx * -4}s`,
              marginLeft: -blob.size / 2,
              marginTop: -blob.size / 2,
            }}
          />
        </div>
      ))}
    </div>
  );
}
