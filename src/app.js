import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "Server Up!", timestamp: new Date().toISOString() });
});

export default app;
