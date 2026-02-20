const AnswerModel = require("../../models/answer.model");
const QuestionModel = require("../../models/question.model");
const RoomModel = require("../../models/room.model");
const VoteModel = require("../../models/vote.model");

const getUserStats = async (parent, args, context) => {
  try {
    if (!context.user) throw new Error("unauthorised! please login first");
    const userId = context.user._id;
    console.log(userId);

    const questions = await QuestionModel.find({ authorId: userId });
    const questionCount = questions.length;

    const answersCount = await AnswerModel.countDocuments({ authorId: userId });

    const votes = await VoteModel.aggregate([
      { $match: { authorId: userId } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]);

    const roomsCount = await RoomModel.countDocuments({
      roomCreatedBy: userId,
    });

    return {
      questionCount,
      questions,
      answersCount,
      roomsCount,
    };
  } catch (error) {
    console.log("error ", error);
  }
};

module.exports = { getUserStats };
