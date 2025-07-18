import mongoose from "mongoose";

const DiarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
   createdAt: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Diary", DiarySchema);
