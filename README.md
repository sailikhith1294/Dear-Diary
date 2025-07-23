# 📓 DearDiary

**DearDiary** is a full-stack diary application that allows users to write, save, and manage personal diary entries. Users can either write entries manually or get AI-generated suggestions based on their mood and prompts. The app features secure authentication with email verification and offers a clean, intuitive interface.

---

## ✨ Features

- ✅ User Authentication (Register, Login, Logout)
- 📧 Email Verification via secure token link
- 📝 Two Writing Modes:
  - **Write Yourself** – Manual entry
  - **Guided Thoughts** – AI-based suggestions (OpenAI)
- 📂 Dashboard to view, edit, and delete diary entries
- 🔒 JWT-Protected Routes
- 📦 Data stored securely in MongoDB Atlas
- ☁️ Frontend hosted on **Vercel**, Backend on **Render**

---

## 🧱 Tech Stack

| Layer      | Technology                      |
|------------|----------------------------------|
| Frontend   | React, Vite, Axios, CSS          |
| Backend    | Node.js, Express, JWT, Nodemailer|
| Database   | MongoDB Atlas (Mongoose)         |
| AI Engine  | OpenAI API (for guided entries)  |
| Hosting    | Vercel (frontend), Render (backend) |

---

## 🖼️ Architecture

You can view the system architecture here:  
🔗 [Architecture Diagram (Public Link)](https://drive.google.com/drive/my-drive?q=after:2025-07-23%20parent:0ANyFv7AdjR9pUk9PVA)

---
## 📁 Folder Structure

dear-diary/
├── frontend/ # React client
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Auth, Dashboard, Write, AI pages
│ │ └── ...
├── backend/ # Node.js Express server
│ ├── routes/ # Auth and Diary APIs
│ ├── controllers/ # Route logic
│ ├── middleware/ # JWT, error handling
│ └── ...


## 🚀 Getting Started

### 📁 Clone the Repository
```bash
git clone https://github.com/yourusername/dear-diary.git
cd dear-diary
