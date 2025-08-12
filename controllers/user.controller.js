import User from "../models/users.model.js";

export const createUser = async (req, res) => {
    try {
        const { fullName, password, position } = req.body;

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
        });

        const user = await newUser.save();

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: { ...user },
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Internal server error" });
    };
};