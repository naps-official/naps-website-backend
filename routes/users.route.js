import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/user.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser("President"), createUser);
router.get("/:id", getUserById);
router.patch("/:id", validateUser("President"), updateUser);
router.delete("/:id", validateUser("President"), deleteUser);

export default router;
