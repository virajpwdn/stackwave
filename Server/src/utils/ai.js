const config = require("../config/config");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: config.AI_SECRET });

const generateContent = async ()=> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
};

module.exports = generateContent;