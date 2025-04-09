const {Router} = require("express");
const controller = require("../controller/auth.controller");
const authRouter = Router();
const signupDataValidations = require('../validations/auth.validations');

authRouter.post("/signup", signupDataValidations, controller.signupController);
authRouter.post("/login", controller.loginController);

module.exports = authRouter;