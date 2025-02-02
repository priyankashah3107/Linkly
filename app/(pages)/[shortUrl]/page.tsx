import prisma from "@/utils/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: { shortUrl: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortUrl } = params;

  const link = await prisma.link.findUnique({
    where: { shortUrl: shortUrl },
  });

  if (!link) {
    return <div>404- URL not found</div>;
  }

  redirect(link.longUrl);
}
