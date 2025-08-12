import User from "../models/users.model.js";

export const createUser = async (req, res, next) => {
    try {
        const { fullName, password, position } = req.body;
        const username = fullName;

        if (!fullName || !password || !position) {
            return res.status(400).json({
                status: "error",
                message: "Full name, password, and position are required fields.",
            });
        };

        const newUser = new User({
            fullName,
            password,
            position,
            username,
        });

        const user = await newUser.save();

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    };
};