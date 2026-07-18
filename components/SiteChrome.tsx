"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import AmbientBackground from "./AmbientBackground";
import CompareTray from "./CompareTray";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <div className="flex-1 flex flex-col">{children}</div>
      <CompareTray />
      <Footer />
    </>
  );
}
