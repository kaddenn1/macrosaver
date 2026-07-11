import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { setReviewStatus } from "@/lib/reviews";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);

  if (!body || (body.action !== "approve" && body.action !== "reject")) {
    return NextResponse.json({ error: "action must be 'approve' or 'reject'" }, { status: 400 });
  }

  const result = await setReviewStatus(id, body.action === "approve" ? "approved" : "rejected");

  if (!result) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  revalidatePath(`/product/${result.productId}`);

  return NextResponse.json({ success: true });
}
