const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, "Room id is missing"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Sender id is required"],
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "text is required while sending message"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
