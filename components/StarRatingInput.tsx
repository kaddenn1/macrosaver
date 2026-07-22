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

  const handleKeyDown = (event: React.KeyboardEvent, star: number) => {
    let next = star;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = Math.max(1, star - 1);
    else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = Math.min(5, star + 1);
    else if (event.key === "Home") next = 1;
    else if (event.key === "End") next = 5;
    else return;

    event.preventDefault();
    onChange(next);
    document.getElementById(`review-rating-${next}`)?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Your rating"
      className="flex gap-1"
      onMouseLeave={() => setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value);
        return (
          <button
            key={star}
            id={`review-rating-${star}`}
            type="button"
            role="radio"
            aria-checked={value === star}
            tabIndex={value === star || (value === 0 && star === 1) ? 0 : -1}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onKeyDown={(event) => handleKeyDown(event, star)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            className={`flex h-11 w-11 items-center justify-center rounded text-2xl leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 ${
              filled ? "text-[#a3e635]" : "text-gray-400"
            }`}
          >
            <span aria-hidden="true">★</span>
          </button>
        );
      })}
    </div>
  );
}
