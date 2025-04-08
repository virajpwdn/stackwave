const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");

module.exports.signupController = async (req, res, next) => {
  const { firstName, lastName, email, passwordHash, username } = req.body;
  if (!firstName || !lastName || !email || !passwordHash || !username)
    throw new AppError(400, "All fields are required");
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new AppError(400, "Email is Required", errors.array());

  const isUserAlreadyExists = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) throw new AppError(401, "User Already Exists");

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    passwordHash,
    username,
  });

  res.status(201).json(new AppResponse(201, user, "Account Successfully created"));
};
