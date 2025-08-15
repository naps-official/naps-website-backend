import News from "../models/news.models.js";

export const getAllNews = async (_, res, next) => {
  try {
    const news = await News.find()
      .populate({
        path: "author.user",
        select: "fullName username position -_id",
      })
      .sort({ createdAt: -1 });

    const processedNews = news.map((item) => {
      if (!item.author.user) {
        return {
          ...item.toObject(),
          author: {
            fullName: item.author.fullName,
            username: item.author.username,
          },
        };
      }
      return item;
    });

    res.status(200).json({
      status: "success",
      message: "All news fetched successfully",
      data: processedNews,
      total_count: processedNews.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      const error = new Error(`News with ID ${id} cannot be found`);
      error.statusCode = 404;
      throw error;
    }

    await news.populate({
      path: "author",
      select: "fullName username position -_id",
    });

    res.status(200).json({
      status: "success",
      message: "News fetched successfully",
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const createNews = async (req, res, next) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      const error = new Error("Title and content are required");
      error.statusCode = 400;
      throw error;
    }

    const news = new News({
      title,
      content,
      image,
      author: {
        user: req.user._id,
        fullName: req.user.fullName,
        username: req.user.username,
      },
    });

    const savedNews = await news.save();

    res.status(201).json({
      status: "success",
      message: "News created successfully",
      data: savedNews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      const error = new Error(`News with ID ${id} cannot be found`);
      error.statusCode = 404;
      throw error;
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
