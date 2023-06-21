import { connectDB } from "@/database/mongodb";
import Listing from "@/models/Listing";

export default async function getListingById(
    params
){
    try{
        await connectDB();
        const {listingId} = params;

        const listing = await Listing.findById({_id: listingId});

        if(!listing){
            return null;
        }
    
        return JSON.parse(JSON.stringify(listing));
    }catch(err){
        throw new Error(err);
    }

}