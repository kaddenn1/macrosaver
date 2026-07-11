import type { ReviewSummary as ReviewSummaryType } from "@/lib/reviews";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({
  productId,
  summary,
}: {
  productId: string;
  summary: ReviewSummaryType;
}) {
  return (
    <div className="mt-12 border-t border-gray-800 pt-8">
      <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">
        Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <ReviewSummary summary={summary} />
          <ReviewList reviews={summary.reviews} />
        </div>
        <ReviewForm productId={productId} />
      </div>
    </div>
  );
}
