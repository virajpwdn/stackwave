const mongoose = require("mongoose");
const participantSchema = new mongoose.Schema({
  roomId: { type: String, required: [true, "Room Id is required"] },
  userId: { type: String, required: [true, "User Id is required"] },
});


const participantModel = mongoose.model("Participant", participantSchema);
module.exports = participantModel;