const asyncHandler = require("../middleware/asyncHandler");
const RoomModal = require('../models/room.model');

module.exports.getAllRooms = asyncHandler(async(req,res)=>{
    try {
        const allRooms = await RoomModal.find();
        res.status(200).json({allRooms});
    } catch (error) {
        console.error(error);
    }
})