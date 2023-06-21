import getCurrentUser from "@/app/actions/getCurrentUser";
import Listing from "@/models/Listing";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function POST(
    req, 
  ) {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return NextResponse.error();
    }
    const {listingId,
        startDate,
        endDate,
        totalPrice} = await req.json();

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }
    
    const reservation = await Reservation.create({
        userId: currentUser._id,
        listingId,
        startDate,
        endDate,
        totalPrice,
    });

    return NextResponse.json(reservation);
    
  }