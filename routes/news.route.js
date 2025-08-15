import { Router } from "express";

import {
  createNews,
  getAllNews,
  getNewsById,
  deleteNews,
  updateNews,
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
router.patch("/:id", validateUser(), updateNews);

// Delete one post
router.delete("/:id", validateUser(), deleteNews);

export default router;
