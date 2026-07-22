import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

const MAX_PRODUCTS = 4;

export function GET(request: NextRequest) {
  const ids = (request.nextUrl.searchParams.get("ids") ?? "")
    .split(",")
    .filter((id) => /^[a-zA-Z0-9_-]{1,100}$/.test(id))
    .slice(0, MAX_PRODUCTS);

  const summaries = ids.flatMap((id) => {
    const product = products.find((candidate) => candidate.id === id);
    return product
      ? [
          {
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image,
          },
        ]
      : [];
  });

  return NextResponse.json(summaries, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" },
  });
}
