const { Router } = require("express");
const questionRouter = Router();
const controller = require("../controller/question.controller");
const authMiddleware = require("../middleware/auth.middleware");

questionRouter.post("/create-question", controller.askQuestionController);
questionRouter.get(
  "/view/question/:questionId",
  controller.viewQuestionController
);
questionRouter.post(
  "/answer/create/:questionId",
  controller.answerQuestionController
);
questionRouter.get("/get/answer/:questionId", controller.getAnswerController);

questionRouter.get(
  "/total/question/count",
  authMiddleware,
  controller.totalQuestionCountController
);

questionRouter.get("/all-questions", controller.getAllQuestions);

questionRouter.post("/vote", authMiddleware, controller.voteController);

questionRouter.post("/comment", authMiddleware, controller.commentController);

module.exports = questionRouter;
