const { Server } = require("socket.io");
const UserModel = require("../models/user.model");
const cookie = require("cookie");

function initSocket(server) {
  console.log("Initialized socket io");
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const rawCookie = socket.handshake.headers?.cookie;
      const cookie = cookie.parse(rawCookie);
      const token = rawCookie || socket.handshake.headers.token;
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
}
