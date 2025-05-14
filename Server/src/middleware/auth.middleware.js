const mongoose = require("mongoose");
const asyncFunction = require("./asyncHandler");
const UserModel = require("../models/user.model");
const AppError = require("../utils/ApiError");
const redis = require("../utils/redis.service");

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

  let user = await redis.get(`user:${decode._id}`);

  if (!user) {
    user = await UserModel.findOne({ _id: decode._id });
    if (user) {
      delete user._doc.password;
      await redis.set(`user:${decode._id}`, JSON.stringify(user));
    }else {
      console.error("user not found in middleware");
      throw new AppError(400, "User not found");
    }
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
