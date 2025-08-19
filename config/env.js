import { config } from "dotenv";
config(
  { path: `.env.${process.env.NODE_ENV || "development"}.local` },
  { debug: true }
);

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRATION,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
