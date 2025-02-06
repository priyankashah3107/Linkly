// import { verify } from "jsonwebtoken";

// export function getUserFromToken(request: Request) {
//   try {
//     const cookie = request.headers.get("cookie");
//     const token = cookie?.split("=")[1]; // Assuming token is in a cookie named "auth"

//     if (!token) {
//       return { error: "Not authenticated" };
//     }

//     const decoded = verify(token, process.env.JWT_SECRET) as { userId: number };
//     const userId = decoded.userId;

//     return { userId };
//   } catch (error) {
//     return { error: "Invalid token" };
//   }
// }

import { verify, JwtPayload } from "jsonwebtoken";

// Define our custom interfaces
interface AuthSuccess {
  userId: number;
  error?: never;
}

interface AuthError {
  userId?: never;
  error: string;
}

// Return type is either success or error
type AuthResult = AuthSuccess | AuthError;

// Define the expected JWT payload structure
interface JWTPayload extends JwtPayload {
  userId: number;
}

export function getUserFromToken(request: Request): AuthResult {
  try {
    const cookie = request.headers.get("cookie");
    const token = cookie?.split("=")[1]; // Assuming token is in a cookie named "auth"

    if (!token) {
      return { error: "Not authenticated" };
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = verify(token, jwtSecret) as JWTPayload;

    if (!decoded.userId) {
      return { error: "Invalid token payload" };
    }

    return { userId: decoded.userId };
  } catch (error) {
    // You can add more specific error handling if needed
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Invalid token" };
  }
}
