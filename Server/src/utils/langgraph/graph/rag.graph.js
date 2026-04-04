const { START, END } = require("@langchain/langgraph");
const { workflow } = require("../state/retrival.state");
const {
  checkCollection,
  isCollectionExists,
  vectorDataFetch,
  llmRetrival,
  isTesting,
} = require("../../../utils/langgraph/node/retrival.node");

workflow.addNode("checkCol", checkCollection);
workflow.addNode("isCollectionExists", isCollectionExists); // check collection in vector db does it exist
workflow.addNode("vectorDataFetch", vectorDataFetch);
workflow.addNode("llmRetrival", llmRetrival);
workflow.addNode("testing", isTesting);

// workflow.addEdge(START, "checkCol");
workflow.addEdge(START, "testing");
workflow.addConditionalEdges("testing", (state) => {
  return state.isTesting ? END : "checkCol";
});
workflow.addConditionalEdges(
  "checkCol",
  (state) => {
    return state.documentType !== "NA" ? "query" : "end";
  },
  { query: "isCollectionExists", end: END },
);
workflow.addConditionalEdges(
  "isCollectionExists",
  (state) => {
    return state.isCollection ? "query" : "end";
  },
  { query: "vectorDataFetch", end: END },
);
workflow.addConditionalEdges(
  "vectorDataFetch",
  (state) => {
    return state.vectorResponse !== "NA" ? "query" : "end";
  },
  { query: "llmRetrival", end: END },
);
workflow.addEdge("llmRetrival", END);

const app = workflow.compile();

module.exports = { app };
