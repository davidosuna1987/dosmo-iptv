// src/app/api/proxy-image/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Missing 'url' query parameter" },
        { status: 400 }
      );
    }

    // Fetch the image from the external server
    const response = await fetch(imageUrl, {
      headers: {
        // algunos servidores bloquean sin user-agent
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Proxy)"
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.statusText}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400", // 24h caching
      },
    });
  } catch (error) {
    console.error("Proxy image fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
