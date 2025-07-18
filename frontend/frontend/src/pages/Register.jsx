import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(1); // 1 = send code, 2 = verify code
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/send-code", {
        email: form.email,
      });
      setMsg("✅ Verification code sent to your email.");
      setStep(2);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error sending code.");
    }
  };

  const verifyCodeAndRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        code,
      });
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Registered successfully!");
      navigate("/choose-mode");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center font-mono overflow-hidden">
      <div className="absolute w-72 h-72 bg-green-900 opacity-10 rounded-full -top-10 -left-20 blur-2xl animate-pulse-slow"></div>
      <div className="absolute w-96 h-96 bg-blue-800 opacity-10 rounded-full -bottom-16 -right-20 blur-2xl animate-ping-slow"></div>

      <form
        onSubmit={step === 1 ? sendVerificationCode : verifyCodeAndRegister}
        className="z-10 bg-white/10 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg px-10 py-12 w-full max-w-md text-gray-100"
      >
        <h1 className="text-3xl mb-6 text-center font-semibold tracking-wider text-green-400">
          Register Journal 📓
        </h1>

        {step === 1 && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full mb-6 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full mb-4 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="w-full mb-6 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white font-bold py-3 rounded-md shadow-md"
        >
          {step === 1 ? "Send Verification Code" : "Create Account"}
        </button>

        <p
          className="text-center mt-4 text-sm text-blue-400 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already registered? Go to Login →
        </p>

        <p className="text-center mt-2 text-red-500 text-sm">{msg}</p>
      </form>
    </div>
  );
};

export default Register;