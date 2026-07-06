export const themeMap: Record<string, any> = {
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
  electrolytes: {
    text: 'text-[#2dd4bf]', border: 'border-[#2dd4bf]', hoverBorder: 'hover:border-[#2dd4bf]',
    bg: 'bg-[#2dd4bf]', hoverBg: 'hover:bg-[#0d9488]', glow: 'group-hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]'
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
