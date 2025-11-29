const ApiError = require("../utils/ApiError");

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err);
  
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = errorMiddleware;