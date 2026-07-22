import Navbar from "./Navbar";
import Footer from "./Footer";
import AmbientBackground from "./AmbientBackground";
import CompareTray from "./CompareTray";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <Navbar />
      <div id="main-content" className="flex-1 flex flex-col" tabIndex={-1}>
        {children}
      </div>
      <CompareTray />
      <Footer />
    </>
  );
}
