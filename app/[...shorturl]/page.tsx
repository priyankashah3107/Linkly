// // import React from "react";

// // interface RedirectShortUrlProps {
// //   params: { shorturl: string };
// // }
// // export default function RedirectShortUrlPage({
// //   params,
// // }: RedirectShortUrlProps) {
// //   const shorturl = params;

// //   return <div>{shorturl}</div>;
// // }

// // import prisma from "@/utils/db";
// // import { redirect } from "next/navigation";
// // // import { NextResponse } from "next/server";
// // import React from "react";

// // interface RedirectPageProps {
// //   params: { shorturl: string | string[] };
// // }

// // export default async function RedirectPage({ params }: RedirectPageProps) {
// //   let shorturl = decodeURIComponent(
// //     Array.isArray(params.shorturl) ? params.shorturl.join("/") : params.shorturl
// //   );

// //   // Fix malformed "https:/" issue
// //   if (shorturl.startsWith("https:/") && !shorturl.startsWith("https://")) {
// //     shorturl = shorturl.replace("https:/", "https://");
// //   }

// //   console.log("Decoded Short URL:", shorturl);

// //   const url = await prisma.link.findUnique({
// //     where: { shortUrl: shorturl },
// //     select: {
// //       id: true,
// //       qrCode: true,
// //       longUrl: true,
// //       visits: true,
// //       createdAt: true,
// //     },
// //   });

// //   // console.log("Database query result:", url);

// //   if (!url) {
// //     return <div>404 - URL not found </div>;
// //   }
// //   // return <div>{shorturl}</div>;
// //   console.log(url.qrCode);

// //   await prisma.link.update({
// //     where: {
// //       id: url.id,
// //     },
// //     data: { visits: { increment: 1 } },
// //   });
// //   // console.log("Visits incremented for:", url.id);
// //   const countclicks = await prisma.link.findMany({
// //     where: { id: url.id },
// //   });
// //   // console.log("CountCLick is", countclicks);
// //   redirect(url.longUrl);
// //   // return NextResponse.redirect(url.longUrl);
// // }

// // // export default async function RedirectQrCode({ params }: RedirectPageProps) {

// // // }

// import prisma from "@/utils/db";
// import { redirect } from "next/navigation";
// import QRCode from "qrcode"; // Import QRCode package
// import React from "react";

// interface RedirectPageProps {
//   params: { shorturl: string | string[] };
// }

// export default async function RedirectPage({ params }: RedirectPageProps) {
//   let shorturl = decodeURIComponent(
//     Array.isArray(params.shorturl) ? params.shorturl.join("/") : params.shorturl
//   );

//   if (shorturl.startsWith("https:/") && !shorturl.startsWith("https://")) {
//     shorturl = shorturl.replace("https:/", "https://");
//   }

//   console.log("Decoded Short URL:", shorturl);

//   const url = await prisma.link.findUnique({
//     where: { shortUrl: shorturl },
//     select: {
//       id: true,
//       qrCode: true,
//       longUrl: true,
//       visits: true,
//       createdAt: true,
//     },
//   });

//   if (!url) {
//     return <div>404 - URL not found</div>;
//   }

//   // Generate a new QR code for the long URL
//   const longUrlQrCode = await QRCode.toDataURL(url.longUrl);

//   console.log("New Long URL QR Code:", longUrlQrCode);

//   await prisma.link.update({
//     where: { id: url.id },
//     data: { visits: { increment: 1 } },
//   });

//   redirect(url.longUrl);
// }

import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import QRCode from "qrcode"; // Import QRCode package
import React from "react";

interface RedirectPageProps {
  params: { shorturl: string | string[] };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  let shorturl = decodeURIComponent(
    Array.isArray(params.shorturl) ? params.shorturl.join("/") : params.shorturl
  );

  if (shorturl.startsWith("https:/") && !shorturl.startsWith("https://")) {
    shorturl = shorturl.replace("https:/", "https://");
  }

  console.log("Decoded Short URL:", shorturl);

  const url = await prisma.link.findUnique({
    where: { shortUrl: shorturl },
    select: {
      id: true,
      qrCode: true,
      longUrl: true,
      visits: true,
      createdAt: true,
    },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }

  // Generate a new QR code for the long URL
  const longUrlQrCode = await QRCode.toDataURL(url.longUrl);

  console.log("New Long URL QR Code:", longUrlQrCode);

  await prisma.link.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // Redirect to the long URL
  redirect(url.longUrl);
}
