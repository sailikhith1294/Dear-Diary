// app.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"; // ✅ Import routes AFTER initializing app
import diaryRoutes from "./routes/diary.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true })); // ✅ Use express.urlencoded for form data 
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // ✅ Call after app is defined
app.use("/api/diary", diaryRoutes);
app.use("/api/ai", aiRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
