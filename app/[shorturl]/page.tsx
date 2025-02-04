// import prisma from "@/utils/db";
// import { redirect } from "next/navigation";
// import React from "react";

// interface RedirectPagePros {
//   params: { shorturl: string };
// }
// export default async function RedirectPage({ params }: RedirectPagePros) {
//   const { shorturl } = params;
//   // const shorturl = params?.shorturl;
//   console.log("ShortUrl [shortul]/page.tsx", shorturl);
//   const url = await prisma.link.findUnique({
//     // where: { shortUrl: `http://localhost:3000/${shorturl}` },
//     where: { shortUrl: `${process.env.BASE_URL}/${shorturl}` },

//     select: { id: true, qrCode: true, longUrl: true, visits: true },
//   });

//   if (!url) {
//     return <div>404- URL not found</div>;
//   }
//   console.log("from [shortul]/page.tsx", url);

//   await prisma.link.update({
//     where: { id: url.id },
//     data: { visits: { increment: 1 } },
//   });

//   redirect(url.longUrl);
//   // return <div>{shorturl}</div>;
// }

// import prisma from "@/utils/db";
// import { redirect } from "next/navigation";
// import { headers } from "next/headers"; // Get request headers
// // import geoip from "geoip-lite";

// interface RedirectPageProps {
//   params: { shorturl: string };
// }

// export default async function RedirectPage({ params }: RedirectPageProps) {
//   const { shorturl } = params;
//   console.log("ShortUrl [shorturl]/page.tsx", shorturl);

//   // Find the URL from the database
//   const url = await prisma.link.findUnique({
//     where: { shortUrl: `${process.env.BASE_URL}/${shorturl}` },
//     select: { id: true, longUrl: true, visits: true },
//   });

//   if (!url) {
//     return <div>404 - URL not found</div>;
//   }

//   console.log("from [shorturl]/page.tsx", url);

//   // **Extract Analytics Data**
//   const headersList = headers();
//   const userAgent = (await headersList).get("user-agent") || "Unknown";

//   let device = "Unknown";
//   let os = "Unknown";
//   let browser = "Unknown";

//   if (userAgent.includes("Windows")) os = "Windows";
//   else if (userAgent.includes("Mac")) os = "MacOS";
//   else if (userAgent.includes("Linux")) os = "Linux";
//   else if (userAgent.includes("Android")) os = "Android";
//   else if (userAgent.includes("iPhone")) os = "iOS";

//   if (userAgent.includes("Chrome")) browser = "Chrome";
//   else if (userAgent.includes("Firefox")) browser = "Firefox";
//   else if (userAgent.includes("Safari")) browser = "Safari";
//   else if (userAgent.includes("Edge")) browser = "Edge";

//   if (userAgent.includes("Mobile")) device = "Mobile";
//   else device = "Desktop";

//   // **Get IP Address**
//   const ip = (await headersList).get("x-forwarded-for") || "127.0.0.1"; // Get real IP from headers

//   // **GeoIP Lookup**
//   const geoip = await import("geoip-lite");
//   const geo = geoip.lookup(ip);
//   const country = geo?.country || "Unknown";
//   const city = geo?.city || "Unknown";

//   // **Save Analytics Data to DB**
//   await prisma.analytics.create({
//     data: {
//       linkId: url.id,
//       country,
//       city,
//       device,
//       os,
//       browser,
//     },
//   });

//   // **Update Visits Count**
//   await prisma.link.update({
//     where: { id: url.id },
//     data: { visits: { increment: 1 } },
//   });

//   // **Redirect to the original URL**
//   redirect(url.longUrl);
// }

import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import axios from "axios";

interface RedirectPageProps {
  params: { shorturl: string };
}

const isPrivateIP = (ip: string) => {
  return (
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.") ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("::ffff:192.168.") // IPv6-mapped IPv4 private address
  );
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shorturl } = params;
  console.log("0329035u24jkdkgn", shorturl);
  console.log("ShortUrl [shorturl]/page.tsx", shorturl);

  // Find the URL from the database
  const url = await prisma.link.findUnique({
    where: { shortUrl: `${process.env.BASE_URL}/${shorturl}` },
    select: { id: true, longUrl: true, visits: true },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }

  console.log("from [shorturl]/page.tsx", url);

  // **Extract Analytics Data**
  const headersList = headers();
  const userAgent = (await headersList).get("user-agent") || "Unknown";

  let device = "Unknown";
  let os = "Unknown";
  let browser = "Unknown";

  if (userAgent.includes("Windows")) os = "Windows";
  else if (userAgent.includes("Mac")) os = "MacOS";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (userAgent.includes("Android")) os = "Android";
  else if (userAgent.includes("iPhone")) os = "iOS";

  if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("Safari")) browser = "Safari";
  else if (userAgent.includes("Edge")) browser = "Edge";

  if (userAgent.includes("Mobile")) device = "Mobile";
  else device = "Desktop";

  // **Get IP Address**
  const xForwardedFor =
    (await headersList).get("x-forwarded-for") || "127.0.0.1";
  const ip = xForwardedFor.split(",")[0].trim(); // Get the first IP address
  console.log("IP Address:", ip); // Debug log

  // **GeoIP Lookup using ipinfo.io**
  let country = "Unknown";
  let city = "Unknown";

  if (!isPrivateIP(ip)) {
    try {
      const response = await axios.get(
        `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
      );
      console.log("ipinfo.io Response:", response.data); // Debug log
      country = response.data.country || "Unknown";
      city = response.data.city || "Unknown";
    } catch (error) {
      console.error("Error fetching GeoIP data:", error);
    }
  } else {
    console.log("Private IP address detected. Skipping GeoIP lookup.");
  }

  // **Save Analytics Data to DB**
  await prisma.analytics.create({
    data: {
      linkId: url.id,
      country,
      city,
      device,
      os,
      browser,
    },
  });

  // **Update Visits Count**
  await prisma.link.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  // **Redirect to the original URL**
  redirect(url.longUrl);
}
