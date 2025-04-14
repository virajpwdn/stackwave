const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const swaggerFile = require("../swagger-output.json");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes");
const questionRouter = require("./router/questions.routes");


app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/questions", questionRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(errorMiddleware);

module.exports = app;
