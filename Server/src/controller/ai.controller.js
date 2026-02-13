const asyncHandler = require("../middleware/asyncHandler");
const { generateContent } = require("../utils/ai");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const indexingQueue = require("../utils/queue/q/indexing.queue");
const { QdrantClient } = require("@qdrant/js-client-rest");
const { llmModel, vectorStore } = require("../utils/openai.service");

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
  const { docUrl } = req.body;

  if (!docUrl) throw new AppError(400, "urls are required to index");

  await indexingQueue.add("index-docs", { urls: docUrl });

  res
    .status(200)
    .json(new AppResponse(200, { success: true, message: "started indexing" }));
});

module.exports.retrivalQuery = asyncHandler(async (req, res) => {
  const { query } = req.body;

  if (!query) throw new AppError(400, "user query is missing");



  // figure out collection name to search in vector db
  const SYSTEM_PROMPT = `You are a expert software engineer with 50 years of experience, you are CTO of fortune 500 companies. Your job is to check from query which you will get from user, you have to determine the query is in which domain. so that we can check in relavent collection in db.
  
  You can only choose from the following domain/topic
  1. DevOps Docs
  2. HTML Docs
  3. CSS Docs
  4. Python Docs
  5. Javascript Docs

  Strictly return the data in json format.
  
  This is the query from user - ${query}
  `;

  const llmClient = llmModel("gpt-4.1-nano");
  const response = await llmClient.invoke([
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
  ]);
  console.log(response.content);

  // To check if collection exist in vector db
  const client = new QdrantClient({ url: "http://localhost:6333" });

  async function collectionExist(client, collectionName) {
    try {
      await client.getCollection(collectionName);
      return true;
    } catch (error) {
      return false;
    }
  }

  const collectionName = "DevOps Docs";
  const exists = await collectionExist(client, collectionName);

  const qdrantClient = await vectorStore(collectionName);
  const results = await qdrantClient.similaritySearch(query, 15);

  const contextDocuments = results
    .map((doc, index) => {
      return `
        Document ${index + 1}:
        Content: ${doc.pageContent}
        Source: ${doc.metadata?.source || "Unknown"}
        ${doc.metadata?.url ? `Link: ${doc.metadata.url}` : ""}`;
    })
    .join("\n");

  console.log("first", contextDocuments);

  const llmClientAdvanceModel = llmModel("gpt-5.1");

  const SYSTEM_INSTRUCTION = `You are a software engineer a CTO of a company with over 50 years of experience. You will get a query from user and you will get response from our vector database where we have relavent or similar information about the query 

  while explaining to user keep the language very simple and give examples and analogies. Also in vector db response you will also get links to the articles which you can use, if a user wants to read more then they can do it via clicking on the link.
  
  Following is the query and response
  ${query},
  ${contextDocuments}
  `;

  const output = await llmClientAdvanceModel.invoke([
    { role: "system", content: SYSTEM_INSTRUCTION },
  ]);

  console.log("output - ", output);
  res.status(200).json({ check: exists, response: output });
});
