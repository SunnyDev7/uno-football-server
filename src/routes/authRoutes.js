import { Router } from "express";
import { createSession, getSession } from "../controllers/authController.js";

const router = Router();

router.post("/session", createSession);
router.get("/session/:sessionId", getSession);

export default router;
