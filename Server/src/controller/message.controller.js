const asyncHandler = require("../middleware/asyncHandler");
const MessageModel = require("../models/message.model");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");

module.exports.getAllMessagesOfARoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  if (!roomId) throw new AppError(400, "Room Id is required");

  console.log(roomId);

  const messages = await MessageModel.find({ roomId });
  if (!messages) {
    console.log("Invalid Room Id");
    throw new AppError(400, "Invalid Room, try rejoining again");
  }

  console.log(messages);
  res
    .status(200)
    .json(new AppResponse(200, messages, "All the messages of this room"));
});
