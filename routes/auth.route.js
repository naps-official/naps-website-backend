import { Router } from "express";

import {
  signIn,
  changePassword,
  resetPasswordRequest,
} from "../controllers/auth.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", signIn);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/change-password", validateUser(), changePassword);

export default router;
