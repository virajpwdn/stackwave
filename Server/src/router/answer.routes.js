const { Router } = require("express");
const controller = require("../controller/answer.controller");
const authMiddleware = require("../middleware/auth.middleware");
const answerRouter = Router();

answerRouter.get("/user/all/ans", authMiddleware, controller.getAllAnswers);

module.exports = answerRouter;
