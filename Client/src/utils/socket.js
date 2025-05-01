import { io } from "socket.io-client";

const socketConnectionURI =
  location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://stackwave-vy6f.onrender.com";

const socket = io(socketConnectionURI, {
  withCredentials: true,
});

export default socket;
