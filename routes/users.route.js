import { Router } from "express";

import { createUser, getUsers } from "../controllers/user.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", validateUser("President"), createUser);
router.get("/", getUsers);

export default router;