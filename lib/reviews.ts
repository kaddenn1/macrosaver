import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { products } from "@/data/products";

const RATE_LIMIT_PER_PRODUCT_PER_DAY = 3;
const RATE_LIMIT_GLOBAL_PER_HOUR = 10;
const MAX_NAME_LENGTH = 80;
const MAX_COMMENT_LENGTH = 2000;

export type ReviewSummary = {
  averageRating: number;
  reviewCount: number;
  reviews: Array<{
    id: string;
    rating: number;
    reviewerName: string | null;
    comment: string | null;
    createdAt: string;
  }>;
};

export type PendingReview = {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  reviewerName: string | null;
  comment: string | null;
  createdAt: string;
};

export type SubmitReviewInput = {
  productId: string;
  rating: number;
  reviewerName?: string;
  comment?: string;
  ipHash: string;
};

export type SubmitReviewResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unknown_product" | "rate_limited" };

let client: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
  return client;
}

export async function getReviewSummary(productId: string): Promise<ReviewSummary> {
  // Supabase may not be configured yet (e.g. before initial setup, or during a
  // build without env vars) — degrade to "no reviews" instead of failing the page.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { averageRating: 0, reviewCount: 0, reviews: [] };
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, rating, reviewer_name, comment, created_at")
    .eq("product_id", productId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return { averageRating: 0, reviewCount: 0, reviews: [] };
  }

  const reviewCount = data.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : Math.round(
          (data.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10
        ) / 10;

  return {
    averageRating,
    reviewCount,
    reviews: data.map((r) => ({
      id: r.id,
      rating: r.rating,
      reviewerName: r.reviewer_name,
      comment: r.comment,
      createdAt: r.created_at,
    })),
  };
}

export async function submitReview(input: SubmitReviewInput): Promise<SubmitReviewResult> {
  const { productId, rating, ipHash } = input;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, reason: "invalid" };
  }

  if (!products.some((p) => p.id === productId)) {
    return { ok: false, reason: "unknown_product" };
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { ok: false, reason: "invalid" };
  }

  const reviewerName = input.reviewerName?.trim().slice(0, MAX_NAME_LENGTH) || null;
  const comment = input.comment?.trim().slice(0, MAX_COMMENT_LENGTH) || null;

  const supabase = getSupabaseAdmin();

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  const [perProductCount, globalCount] = await Promise.all([
    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("product_id", productId)
      .gte("created_at", oneDayAgo),
    supabase
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", oneHourAgo),
  ]);

  if (
    (perProductCount.count ?? 0) >= RATE_LIMIT_PER_PRODUCT_PER_DAY ||
    (globalCount.count ?? 0) >= RATE_LIMIT_GLOBAL_PER_HOUR
  ) {
    return { ok: false, reason: "rate_limited" };
  }

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    rating,
    reviewer_name: reviewerName,
    comment,
    ip_hash: ipHash,
    status: "pending",
  });

  if (error) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true };
}

export async function getPendingReviews(): Promise<PendingReview[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("reviews")
    .select("id, product_id, rating, reviewer_name, comment, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error || !data) return [];

  return data.map((r) => ({
    id: r.id,
    productId: r.product_id,
    productName: products.find((p) => p.id === r.product_id)?.name ?? r.product_id,
    rating: r.rating,
    reviewerName: r.reviewer_name,
    comment: r.comment,
    createdAt: r.created_at,
  }));
}

export async function setReviewStatus(
  id: string,
  status: "approved" | "rejected"
): Promise<{ productId: string } | null> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null;
  }

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("reviews")
    .update({
      status,
      approved_at: status === "approved" ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select("product_id")
    .single();

  if (error || !data) return null;

  return { productId: data.product_id };
}
