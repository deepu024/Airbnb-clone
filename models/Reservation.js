
import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
      startDate: Date,
      endDate: Date,
      totalPrice: Number,
      createdAt: { type: Date, default: Date.now },
    },
    { timestamps: { updatedAt: false } }
  );


const Reservation = mongoose.models.Reservation || mongoose.model("Reservation", ReservationSchema);

export default Reservation;