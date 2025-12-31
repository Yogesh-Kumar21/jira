// app/api/team/join/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Team from "@/lib/models/Team";
import User from "@/lib/models/User";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Get logged-in user ID from token
        const userPayload: any = verifyToken(req);
        const userId = userPayload.id;

        // Parse request body
        const { teamId } = await req.json();

        if (!teamId) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        // Add user to team members
        await Team.findByIdAndUpdate(
            teamId,
            {
                $push: {
                    members: {
                        memberId: userId,
                        role: ""
                    }
                }
            }
        );

        // Update user's team
        await User.findByIdAndUpdate(
            userId,
            {
                $set: { team: teamId }
            }
        );

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
