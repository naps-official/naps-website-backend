import News from "../models/news.models.js";

export const createNews = async (req, res, next) => {
    try {
        const { title, content, image } = req.body;

        if (!title || !content) {
            const error = new Error("Title and content are required");
            error.statusCode = 400;
            throw error;
        }

        const author = req.user._id

        const news = new News({
            title,
            content,
            image,
            author,
        });

        const savedNews = await news.save();

        await savedNews.populate({
            path: "author",
            select: "fullName username position -_id -password"
        });

        res.status(201).json({
            status: "success",
            message: "News created successfully",
            data: savedNews,
        })
    } catch (error) {
        next(error);
    }
}