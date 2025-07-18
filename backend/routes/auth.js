import express from "express";
import { sendVerificationCode,registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();  
router.post("/send-code", sendVerificationCode);
// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);

export default router;