const asyncHandler = require("../middleware/asyncHandler");
const { generateContent } = require("../utils/ai");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const { ChatOpenAI } = require("@langchain/openai");
const config = require("../config/config");
const {
  CheerioWebBaseLoader,
} = require("@langchain/community/document_loaders/web/cheerio");
const cheerio = require("cheerio");
const axios = require("axios");

const llm = new ChatOpenAI({
  model: "gpt-4.1-nano",
  temperature: 0,
  maxTokens: 500,
  timeout: 60000,
  maxRetries: 2,
  apiKey: config.OPENAI_API_KEY,
});

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
  const url = [
    "https://docs.chaicode.com/youtube/chai-aur-devops/setup-vpc/",
    "https://docs.chaicode.com/youtube/chai-aur-devops/setup-nginx/",
    
  ];

  const loader = new CheerioWebBaseLoader(url, {
    selector: ".main-pane",
  });

  const docs = await loader.load();

  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const mainPane = $(".main-pane").clone();
  mainPane.find("style, script, header, footer, nav").remove();

  const cleanContent = mainPane.text().replace(/\s+/g, " ").trim();

  docs[0].pageContent = cleanContent;

  console.log("Page URL:", docs[0].metadata.source);
  console.log("Clean Content:", docs[0].pageContent);

  res.status(200).json({
    success: true,
    url: docs[0].metadata.source,
    content: docs[0].pageContent,
    metadata: docs[0].metadata,
  });
});
