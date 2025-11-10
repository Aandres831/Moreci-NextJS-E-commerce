import { NextResponse } from "next/server";
import  connectDB  from "@/src/lib/mongodb";
import User from "@/src/models/User";

export async function GET() {
    await connectDB();


    const users = await User.find();
    return NextResponse.json({ users });
}
