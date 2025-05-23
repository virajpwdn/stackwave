const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    tags: [
      {
        type: String,
      },
    ],
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
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
