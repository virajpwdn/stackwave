import { io } from "socket.io-client";

const socketConnectionURI =
  location.hostname === "localhost"
    ? "http://localhost/api"
    : "https://stackwave-vy6f.onrender.com";

// const socketConnectionURI = "http://localhost";


const socket = io(socketConnectionURI, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;
