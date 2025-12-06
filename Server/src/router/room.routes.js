const {Router} = require("express");
const roomRouter = Router();
const controller = require("../controller/room.controller");
const authMiddleware = require("../middleware/auth.middleware")

roomRouter.get("/all-rooms", controller.getAllRooms)
/**
 * /reem-by-id this api will return number of live room created by loggedIn User
 */
roomRouter.get("/room-by-id", authMiddleware, controller.getRoomById)

module.exports = roomRouter;