// // import { analyticsByLinkId } from "@/app/actions/analyticAction";

// // export { analyticsByLinkId as GET };

// import { NextResponse } from "next/server";
// import prisma from "@/utils/db";
// import { getUserFromToken } from "@/app/utils/authHelper";

// export async function GET(
//   request: Request,
//   { params }: { params: { linkId: string } }
// ) {
//   try {
//     const { linkId } = params;
//     console.log("LinkId from params:", linkId);

//     if (!linkId) {
//       return NextResponse.json(
//         { error: "linkID is required" },
//         { status: 400 }
//       );
//     }

//     const { userId, error: authError } = getUserFromToken(request);

//     if (authError || !userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const link = await prisma.link.findFirst({
//       where: { id: linkId, userId },
//     });

//     if (!link) {
//       return NextResponse.json(
//         { error: "Link not found or you do not have permission" },
//         { status: 404 }
//       );
//     }

//     const analytics = await prisma.analytics.findMany({
//       where: { linkId },
//       select: {
//         linkId: true,
//         city: true,
//         country: true,
//         device: true,
//         os: true,
//         browser: true,
//       },
//     });

//     return NextResponse.json({ analytics }, { status: 200 });
//   } catch (error) {
//     console.error("Error in analyticsByLinkId:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { getUserFromToken } from "@/app/utils/authHelper";
export async function GET(request: NextRequest) {
  // const id = "cm6qn91ay0015uw78u3dshi68";

  const searchParams = request.nextUrl.searchParams;
  const linkId = searchParams.get("id");

  if (!linkId) {
    return NextResponse.json({ error: "Link ID is required" }, { status: 400 });
  }

  try {

    const {userId, error} = getUserFromToken(request)

    if(error || !userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const link = await prisma.link.findUnique({
      where: {id: linkId}
    })
    
    if(!link || link.userId !== userId) {
      return NextResponse.json({error: "you do not have permission to view this analytics"}, {status: 403})
    }
    const analytics = await prisma.analytics.findMany({
      where: { linkId},

      orderBy: { timestamp: "desc" }, // Sort by most recent
    });

    // console.log("Fetching analytics for link ID:", id);
    // console.log("Analytics data:", analytics);

    return NextResponse.json(analytics, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics data" },
      { status: 500 }
    );
  }
}
