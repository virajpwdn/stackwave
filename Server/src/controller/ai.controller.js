const asyncHandler = require("../middleware/asyncHandler");
const { generateContent } = require("../utils/ai");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");

module.exports.refactorCodeAI = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    console.error("[refactorCodeAI] Prompt is missing in request body");
    throw new AppError(400, "code is required, so that AI can process");
  }
// console.log("Reached here");
//! Add a winston logger
  const response = await generateContent(prompt);
  res
    .status(200)
    .json(new AppResponse(200, response, "Response Generated Successfully"));
});
