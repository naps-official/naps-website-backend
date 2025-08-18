import { Router } from "express";

import {
  getAllRequests,
  getRequest,
} from "../controllers/passwordResetRequest.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyUser(), getAllRequests);
router.get("/:id", verifyUser(), getRequest);

export default router;
