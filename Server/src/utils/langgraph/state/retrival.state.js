const { StateGraph, Annotation } = require("@langchain/langgraph");

const StateAnnotation = Annotation.Root({
  userInput: Annotation({
    reducer: (prev, next) => next,
    default: () => "",
  }),
  documentType: Annotation({
    reducer: (prev, next) => next,
    default: () => "",
  }),
  isCollection: Annotation({
    reducer: (prev, next) => next,
    default: () => false,
  }),
  vectorResponse: Annotation({
    reducer: (prev, next) => next,
    default: () => "",
  }),
  llmResponse: Annotation({
    reducer: (prev, next) => next,
    default: () => "",
  }),
});

const workflow = new StateGraph(StateAnnotation);
module.exports = { workflow };
