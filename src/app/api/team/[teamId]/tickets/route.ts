// app/api/team/[teamId]/tickets/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Team from "@/lib/models/Team";

export async function GET(req: Request, context: { params: { teamId: string } }) {
    try {
        await dbConnect();

        const team: any = await Team.findById(context.params.teamId)
            .populate({
                path: "tickets",
                populate: {
                    path: "assigned_by",
                    select: "name logo"
                }
            });

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        return NextResponse.json(team.tickets, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
