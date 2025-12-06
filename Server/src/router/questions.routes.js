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

questionRouter.post("/comment", authMiddleware, controller.commentController)

/**
 * /user/questions/:userId -> Api returns all the questions which loggedIn user has asked
 * @param userId -> Id of loggedIn user
 */
questionRouter.get("/user/questions/:userId", authMiddleware, controller.userQuestionController)

module.exports = questionRouter;