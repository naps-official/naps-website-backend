import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (req, _, next) => {
  if (req.body.image) {
    try {
      const publicId = `IMG_${Date.now()}`;

      const result = await cloudinary.uploader.upload(req.body.image, {
        folder: "naps_folder",
        public_id: publicId,
        overwrite: true,
      });

      req.body.image = result.secure_url;
      next();
    } catch (error) {
      console.error(error.message);
      const err = new Error("Image upload failed");
      err.statusCode = 500;
      next(err);
    }
  } else {
    next();
  }
};

export default uploadImage;
