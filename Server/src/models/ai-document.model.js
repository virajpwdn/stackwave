const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    require: [true, "Document name is required"],
  },
  documentIndexStatus: {
    type: String,
  },
  documentLink: {
    type: String,
  },
  isPublic: {
    type: String,
  },
  authorId: {
    type: String,
    ref: "User",
  },
});

module.exports = new mongoose.model("DocumentSchema", DocumentSchema);
