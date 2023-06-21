import getCurrentUser from "@/app/actions/getCurrentUser";
import Reservation from "@/models/Reservation";
import { NextResponse } from "next/server";

export async function DELETE(
    request, 
    { params }
  ) {
    const currentUser = await getCurrentUser();
  
    if (!currentUser) {
      return NextResponse.error();
    }
  
    const { reservationId } = params;
  
    if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('Invalid ID');
    }
  
    const reservation = await Reservation.deleteMany({
        _id: reservationId,
    },{
        userId: currentUser._id,
        listingId: { userId: currentUser._id }
    });
  
    return NextResponse.json(reservation);
  }