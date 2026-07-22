"use client";

import { COMPARE_LIMIT, useCompare } from "./CompareContext";

export default function CompareButton({
  productId,
  productName,
  variant = "icon",
}: {
  productId: string;
  productName: string;
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
        aria-pressed={selected}
        aria-label={`${selected ? "Remove" : "Add"} ${productName} ${selected ? "from" : "to"} compare`}
        className={`inline-flex min-h-11 items-center gap-2 px-4 py-2 rounded text-xs font-black uppercase tracking-widest transition-colors ${
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
      aria-label={`${selected ? "Remove" : "Add"} ${productName} ${selected ? "from" : "to"} compare`}
      title={title}
      className={`absolute left-2 top-2 z-20 flex min-h-11 items-center gap-1 rounded border px-3 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm transition-colors ${
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
          <svg aria-hidden="true" viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-black">
            <path d="M4.5 8.5L2 6l-1 1 3.5 3.5L11 3l-1-1z" />
          </svg>
        )}
      </span>
      Compare
    </button>
  );
}
