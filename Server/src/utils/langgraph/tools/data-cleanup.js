const contextDocuments = (results) => {
  // This data we are fetching to create context for llm.
  const cleanupData = results
    .map((doc, index) => {
      return `
        Document ${index + 1}:
        Content: ${doc.pageContent}
        Source: ${doc.metadata?.source || "Unknown"}
        ${doc.metadata?.url ? `Link: ${doc.metadata.url}` : ""}`;
    })
    .join("\n");

  return cleanupData;
};

module.exports = contextDocuments