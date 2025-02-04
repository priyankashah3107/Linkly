import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import React from "react";

interface RedirectPagePros {
  params: { shorturl: string };
}
export default async function RedirectPage({ params }: RedirectPagePros) {
  const { shorturl } = params;
  const url = await prisma.link.findUnique({
    // where: { shortUrl: `http://localhost:3000/${shorturl}` },
    where: { shortUrl: `${process.env.BASE_URL}/${shorturl}` },

    select: { id: true, qrCode: true, longUrl: true, visits: true },
  });

  if (!url) {
    return <div>404- URL not found</div>;
  }

  await prisma.link.update({
    where: { id: url.id },
    data: { visits: { increment: 1 } },
  });

  redirect(url.longUrl);
  // return <div>{shorturl}</div>;
}
