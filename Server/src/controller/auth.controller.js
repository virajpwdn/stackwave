const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/asyncHandler");
// const authValidations = require("../validations/auth.validations");

module.exports.signupController = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;
  if (!firstName || !lastName || !email || !password || !username)
    throw new AppError(400, "All fields are required");

  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(400, errors.array());

  const isUserAlreadyExists = await UserModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) throw new AppError(401, "User Already Exists");

  const hashPassword = await UserModel.hashPassword(password);
  if (!hashPassword) throw new AppError("Password is not hashed");
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    username,
  });

  const token = user.generateJWT();

  const userObject = user.toObject();
  delete userObject.password;

  res.cookie("token", token);
  res
    .status(201)
    .json(new AppResponse(201, user, "Account Successfully created"));
});

module.exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "All Fields Are Required");

  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(400, errors.array());

  const isUserExists = await UserModel.findOne({ email }).select('+password');
  if (!isUserExists) throw new AppError(401, "Invalid Credentials");

  const validatePassword = await isUserExists.comparePassword(password, isUserExists.password);
  if (!validatePassword) throw new AppError(401, "Invalid Credentials");

  const userObject = isUserExists.toObject();
  delete userObject.password;

  res
    .status(200)
    .json(new AppResponse(200, isUserExists, "You are successfully loggedIn"));
});
