import Sidebar from "@/components/Sidebar";
import Champions from "@/components/Champions";

export default function ProteinCategoryPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      
      {/* 1. Page Header Area */}
      <div className="w-full max-w-[1600px] mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
              Protein Powder
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Compare 500+ products from top retailers
            </p>
          </div>
          
          {/* Top Sort / Filter Dropdowns */}
          <div className="flex gap-3 hidden lg:flex">
             {/* ... your select dropdowns stay exactly the same here ... */}
          </div>
        </div>
      </div>

      {/* 2. Main Sidebar & Grid Layout */}
      {/* UPDATE THIS WRAPPER TO FIX THE SQUISH */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Left Sidebar (Now with a strict width boundary) */}
        <div className="w-full lg:w-[280px] shrink-0">
           <Sidebar />
        </div>
        
        {/* Right Product Grid (Told to expand infinitely to the right) */}
        <div className="flex-1 w-full min-w-0">
          <Champions />
        </div>
        
      </div>
      
    </main>
  );
}