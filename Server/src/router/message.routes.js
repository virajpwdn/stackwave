const {Router} = require("express");
const messageRouter = Router();
const controller = require('../controller/message.controller');
const authMiddleware = require("../middleware/auth.middleware");


messageRouter.get("/all-messages/:roomId", authMiddleware, controller.getAllMessagesOfARoom)


module.exports = messageRouter;