import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET)
        
        const user = await User.findById(decoded.id).select("-password -__v");

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized access"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: "error",
            message: "Unauthorized access",
            error: error.message,
        });
    };
};

export default authorize;