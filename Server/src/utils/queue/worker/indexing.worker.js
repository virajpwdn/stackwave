const { Worker } = require("bullmq");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const config = require("../../../config/config");
const cheerio = require("cheerio");
const axios = require("axios");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const pLimit = require("p-limit").default;
const redis = require("../../redis.service");

console.log("Worker file started...");

const worker = new Worker(
  "document-indexing",
  async (job) => {
    console.log("Processing job:", job.id);

    const urls = job.data.urls;

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 250,
      chunkOverlap: 50,
    });

    const embeddings = new OpenAIEmbeddings({
      apiKey: config.OPENAI_API_KEY,
      batchSize: 512,
      model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      { url: config.QDRANT_URL, collectionName: "DevOps Docs" },
    );

    const limit = pLimit(5);

    await Promise.all(
      urls.map((url, index) =>
        limit(async () => {
          try {
            console.log(`[${index + 1}/${urls.length}] Processing: ${url}`);

            const { data } = await axios.get(url, { timeout: 10000 });
            const $ = cheerio.load(data);

            const mainPane = $(".main-pane").clone();
            mainPane.find("style, script, header, footer, nav").remove();

            const cleanText = mainPane.text().replace(/\s+/g, " ").trim();
            const chunks = await splitter.splitText(cleanText);

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

            console.log(`Stored ${chunks.length} chunks for ${url}`);
          } catch (err) {
            console.log(`Error processing ${url}:`, err.message);
          }
        }),
      ),
    );

    console.log(`Job ${job.id} completed`);
  },
  { connection: redis },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job.id} failed: `, err);
});
