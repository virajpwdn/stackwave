const config = require("../config/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(config.AI_SECRET);

const generateContent = async (prompt) => {
  const model = ai.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "Look GPT, you will get a prompt okay? In this prompt you will recive code. This code will be in any programming langauge. The moto of the user will to fix the code which might have issues or if there are no issues in code then give him better suggestions on how they can imporve the code quality for production. Always recommend them production level code. Don't explain the code unless in prompt the user explicitely mentions to explain the code. Also you should always greet developers with hey, welcome to stackwave.",
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = { generateContent };
