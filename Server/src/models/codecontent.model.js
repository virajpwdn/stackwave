const mongoose = require("mongoose");
const codeContentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Sender id is required"],
  },
  roomId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Codecontent", codeContentSchema);