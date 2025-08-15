import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [10, "Title must be at least 10 characters long"],
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minLength: [50, "Content must be at least 50 characters long"],
    },

    image: {
      type: String,
    },

    publishedAt: {
      type: Date,
      default: Date.now,
    },

    author: {
      full_name: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const News = mongoose.model("New", newsSchema);

export default News;
