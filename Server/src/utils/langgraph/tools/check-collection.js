const { QdrantClient } = require("@qdrant/js-client-rest");
const config = require("../../../config/config");

const isCollection = async (state) => {
  const client = new QdrantClient({ url: config.QDRANT_URL });
  const collectionName = state.documentType;

  try {
    const colName = await client.getCollection(collectionName);
    return {
      isCollection: true,
    };
  } catch (error) {
    console.log("Error in isCollection function", error);
    return {
      isCollection: false,
    };
  }
};

module.exports = isCollection;
