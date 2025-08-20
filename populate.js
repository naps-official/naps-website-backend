import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import User from "./models/users.model.js";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MONGO_URI,
} from "./config/env.js";
import users from "./userPopulate.json" with { type: "json" };
import connectDB from "./db/connectdb.js";
import { hashPassword } from "./utils/index.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "users_images",
    public_id: `IMG_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`,
    overwrite: true,
  });
  return result.secure_url;
};

const getUsername = (fullname) => {
  const firstname = fullname.toLowerCase().split(" ")[0];
  const lastname = fullname.toLowerCase().split(" ")[1];
  return `${firstname}${lastname}`;
};

const populateDatabase = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("Connected for populating");

    await User.deleteMany({});
    console.log("Clearing existing users");

    const processedUsers = await Promise.all(
      users.map(async (user) => {
        const userImage = await uploadImage(user.image);

        const hashedPassword = await hashPassword(user.password);

        return {
          fullName: user.fullName,
          position: user.position,
          password: hashedPassword,
          username: getUsername(user.fullName),
          image: userImage,
        };
      })
    );

    await User.insertMany(processedUsers);
    console.log("Database populated successfully");
  } catch (error) {
    console.error("Error populating users:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
};

populateDatabase();
