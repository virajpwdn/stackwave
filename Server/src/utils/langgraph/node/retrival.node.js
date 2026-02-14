const { llmModel } = require("../../../utils/openai.service");

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
    return { documentType: response.content };
  } catch (error) {
    console.log("Error in check collection node", error);
    return {
      documentType: "NA",
      error: error.message,
    };
  }
};



module.exports = {
    checkCollection
}