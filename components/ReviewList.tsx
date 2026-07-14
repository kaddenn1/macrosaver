import type { ReviewSummary } from "@/lib/reviews";

export default function ReviewList({ reviews }: { reviews: ReviewSummary["reviews"] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-800 pb-4 last:border-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#a3e635] text-sm leading-none">
              {"★".repeat(review.rating)}
              <span className="text-gray-500">{"★".repeat(5 - review.rating)}</span>
            </span>
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {review.reviewerName || "Anonymous"}
            </span>
            <span className="text-[10px] text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          {review.comment && <p className="text-sm text-gray-300">{review.comment}</p>}
        </div>
      ))}
    </div>
  );
}
