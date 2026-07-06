import CategoryRow from "@/components/CategoryRow";
import FilterDrawer from "@/components/FilterDrawer"; 
import Champions from "@/components/Champions";
import SortDropdown from "@/components/SortDropdown";
import SearchBar from "@/components/SearchBar"; // <-- New Search Import!

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug: currentSlug } = await params;
  const resolvedSearchParams = await searchParams;

  const categoryTitles: Record<string, string> = {
    "protein": "Protein Powder",
    "pre-workout": "Pre-Workout",
    "creatine": "Creatine",
    "weight-management": "Weight Management",
    "food-drink": "Food & Drink",
    "gut-health": "Gut Health",
  };

  const displayTitle = categoryTitles[currentSlug] || currentSlug;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      
      <div className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8 pb-2">
         <CategoryRow />
      </div>

      <div className="w-full max-w-[1600px] mx-auto pt-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-black text-[#a3e635] tracking-tight uppercase">
              {displayTitle}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Compare top-rated {displayTitle.toLowerCase()} from trusted retailers.
            </p>
          </div>
          
          {/* Controls Cluster: Search & Sort! */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar />
            <SortDropdown />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start gap-8 px-4 sm:px-6 lg:px-8 pb-24">
        
        <div className="w-full lg:w-[280px] shrink-0">
           <FilterDrawer />
        </div>
        
        <div className="flex-1 w-full min-w-0">
          <Champions filterCategory={currentSlug} searchParams={resolvedSearchParams} />
        </div>
        
      </div>
      
    </main>
  );
}