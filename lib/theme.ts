type Theme = {
  text: string;
  border: string;
  hoverBorder: string;
  bg: string;
  hoverBg: string;
  glow: string;
};

export const themeMap: Record<string, Theme> = {
  protein: {
    text: 'text-[#a3e635]', border: 'border-[#a3e635]', hoverBorder: 'hover:border-[#a3e635]',
    bg: 'bg-[#a3e635]', hoverBg: 'hover:bg-[#86c526]', glow: 'group-hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]'
  },
  creatine: {
    text: 'text-[#38bdf8]', border: 'border-[#38bdf8]', hoverBorder: 'hover:border-[#38bdf8]',
    bg: 'bg-[#38bdf8]', hoverBg: 'hover:bg-[#0284c7]', glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]'
  },
  "pre-workout": {
    text: 'text-[#c084fc]', border: 'border-[#c084fc]', hoverBorder: 'hover:border-[#c084fc]',
    bg: 'bg-[#c084fc]', hoverBg: 'hover:bg-[#9333ea]', glow: 'group-hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]'
  },
  "weight-management": {
    text: 'text-[#fb7185]', border: 'border-[#fb7185]', hoverBorder: 'hover:border-[#fb7185]',
    bg: 'bg-[#fb7185]', hoverBg: 'hover:bg-[#e11d48]', glow: 'group-hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]'
  },
  "food-drink": {
    text: 'text-[#2dd4bf]', border: 'border-[#2dd4bf]', hoverBorder: 'hover:border-[#2dd4bf]',
    bg: 'bg-[#2dd4bf]', hoverBg: 'hover:bg-[#0d9488]', glow: 'group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]'
  },
  electrolytes: {
    text: 'text-[#22d3ee]', border: 'border-[#22d3ee]', hoverBorder: 'hover:border-[#22d3ee]',
    bg: 'bg-[#22d3ee]', hoverBg: 'hover:bg-[#0891b2]', glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]'
  },
  "gut-health": {
    text: 'text-[#818cf8]', border: 'border-[#818cf8]', hoverBorder: 'hover:border-[#818cf8]',
    bg: 'bg-[#818cf8]', hoverBg: 'hover:bg-[#4f46e5]', glow: 'group-hover:shadow-[0_0_30px_rgba(129,140,248,0.15)]'
  },
  bariatric: {
    text: 'text-[#facc15]', border: 'border-[#facc15]', hoverBorder: 'hover:border-[#facc15]',
    bg: 'bg-[#facc15]', hoverBg: 'hover:bg-[#ca8a04]', glow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]'
  },
  other: {
    text: 'text-[#fb923c]', border: 'border-[#fb923c]', hoverBorder: 'hover:border-[#fb923c]',
    bg: 'bg-[#fb923c]', hoverBg: 'hover:bg-[#ea580c]', glow: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]'
  }
};

export const defaultTheme = {
  text: 'text-white', border: 'border-gray-500', hoverBorder: 'hover:border-gray-400',
  bg: 'bg-white', hoverBg: 'hover:bg-gray-200', glow: 'group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'
};

export function getTheme(category: string) {
  return themeMap[category.toLowerCase()] || defaultTheme;
}
