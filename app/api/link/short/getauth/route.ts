// import { getShortUrlByUserId } from "@/app/actions/linkAction";
// export { getShortUrlByUserId as GET };

import { getUserFromToken } from "@/app/utils/authHelper";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId, error } = getUserFromToken(request);
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // Fetch all URLs for the authenticated user
    const shorturls = await prisma.link.findMany({
      where: { userId },
      select: {
        id: true,
        shortUrl: true,
        longUrl: true,
        qrCode: true,
        userId: true,
        createdAt: true,
      },
    });

    // console.log("All URLs information of authenticated user", shorturls);
    // console.table(shorturls);
    const link = shorturls.forEach((url) => {
      console.log(`ID: ${url.id}`);
      console.log(`Short URL: ${url.shortUrl}`);
      console.log(`Long URL: ${url.longUrl}`);
      console.log(`QR Code: ${url.qrCode}`);
      console.log(`User ID: ${url.userId}`);
      console.log(`Created At: ${url.createdAt}`);
      console.log("----------------------"); // Separator for readability
    });

    return NextResponse.json(
      { message: "All URLs info", shorturls, userId },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
