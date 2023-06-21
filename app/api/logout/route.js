import { connectDB } from "@/database/mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    req,
  ) {
        try {
            await connectDB();
            cookies().delete('user');
            return NextResponse.json("success", {status: 200});
        } catch (error) {
            return NextResponse.json(error.message, {status: 400});
        }
}