// gemini.js
const { GoogleGenAI } = require('@google/genai');

// Server-side, API key environment variable se
const ai = new GoogleGenAI({ apiKey: process.env.GIMNIAPI });

async function main(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    // console.log(response.text);
    return response.text
  } catch (err) {
    console.error("Error generating content:", err);
  }
}



const getData  = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt)
    return res.status(400).json({ success: false, error: "Prompt is required" });

  try {
    const result = await main(prompt); // call Gemini function
    res.json({ success: true, text: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = getData ;