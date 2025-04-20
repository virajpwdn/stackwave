const { Router } = require("express");
const controller = require("../controller/auth.controller");
const authRouter = Router();
const userValidations = require("../validations/auth.validations");
const authMiddleware = require("../middleware/auth.middleware");

// #swagger.tags = ['Auth']
// #swagger.summary = 'Register user'
// #swagger.description = 'Creates a user account'

authRouter.post(
  "/signup",
  userValidations.signupDataValidations,
  controller.signupController
);
authRouter.post(
  "/login",
  userValidations.loginDataValidation,
  controller.loginController
);

authRouter.post(
  "/select-tags",
  authMiddleware,
  controller.selectTagsController
);

authRouter.get("/verification", authMiddleware, controller.verificationController)

module.exports = authRouter;