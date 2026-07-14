"use client";

import { useState } from "react";

export default function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            className={`text-2xl leading-none transition-colors ${
              filled ? "text-[#a3e635]" : "text-gray-500"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
