import { Router } from "express";

import { createNews } from "../controllers/news.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

// Get all News
router.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "All news fetched successfully"
    });
});

// Create News
router.post("/", validateUser(), createNews);

// Get one post
router.get("/:id", (req, res) => {
    const { id } = req.params
    res.status(200).json({
        status: "success",
        message: `News with id ${id} fetched successfully`
    });
});

// Patch one post
router.patch("/:id", (req, res) => {
    const { id } = req.params
    res.status(200).json({
        status: "success",
        message: `News with id ${id} updated successfully`
    });
});

// Delete one post
router.delete("/:id", (req, res) => {
    res.status(204).end();
});

export default router;