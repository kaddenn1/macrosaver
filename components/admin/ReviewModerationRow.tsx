"use client";

import { useState } from "react";
import type { PendingReview } from "@/lib/reviews";

export default function ReviewModerationRow({ review }: { review: PendingReview }) {
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "saving">("pending");

  const act = async (action: "approve" | "reject") => {
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/reviews/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      setStatus(res.ok ? (action === "approve" ? "approved" : "rejected") : "pending");
    } catch {
      setStatus("pending");
    }
  };

  if (status === "approved" || status === "rejected") {
    return (
      <div className="border border-gray-800 rounded-lg p-4 bg-[#111] opacity-50">
        <span className="text-xs uppercase tracking-wider text-gray-400">
          {status === "approved" ? "Approved" : "Rejected"}
        </span>
      </div>
    );
  }

  return (
    <div className="border border-gray-800 rounded-lg p-4 bg-[#111] flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-white">{review.productName}</span>
        <span className="text-[#a3e635] font-black">{review.rating} / 5</span>
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">
        {review.reviewerName || "Anonymous"} &middot;{" "}
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
      {review.comment && <p className="text-sm text-gray-300">{review.comment}</p>}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => act("approve")}
          disabled={status === "saving"}
          className="flex-1 py-2 text-[11px] font-black uppercase tracking-widest text-black bg-[#a3e635] rounded hover:scale-[1.02] transition-transform disabled:opacity-50"
        >
          Approve
        </button>
        <button
          onClick={() => act("reject")}
          disabled={status === "saving"}
          className="flex-1 py-2 text-[11px] font-black uppercase tracking-widest text-gray-300 border border-gray-800 rounded hover:border-gray-600 transition-colors disabled:opacity-50"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
