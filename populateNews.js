import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import News from "./models/news.models.js";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  MONGO_URI,
} from "./config/env.js";
import news from "./newsPopulate.json" with { type: "json" };
import connectDB from "./db/connectdb.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "news_images",
    public_id: `IMG_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`,
    overwrite: true,
  });
  return result.secure_url;
};

const populateDatabase = async () => {
  try {
    await connectDB(MONGO_URI);
    console.log("Connected for populating");

    await News.deleteMany({});
    console.log("Clearing existing news");

    const processedNews = await Promise.all(
      news.map(async (newsItem) => {
        const newsImage = await uploadImage(newsItem.image);

        return {
          title: newsItem.title,
          content: newsItem.content,
          image: newsImage,
          author: newsItem.author,
          status: "draft"
        };
      })
    );

    await News.insertMany(processedNews);
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
