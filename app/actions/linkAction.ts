"use server";
// i want when user is not authenticated then he or she can make only 5 request for the short url creation
// i want when user is click on the short url and one the qr code then they redirect to the long url

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import QRCode from "qrcode";
import { getUserFromToken } from "../utils/authHelper"; // Importing the helper function

const prisma = new PrismaClient();

export async function createShortLink(request: Request) {
  try {
    // Get the userId from the token using the helper function
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      8
    );
    const { userId, error } = getUserFromToken(request);

    if (error) {
      // if user is unauthorized still they are able to crate the 5 links
      const linkCount = await prisma.link.count({
        where: { userId: null },
      });
      if (linkCount >= 5) {
        return NextResponse.json({ error }, { status: 401 });
      }
    }
    const { longUrl } = await request.json();
    const shortId = nanoid();
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    const qrCode = await QRCode.toDataURL(shortUrl);

    const newLink = await prisma.link.create({
      data: {
        longUrl,
        shortUrl,
        qrCode,
        userId,
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

// redirect to the user short to  longurl underthehood
// export async function redirectToLongUrl(
//   request: Request,
//   context: { params: { shortId: string } }
// ) {
//   try {
//     const { params } = context; // Extract params first
//     if (!params || !params.shortId) {
//       return NextResponse.json(
//         { error: "Short ID is required" },
//         { status: 400 }
//       );
//     }

//     const shortId = params.shortId; // Now extract shortId
//     console.log("Short ID:", shortId); // Debugging

//     const link = await prisma.link.findUnique({
//       where: { shortUrl: shortId }, // Query by shortId
//     });

//     console.log("link from the db", link);
//     if (!link) {
//       return NextResponse.json(
//         { error: "Short URL not found" },
//         { status: 404 }
//       );
//     }

//     // Log analytics
//     await prisma.analytics.create({
//       data: {
//         linkId: link.id,
//         country: "Unknown",
//         city: "Unknown",
//         device: "Unknown",
//         os: "Unknown",
//         browser: "Unknown",
//       },
//     });

//     // Redirect user to the original long URL
//     return NextResponse.redirect(link.longUrl);
//   } catch (error) {
//     console.error("Error redirecting:", error);
//     return NextResponse.json({ error: "Failed to redirect" }, { status: 500 });
//   }
// }

// only authenticated user i get the shorurl
// that means on the behalf of the userId user is able to get their all link which they created: analytics wale log k liye

// get allshortUrl bas h
export async function getAllShortUrl() {
  try {
    const shortUrls = await prisma.link.findMany({
      select: {
        id: true,
        shortUrl: true, // except shorurl comment all if u want only shorturl
        longUrl: true,
        qrCode: true,
        userId: true,
        createdAt: true,
      },
    });

    console.log("All Short URLs:", shortUrls);
    return NextResponse.json(
      { message: "All ShortUrls is", shortUrls },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching short URLs:", error);
    return (
      NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      ) || []
    );
  }
}

// i want only authenticated user can access the short url

export async function getShortUrlByUserId(request: Request) {
  try {
    const { userId, error } = getUserFromToken(request);
    if (error) {
      return NextResponse.json({ error }, { status: 401 });
    }

    // when a signle user is created a many urls

    const shorturls = await prisma.link.findMany({
      select: {
        id: true,
        shortUrl: true,
        longUrl: true,
        qrCode: true,
        userId: true,
        createdAt: true,
      },
    });

    console.log("All Urls infomations of authenticated user", shorturls);

    return NextResponse.json(
      { messgae: "All urls info", shorturls, userId },
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

// do i need to store as a map in the db which point to longurl as shorturl and qrcode so it is able to redirect when user is click in the short url or qrcode
