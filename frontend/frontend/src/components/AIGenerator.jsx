
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt) return;

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || {});
    } catch (err) {
      setResponse({ title: "Error", description: "Something went wrong!",err });
    }
    setLoading(false);
  };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>🧠 Spark ideas with a little help.</h2>
//       <textarea
//         style={styles.textarea}
//         rows="4"
//         placeholder="Just say it — we'll put it into words..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         name="dairyPrompt"
//       />
//       <div style={styles.buttonGroup}>
//         <button onClick={handleGenerate} style={styles.button} disabled={loading}>
//           {loading ? "Thinking..." : "Generate"}
//         </button>

//         <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
//           🔙 
//         </button>
//       </div>

//       {response.title || response.description ? (
//         <div style={styles.response}>
//           <strong>AI Response:</strong>
//           <p><strong>{response.title}</strong></p>
//           <p>{response.description}</p>
//         </div>
//       ) : null}
//     </div>
//   );
// };

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "linear-gradient(to right, #fdfbfb, #ebedee)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: "2rem",
//     }}>
//       <div style={styles.container}>
//         <h2 style={styles.heading}>🧠 Spark ideas with a little help.</h2>

//         <textarea
//           style={styles.textarea}
//           rows="4"
//           placeholder="Just say it — we'll put it into words..."
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           name="dairyPrompt"
//         />

//         <div style={styles.buttonGroup}>
//           <button onClick={handleGenerate} style={styles.button} disabled={loading}>
//             {loading ? "Thinking..." : "Generate"}
//           </button>

//           <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
//             🔙 
//           </button>
//         </div>

//         {response.title || response.description ? (
//           <div style={styles.response}>
//             <strong>AI Response:</strong>
//             <p><strong>{response.title}</strong></p>
//             <p>{response.description}</p>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to right top, #a18cd1, #fbc2eb)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
    }}>
      <div style={{
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        padding: "2rem",
        borderRadius: "1rem",
        maxWidth: "700px",
        width: "100%",
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          color: "#4F46E5",
          textAlign: "center",
          marginBottom: "1rem"
        }}>🧠 Spark ideas with a little help.</h2>

        <textarea
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            resize: "vertical"
          }}
          rows="4"
          placeholder="Just say it — we'll put it into words..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          name="dairyPrompt"
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={handleGenerate} style={{
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }} disabled={loading}>
            {loading ? "Thinking..." : "Generate"}
          </button>

          <button onClick={() => navigate("/dashboard")} style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#E5E7EB",
            color: "#374151",
            border: "none",
            cursor: "pointer",
            fontWeight: "500"
          }}>
            🔙 
          </button>
        </div>

        {response.title || response.description ? (
          <div style={{
            marginTop: "30px",
            backgroundColor: "#7ff198ff",
            padding: "16px",
            borderRadius: "10px",
            color: "#111827",
          }}>
            <strong>AI Response:</strong>
            <p><strong>{response.title}</strong></p>
            <p>{response.description}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

//
export default AIGenerator;
