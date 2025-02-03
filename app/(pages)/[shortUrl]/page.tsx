import React from "react";

interface RedirectPageProps {
  params: { shorturl: string };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shorturl } = await params;
  return <div>{shorturl}</div>;
}
