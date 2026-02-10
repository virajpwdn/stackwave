const asyncHandler = require("../middleware/asyncHandler");
const { generateContent } = require("../utils/ai");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const { ChatOpenAI } = require("@langchain/openai");
const config = require("../config/config");
const cheerio = require("cheerio");
const axios = require("axios");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const pLimit = require("p-limit").default;
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

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

// module.exports.indexingDocument = asyncHandler(async (req, res) => {
//   const url = [
//     "https://docs.chaicode.com/youtube/chai-aur-devops/setup-vpc/",
//     "https://docs.chaicode.com/youtube/chai-aur-devops/setup-nginx/",
//   ];

//   const limit = pLimit;

//   const loader = new CheerioWebBaseLoader(url, {
//     selector: ".main-pane",
//   });

//   const docs = await loader.load();

//   const response = await axios.get(url);
//   const $ = cheerio.load(response.data);

//   const mainPane = $(".main-pane").clone();
//   mainPane.find("style, script, header, footer, nav").remove();

//   const cleanContent = mainPane.text().replace(/\s+/g, " ").trim();

//   docs[0].pageContent = cleanContent;

//   console.log("Page URL:", docs[0].metadata.source);
//   console.log("Clean Content:", docs[0].pageContent);

//   res.status(200).json({
//     success: true,
//     url: docs[0].metadata.source,
//     content: docs[0].pageContent,
//     metadata: docs[0].metadata,
//   });
// });

module.exports.indexingDocument = asyncHandler(async (req, res) => {
  const { docUrl } = req.body;
  const urls = docUrl;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 50,
  });

  const limit = pLimit(5);
  const embeddings = new OpenAIEmbeddings({
    apiKey: config.OPENAI_API_KEY,
    batchSize: 512,
    model: "text-embedding-3-large",
  });
  const startTime = Date.now();

  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: config.QDRANT_URL,
      collectionName: "DevOps Docs",
    },
  );

  const results = await Promise.all(
    urls.map((url, index) =>
      limit(async () => {
        console.log(`[${index + 1}/${urls.length}] Processing: ${url}`);

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const mainPane = $(".main-pane").clone();
        mainPane.find("style, script, header, footer, nav").remove();

        const chunks = await splitter.splitText(
          mainPane.text().replace(/\s+/g, " ").trim(),
        );
        console.log("TEXT_CHUNKS - ", chunks);

        await vectorStore.addDocuments(
          chunks.map((chunk, i) => ({
            pageContent: chunk,
            metadata: {
              source: url,
              title: $("title").text(),
              chunkIndex: i,
              totalChunks: chunks.length,
            },
          })),
        );

        return {
          url,
          content: mainPane.text().replace(/\s+/g, " ").trim(),
          success: true,
        };
      }),
    ),
  );

  const duration = (Date.now() - startTime) / 1000;

  console.log(`✅ Completed ${urls.length} URLs in ${duration}s`);
  console.log(`📊 Average: ${(duration / urls.length).toFixed(2)}s per URL`);

  res.status(200).json({
    success: true,
    stats: {
      totalUrls: urls.length,
      durationSeconds: duration,
      averagePerUrl: duration / urls.length,
    },
    documents: results,
  });
});
