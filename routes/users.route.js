import { Router } from "express";

import { createUser, getUsers, getUserById } from "../controllers/user.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateUser("President"), createUser);
router.get("/:id", getUserById);

export default router;