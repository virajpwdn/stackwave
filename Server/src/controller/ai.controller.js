const asyncHandler = require("../middleware/asyncHandler");
const { generateContent } = require("../utils/ai");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const indexingQueue = require("../utils/queue/q/indexing.queue");
const { llmModel, vectorStore } = require("../utils/openai.service");
const { app } = require("../utils/langgraph/graph/rag.graph");

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

module.exports.indexingDocument = asyncHandler(async (req, res) => {
  const { docUrl, title } = req.body;
  console.log("TITLE ", title);

  if (!docUrl) throw new AppError(400, "urls are required to index");
  if (!title) throw new AppError(400, "title is required for collection");

  await indexingQueue.add("index-docs", { urls: docUrl, title: title });

  res
    .status(200)
    .json(new AppResponse(200, { success: true, message: "started indexing" }));
});

module.exports.retrivalQuery = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) throw new AppError(400, "user query is missing");

  const results = await app.invoke({
    userInput: query,
    documentType: "",
    isCollection: true,
    vectorResponse: "",
    llmResponse: "",
  });

  console.log("results -> ", results);

  res.status(200).json({ response: results });
});
