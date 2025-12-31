// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        await dbConnect();

        // Get user ID from token
        const userPayload: any = verifyToken(req);
        const userId = userPayload.id;
        console.log("userID:", userId);

        const user = await User.findById(userId);
        if (!user) {
            console.log("[INFO] NO USER FOUND!");
            return NextResponse.json(
                { message: "No such user found" },
                { status: 404 }
            );
        }

        console.log("[INFO] USER FOUND!");
        return NextResponse.json({ data: user }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
