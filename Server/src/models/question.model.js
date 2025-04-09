const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Length of question should be greater then 3"],
      maxLength: [150, "Length of question should be at most 150 words"],
    },
    content: {
      type: String,
      required: [true, "Question Body is required, only add valid question"],
    },
    tags: [{ type: String }],
    authorId: {
      type: String,
      required: [true, "author id is required"],
    },
    upVote: {
      type: Number,
    },
    downVote: {
      type: Number,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
    },
    commentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema)