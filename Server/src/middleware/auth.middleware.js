const mongoose = require("mongoose");
const asyncFunction = require("./asyncHandler");
const UserModel = require("../models/user.model");
const AppError = require('../utils/ApiError');

const authMiddleware = asyncFunction(async (req, res, next) => {
  const berearToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = req.cookies?.token ?? berearToken;
  if (!token) {
    console.error("Token is not found in header or cookies");
    throw new AppError(400, "Token not found");
  }

  let decode;
  try {
    decode = UserModel.verifyToken(token);
  } catch (error) {
    console.error("Token Invalid");
    throw new AppError(400, "UnAuthorized");
  }

  const user = await UserModel.findOne({_id: decode._id});
  if(!user) {
    console.error("user not found in middleware");
    throw new AppError(400, "User not found");
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
