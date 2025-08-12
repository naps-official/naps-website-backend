import { Router } from "express";

import { createUser, getUsers, getUserById, deleteUser } from "../controllers/user.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser("President"), createUser);
router.get("/:id", getUserById);
router.delete("/:id", validateUser("President"), deleteUser);

export default router;