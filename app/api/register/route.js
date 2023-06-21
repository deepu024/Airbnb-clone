import { connectDB } from "@/database/mongodb";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(
    req, 
  ) {
        try {
            await connectDB();
            const {email, password, name} = await req.json();
            if(!email || !password || !name) {
                return NextResponse.json({message: "Invalid email or password"}).status(400);
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({email, name, hashedPassword});
            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json(error.message, {status: 400});
        }
}