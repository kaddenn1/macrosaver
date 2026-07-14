import { getPendingReviews } from "@/lib/reviews";
import ReviewModerationRow from "@/components/admin/ReviewModerationRow";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const pending = await getPendingReviews();

  return (
    <main className="min-h-screen text-gray-100 font-sans">
      <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-black text-white uppercase tracking-wide mb-1">
          Pending Reviews
        </h1>
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-8">
          {pending.length} awaiting moderation
        </p>

        {pending.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm border-2 border-dashed border-gray-800 rounded-xl">
            Nothing pending. Nice and clean.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map((review) => (
              <ReviewModerationRow key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
