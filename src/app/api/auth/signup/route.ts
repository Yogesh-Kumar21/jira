// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { name, email, password } = await req.json();
        console.log("request:", { name, email });

        const existingUser = await User.findOne({ email });
        console.log("existingUser:", existingUser);

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists. Please Log in" },
                { status: 409 }
            );
        }

        const hashedPass = bcrypt.hashSync(password);

        const user: any = new User({
            name,
            email,
            password: hashedPass,
            emailVerified: false,
        });

        console.log("[+] User created");

        await user.save();

        return NextResponse.json({ message: "User created successfully!" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { type: "error", message: error.message || error },
            { status: 501 }
        );
    }
}
