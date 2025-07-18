import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AIpage = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerated, setAiGenerated] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchEntries();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/diary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(res.data);
    } catch (err) {
      alert("Failed to fetch entries", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateAI = async () => {
    if (!aiPrompt) return alert("Please enter a prompt first.");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/ai/generate`,
        { prompt: aiPrompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { title, description } = res.data.result;
      setForm({ title, content: description });
      setAiGenerated(true);
    } catch (err) {
      alert("AI generation failed.", err);
    }
    setLoading(false);
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
      setAiGenerated(false);
      fetchEntries();
    } catch (err) {
      alert("Saving failed", err);
    }
  };

  const handleEdit = (entry) => {
    setForm({ title: entry.title, content: entry.content });
    setEditId(entry._id);
    setAiGenerated(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/diary/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEntries();
    } catch (err) {
      alert("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-50 to-purple-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 font-serif">
          ✨ Say what's on your mind
        </h1>

        {/* Prompt Input */}
        <div className="mb-6 bg-white p-6 rounded-lg shadow border border-purple-200">
          <input
            type="text"
            placeholder="Share your mood, a memory, or a theme and let AI guide your writing.."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-700"
          />
          <button
            onClick={generateAI}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow gap-x-4 "
          >
            {loading ? "Generating..." : "Generate Thought"}
          </button>
          <button
            onClick={() => navigate("/choose-mode")}
            className="bg-gray-200 px-5 py-2 rounded-md hover:bg-gray-300 center gap-x-4 ml-auto"
          >
            🔙            
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 gap-x-4 "
          >
            Logout
          </button>
        </div>

        {/* AI Form Display */}
        {aiGenerated && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8"
          >
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full p-3 border border-gray-300 rounded mb-4"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder="Entry content"
              required
              className="w-full p-3 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            >
              {editId ? "Update Entry" : "Save Entry"}
            </button>
          </form>
        )}

        {/* Saved Entries */}
        <div className="space-y-6">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-100 border-l-4 border-purple-400 p-6 rounded-xl shadow-xl"
            >
              <h2 className="text-xl font-semibold text-purple-700">
                {entry.title}
              </h2>
              <p className="mt-2 text-gray-700 whitespace-pre-line">
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

export default AIpage;
