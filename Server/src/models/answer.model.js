const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Author Id is required"],
      ref: "User",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Question Id is required"],
      ref: "Question",
    },
    content: {
      type: String,
      default: "",
      required: [true, "Content is required"],
    },
    upvoteCount: {
      type: Number,
      default: 0,
    },
    downVoteCount: {
      type: Number,
      default: 0,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);