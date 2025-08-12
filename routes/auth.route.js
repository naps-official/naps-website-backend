import { Router } from "express";

import { signIn } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", signIn);

export default router;