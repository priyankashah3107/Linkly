// import prisma from "@/utils/db";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

// interface ImagePageProps {
//   params: { id: string };
// }

// export default async function ImagePage({ params }: ImagePageProps) {
//   const { id } = await params;

//   try {
//     // Fetch the image data from the database
//     const image = await prisma.link.findUnique({
//       where: { id },
//       select: { qrCode: true, longUrl: true, shortUrl: true }, // Assuming `qrCode` stores the Base64 image
//     });

//     const qrcode = image?.qrCode;

//     // console.log("IMage", image);
//     // console.log("QRCODE", qrcode);
//     if (!image) {
//       return <div>Image not found</div>;
//     }

//     // redirect(image.longUrl);
//     return redirect(image.longUrl);
//     // return (
//     //   <div className="flex flex-col items-center mt-10">
//     //     <h1 className="text-xl font-bold">QR Code</h1>
//     //     <img src={image.qrCode} alt="QR Code" className="w-40 h-40 mt-4" />
//     //   </div>
//     // );
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return <div>Error loading image</div>;
//   }
// }

// import prisma from "@/utils/db";
// import Image from "next/image";

// interface ImagePageProps {
//   params: { id: string };
// }

// export default async function ImagePage({ params }: ImagePageProps) {
//   const { id } = params;

//   if (!id) {
//     return <div>Invalid ID</div>;
//   }

//   try {
//     // Fetch the QR code from the database
//     const image = await prisma.link.findUnique({
//       where: { id },
//       select: { qrCode: true, longUrl: true },
//     });

//     if (!image || !image.qrCode) {
//       return <div>QR Code not found</div>;
//     }

//     return (
//       <div className="flex flex-col items-center mt-10">
//         <h1 className="text-xl font-bold">Scan QR Code to Visit</h1>
//         <a href={`/api/image/${id}`} target="_blank">
//           <Image src={image.qrCode} alt="QR Code" width={200} height={200} />
//           {/* <Image src={image.longUrl} alt="QR Code" width={200} height={200} /> */}
//         </a>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return <div>Error loading QR Code</div>;
//   }
// }

// import prisma from "@/utils/db";
// import Image from "next/image";

// interface ImagePageProps {
//   params: { id: string };
// }

// export default async function ImagePage({ params }: ImagePageProps) {
//   const { id } = params;

//   if (!id) {
//     return <div>Invalid ID</div>;
//   }

//   try {
//     // Fetch the QR code from the database
//     const image = await prisma.link.findUnique({
//       where: { id },
//       select: { qrCode: true, longUrl: true, shortUrl: true },
//     });

//     if (!image || !image.qrCode) {
//       return <div>QR Code not found</div>;
//     }

//     // Ensure the QR code is in a valid format for the Next.js Image component
//     const validQrCode = image.qrCode.startsWith("data:image/")
//       ? image.qrCode
//       : `data:image/png;base64,${image.qrCode}`;

//     console.log("ValidQRCODE", validQrCode);
//     return (
//       <div className="flex flex-col items-center mt-10">
//         <h1 className="text-xl font-bold">Scan QR Code to Visit</h1>
//         <a href={`/api/image/${id}`} target="_blank">
//           <Image src={validQrCode} alt="QR Code" width={200} height={200} />
//         </a>
//       </div>
//     );
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     return <div>Error loading QR Code</div>;
//   }
// }

import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import React from "react";

interface RedirectPagePros {
  params: { shorturl: string };
}
export default async function RedirectQrCode({ params }: RedirectPagePros) {
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

  // headers().set("Location", url.longUrl);

  redirect(url.longUrl);

  // return <div>{shorturl}</div>;
}
