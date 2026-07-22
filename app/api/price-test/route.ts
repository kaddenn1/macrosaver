import { NextResponse } from "next/server";

type RainforestProductResponse = {
  product?: {
    title?: string;
    buybox_winner?: { price?: { value?: number } };
    price?: { value?: number };
    main_image?: { link?: string };
  };
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const asin = searchParams.get("asin")?.trim().toUpperCase();

  if (!asin || !/^[A-Z0-9]{10}$/.test(asin)) {
    return json({ error: "Provide a valid 10-character ASIN" }, 400);
  }

  const apiKey = process.env.RAINFOREST_API_KEY;
  if (!apiKey) {
    return json({ error: "Price lookup is not configured" }, 503);
  }

  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      type: "product",
      amazon_domain: "amazon.com",
      asin,
    });
    const response = await fetch(`https://api.rainforestapi.com/request?${params}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      return json({ error: "Upstream price lookup failed" }, 502);
    }

    const data = (await response.json()) as RainforestProductResponse;

    const price = data.product?.buybox_winner?.price?.value || data.product?.price?.value || null;
    const title = data.product?.title || "Unknown Product";
    const image = data.product?.main_image?.link || "";

    return json({
      success: true,
      asin,
      title,
      price,
      image,
    });
  } catch {
    return json({ error: "Price lookup failed" }, 502);
  }
}
