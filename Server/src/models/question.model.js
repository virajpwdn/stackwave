const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Length of question should be greater then 3"],
      maxLength: [150, "Length of question should be at most 150 words"],
      unique: [true, "Question Already Exists"],
    },
    content: {
      type: String,
      required: [true, "Question Body is required, only add valid question"],
    },
    tags: [{ type: String }],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "author id is required"],
      ref: "User",
    },
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", QuestionSchema);
