const asyncHandler = require("../middleware/asyncHandler");
const AnswerModel = require("../models/answer.model");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");

module.exports.getAllAnswers = asyncHandler(async (req, res) => {

  const totalAnswerCount = await AnswerModel.countDocuments({
    authorId: req.user._id,
  });
  if (!totalAnswerCount)
    throw new AppError(400, "No Answers Found, contribute to community");

  res
    .status(200)
    .json(new AppResponse(200, totalAnswerCount, "Your Total Answer"));
});
