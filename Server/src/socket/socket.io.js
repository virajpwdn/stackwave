const { Server } = require("socket.io");
const UserModel = require("../models/user.model");
const cookie = require("cookie");
const sendSocketError = require("../utils/SocketError");
const mongoose = require("mongoose");
const crypto = require("crypto");

function hashRoomId(roomId) {
  return crypto.createHash("sha256").update(roomId).digest("hex");
}

function initSocket(server) {
  console.log("Initialized socket io");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const rawCookie = socket.handshake.headers?.cookie;
      const cookies = cookie.parse(rawCookie || "")
      const token = cookies.token || socket.handshake.headers.token;
      if (!token) {
        console.error("Token is missing");
        return next(new Error("Token not found"));
      }

      const decode = await UserModel.verifyToken(token);
      if (!decode) {
        console.error("Token not decoded");
        return next(new Error("Login in again"));
      }

      const user = await UserModel.findOne({ _id: decode._id });
      if (!user) {
        console.error("User not found");
        return next(new Error("Login in again"));
      }

      socket.user = user;

      next();
    } catch (error) {
      console.error("middleware error in socket", error.message);
      next(error);
    }
  });

  io.on("connection", async (socket) => {
    let roomId;
    // socket.on("connected", async ({ userId }) => {
    //   try {
    //     if (!userId) {
    //       console.error("user id is missing");
    //       sendSocketError(
    //         socket,
    //         "Authentication failed. Please log in again.",
    //         400
    //       );

    //       const verifyUserId = mongoose.Types.ObjectId.isValid(userId);
    //       if (!verifyUserId) {
    //         console.error("user id is not verified");
    //         sendSocketError(
    //           socket,
    //           "Authentication failed. Please log in again.",
    //           400
    //         );

    //         roomId = hashRoomId(userId);

    //         socket.join(roomId);
    //         console.log(`user has joined the room ${roomId}`);
    //       }
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // });

    socket.on("create-room", ({userId})=>{
        if(!userId) {
            console.error("user id is missing to create room");
            return sendSocketError(socket, "Authentication failed, please login again", 400);
        }
        
        roomId = hashRoomId(userId);
        console.log(roomId);
        socket.join(roomId);
        console.log(`${socket.user.firstName} has joined room ${roomId}`);
    })
  });
}

module.exports = initSocket;
