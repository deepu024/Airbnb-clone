import { connectDB } from "@/database/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(
    req,
  ) {
        try {
            await connectDB();
            const {email, password} = await req.json();
            if(!email || !password) {
                return NextResponse.json({message: 'Invalid email or password'});
            }
            const user = await User.findOne({email});
            if(!user){
                throw new Error("User not found");
            }
            const comparePassword = await bcrypt.compare(password, user.hashedPassword);
            if(!comparePassword){
                throw new Error("Invalid Credentials");
            }
            cookies().set("user", JSON.stringify(user));
            return NextResponse.json({user}, {status: 200});
        } catch (error) {
            return NextResponse.json(error.message, {status: 400});
        }
}