const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Id of a person who is commenting"],
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "on which question the comment is done?"],
  },
  targetType: {
    type: String,
    enum: ["question", "answer"],
    required: [true, "Target type is required"],
  },
  parentCommentType: {
    type: String,
    ref: "Comment",
    default: null, /* If parentcomment type is null it means it is top level comment */
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
});

module.exports = mongoose.model("Comment", commentSchema);
