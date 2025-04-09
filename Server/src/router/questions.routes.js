const {Router} = require("express");
const questionRouter = Router();
const controller = require("../controller/question.controller");

questionRouter.post("/question", controller.askQuestionController);

module.exports = questionRouter;