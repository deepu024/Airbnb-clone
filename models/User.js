import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    emailVerified: {
        type: String
    },
    image: {
        type: String
    },
    hashedPassword: {
        type: String,
    },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
    reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    favoriteIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}]
}, {
    timestamps: true
});

const User = mongoose.models.User || mongoose.model("User", UserModel);

export default User;