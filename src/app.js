import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server Up!", timestamp: new Date().toISOString() });
});

app.use("/v1/auth", authRoutes);

export default app;
