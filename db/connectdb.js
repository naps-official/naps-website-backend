import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Database connected succesfully!");
    } catch(error) {
        console.error(error.message);
    };
};

export default connectDB