import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/diary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      alert("Failed to fetch diary entries",err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/diary/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/diary`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ title: "", content: "" });
      setEditId(null);
      fetchEntries();
    } catch (err) {
      alert("Failed to save entry",err);
    }
  };

  const handleEdit = (entry) => {
    setForm({ title: entry.title, content: entry.content });
    setEditId(entry._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/diary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEntries();
    } catch (err) {
      alert("Delete failed",err);
    }
  };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 px-4 relative">
//       {/* AI Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">📓 DearDiary Dashboard</h1>
//         <Link to="/ai">
//           <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded shadow">
//           Thoughts📝
//           </button>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit} className="mb-6 space-y-4">
//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="content"
//           placeholder="Content"
//           value={form.content}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             {editId ? "Update Entry" : "Add Entry"}
//           </button>
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded ml-auto"
//           >
//             Logout
//           </button>
//         </div>
//       </form>

//       <div className="space-y-4">
//         {entries.map((entry) => (
//           <div key={entry._id} className="border rounded p-4 bg-gray-50 shadow-sm">
//             <h2 className="text-xl font-semibold">{entry.title}</h2>
//             <p>{entry.content}</p>
//             <div className="mt-2 flex gap-4">
//               <button
//                 onClick={() => handleEdit(entry)}
//                 className="text-blue-500 hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(entry._id)}
//                 className="text-red-500 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

return (
  <div className="min-h-screen bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat px-4 py-10">
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#3b3b3b] font-serif">
          📓 DearDiary
        </h1>
        <Link to="/ai">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-lg font-medium shadow">
            ✨ Thought Assistant
          </button>
        </Link>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 rounded-lg shadow-md p-6 border border-gray-200 mb-8"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-700"
        />
        <textarea
          name="content"
          placeholder="What's on your mind?"
          value={form.content}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-3 border border-gray-300 rounded text-gray-700"
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-medium"
          >
            {editId ? "Update Entry" : "Add Entry"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow font-medium"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/choose-mode")}
            className="mb-4 flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded shadow"
          >
            <span>🔙</span> 
          </button>
        </div>
      </form>

      {/* Entries */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry._id}
            className="bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-100 border-l-4 border-purple-400 p-6 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-semibold text-[#4b4b4b]">
              {entry.title}
            </h2>
            <p className="text-gray-800 mt-2 whitespace-pre-line">
              {entry.content}
            </p>

            <div className="mt-4 flex gap-6 text-sm">
              
              <button
                onClick={() => handleEdit(entry)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    {entries.map((entry) => (
  <div key={entry._id} className="bg-white p-4 rounded shadow mt-4">
    <h3 className="text-xl font-semibold">{entry.title}</h3>
    <p className="text-gray-700">{entry.description}</p>
    <p className="text-sm text-gray-500 mt-2">
      Created on: {new Date(entry.createdAt).toLocaleString()}
    </p>
  </div>
))}
  </div>
);
};

export default Dashboard;