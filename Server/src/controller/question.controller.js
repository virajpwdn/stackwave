const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const QuestionModel = require("../models/question.model");

module.exports.askQuestionController = asyncHandler(async (req, res) => {
  const { title, content, authorId } = req.body;
  if (!title || !content || !authorId)
    throw new AppError(400, "All fields are required");

  const newQuestion = await QuestionModel.create({
    title,
    content,
    authorId,
  });

  res
    .status(201)
    .json(new AppResponse(201, newQuestion, "New Question is created"));
});
