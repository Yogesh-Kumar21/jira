// app/api/teams/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Team from "@/lib/models/Team";

export async function GET() {
    try {
        await dbConnect();

        const teams: any = await Team.find().populate({
            path: "members",
            populate: {
                path: "memberId",
                select: "name logo"
            }
        });

        return NextResponse.json({ teams }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
