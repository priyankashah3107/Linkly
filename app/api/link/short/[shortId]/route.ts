// import handlerRedirect from "@/app/actions/linkAction";

// export { handlerRedirect as GET };

// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(
//   request: Request,
//   { params }: { params: { shortId: string } }
// ) {
//   try {
//     const { shortId } = params;

//     // Find the long URL from the database
//     const link = await prisma.link.findUnique({
//       where: { shortUrl: `${process.env.BASE_URL}/${shortId}` },
//       select: { longUrl: true },
//     });

//     if (!link) {
//       return NextResponse.json(
//         { error: "Short URL not found" },
//         { status: 404 }
//       );
//     }

//     // Increment analytics (optional)

//     // Redirect to the long URL
//     return NextResponse.redirect(link.longUrl);
//   } catch (error) {
//     console.error("Error during redirect:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { shortId: string } }
) {
  const { shortId } = params;

  try {
    // Fetch the link from the database using the shortId
    const link = await prisma.link.findUnique({
      where: { shortUrl: `${process.env.BASE_URL}/${shortId}` },
    });

    if (link) {
      // Redirect to the long URL
      return NextResponse.redirect(link.longUrl);
    } else {
      // Return a 404 error if the link is not found
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
