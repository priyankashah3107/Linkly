// "use client";
// import React from "react";
// import AdminAnalytics from "@/app/components/AdminAnalytics";
// import { useSearchParams } from "next/navigation";

// const Page = () => {
//   const searchParams = useSearchParams();
//   const linkId = searchParams.get("linkId");

//   if (!linkId) return <div>No link ID found</div>;

//   return <AdminAnalytics linkId={linkId} />;
// };

// export default Page;

"use client";
import { useParams } from "next/navigation";
import AdminAnalytics from "@/app/components/AdminAnalytics";
import React from "react";

const Page = () => {
  const params = useParams(); // Get the dynamic `id` from the URL
  const linkId = params?.id as string; // Extract `id` and ensure it's a string

  return <AdminAnalytics linkId={linkId} />;
};

export default Page;
