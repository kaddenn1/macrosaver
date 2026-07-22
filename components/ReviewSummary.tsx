import type { ReviewSummary as ReviewSummaryType } from "@/lib/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <span>
      <span aria-hidden="true" className="text-[#a3e635] text-lg leading-none">
        {"★".repeat(Math.round(rating))}
        <span className="text-gray-400">{"★".repeat(5 - Math.round(rating))}</span>
      </span>
      <span className="sr-only">{rating.toFixed(1)} out of 5 stars</span>
    </span>
  );
}

export default function ReviewSummary({ summary }: { summary: ReviewSummaryType }) {
  if (summary.reviewCount === 0) {
    return (
      <div className="text-sm text-gray-400">No reviews yet — be the first!</div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Stars rating={summary.averageRating} />
      <span className="text-white font-bold">{summary.averageRating.toFixed(1)}</span>
      <span className="text-xs text-gray-400 uppercase tracking-wider">
        {summary.reviewCount} review{summary.reviewCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}
