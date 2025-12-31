// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie") || "";
        const match = cookieHeader.match(/id=([^;]+)/);

        if (match) {
            // Set cookie
            const response = NextResponse.json({ message: "logout success" }, { status: 200 });

            response.cookies.set({
                name: "id",
                value: "",
                httpOnly: true,
                path: "/",
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                // domain: ".vercel.app" // optional, only if frontend + backend same domain
            });

            return response
        }
        else {
            // Set cookie
            const response = NextResponse.json({ message: "logout success (NO COOKIE)" }, { status: 200 });

            return response
        }

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
