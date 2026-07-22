"use client";

import { useState } from "react";
import Link from "next/link";
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
      <div
        role="status"
        aria-live="polite"
        className="border border-gray-800 rounded-lg p-4 bg-[#111] text-sm text-gray-300"
      >
        Thanks! Your review is in for moderation and will appear once approved.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={state === "submitting"}
      className="border border-gray-800 rounded-lg p-4 bg-[#111] flex flex-col gap-3"
    >
      <div className="text-[10px] uppercase tracking-wider text-gray-400">Your rating</div>
      <StarRatingInput value={rating} onChange={setRating} />

      <input
        type="text"
        aria-label="Your name (optional)"
        value={reviewerName}
        onChange={(e) => setReviewerName(e.target.value)}
        placeholder="Name (optional)"
        maxLength={80}
        className="min-h-11 bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#a3e635]"
      />

      <textarea
        aria-label="Your review (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience (optional)"
        maxLength={2000}
        rows={3}
        className="bg-[#0a0a0a] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#a3e635] resize-none"
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
        <div role="alert" className="text-xs text-red-400">Something went wrong. Please try again.</div>
      )}
      {state === "rate_limited" && (
        <div role="alert" className="text-xs text-red-400">You&apos;ve submitted a few reviews recently — try again later.</div>
      )}

      <p className="text-[11px] leading-relaxed text-gray-400">
        Approved ratings, names, and comments may be published. We use a one-way keyed IP hash to
        limit abuse. See the{" "}
        <Link href="/privacy" className="text-gray-200 underline hover:text-white">
          Privacy Policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={rating < 1 || state === "submitting"}
        className="min-h-11 py-2 text-[11px] font-black uppercase tracking-widest text-black bg-[#a3e635] rounded hover:scale-[1.02] transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 disabled:hover:scale-100"
      >
        {state === "submitting" ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
