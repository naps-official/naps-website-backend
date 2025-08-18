import { Router } from "express";

import { getAllRequests } from "../controllers/passwordResetRequest.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyUser(), getAllRequests);

export default router;
