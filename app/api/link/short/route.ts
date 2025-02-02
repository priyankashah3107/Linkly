// // import { createShortLink } from "@/app/actions/linkAction";
// // export { createShortLink as POST };

// import prisma from "@/utils/db";
// import { customAlphabet, nanoid } from "nanoid";
// import { NextRequest, NextResponse } from "next/server";
// import QrCode from "qrcode";
// import { getUserFromToken } from "@/app/utils/authHelper";
// export async function POST(request: NextRequest) {
//   try {
//     // Get the userId from the token using the helper function
//     const nanoid = customAlphabet(
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       8
//     );
//     const { userId, error } = getUserFromToken(request);

//     if (error) {
//       // if user is unauthorized still they are able to crate the 5 links
//       const linkCount = await prisma.link.count({
//         where: { userId: null },
//       });
//       if (linkCount >= 5) {
//         return NextResponse.json({ error }, { status: 401 });
//       }
//     }
//     const { longUrl } = await request.json();
//     const shortId = nanoid();
//     const shortUrl = `${process.env.BASE_URL}/${shortId}`;
//     const qrCode = await QrCode.toDataURL(shortUrl);

//     const newLink = await prisma.link.create({
//       data: {
//         longUrl,
//         shortUrl,
//         qrCode,
//         userId,
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

    const { userId, error } = getUserFromToken(request);

    if (error) {
      // If the user is not authenticated, allow only up to 5 URLs without user ID
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
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    const qrCode = await QrCode.toDataURL(shortUrl);

    // If user is authenticated, link the URL to the user
    const newLink = await prisma.link.create({
      data: {
        longUrl,
        shortUrl,
        qrCode,
        userId: userId || null, // If user is not authenticated, store as null
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
