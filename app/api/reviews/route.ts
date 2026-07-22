import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { getReviewSummary, submitReview } from "@/lib/reviews";

function getIpHash(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const secret =
    process.env.REVIEW_IP_HASH_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) {
    throw new Error("A review IP hashing secret must be configured");
  }

  return createHmac("sha256", secret).update(ip).digest("hex");
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");

  if (!productId) {
    return json({ error: "productId is required" }, 400);
  }

  if (!products.some((product) => product.id === productId)) {
    return json({ error: "Unknown product" }, 404);
  }

  try {
    const summary = await getReviewSummary(productId);
    return json(summary);
  } catch {
    return json({ error: "Reviews are temporarily unavailable" }, 503);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return json({ error: "Invalid request body" }, 400);
  }

  const { productId, rating, reviewerName, comment, companyUrl } = body;

  // Honeypot: real users never fill this hidden field. Pretend success so a
  // bot doesn't learn its submission was rejected.
  if (typeof companyUrl === "string" && companyUrl.trim() !== "") {
    return json({ success: true, status: "pending" }, 201);
  }

  if (typeof productId !== "string" || typeof rating !== "number") {
    return json({ error: "Invalid request body" }, 400);
  }

  let result;
  try {
    result = await submitReview({
      productId,
      rating,
      reviewerName: typeof reviewerName === "string" ? reviewerName : undefined,
      comment: typeof comment === "string" ? comment : undefined,
      ipHash: getIpHash(request),
    });
  } catch {
    return json({ error: "Reviews are temporarily unavailable" }, 503);
  }

  if (!result.ok) {
    if (result.reason === "unknown_product") {
      return json({ error: "Unknown product" }, 404);
    }
    if (result.reason === "rate_limited") {
      return json({ error: "Too many submissions" }, 429);
    }
    return json({ error: "Invalid submission" }, 400);
  }

  return json({ success: true, status: "pending" }, 201);
}
