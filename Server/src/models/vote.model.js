const mongoose = require("mongoose");
const voteSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Person who is voting his id must be present"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "On which Question or Answer this user is voting"],
    },
    targetType: {
      type: String,
      enum: ["question", "answer"],
      required: [true, "question or answer — what is the type?"],
    },
    type: {
      type: String,
      enum: ["upvote", "downvote"],
      required: [true, "upvote or downvote - what's the type"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);