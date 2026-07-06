"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // This function handles the checkbox clicks and updates the URL!
  const handleCheck = (key: string, value: string) => {
    // 1. Grab the current URL parameters
    const params = new URLSearchParams(searchParams.toString());
    
    // 2. If it's already checked, uncheck it (remove from URL)
    if (params.get(key) === value) {
      params.delete(key);
    } 
    // 3. Otherwise, check it (add to URL)
    else {
      params.set(key, value);
    }
    
    // 4. Push the new URL to the browser without reloading the page
    router.push(`${pathname}?${params.toString()}`);
  };

  // Helper to check if a box should be ticked based on the URL
  const isChecked = (key: string, value: string) => searchParams.get(key) === value;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Sidebar Header */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-white mb-4">
          Refine Results
        </h3>
        
        {/* Fake Price Slider (Visual Only for now) */}
        <div className="mb-6">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Price Per Serving</div>
          <div className="w-full h-1 bg-gray-800 rounded-full relative mb-2">
             <div className="absolute left-0 w-full h-full bg-[#a3e635] rounded-full opacity-30"></div>
             <div className="absolute left-0 w-4 h-4 bg-[#a3e635] rounded-full -mt-1.5 shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
             <div className="absolute right-0 w-4 h-4 bg-[#a3e635] rounded-full -mt-1.5 shadow-[0_0_10px_rgba(163,230,53,0.5)]"></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#a3e635] font-bold">
            <span>$0.10</span>
            <span>$2.00+</span>
          </div>
        </div>{/* Protein Per Serving Filter */}
        <div className="mb-6">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Protein Per Serving</div>
          <div className="flex flex-col gap-2">
            {[
              { label: '20g+', value: '20', count: '412' },
              { label: '25g+', value: '25', count: '287' },
              { label: '30g+', value: '30', count: '156' },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-2 group cursor-pointer" onClick={() => handleCheck('protein', item.value)}>
                <div className={`w-3 h-3 rounded-[2px] border flex items-center justify-center transition-colors ${isChecked('protein', item.value) ? 'bg-[#a3e635] border-[#a3e635]' : 'bg-[#111] border-gray-700 group-hover:border-gray-500'}`}>
                  {isChecked('protein', item.value) && <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs ${isChecked('protein', item.value) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{item.label}</span>
                <span className="text-[9px] text-gray-600 ml-auto">({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Preference Filter */}
        <div className="mb-4">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Dietary Preference</div>
          <div className="flex flex-col gap-2">
            {[
              { label: 'Grass-Fed', value: 'grass-fed', count: '198' },
              { label: 'Low Lactose', value: 'low-lactose', count: '241' },
              { label: 'Gluten Free', value: 'gluten-free', count: '412' },
            ].map((item) => (
              <div key={item.value} className="flex items-center gap-2 group cursor-pointer" onClick={() => handleCheck('diet', item.value)}>
                <div className={`w-3 h-3 rounded-[2px] border flex items-center justify-center transition-colors ${isChecked('diet', item.value) ? 'bg-[#a3e635] border-[#a3e635]' : 'bg-[#111] border-gray-700 group-hover:border-gray-500'}`}>
                  {isChecked('diet', item.value) && <svg className="w-2 h-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-xs ${isChecked('diet', item.value) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{item.label}</span>
                <span className="text-[9px] text-gray-600 ml-auto">({item.count})</span>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-1.5 border border-gray-800 rounded text-[10px] text-gray-400 uppercase tracking-widest hover:bg-gray-900 transition-colors">
          Show More Filters ∨
        </button>

      </div>
    </div>
  );
}