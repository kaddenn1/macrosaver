"use client";

import { useState } from "react";
import StarRatingInput from "./StarRatingInput";

type FormState = "idle" | "submitting" | "success" | "error" | "rate_limited";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [companyUrl, setCompanyUrl] = useState(""); // honeypot
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) return;

    setState("submitting");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, rating, reviewerName, comment, companyUrl }),
      });

      if (res.status === 429) {
        setState("rate_limited");
        return;
      }
      if (!res.ok) {
        setState("error");
        return;
      }

      setState("success");
      setRating(0);
      setReviewerName("");
      setComment("");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="border border-gray-800 rounded-lg p-4 bg-[#111] text-sm text-gray-300">
        Thanks! Your review is in for moderation and will appear once approved.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-800 rounded-lg p-4 bg-[#111] flex flex-col gap-3">
      <div className="text-[10px] uppercase tracking-wider text-gray-400">Your rating</div>
      <StarRatingInput value={rating} onChange={setRating} />

      <input
        type="text"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        placeholder="Name (optional)"
        maxLength={80}
        className="bg-[#0a0a0a] border border-gray-800 rounded px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#a3e635]"
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)"
        maxLength={2000}
        rows={3}
        className="bg-[#0a0a0a] border border-gray-800 rounded px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#a3e635] resize-none"
      />

      {/* Honeypot: hidden from real users, left off-screen rather than display:none */}
      <input
        type="text"
        value={companyUrl}
        onChange={(e) => setCompanyUrl(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
        aria-hidden="true"
      />

      {state === "error" && (
        <div className="text-xs text-red-400">Something went wrong. Please try again.</div>
      )}
      {state === "rate_limited" && (
        <div className="text-xs text-red-400">You&apos;ve submitted a few reviews recently — try again later.</div>
      )}

      <button
        type="submit"
        disabled={rating < 1 || state === "submitting"}
        className="py-2 text-[11px] font-black uppercase tracking-widest text-black bg-[#a3e635] rounded hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100"
      >
        {state === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
