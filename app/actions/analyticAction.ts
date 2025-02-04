import { NextResponse } from "next/server";
import { getUserFromToken } from "../utils/authHelper";
import prisma from "@/utils/db";

export async function analyticsByLinkId(
  request: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const { linkId } = params;
    console.log("LinkId from the params analyticsByLinkId", linkId);
    // Check if linkId is provided
    if (!linkId) {
      return NextResponse.json(
        { error: "linkID is required" },
        { status: 400 }
      );
    }

    // Get the authenticated user's ID from the token
    const { userId, error: authError } = getUserFromToken(request);

    // Handle authentication error
    if (authError || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the link and ensure it belongs to the authenticated user
    const link = await prisma.link.findFirst({
      where: {
        id: linkId,
        userId: userId, // Ensure the link belongs to the authenticated user
      },
    });

    // If the link doesn't exist or doesn't belong to the user
    if (!link) {
      return NextResponse.json(
        { error: "Link not found or you do not have permission to access it" },
        { status: 404 }
      );
    }

    console.log("LinkId from the params analyticsByLinkId", link);
    // Fetch analytics for the link
    const analytics = await prisma.analytics.findMany({
      where: {
        linkId: linkId,
      },
      select: {
        linkId: true,
        city: true,
        country: true,
        device: true,
        os: true,
        browser: true,
        Link: true,
      },
    });

    console.log("Analytics", analytics);
    // Return the analytics data
    return NextResponse.json({ analytics }, { status: 200 });
  } catch (error) {
    console.error("Error in analyticsByLinkId:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
