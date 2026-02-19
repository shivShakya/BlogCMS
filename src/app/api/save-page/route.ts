import { NextRequest, NextResponse } from "next/server";
import { createClient } from "contentful-management";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const client = createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
    });

    const space = await client.getSpace(
      process.env.CONTENTFUL_SPACE_ID!
    );

    const environment = await space.getEnvironment(
      process.env.CONTENTFUL_ENVIRONMENT!
    );

    const entry = await environment.getEntry(body.pageId);

    // Update field
    entry.fields.sections["en-US"] = body.sections;

    const updated = await entry.update();

    // Optional but usually required
    await updated.publish();

    return NextResponse.json({
      success: true,
      id: updated.sys.id,
    });
  } catch (error) {
    console.error("Contentful update error:", error);

    return NextResponse.json(
      { success: false, error: "Failed to update entry" },
      { status: 500 }
    );
  }
}