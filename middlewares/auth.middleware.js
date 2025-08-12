import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/users.model.js";

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access no bearer",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access no token"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        
        const user = await User.findById(decoded.userId).select("-password -__v");

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access no user"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: "error",
            message: "Unauthorized access  jsdfjsk",
            error: error.message,
        });
    };
};

export default authorize;