// app/api/ticket/create/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/lib/models/User";
import Team from "@/lib/models/Team";
import Ticket from "@/lib/models/Ticket";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        await dbConnect();

        // Get logged-in user ID
        const userPayload: any = verifyToken(req);
        const userId = userPayload.id;

        // Parse request body
        const { name, description, priority } = await req.json();

        // Find user and their team
        const user: any = await User.findById(userId);
        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        const team: any = await Team.findById(user.team);
        if (!team) return NextResponse.json({ message: "Team not found" }, { status: 404 });

        // Create new ticket
        const ticket: any = new Ticket({
            name,
            description,
            assigned_by: userId,
            priority
        });

        const savedTicket: any = await ticket.save();
        console.log("NEW TICKET:", savedTicket);

        // Add ticket to team
        team.tickets.push(savedTicket._id);
        await team.save();

        return NextResponse.json({ success: true, ticket: savedTicket }, { status: 201 });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
