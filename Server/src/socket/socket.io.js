const { Server } = require("socket.io");
const UserModel = require("../models/user.model");
const cookie = require("cookie");
const sendSocketError = require("../utils/SocketError");
const mongoose = require("mongoose");
const crypto = require("crypto");
const RoomModel = require("../models/room.model");
const MessageModel = require("../models/message.model");
const CCModel = require("../models/codecontent.model");

function hashRoomId(roomId) {
  return crypto.createHash("sha256").update(roomId).digest("hex");
}

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://stackwave-frontend-ejbk.onrender.com",
  "https://stackwave.virajpatwardhan.in"
];

function initSocket(server) {
  console.log("Initialized socket io");
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
    // transports: ["websocket"],
  });

  io.use(async (socket, next) => {
    try {
      const rawCookie = socket.handshake.headers?.cookie;
      const cookies = cookie.parse(rawCookie || "");
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

    socket.on("create-room", async ({ userId, title, tags, description }) => {
      if (!userId || !title) {
        console.error("user id or title is missing to create room");
        return sendSocketError(
          socket,
          "Authentication failed, please login again",
          400
        );
      }

      roomId = hashRoomId(userId);

      const newRoom = await RoomModel.create({
        title,
        roomId: roomId,
        roomCreatedBy: socket.user._id,
        participants: 1,
      });

      socket.join(roomId);
      console.log(`${socket.user.firstName} has joined room ${roomId}`);
    });

    socket.on(
      "send-message",
      async ({ userId, roomKey, text, avatar, senderName }) => {
        try {
          if (!userId || !roomKey || !text) {
            console.error("All Fields are required");
            return sendSocketError(
              socket,
              "Please retry sending message again",
              400
            );
          }

          const isValidMongoId = mongoose.Types.ObjectId.isValid(userId);
          if (!isValidMongoId) {
            console.error("Not a valid Mongo ID");
            return sendSocketError(socket, "Please Login again", 400);
          }

          const isRoomId = await RoomModel.findOne({ roomId: roomKey });
          if (!isRoomId) {
            console.error("Room Id Not Found in documents");
            return sendSocketError(socket, "Room Not Found", 400);
          }
          const message = await MessageModel.create({
            senderId: userId,
            roomId: roomKey,
            text: text,
            senderName,
            avatar,
          });

          io.to(roomKey).emit("chat-message", {
            userId,
            text,
            senderName,
            avatar,
          });
          
        } catch (error) {
          console.error(`Something went wrong: ${error.message}`);
        }
      }
    );

    socket.on("join-room", async ({ userId, roomKey }) => {
      console.log("Room Joined");
      if (!roomKey) return sendSocketError(socket, "Room Key is required", 404);

      const findRoom = await RoomModel.findOne({ roomId: roomKey });
      if (!findRoom) return sendSocketError(socket, "Room not found", 404);

      findRoom.participants += 1;
      await findRoom.save();

      socket.join(roomKey);
      console.log(`User ${userId} joined room ${roomKey}`);
    });

    socket.on("code-content", async ({ userId, roomKey, code }) => {
      try {;
        if (!userId || !roomKey || !code) {
          console.error("All Fields are required");
          return sendSocketError(
            socket,
            "Please retry sending message again",
            400
          );
        }

        const isValidMongoId = mongoose.Types.ObjectId.isValid(userId);
        if (!isValidMongoId) {
          console.error("Not a valid Mongo ID");
          return sendSocketError(socket, "Please Login again", 400);
        }

        const isRoomId = await RoomModel.findOne({ roomId: roomKey });
        if (!isRoomId) {
          console.error("Room Id Not Found in documents");
          return sendSocketError(socket, "Room Not Found", 400);
        }

        // const codeContent = await CCModel.create({
        //   content: code,
        //   senderId: userId,
        //   roomId: roomKey,
        // });
        // console.log(text);
        socket.join(roomKey);
        io.to(roomKey).emit("code-content", {
          userId,
          code,
        });
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`);
      }
    });

    socket.on("terminal-output", ({ userId, terminalOutput, roomKey }) => {
      try {

        io.to(roomKey).emit("terminal-output", { terminalOutput });

        io.emit();
      } catch (error) {
        console.error(`Something went wrong: ${error.message}`);
      }
    });
  });
}

module.exports = initSocket;
