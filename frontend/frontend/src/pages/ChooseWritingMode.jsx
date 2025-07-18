import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Wand2, PenLine } from "lucide-react";

const ChooseWritingMode = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Glowing circles background effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-10 w-full max-w-2xl text-center z-10"
      >
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Welcome to DearDiary
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Choose how you want to begin today's thoughts
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex flex-col items-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl shadow-xl hover:from-blue-700 hover:to-indigo-700 transition duration-300 w-64"
          >
            <PenLine size={36} className="mb-2" />
            <span className="text-lg font-medium">✍️ Write on Your Own</span>
          </motion.button>

          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/guided-thoughts")}
            className="flex flex-col items-center bg-gradient-to-br from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 w-64"
          >
            <Wand2 size={36} className="mb-2" />
            <span className="text-lg font-medium">Guided Thoughts🤖</span>
          </motion.button> */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => navigate("/AIpage")}
            className="flex flex-col items-center bg-gradient-to-br from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl shadow-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 w-64"
          >
            <Wand2 size={40} className="mb-2" />
            <span className="text-xl font-semibold tracking-wide">
              Guided Thoughts 🤖
            </span>
          </motion.button>
        </div>
        <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow font-medium  mt-10"
          >
            Logout
          </button>
      </motion.div>
    </div>
  );
};

export default ChooseWritingMode;
