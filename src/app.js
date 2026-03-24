import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;
