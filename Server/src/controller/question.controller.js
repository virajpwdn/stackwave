const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const QuestionModel = require("../models/question.model");
const AnswerModel = require("../models/answer.model");

module.exports.askQuestionController = asyncHandler(async (req, res) => {
  const { title, content, authorId, tags } = req.body;
  if (!title || !content || !authorId)
    throw new AppError(400, "All fields are required");

  const isQuestionAlreadyExists = await QuestionModel.findOne({ title });
  if (isQuestionAlreadyExists)
    throw new AppError(400, "Question Already Exists");

  const newQuestion = await QuestionModel.create({
    title,
    content,
    authorId,
    tags,
  });

  res
    .status(201)
    .json(new AppResponse(201, newQuestion, "New Question is created"));
});

module.exports.viewQuestionController = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  console.log(questionId);
  if (!questionId) throw new AppError(400, "Question Id is missing");

  const findQuestion = await QuestionModel.findOne({ _id: questionId });
  if (!findQuestion) throw new AppError(404, "Question has been deleted");

  findQuestion.views++;
  await findQuestion.save();

//   const findAnswers = await AnswerModel.find({questionId: questionId});
//   if(!findAnswers) throw new AppError(404);
// TODO This should be an aggeration query because we want to send only one data in response it should be combined

  res.status(200).json(new AppResponse(200, findQuestion, "Question Opened"));
});

module.exports.answerQuestionController = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  if (!questionId) throw new AppError(400, "Question Id is missing");

  const { content } = req.body;
  const newAnswer = await AnswerModel.create({
    questionId,
    content,
  });

  res
    .status(201)
    .json(new AppResponse(200, newAnswer, "Answer Uploaded Successfully"));
});
