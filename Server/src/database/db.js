const mongoose = require('mongoose');
const config = require("../config/config");
const connectDB = async ()=>{
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log("Database is connected");
    } catch (error) {
        console.log(`error connecting to database ${error}`);
        process.exit(1);
    }
}


module.exports = connectDB;