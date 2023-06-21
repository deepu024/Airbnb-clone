import { connectDB } from "@/database/mongodb";
import Reservation from "@/models/Reservation";

export default async function getReservations(
  params
) {
  try {
    await connectDB();
    const { listingId, userId, authorId } = params;
    let reservations;
    
    if (listingId) {
      reservations = await Reservation.find({listingId}).populate("listingId");
    };

    if (userId) {
      reservations = await Reservation.find({userId}).populate("listingId");
    }

    if (authorId) {
      reservations = await Reservation.find({userId: authorId}).populate("listingId");
    }

    return JSON.parse(JSON.stringify(reservations));
  } catch (error) {
    throw new Error(error);
  }
}