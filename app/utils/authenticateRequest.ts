import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function authenticateRequest(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded user info to the request or return success
    return decoded;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}
