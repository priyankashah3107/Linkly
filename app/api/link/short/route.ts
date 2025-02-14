// import prisma from "@/utils/db";
// import { customAlphabet } from "nanoid";
// import { NextRequest, NextResponse } from "next/server";
// import QrCode from "qrcode";
// import { getUserFromToken } from "@/app/utils/authHelper";

// export async function POST(request: NextRequest) {
//   try {
//     // Generate the short URL ID
//     const nanoid = customAlphabet(
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       8
//     );

//     const { userId, error } = getUserFromToken(request);

//     if (error) {
//       // If the user is not authenticated, allow only up to 5 URLs without user ID
//       const linkCount = await prisma.link.count({
//         where: { userId: null },
//       });
//       if (linkCount >= 5) {
//         return NextResponse.json(
//           { error: "Unauthenticated users can only create 5 links" },
//           { status: 401 }
//         );
//       }
//     }

//     const { longUrl } = await request.json();
//     const shortId = nanoid();
//     const shortUrl = `${process.env.BASE_URL}/${shortId}`;
//     const qrCode = await QrCode.toDataURL(shortUrl);

//     // If user is authenticated, link the URL to the user
//     const newLink = await prisma.link.create({
//       data: {
//         longUrl,
//         shortUrl,
//         qrCode,
//         userId: userId || null, // If user is not authenticated, store as null
//         // clicks,
//       },
//     });

//     return NextResponse.json({
//       message: "Short URL created successfully",
//       newLink,
//     });
//   } catch (error) {
//     console.error("Error creating short URL:", error);
//     return NextResponse.json(
//       { error: "Failed to create short URL" },
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/utils/db";
import { customAlphabet } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import QrCode from "qrcode";
import { getUserFromToken } from "@/app/utils/authHelper";

export async function POST(request: NextRequest) {
  try {
    // Generate the short URL ID
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      8
    );

    // Check authentication
    const { userId, error } = getUserFromToken(request);
    if (error) {
      // If the user is not authenticated, limit to 5 URLs
      const linkCount = await prisma.link.count({
        where: { userId: null },
      });
      if (linkCount >= 5) {
        return NextResponse.json(
          { error: "Unauthenticated users can only create 5 links" },
          { status: 401 }
        );
      }
    }

    const { longUrl } = await request.json();
    const shortId = nanoid();

    // Get BASE_URL from environment or fallback to request origin
    const baseUrl = process.env.BASE_URL || request.nextUrl.origin;

    // Ensure no trailing slash in BASE_URL
    const cleanedBaseUrl = baseUrl.replace(/\/$/, "");

    // Generate the correct short URL
    const shortUrl = `${cleanedBaseUrl}/${shortId}`;

    // Generate QR code
    const qrCode = await QrCode.toDataURL(shortUrl);

    // Save in database
    const newLink = await prisma.link.create({
      data: {
        longUrl,
        shortUrl,
        qrCode,
        userId: userId || null, // Null for unauthenticated users
      },
    });

    return NextResponse.json({
      message: "Short URL created successfully",
      newLink,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}
