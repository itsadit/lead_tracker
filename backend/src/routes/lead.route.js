import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.get("/", getLeads);
router.post("/", createLead);
router.patch("/:id/status", updateLeadStatus);
export default router;
