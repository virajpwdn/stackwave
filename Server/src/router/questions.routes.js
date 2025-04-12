const { Router } = require("express");
const questionRouter = Router();
const controller = require("../controller/question.controller");

questionRouter.post("/question", controller.askQuestionController);
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
  controller.totalQuestionCountController
);

questionRouter.get("/all-questions", controller.getAllQuestions)

module.exports = questionRouter;
