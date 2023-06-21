import getCurrentUser from "@/app/actions/getCurrentUser";
import { connectDB } from "@/database/mongodb";
import Listing from "@/models/Listing";
import { NextResponse } from "next/server";


export async function POST(
    req,
  ) {
        try {
            const currentUser = await getCurrentUser();

            if (!currentUser) {
                return NextResponse.error();
            }

            await connectDB();

            const body = await req.json();
            const { 
              title,
              description,
              imageSrc,
              category,
              roomCount,
              bathroomCount,
              guestCount,
              location,
              price,
             } = body;

            Object.keys(body).forEach((value) => {
                if (!body[value]) {
                throw new Error(value + ' is  Required');
                }
              });

              const listing = await Listing.create({
                  title,
                  description,
                  imageSrc,
                  category,
                  roomCount,
                  bathroomCount,
                  guestCount,
                  locationValue: location.value,
                  price: parseInt(price, 10),
                  userId: currentUser._id
              });
              return NextResponse.json(listing, {status: 200});
        } catch (error) {
            return NextResponse.json(error.message, {status: 400});
        }
}