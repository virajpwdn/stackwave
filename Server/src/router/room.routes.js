const {Router} = require("express");
const roomRouter = Router();
const controller = require("../controller/room.controller");

roomRouter.get("/all-rooms", controller.getAllRooms)

module.exports = roomRouter;