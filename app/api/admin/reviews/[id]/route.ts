import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { setReviewStatus } from "@/lib/reviews";

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^[a-zA-Z0-9-]{1,100}$/.test(id)) {
    return json({ error: "Invalid review ID" }, 400);
  }
  const body = await request.json().catch(() => null);

  if (!body || (body.action !== "approve" && body.action !== "reject")) {
    return json({ error: "action must be 'approve' or 'reject'" }, 400);
  }

  let result;
  try {
    result = await setReviewStatus(id, body.action === "approve" ? "approved" : "rejected");
  } catch {
    return json({ error: "Review moderation is temporarily unavailable" }, 503);
  }

  if (!result) {
    return json({ error: "Review not found" }, 404);
  }

  revalidatePath(`/product/${result.productId}`);

  return json({ success: true });
}
