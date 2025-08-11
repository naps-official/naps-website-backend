import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
    res.status(200).json({
        status: "success",
        message: "Users fetched successfully"
    })
});

export default router;