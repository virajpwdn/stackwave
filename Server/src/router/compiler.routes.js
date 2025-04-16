const {Router} = require("express");
const compilerRoutes = Router();
const controller = require("../controller/compiler.controller");

compilerRoutes.post("/create-submission", controller.createSubmissionController)

module.exports = compilerRoutes;