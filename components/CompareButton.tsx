"use client";

import { COMPARE_LIMIT, useCompare } from "./CompareContext";

export default function CompareButton({
  productId,
  variant = "icon",
}: {
  productId: string;
  variant?: "icon" | "pill";
}) {
  const { isSelected, toggle, isFull } = useCompare();
  const selected = isSelected(productId);
  const disabled = !selected && isFull;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    toggle(productId);
  };

  const title = disabled
    ? `Compare list full (max ${COMPARE_LIMIT})`
    : selected
    ? "Remove from compare"
    : "Add to compare";

  if (variant === "pill") {
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        title={title}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-colors ${
          selected
            ? "bg-lime-500 text-black hover:bg-lime-400"
            : disabled
            ? "border border-gray-800 text-gray-600 cursor-not-allowed"
            : "border border-gray-700 text-gray-300 hover:border-lime-500 hover:text-lime-400"
        }`}
      >
        {selected ? "✓ Added to Compare" : "+ Add to Compare"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={selected}
      title={title}
      className={`absolute top-2 left-2 z-20 flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border backdrop-blur-sm transition-colors ${
        selected
          ? "bg-lime-500 border-lime-500 text-black"
          : disabled
          ? "bg-black/60 border-gray-700 text-gray-600 cursor-not-allowed"
          : "bg-black/60 border-gray-700 text-gray-300 hover:border-lime-500 hover:text-lime-400"
      }`}
    >
      <span
        className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${
          selected ? "border-black" : "border-current"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-black">
            <path d="M4.5 8.5L2 6l-1 1 3.5 3.5L11 3l-1-1z" />
          </svg>
        )}
      </span>
      Compare
    </button>
  );
}
