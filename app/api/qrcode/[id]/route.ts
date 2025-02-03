// import prisma from "@/utils/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     // Fetch QR code from the database
//     const image = await prisma.link.findUnique({
//       where: { id },
//       select: { qrCode: true },
//     });

//     if (!image || !image.qrCode) {
//       return new Response("QR Code not found", { status: 404 });
//     }

//     // Convert Base64 to PNG response
//     const base64Data = image.qrCode.replace(/^data:image\/png;base64,/, "");
//     const imageBuffer = Buffer.from(base64Data, "base64");

//     return new Response(imageBuffer, {
//       headers: {
//         "Content-Type": "image/png",
//         "Content-Length": imageBuffer.length.toString(),
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching QR Code:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Fetch QR code from the database
    const image = await prisma.link.findUnique({
      where: { id },
      select: { qrCode: true },
    });

    if (!image || !image.qrCode) {
      return new Response("QR Code not found", { status: 404 });
    }

    // Convert Base64 to PNG response
    const base64Data = image.qrCode.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, "base64");

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching QR Code:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
