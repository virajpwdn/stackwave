const { llmModel, vectorStore } = require("../../../utils/openai.service");
const { contextDocuments } = require("../tools");
const isCollection = require("../tools/check-collection");

const isTesting = async (state) => {
  try {
    const { isTesting, userInput } = state;
    if (isTesting) {
      return {
        userInput: userInput,
        documentType: "DevOps",
        isCollection: true,
        vectorResponse: "Hello world",
        llmResponse: `
    # 🚨 Starvation in System Design
    ## 📌 What is Starvation?

    **Starvation** is a problem in system design where a process (or request/task) **never gets the resources it needs to execute**, because other processes keep getting priority over it.

    👉 In simple terms:  
    > Some tasks keep waiting forever while others keep getting served.

    ---

    ## 🧠 Real-Life Analogy

    Imagine a restaurant:

    - VIP customers always get served first.
    - Normal customers are in a queue.
    - New VIPs keep arriving.

    👉 Result:
    - Normal customers may **never get food** → this is **starvation**.

    ---

    ## ⚙️ Where Starvation Happens in Systems

    ### 1. CPU Scheduling
    - High-priority processes keep getting CPU time.
    - Low-priority processes never execute.

    ### 2. Thread/Lock Management
    - Threads waiting for a lock may never acquire it if others keep taking it.

    ### 3. Distributed Systems
    - Some services or requests are always delayed due to load balancing or priority routing.

    ### 4. Queues (Very Important for Backend)
    - Jobs in a queue may never get processed if:
      - Higher-priority jobs keep coming
      - Queue is not fairly managed

    ---

    ## 🔥 Example (Backend System)

    Imagine your StackWave app:

    You have:
    - Premium users → high priority
    - Free users → low priority

    Queue:`,
      
};
    }
  } catch (error) {}
};

const checkCollection = async (state) => {
  try {
    const { userInput } = state;
    const SYSTEM_PROMPT = `You are a expert software engineer with 50 years of experience, you are CTO of fortune 500 companies. Your job is to check from query which you will get from user, you have to determine the query is in which domain. so that we can check in relavent collection in db. If not from the below list then simply return NA
  
  You can only choose from the following domain/topic
  1. DevOps Docs
  2. HTML Docs
  3. Git and GitHub Docs
  4. C++ Docs
  5. Django Docs
  6. SQL Docs

  Strictly return only the name of document
  
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
    const collectionName = state.documentType;
    const qdrantClient = await vectorStore(collectionName);
    const query = state.userInput;
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
    const userInput = state.userInput;
    const vectorResponse = state.vectorResponse;
    const SYSTEM_INSTRUCTION = `You are an expert technical educator with 50 years of software engineering experience. Your role is to explain technical concepts in a clear, accessible way.

    **Your Task:**
    Answer the user's question using the provided context from our vector database. The context includes relevant documentation snippets and article links.

    **Guidelines:**
    1. **Clarity First**: Use simple language that beginners can understand
    2. **Structure**: Organize your response with clear headings and sections
    3. **Examples & Analogies**: Include practical examples and real-world analogies to illustrate concepts
    4. **Code Samples**: When relevant, provide short, working code examples
    5. **Links**: Always include the article links at the end under a "📚 Further Reading" section so users can explore more
    6. **Conciseness**: Be thorough but not overwhelming - aim for clarity over length

    **Format Requirements:**
    - Use proper Markdown formatting (headers, code blocks, lists, bold/italic)
    - Use \`code\` for inline code and \`\`\`language for code blocks
    - Use bullet points or numbered lists for clarity
    - Include emojis sparingly for visual breaks (✅ ⚠️ 💡 📚)

    **Response Structure:**
    1. Brief direct answer to the question
    2. Detailed explanation with examples
    3. Code sample (if applicable)
    4. Common pitfalls or tips (if relevant)
    5. Links to source documentation

    ---

    **User Query:**
    ${userInput}

    **Context from Vector Database:**
    ${vectorResponse}

    ---

    Now provide a helpful, well-structured answer in Markdown format.`;

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
  isTesting
};
