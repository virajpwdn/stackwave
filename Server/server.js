require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/database/db");
const config = require("./src/config/config");

connectDB().then(() => {
  app.listen(config.PORT, ()=>{
    console.log("Server is connected");
  });
})
