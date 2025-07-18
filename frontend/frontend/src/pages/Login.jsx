// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login successful");
      navigate("/choose-mode");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
//         <button className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
//         <p className="text-sm text-red-500">{msg}</p>
//       </form>
//     </div>
//   );
// };

 return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden">
      {/* Animated stars */}
      <div className="absolute inset-0 pointer-events-none animate-pulse bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-30" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-xl shadow-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">📘 Login to Your Diary</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-lg transition duration-300"
        >
          Login
        </button>

        {msg && (
          <p
            className={`text-sm text-center font-medium ${
              msg.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {msg}
          </p>
        )}

        <p className="text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
