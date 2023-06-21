import { connectDB } from "@/database/mongodb";
import Listing from "@/models/Listing";

export default async function getListings(){
    try {
        await connectDB();
        const listings = await Listing.find({}).sort({createdAt: 'desc'});

        return JSON.parse(JSON.stringify(listings));
    } catch (err) {
        throw new Error(err);
    }
}