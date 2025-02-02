import { verify } from "jsonwebtoken";

export function getUserFromToken(request: Request) {
  try {
    const cookie = request.headers.get("cookie");
    const token = cookie?.split("=")[1]; // Assuming token is in a cookie named "auth"

    if (!token) {
      return { error: "Not authenticated" };
    }

    const decoded = verify(token, process.env.JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    return { userId };
  } catch (error) {
    return { error: "Invalid token" };
  }
}
