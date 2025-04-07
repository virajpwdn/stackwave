const {Router} = require("express");
const controller = require("../controller/auth.controller");
const authRouter = Router();

authRouter.post("/signup", controller.signupController);

module.exports = authRouter;