import { connectDB } from "@/database/mongodb";
import User from "@/models/User";
import mongoose from "mongoose";
import { cookies } from 'next/headers'

export const getCurrentUser = async () => {
    try {
        await connectDB();
        const cookieStore = cookies();
        const user = cookieStore.get("user");
        if(!user) return null;
        const _id = JSON.parse(user.value)._id;
        const currentUser = await User.findById(_id);
        return JSON.parse(JSON.stringify(currentUser)); 
    } catch (err) {
        throw new Error(err);
    }
}

export default getCurrentUser;