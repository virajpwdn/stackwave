const { ChatOpenAI, OpenAIEmbeddings } = require("@langchain/openai");
const { QdrantVectorStore } = require("@langchain/qdrant");
const config = require("../config/config");

const llmModel = (model) => {
  const llm = new ChatOpenAI({
    model: model,
    temperature: 0,
    maxTokens: 2000,
    timeout: 60000,
    maxRetries: 2,
    apiKey: config.OPENAI_API_KEY,
  });

  return llm;
};

const vectorStore = async (collectionName) => {
  const embeddings = new OpenAIEmbeddings({
    apiKey: config.OPENAI_API_KEY,
    batchSize: 512,
    model: "text-embedding-3-large",
  });

  const store = await QdrantVectorStore.fromExistingCollection(embeddings, {
    url: config.QDRANT_URL,
    collectionName: collectionName,
  });

  return store;
};

module.exports = {
  llmModel,
  vectorStore,
};

// gpt-4.1-nano
// gpt-5.1
