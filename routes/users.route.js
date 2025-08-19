import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import validateUser from "../middlewares/auth.middleware.js";
import uploadImage from "../middlewares/uploadImage.middleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser("President"), uploadImage, createUser);
router.get("/:id", getUserById);
router.patch("/:id", validateUser("President"), uploadImage, updateUser);
router.delete("/:id", validateUser("President"), deleteUser);

export default router;
