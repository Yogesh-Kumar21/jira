// lib/auth.ts
import jwt from "jsonwebtoken";

export function verifyToken(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/id=([^;]+)/);

    if (!match) throw new Error("No token found");

    const token = match[1];
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decoded; // contains user.id
    } catch (err: any) {
        throw new Error("Invalid token");
    }
}
