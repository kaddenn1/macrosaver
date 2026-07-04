import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract the Amazon ASIN from the URL
  const { searchParams } = new URL(request.url);
  const asin = searchParams.get("asin");

  if (!asin) {
    return NextResponse.json({ error: "Please provide an ASIN" }, { status: 400 });
  }

  try {
    // Using the demo key for testing. In production, this becomes process.env.RAINFOREST_API_KEY
    const apiKey = "demo";
    
    const response = await fetch(
      `https://api.rainforestapi.com/request?api_key=${apiKey}&type=product&amazon_domain=amazon.com&asin=${asin}`
    );
    
    const data = await response.json();

    // Digging through the structured JSON to grab the exact data points we need
    const price = data.product?.buybox_winner?.price?.value || data.product?.price?.value || null;
    const title = data.product?.title || "Unknown Product";
    const image = data.product?.main_image?.link || "";

    return NextResponse.json({
      success: true,
      asin,
      title,
      price,
      image,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scrape Amazon data" }, { status: 500 });
  }
}