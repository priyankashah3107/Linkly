"use server";
// i want when user is not authenticated then he or she can make only 5 request for the short url creation
// i want when user is click on the short url and one the qr code then they redirect to the long url

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { customAlphabet } from "nanoid";
import QRCode from "qrcode";
import { getUserFromToken } from "../utils/authHelper"; // Importing the helper function
import { NextApiRequest, NextApiResponse } from "next";
import validUrl from "valid-url";
const prisma = new PrismaClient();

// export async function createShortLink(request: Request) {
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
//     const qrCode = await QRCode.toDataURL(shortUrl);
//     // const qrCode = await QRCode.toDataURL(longUrl);

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

// redirect to the user short to  longurl underthehood

// get allshortUrl this is for unauthenticated user

export async function createShortLink(request: Request) {
  try {
    // Get the userId from the token using the helper function
    const nanoid = customAlphabet(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      8
    );
    const { userId, error } = getUserFromToken(request);

    if (error) {
      // If user is unauthorized, limit to 5 links without userId
      const linkCount = await prisma.link.count({ where: { userId: null } });
      if (linkCount >= 5) {
        return NextResponse.json(
          { error: "Unauthorized. Link creation limit exceeded." },
          { status: 401 }
        );
      }
    }

    // Get longUrl from the request body
    const { longUrl } = await request.json();

    // Validate the provided longUrl
    if (!validUrl.isUri(longUrl)) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Generate a unique short ID
    const shortId = nanoid();
    const shortUrl = `${process.env.BASE_URL}/${shortId}`;

    // Generate the QR code for the shortUrl
    const qrCode = await QRCode.toDataURL(longUrl);

    // Save the new link record in the database
    const newLink = await prisma.link.create({
      data: {
        longUrl,
        shortUrl,
        qrCode,
        userId: userId || null, // Associate with userId if available
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

// export async function getShortUrlByUserId(request: Request) {
// i want only authenticated user can access the short url
// i want to redirect to the user when they click on the shorturl or qrcode i want to rediect to them original longurl
//   // do i need to store as a map in the db which point to longurl as shorturl and qrcode so it is able to redirect when user is click in the short url or qrcode
//   try {
//     const { userId, error } = getUserFromToken(request);
//     if (error) {
//       return NextResponse.json({ error }, { status: 401 });
//     }

//     // when a signle user is created a many urls

//     const shorturls = await prisma.link.findMany({
//       where: { userId },
//       select: {
//         id: true,
//         shortUrl: true,
//         longUrl: true,
//         qrCode: true,
//         userId: true,
//         createdAt: true,
//       },
//     });

//     console.log("All Urls infomations of authenticated user", shorturls);

//     const shortlink =

//     return NextResponse.json(
//       { messgae: "All urls info", shorturls, userId },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { message: "Internal server error", error },
//       { status: 500 }
//     );
//   }
// }

export async function getShortUrlByUserId(request: Request) {
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

export default async function handlerRedirect(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { shortId } = req.query;

  try {
    const link = await prisma.link.findUnique({
      where: { shortUrl: `${process.env.BASE_URL}/${shortId}` },
    });

    if (link) {
      // Increment the click count or log analytics here if needed
      res.redirect(link.longUrl);
    } else {
      res.status(404).json({ error: "Link not found" });
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
