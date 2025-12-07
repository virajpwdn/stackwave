const asyncHandler = require("../middleware/asyncHandler");
const RoomModal = require('../models/room.model');
const AppError = require("../utils/ApiError")
const AppResponse = require("../utils/ApiResponse")

module.exports.getAllRooms = asyncHandler(async(req,res)=>{
    try {
        const allRooms = await RoomModal.find();
        res.status(200).json({allRooms});
    } catch (error) {
        console.error(error);
    }
})

module.exports.getRoomById = asyncHandler(async (req,res) => {
    const totalRoom = await RoomModal.countDocuments({roomCreatedBy: req.user._id})
    if(!totalRoom) throw new AppError(400, "No live rooms found")
    
    res.status(200).json(new AppResponse(200, totalRoom, "All Rooms Created by youq"))
})