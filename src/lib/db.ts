// lib/db.ts
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL || "";

if (!MONGODB_URL) {
    throw new Error("[!] Please provide the DB connection string");
}

/**
 * Global is used to prevent multiple connections in development
 * because of Hot Module Reloading in Next.js
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
