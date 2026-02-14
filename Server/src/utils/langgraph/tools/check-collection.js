const config = require("../../../config/config");

const isCollection = async (state) => {
  const client = new QdrantClient({ url: config.QDRANT_URL });
  const collectionName = state.documentType;

  try {
    await client.getCollection(collectionName);
    return {
      isCollectionExists: true,
    };
  } catch (error) {
    console.log("Error in isCollection function", error);
    return {
      isCollectionExists: false,
    };
  }
};

module.exports = isCollection;