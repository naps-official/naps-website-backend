import { v2 as cloudinary } from "cloudinary";
import * as cheerio from "cheerio";

const uploadImage = async (req, _, next) => {
  const { content, image } = req.body;
  const uploads = [];

  try {
    if (content) {
      const $ = cheerio.load(content);
      const embeddedImages = $("img");

      embeddedImages.each(async (i, img) => {
        const src = $(img).attr("src");

        if (src && src.startsWith("data:image")) {
          const result = await cloudinary.uploader.upload(src, {
            folder: "contents_images",
            public_id: `IMG_${Date.now()}_${i}`,
            overwrite: true,
          });
          $(img).attr("src", result.secure_url);
          uploads.push(result);
        }
      });

      await Promise.all(uploads);
      req.body.content = $.html();
    }

    if (image && typeof image === "string" && image.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "users_images",
        public_id: `IMG_${Date.now()}`,
        overwrite: true,
      });
      req.body.image = result.secure_url;
    }

    next();
  } catch (error) {
    const err = new Error(`${error.message}`);
    err.statusCode = 500;
    next(err);
  }
};

export default uploadImage;
