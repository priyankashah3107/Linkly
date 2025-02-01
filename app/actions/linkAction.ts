"use server";

// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";
// import { customAlphabet } from "nanoid";
// import QrCode from "qrcode";
// import { verify } from "jsonwebtoken"; // Assuming JWT
// const prisma = new PrismaClient();

// export async function createShortLink(request: Request) {
//   try {
//     const { longUrl, userId } = request.json();
//     const nanoid = customAlphabet(
//       "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//       8
//     ); // 8-char short ID
//     const shortId = nanoid();
//     console.log("ShortID", shortId);
//     const shortUrl = `${process.env.BASE_URL}/${shortId}`;
//     console.log("ShortURL", shortUrl);
//     // geneate the qrcode for the short url
//     const qrCode = await QrCode.toDataURL(shortUrl);
//     console.log("QRCODE", qrCode);
//     // store in the short url and ar in the db
//     const newLink = await prisma.link.create({
//       data: {
//         longUrl,
//         shortUrl,
//         qrCode,
//         userId,
//       },
//     });
//     return NextResponse.json(
//       { message: "Short URL created", longUrl, userId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.log("Error in CreateShortLink", error);
//     return NextResponse.json(
//       { error: "Failed to create the short url" },
//       { status: 500 }
//     );
//   }
// }

// export async function GetCreateShortLink(request: Request) {
//   try {
//   } catch (error) {
//     console.log("Error in GetCreateShortLink", error);
//     return NextResponse.json(
//       { error: "Failed to GetCreateShortLink" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken"; // Assuming JWT
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import QRCode from "qrcode"; // Library for generating QR code

const prisma = new PrismaClient();
// const nanoid = customAlphabet(
//   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
//   8
// );

interface DecodedToken {
  userId: number;
}

export async function createShortLink(request: Request) {
  try {
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      8
    );

    // Get the token from the cookies
    const cookie = request.headers.get("cookie");
    const token = cookie?.split("=")[1]; // Assuming the token is in a cookie named "auth"

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify the token to get the user ID
    const decoded = verify(token, process.env.JWT_SECRET!) as DecodedToken; // Assuming the token has the `userId`
    const userId = decoded.userId;

    // Parse the request body to get the long URL
    const { longUrl } = await request.json();

    if (!longUrl) {
      return NextResponse.json(
        { error: "Long URL is required" },
        { status: 400 }
      );
    }

    // // Check if the long URL already exists
    // const existingLink = await prisma.link.findFirst({
    //   where: { longUrl },
    // });

    // if (existingLink) {
    //   return NextResponse.json({
    //     message: "URL already shortened",
    //     shortUrl: existingLink.shortUrl,
    //   });
    // }

    // Generate a unique short URL
    const shortUrl = nanoid();

    // Create the new link in the database
    // const newLink = await prisma.link.create({
    //   data: {
    //     longUrl,
    //     shortUrl,
    //     userId, // Associate the user ID with the link
    //   },
    // });

    // Generate the full short URL
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL environment variable is not set");
    }
    const fullShortUrl = `${baseUrl}/${shortUrl}`;

    // Generate the QR code for the short URL
    const qrCode = await QRCode.toDataURL(fullShortUrl);

    // // Update the link with the QR code image
    // await prisma.link.update({
    //   where: { id: newLink.id },
    //   data: { qrCode },
    // });

    // Return the response with the new short URL and QR code
    return NextResponse.json({
      message: "Short URL created successfully",
      shortUrl: fullShortUrl,
      qrCode,
      userId,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}
