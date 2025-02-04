import { getUserFromToken } from "@/app/utils/authHelper";
import prisma from "@/utils/db";

import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json(
        { error: "LinkId is Required" },
        { status: 400 }
      );
    }
    const { userId, error } = getUserFromToken(request);
    if (error) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // find the link by ID and ensure it belongs to the authenticated user
    const link = await prisma.link.findFirst({
      where: { id, userId },
    });

    if (!link) {
      return NextResponse.json(
        { error: "Short url not found or does not belongs to you" },
        { status: 404 }
      );
    }

    // delete the link
    await prisma.link.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Short Url deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting short Url", error);
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
