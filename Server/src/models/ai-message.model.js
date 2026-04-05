const mongoose = require("mongoose");
const AiMessageSchema = new mongoose.Schema(
  {
    userQuery: {
      type: String,
      required: [true, "user query is missing"],
    },
    aiResponse: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AiChat", AiMessageSchema);
