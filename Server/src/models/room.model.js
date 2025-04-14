const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, "Room Id is required"],
    },
    language: {
      type: String,
      default: "javascript",
    },
    roomCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "room created peroson's id is missing"],
    },
    participants: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
