import { NextResponse } from "next/server";
import { saveRelease } from "../../../lib/releases/saveRelease";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { slug, page } = body;

    if (!slug || !page) {
      return NextResponse.json(
        { error: "Missing slug or page" },
        { status: 400 }
      );
    }

    const release = saveRelease(slug, page);

    return NextResponse.json({
      success: true,
      release,
    });
  } catch (e) {
    console.error("Publish error:", e);
    return NextResponse.json(
      { error: "Failed to publish" },
      { status: 500 }
    );
  }
}
