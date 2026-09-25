import express from "express";
import leadRoutes from "./routes/lead.route.js";

const app = express();
app.use(express.json());

app.use("/api/lead", leadRoutes);

app.get("/", (req, res) => {
  res.json({ message: "LeadTracker API is running" });
});

export default app;
