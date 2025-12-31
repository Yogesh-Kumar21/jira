// app/api/team/create/route.ts
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
        const { name, logo } = await req.json();

        if (!name || !logo) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        const user: any = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const team: any = new Team({
            name,
            logo,
            members: [
                {
                    memberId: userId,
                    role: ""
                }
            ],
            tickets: []
        });

        const savedTeam: any = await team.save();

        user.team = savedTeam._id;
        await user.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
