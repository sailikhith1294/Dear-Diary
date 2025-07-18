import geminiAi from "../gemini/geminiClient.js";


export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await geminiAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Please help me create a short paragraph on this event. 
        \n\n ${prompt} \n\n 
        Make sure to only return valid json object which has title and description. 
        Don't add any additional text.
    `,
    });

    const jsonText = response.text.replace('```json', '').replace('```', '').trim();
    console.log('------->', jsonText);
    const responseObj = JSON.parse(jsonText);

    res.status(200).json({ result: responseObj });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    res.status(500).json({ error: "Failed to generate content" });
  }
};


// import geminiAi from "../gemini/geminiClient.js";

// export const generateContent = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const result = await geminiAi.generateContent(`
//       Please help me create a short diary entry on this event or thought:
//       \n\n ${prompt} \n\n
//       Return output as valid JSON object ONLY in this format:
//       {
//         "title": "Short Title Here",
//         "description": "One short paragraph only"
//       }
//       Do not add any text before or after the JSON.
//     `);

//     const response = await result.response;
//     const rawText = await response.text(); // IMPORTANT: `await`
//     console.log("🧠 Raw Gemini:", rawText);

//     // Strip markdown backticks and parse JSON safely
//     const cleaned = rawText
//       .replace(/```json/g, '')
//       .replace(/```/g, '')
//       .trim();

//     const json = JSON.parse(cleaned);
//     res.status(200).json({ result: json });
//   } catch (error) {
//     console.error("Gemini Error:", error.message);
//     res.status(500).json({ error: "Failed to generate content" });
//   }
// };