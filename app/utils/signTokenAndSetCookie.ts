import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

/**
 * Generates a JWT token and sets it as a cookie.
 */
export function signTokenAndSetCookie(userId: number, email: string): string {
  const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "30d" });

  cookies().set({
    name: "jwt",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}
