const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger-output.json");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error.middleware");

const authRouter = require("./router/auth.routes");
const questionRouter = require("./router/questions.routes");

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/questions", questionRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorMiddleware);

module.exports = app;
