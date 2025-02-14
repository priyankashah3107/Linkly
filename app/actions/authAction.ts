"use server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUserSchema, loginUserSchema } from "@/utils/zod";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signTokenAndSetCookie } from "../utils/signTokenAndSetCookie";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export async function registerUser(request: Request): Promise<NextResponse> {
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

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email Already Exists" },
        { status: 409 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    const token = signTokenAndSetCookie(user.id, user.email);
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { email: user.email },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { error: "Failed to create User" },
      { status: 500 }
    );
  }
}


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
export async function getMe(request: Request): Promise<NextResponse> {
  try {
    const cookie = request.headers.get("cookie");
    if (!cookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = cookie
      .split("; ")
      .find((c) => c.startsWith("jwt="))
      ?.split("=")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthoried" }, { status: 401 });
    }
    const decode = jwt.verify(token, JWT_SECRET) as { userId: number };
    if (!decode || !decode.userId) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decode.userId },
      select: { id: true, email: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in getMe:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

// Logout

export async function logoutUser(): Promise<NextResponse> {
  try {
    const response = NextResponse.json(
      { message: "Logged out Successfully" },
      { status: 200 }
    );

    (await cookies()).set({
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
