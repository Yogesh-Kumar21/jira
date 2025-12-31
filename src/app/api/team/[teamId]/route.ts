// app/api/team/[teamId]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Team from "@/lib/models/Team";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
    try {
        await dbConnect();

        const {teamId} = await params;

        const userPayload: any = verifyToken(req);
        const userId = userPayload.id;

        const team: any = await Team.findById(teamId)
            .populate({
                path: "tickets",
                populate: {
                    path: "assigned_by",
                    select: "name logo"
                }
            })
            .populate({
                path: "members",
                populate: {
                    path: "memberId",
                    select: "name logo _id"
                }
            });

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        const isMember = team.members.find((t: any) => t.memberId._id.toString() === userId);
        if (!isMember) {
            return NextResponse.json({ message: "You are not a member of this team" }, { status: 400 });
        }

        return NextResponse.json({ data: team }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
