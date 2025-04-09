const {Router} = require("express");
const controller = require("../controller/auth.controller");
const authRouter = Router();
const userValidations = require('../validations/auth.validations');

authRouter.post("/signup", userValidations.signupDataValidations, controller.signupController);
authRouter.post("/login", userValidations.loginDataValidation, controller.loginController);

module.exports = authRouter;