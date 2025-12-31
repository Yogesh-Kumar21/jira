// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        const existingUser: any = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { message: "No such user exists. Please Signup" },
                { status: 404 }
            );
        }

        const pass = bcrypt.compareSync(password, existingUser.password);
        if (!pass) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
        }

        // Sign JWT
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY!, {
            expiresIn: "1h"
        });

        // Set cookie
        const response = NextResponse.json({ message: "success" }, { status: 200 });

        response.cookies.set({
            name: "id",
            value: token,
            httpOnly: true,
            maxAge: 3600, // 1 hour
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            // domain: ".vercel.app" // optional, only if frontend + backend same domain
        });

        return response;
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
