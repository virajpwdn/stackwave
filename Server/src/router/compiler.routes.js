const {Router} = require("express");
const compilerRoutes = Router();
const controller = require("../controller/compiler.controller");

compilerRoutes.post("/create-submission", controller.createSubmissionController);
compilerRoutes.get("/getanswers/:token", controller.getCodeAnswers);
compilerRoutes.get("/showlanguages", controller.showLanguagesController);

module.exports = compilerRoutes;