
import User from "../models/User.js";
import EmailCode from "../models/EmailCode.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Step 1: Send verification code
export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await EmailCode.findOneAndUpdate(
      { email },
      { code, createdAt: new Date() },
      { upsert: true, new: true }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"DearDiary" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your DearDiary Verification Code",
      html: `<h3>Your verification code: <b>${code}</b></h3>`,
    });

    res.status(200).json({ msg: "Verification code sent to email." });
  } catch (err) {
    console.error("Send Code Error:", err);
    res.status(500).json({ msg: "Failed to send verification code" });
  }
};

// Step 2: Register with verification code
export const registerUser = async (req, res) => {
  try {
    const { email, password, username, code } = req.body;

    const emailCode = await EmailCode.findOne({ email });

    if (!emailCode || emailCode.code !== code)
      return res.status(400).json({ msg: "Invalid or expired verification code" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashed, username });
    await newUser.save();

    await EmailCode.deleteOne({ email }); // cleanup code

    res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    console.log("Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// (Unchanged)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};