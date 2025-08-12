import User from "../models/users.model.js";

export const createUser = async (req, res, next) => {
    try {
        const { fullName, password, position } = req.body;

        if (!fullName || !password || !position) {
            const error = new Error("All fields are required");
            error.statusCode = 400;
            throw error;
        };

        const username = fullName;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 400;
            throw error;
        }

        const newUser = new User({
            fullName,
            password,
            position,
            username,
        });

        const user = await newUser.save();
        const userObj = user.toObject();
        delete userObj.password;

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: userObj,
        });
    } catch (error) {
        next(error);
    };
};