import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
    {
      title: String,
      description: String,
      imageSrc: String,
      createdAt: { type: Date, default: Date.now },
      category: String,
      roomCount: Number,
      bathroomCount: Number,
      guestCount: Number,
      locationValue: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      price: Number,
      // reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
    },
    { timestamps: { updatedAt: true } }
  );

const Listing = mongoose.models.Listing || mongoose.model("Listing", ListingSchema);

export default Listing;