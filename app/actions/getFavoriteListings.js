
import getCurrentUser from "./getCurrentUser";
import Listing from "@/models/Listing";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await Listing.find({
        _id: { $in: currentUser.favoriteIds || [] }
    });

    return JSON.parse(JSON.stringify(favorites));
  } catch (error) {
    throw new Error(error);
  }
}