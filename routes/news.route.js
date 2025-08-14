import { Router } from "express";

import {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
} from "../controllers/news.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

// Get all News
router.get("/", getAllNews);

// Create News
router.post("/", validateUser(), createNews);

// Get one post
router.get("/:id", getNewsById);

// Patch one post
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    status: "success",
    message: `News with id ${id} updated successfully`,
  });
});

// Delete one post
router.delete("/:id", validateUser(), deleteNews);

export default router;
