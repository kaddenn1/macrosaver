"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AmbientBackground from "./AmbientBackground";
import CompareTray from "./CompareTray";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/cassie")) {
    return <>{children}</>;
  }

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
