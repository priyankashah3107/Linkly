"use server";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserSchema, loginUserSchema } from "@/utils/zod";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // nextjs cookies api
import { signTokenAndSetCookie } from "../utils/signTokenAndSetCookie";

// const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

// Function to register a new user
export async function registerUser(request: Request) {
  try {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email Already Exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // Generate JWT token
    // const token = jwt.sign({ email, userId: user.id }, JWT_SECRET, {
    //   expiresIn: "30d",
    // });

    // cookies().set({
    //   name: "jwt",
    //   value: token,
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: 30 * 24 * 60 * 60,
    //   sameSite: "strict",
    //   secure: process.env.NODE_ENV !== "development",
    // });

    const token = signTokenAndSetCookie(user.id, user.email);
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: user.email },
        token,
      },
      { status: 201 }
    );

    // Set JWT cookie
    // use Nextjs Cookie to set the headers not header to set the cookie
    // response.headers.set(
    //   "Set-Cookie",
    //   `jwt=${token}; HttpOnly; Path=/; Max-Age=${
    //     30 * 24 * 60 * 60
    //   }; SameSite=Strict; ${
    //     process.env.NODE_ENV !== "development" ? "Secure" : ""
    //   }`
    // );

    // return response;
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { error: "Failed to create User" },
      { status: 500 }
    );
  }
}

// export async function loginUser(request: Request) {
//   try {
//     const body = await request.json();
//     const validation = loginUserSchema.safeParse(body);

//     if (!validation.success) {
//       return NextResponse.json(
//         { error: validation.error.errors },
//         { status: 400 }
//       );
//     }

//     const { email, password } = validation.data;

//     const user = await prisma.user.findUnique({ where: { email } });

//     // if (!user) {
//     //   return NextResponse.json(
//     //     { error: "Invalid Credentials" },
//     //     { status: 401 }
//     //   );
//     // }

//     // // check is password match

//     // const passwordMatch = await bcrypt.compare(password, user.password);

//     // if (!passwordMatch) {
//     //   return NextResponse.json({ error: "Invalid Password" }, { status: 404 });
//     // }

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return NextResponse.json(
//         { error: "Invalid Credentials" },
//         { status: 401 }
//       );
//     }

//     // generate the jwt token

//     // const token = jwt.sign({ email, userId: user.id }, JWT_SECRET, {
//     //   expiresIn: "30d",
//     // });

//     // cookies().set({
//     //   name: "jwt",
//     //   value: token,
//     //   httpOnly: true,
//     //   path: "/",
//     //   maxAge: 30 * 24 * 60 * 60, // 30 days
//     //   sameSite: "strict",
//     //   secure: process.env.NODE_ENV !== "development",
//     // });
//     const token = signTokenAndSetCookie(user.id, user.email);
//     return NextResponse.json(
//       { message: "Login Successfully", user: { email: user.email }, token },
//       { status: 200 }
//     );

//     // Set jwt cookie

//     // response.headers.set(
//     //   "Access-Control-Allow-Origin",
//     //   "http://localhost:3000/api/login"
//     // );
//     // response.headers.set("Access-Control-Allow-Credentials", "true");

//     // use Nextjs Cookie to set the headers not header to set the cookie
//     // response.headers.set(
//     //   "Set-Cookie",
//     //   `jwt=${token}; HttpOnly; Path=/; Max-Age=${
//     //     30 * 24 * 60 * 60
//     //   }; SameSite=Strict; ${
//     //     process.env.NODE_ENV !== "development" ? "Secure" : ""
//     //   }`
//     // );
//     // return response;
//   } catch (error) {
//     console.log("Error While Signin the User", error);
//     return NextResponse.json({ error: "Failed to Login" }, { status: 500 });
//   }
// }

// GetMe;

// export async function loginUser(request: Request) {
//   try {
//     const body = await request.json(); // Extracting email and password from the request
//     const { email, password } = body;

//     // Your validation logic here
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid Credentials" },
//         { status: 401 }
//       );
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return NextResponse.json({ error: "Invalid Password" }, { status: 404 });
//     }

//     // Generate JWT token and send response
//     const token = jwt.sign({ email, userId: user.id }, JWT_SECRET, {
//       expiresIn: "30d",
//     });
//     // Set jwt cookie
//     const response = NextResponse.json(
//       { message: "Login Successfully", user: { email: user.email }, token },
//       { status: 200 }
//     );

//     response.headers.set(
//       "Set-Cookie",
//       `jwt=${token}; HttpOnly; Path=/; Max-Age=${
//         30 * 24 * 60 * 60
//       }; SameSite=Strict; ${
//         process.env.NODE_ENV !== "development" ? "Secure" : ""
//       }`
//     );
//     return response;
//   } catch (error) {
//     console.log("Error While Signin the User", error);
//     return NextResponse.json({ error: "Failed to Login" }, { status: 500 });
//   }
// }
// export async function getMe(request: Request) {
//   try {
//     // get cookie from the jwt
//     const cookie = request.headers.get("cookie");
//     if (!cookie) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const token = cookie
//       .split("; ")
//       .find((c) => c.startsWith("jwt="))
//       ?.split("=")[1];
//     if (!token) {
//       return NextResponse.json({ error: "Unauthoried" }, { status: 401 });
//     }
//     // verify jwt
//     const decode = jwt.verify(token, JWT_SECRET) as { userId: number };
//     if (!decode || !decode.userId) {
//       return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
//     }
//     // user from the db
//     const user = await prisma.user.findUnique({
//       where: { id: decode.userId },
//       select: { id: true, email: true },
//     });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }
//     return NextResponse.json({ user }, { status: 200 });
//   } catch (error) {
//     console.error("Error in getMe:", error);
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
// }

export async function loginUser(request: Request) {
  try {
    const body = await request.json();
    const validation = loginUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token and set it as a cookie
    const token = await signTokenAndSetCookie(user.id, user.email);

    return NextResponse.json(
      { message: "Login Successfully", user: { email: user.email }, token },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error While Signing in the User", error);
    return NextResponse.json({ error: "Failed to Login" }, { status: 500 });
  }
}

const ONE_DAY = 24 * 60 * 60; // 1 day in seconds

export async function getMe(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
      exp: number;
    };

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    // Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Refresh token ONLY if less than 1 day left
    const timeLeft = decoded.exp - Math.floor(Date.now() / 1000);
    if (timeLeft < ONE_DAY) {
      const newToken = signTokenAndSetCookie(user.id, user.email);
      return NextResponse.json({ user, token: newToken }, { status: 200 });
    }

    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    console.error("Error in getMe:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// Logout

export async function logoutUser() {
  try {
    const response = NextResponse.json(
      { message: "Logged out Successfully" },
      { status: 200 }
    );

    cookies().set({
      name: "jwt",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0, // Expire immediately
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development", // Secure in production
    });
    return response;
  } catch (error) {
    console.log("error in Logout", error);
    return NextResponse.json(
      {
        error: "Failed to logout",
      },
      { status: 500 }
    );
  }
}
