import express from "express";
import { createEntry, getEntries, updateEntry, deleteEntry } from "../controllers/diaryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();
// Create entry
router.post("/", verifyToken, createEntry);
// Get entries
router.get("/", verifyToken, getEntries);
// Update entry
router.put("/:id", verifyToken, updateEntry);
// Delete entry
router.delete("/:id", verifyToken, deleteEntry);

export default router;