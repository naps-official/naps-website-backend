import { Router } from "express";

import {
  signIn,
  changePassword,
  resetPasswordRequest,
  handleResetPasswordRequest,
} from "../controllers/auth.controller.js";
import validateUser from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", signIn);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/change-password", validateUser(), changePassword);
router.patch(
  "/reset-password",
  validateUser("President", "Vice President"),
  handleResetPasswordRequest
);

export default router;
