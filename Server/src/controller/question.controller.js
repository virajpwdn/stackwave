const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const QuestionModel = require("../models/question.model");
const AnswerModel = require("../models/answer.model");
const VoteModel = require("../models/vote.model");
const { default: mongoose } = require("mongoose");
const CommentModel = require("../models/comment.model");

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

  const findAnswers = await AnswerModel.find({ questionId: questionId });
  console.log(findAnswers);
  //   if(!findAnswers) throw new AppError(404);
  // This should be an aggeration query because we want to send only one data in response it should be combined

  res.status(200).json(new AppResponse(200, findQuestion, "Question Opened"));
});

module.exports.answerQuestionController = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  if (!questionId) throw new AppError(400, "Question Id is missing");

  const { content, authorId } = req.body;
  if (!content || !authorId)
    throw new AppError(400, "All fields are required, content && author id");

  const newAnswer = await AnswerModel.create({
    questionId,
    content,
    authorId,
  });

  res
    .status(201)
    .json(new AppResponse(200, newAnswer, "Answer Uploaded Successfully"));
});

module.exports.getAnswerController = asyncHandler(async (req, res) => {
  const { questionId } = req.params;
  if (!questionId) throw new AppError(400, "QuestionId is missing");

  const answers = await AnswerModel.find({ questionId: questionId });
  //   Find returns an empty array so there no need to add validation for it, but still to be safe it is added
  if (!answers)
    return res
      .status(200)
      .json(
        new AppResponse(
          200,
          null,
          "No Answers Found, be the first one to answer!"
        )
      );

  res.status(200).json(new AppResponse(200, answers, "All answers and sent"));
});

module.exports.totalQuestionCountController = asyncHandler(async (req, res) => {
  const totalQuestions = await QuestionModel.estimatedDocumentCount();
  if (!totalQuestions)
    return res.status(200).json(new AppResponse(200, null, "0 questions"));

  res.status(200).json(new AppResponse(200, totalQuestions, "Total Questions"));
});

module.exports.getAllQuestions = asyncHandler(async (req, res) => {
  let page = parseInt(req.query.page) || 1;
  let limit = 10;
  let skip = (page - 1) * 10;

  const allQuestion = await QuestionModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (allQuestion.length === 0)
    return res.status(200).json(new AppResponse(200, null, "NO More Question"));

  res
    .status(200)
    .json(new AppResponse(200, allQuestion, "Fetching 10 Questions At a time"));
});

module.exports.voteController = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { type, targetId, targetType } = req.body;
    console.log(`${type} -> ${targetId} -> ${targetType}`);
    if (!type || !targetId || !targetType)
      throw new AppError(400, "All Fields are Required");

    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      console.error("Invalid Mongoose Id");
      throw new AppError(400, "Invalid Question Id");
    }

    if (type !== "upvote" && type !== "downvote") {
      console.error("type is different, it should only be upvote or downvote");
      throw new AppError(400, "Incorrect Type");
    }

    if (targetType !== "question" && targetType !== "answer") {
      console.error(
        "Invalid Target Type it should be either question or answer"
      );
      throw new AppError(
        400,
        "You can only upvote or downvote either on question or answers"
      );
    }

    let find;

    if (targetType === "question") {
      find = await QuestionModel.findOne({ _id: targetId });
      if (!find) {
        console.error("Question does not exits in db");
        throw new AppError(
          400,
          "Question does not exists! Try reloading the page"
        );
      }
    } else {
      find = await AnswerModel.findOne({ _id: targetId });
      if (!find) {
        console.error("Answer does not exits in db");
        throw new AppError(
          400,
          "Answer does not exists! Try reloading the page"
        );
      }
    }

    const user = req.user;

    const isAlreadyVote = await VoteModel.findOneAndDelete(
      {
        authorId: user._id,
        type: type,
        targetType: targetType,
      },
      { session }
    );

    if (isAlreadyVote !== null) {
      await session.commitTransaction();
      session.endSession();
      if (type === "upvote") {
        find.upVote -= 1;
      } else {
        find.downVote -= 1;
      }
      await find.save();
      return res.status(200).json(
        new AppResponse(
          200,
          {
            previousVote: {
              id: isAlreadyVote._id,
              vote: isAlreadyVote.type,
              deletedAt: new Date(),
            },
          },
          "Your Vote is updated"
        )
      );
    }

    const newVote = await VoteModel.create(
      [
        {
          authorId: user._id,
          type: type,
          targetType: targetType,
          targetId: targetId,
        },
      ],
      { session }
    );

    if (type === "upvote") {
      find.upVote += 1;
    } else {
      find.downVote += 1;
    }
    await find.save();

    await session.commitTransaction();
    session.endSession();

    res
      .status(201)
      .json(new AppResponse(201, {}, "Your Vote is updated, Thanks :)"));
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    throw error;
  }
});

module.exports.commentController = asyncHandler(async (req, res) => {
  try {
    const { targetId, targetType, content } = req.body;
    if (!targetId || !targetType || !content) {
      console.error("All Fields are required");
      throw new AppError(400, "All fields are required");
    }

    if (targetType !== "question" && targetType !== "answer") {
      console.error("Invalid Type! Type should be either question or answer");
      throw new AppError(
        400,
        "Invalid Type! You can only comment on question or answer"
      );
    }

    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      console.error(
        "Target id is invalid! it should be either question or answer id"
      );
      throw new AppError(400, "Target Id is invalid! Try refreshing");
    }

    let find;

    if (targetType === "question") {
      find = await QuestionModel.findOne({ _id: targetId });
      if (!find) {
        console.error("Question does not exits in db");
        throw new AppError(
          400,
          "Question does not exists! Try reloading the page"
        );
      }
    } else {
      find = await AnswerModel.findOne({ _id: targetId });
      if (!find) {
        console.error("Answer does not exits in db");
        throw new AppError(
          400,
          "Answer does not exists! Try reloading the page"
        );
      }
    }

    //! Later add parent comment validations and features
    // const isCommentExist = await CommentModel.findOne({authorId: user._id, targetId})

    const user = req.user;

    const newComment = await CommentModel.create({
      authorId: user._id,
      targetId: targetId,
      targetType: targetType,
      content: content
    })

    res.status(201).json(new AppResponse(201, {}, "Your comment is posted"));
  } catch (error) {
    console.error(error);
    throw error;
  }
});
