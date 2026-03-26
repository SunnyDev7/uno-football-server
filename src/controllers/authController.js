import crypto from "crypto";
import { User } from "../models/index.js";

// POST /v1/auth/session — create or resume a session
export const createSession = async (req, res) => {
  const { nickname } = req.body;

  if (!nickname || typeof nickname !== "string" || nickname.trim().length === 0) {
    return res.status(400).json({ error: "nickname is required" });
  }

  if (nickname.trim().length > 20) {
    return res.status(400).json({ error: "nickname must be 20 characters or less" });
  }

  const sessionId = crypto.randomUUID();

  const user = await User.create({
    sessionId,
    nickname: nickname.trim(),
  });

  res.status(201).json({
    sessionId: user.sessionId,
    nickname: user.nickname,
  });
};

// GET /v1/auth/session/:sessionId — get user by session
export const getSession = async (req, res) => {
  const { sessionId } = req.params;

  const user = await User.findOne({ sessionId });

  if (!user) {
    return res.status(404).json({ error: "Session not found" });
  }

  // refresh lastActive
  user.lastActive = new Date();
  await user.save();

  res.json({
    sessionId: user.sessionId,
    nickname: user.nickname,
    stats: user.stats,
    createdAt: user.createdAt,
  });
};
