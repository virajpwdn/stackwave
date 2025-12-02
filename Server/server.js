require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/database/db");
const config = require("./src/config/config");
const initSocket = require("./src/socket/socket.io");

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(config.PORT, () => {
    console.log("Server is connected");
  });
  initSocket(server);
});
