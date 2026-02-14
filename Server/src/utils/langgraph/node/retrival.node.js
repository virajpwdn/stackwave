const { llmModel, vectorStore } = require("../../../utils/openai.service");
const { contextDocuments } = require("../tools");
const isCollection = require("../tools/check-collection");

const checkCollection = async (state) => {
  try {
    const { userInput } = state;
    const SYSTEM_PROMPT = `You are a expert software engineer with 50 years of experience, you are CTO of fortune 500 companies. Your job is to check from query which you will get from user, you have to determine the query is in which domain. so that we can check in relavent collection in db.
  
  You can only choose from the following domain/topic
  1. DevOps Docs
  2. HTML Docs
  3. CSS Docs
  4. Python Docs
  5. Javascript Docs

  Strictly return the data in json format.
  
  This is the query from user - ${userInput}
  `;

    const llmClient = llmModel("gpt-4.1-nano");
    const response = await llmClient.invoke([
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
    ]);
    return { documentType: response.content.trim() };
  } catch (error) {
    console.log("Error in check collection node", error);
    return {
      documentType: "NA",
      error: error.message,
    };
  }
};

const isCollectionExists = async (state) => {
  try {
    await isCollection(state);
  } catch (error) {
    console.log("error ", error);
  }
};

const vectorDataFetch = async (state) => {
  try {
    const qdrantClient = await vectorStore(collectionName);
    const results = await qdrantClient.similaritySearch(query, 15);

    // data cleanup to create context for llm
    const context = contextDocuments(results);

    return {
      vectorResponse: context,
    };
  } catch (error) {
    console.log("error ", error);
    return {
      vectorResponse: "NA",
    };
  }
};

const llmRetrival = async (state) => {
  try {
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

    return {
      llmResponse: output.content.trim(),
    };
  } catch (error) {
    console.log("error: ", error);
    return {
      llmResponse: "something went wrong! please try again",
    };
  }
};

module.exports = {
  checkCollection,
  isCollectionExists,
  vectorDataFetch,
  llmRetrival,
};
