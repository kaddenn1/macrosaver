import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getReviewSummary, submitReview } from "@/lib/reviews";

function getIpHash(request: NextRequest): string {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const summary = await getReviewSummary(productId);
  return NextResponse.json(summary);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { productId, rating, reviewerName, comment, companyUrl } = body;

  // Honeypot: real users never fill this hidden field. Pretend success so a
  // bot doesn't learn its submission was rejected.
  if (typeof companyUrl === "string" && companyUrl.trim() !== "") {
    return NextResponse.json({ success: true, status: "pending" }, { status: 201 });
  }

  if (typeof productId !== "string" || typeof rating !== "number") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const result = await submitReview({
    productId,
    rating,
    reviewerName: typeof reviewerName === "string" ? reviewerName : undefined,
    comment: typeof comment === "string" ? comment : undefined,
    ipHash: getIpHash(request),
  });

  if (!result.ok) {
    if (result.reason === "unknown_product") {
      return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    }
    if (result.reason === "rate_limited") {
      return NextResponse.json({ error: "Too many submissions" }, { status: 429 });
    }
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  return NextResponse.json({ success: true, status: "pending" }, { status: 201 });
}
