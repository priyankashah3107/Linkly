// import React from "react";

// interface RedirectShortUrlProps {
//   params: { shorturl: string };
// }
// export default function RedirectShortUrlPage({
//   params,
// }: RedirectShortUrlProps) {
//   const shorturl = params;

//   return <div>{shorturl}</div>;
// }

import prisma from "@/utils/db";
import { link } from "fs";
import { redirect } from "next/navigation";
import React from "react";

interface RedirectPageProps {
  params: { shorturl: string | string[] };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  let shorturl = decodeURIComponent(
    Array.isArray(params.shorturl) ? params.shorturl.join("/") : params.shorturl
  );

  // Fix malformed "https:/" issue
  if (shorturl.startsWith("https:/") && !shorturl.startsWith("https://")) {
    shorturl = shorturl.replace("https:/", "https://");
  }

  console.log("Decoded Short URL:", shorturl);

  const url = await prisma.link.findUnique({
    where: { shortUrl: shorturl },
  });

  console.log("Database query result:", url);

  if (!url) {
    return <div>404 - URL not found</div>;
  }
  // return <div>{shorturl}</div>;

  await prisma.link.update({
    where: {
      id: url.id,
    },
    data: { visits: { increment: 1 } },
  });
  console.log("Visits incremented for:", url.id);
  const countclicks = await prisma.link.findMany({
    where: { id: url.id },
  });
  console.log("CountCLick is", countclicks);
  redirect(url?.longUrl);
}
