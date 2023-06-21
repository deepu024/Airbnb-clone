import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from "@/database/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";


export async function POST(
    req, 
    {params}
){
    await connectDB();
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }

    const {listingId} = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }

    let favoriteIds = [...(currentUser.favoriteIds) || []];

    favoriteIds.push(listingId);

    const user = await User.findOneAndUpdate({_id: currentUser._id}, {
        favoriteIds
    });

    return NextResponse.json(user);
}

export async function DELETE(
    req,
    {params}
){
    await connectDB();
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.error();
    }
    const { listingId } = params;
    if(!listingId || typeof listingId !== "string"){
        throw new Error("Invalid ID");
    }
    let favoriteIds = [...(currentUser.favoriteIds) || []];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await User.findOneAndUpdate({_id: currentUser._id}, {
        favoriteIds
    });

    return NextResponse.json(user);
}