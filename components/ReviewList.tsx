import type { ReviewSummary } from "@/lib/reviews";

export default function ReviewList({ reviews }: { reviews: ReviewSummary["reviews"] }) {
  if (reviews.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <article key={review.id} className="border-b border-gray-800 pb-4 last:border-0">
          <div className="flex items-center gap-2 mb-1">
            <span aria-hidden="true" className="text-[#a3e635] text-sm leading-none">
              {"★".repeat(review.rating)}
              <span className="text-gray-400">{"★".repeat(5 - review.rating)}</span>
            </span>
            <span className="sr-only">{review.rating} out of 5 stars</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              {review.reviewerName || "Anonymous"}
            </span>
            <time dateTime={review.createdAt} className="text-[10px] text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </time>
          </div>
          {review.comment && <p className="text-sm text-gray-300">{review.comment}</p>}
        </article>
      ))}
    </div>
  );
}
