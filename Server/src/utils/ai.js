const config = require("../config/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(config.AI_SECRET);

const generateContent = async (prompt) => {
  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "give short responses in 100 words give analogy"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = { generateContent };
