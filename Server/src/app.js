const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerFile = require("../swagger-output.json");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes");
const questionRouter = require("./router/questions.routes");
const aiRouter = require("../src/router/ai.routes");
const compilerRoutes = require("../src/router/compiler.routes");
const roomRoutes = require("../src/router/room.routes");
const messageRoutes = require("../src/router/message.routes");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://stackwave-frontend-ejbk.onrender.com",
];

// Remove this later when deploying on ec2
// app.set("trust proxy", 1);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/compiler", compilerRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/message", messageRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorMiddleware);

module.exports = app;
