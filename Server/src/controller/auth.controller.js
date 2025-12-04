const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");
const AppError = require("../utils/ApiError");
const AppResponse = require("../utils/ApiResponse");
const asyncHandler = require("../middleware/asyncHandler");
const redis = require("../utils/redis.service");
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
  await user.save();

  //!  ON PRODUCTION CHANGE SECURE: TRUE & SAMESITE: NONE
  res.cookie("token", token, {
    secure: false,
    sameSite: "Lax",
  });
  res
    .status(201)
    .json(new AppResponse(201, user, "Account Successfully created"));
});

module.exports.loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError(400, "All Fields Are Required");

  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new AppError(400, errors.array());

  const isUserExists = await UserModel.findOne({ email }).select("+password");
  if (!isUserExists) throw new AppError(401, "Invalid Credentials");

  const validatePassword = await isUserExists.comparePassword(
    password,
    isUserExists.password
  );
  if (!validatePassword) throw new AppError(401, "Invalid Credentials");

  const token = isUserExists.generateJWT();

  const userObject = isUserExists.toObject();
  delete userObject.password;
  await isUserExists.save();

  res.cookie("token", token, {
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  console.log(token);
  // TODO -> In response only send selected data, later fix this
  res
    .status(200)
    .json(new AppResponse(200, isUserExists, "You are successfully loggedIn"));
});

module.exports.selectTagsController = asyncHandler(async (req, res) => {
  const token = req.cookies?.token;
  if (!token) {
    console.error("Token not found");
    throw new AppError(400, "UnAuthorized");
  }

  const { selectedSubcategories } = req.body;
  if (!selectedSubcategories)
    throw new AppError(400, "Select at least one tag");
  if (!Array.isArray(selectedSubcategories)) {
    console.error("tags should be an array");
    throw new AppError(400, "Not an array");
  }

  const sanitizedtags = selectedSubcategories.map((tag) =>
    tag.trim().toLowerCase()
  );

  const user = await UserModel.findById(req.user._id);

  user.tags.push(...sanitizedtags);

  await user.save();

  res.status(200).json(new AppResponse(200, {}, "Your tags are saved"));
});

module.exports.verificationController = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json(new AppResponse(200, user, "User is verified"));
});

module.exports.guestDashboard = asyncHandler(async (req, res) => {});

module.exports.logoutController = asyncHandler(async (req, res) => {
  try {
    const timeRemainingForExp = req.tokenData.exp * 1000 - Date.now();
    const blacklist = await redis.set(
      `blacklist:${req.tokenData.token}`,
      true,
      "EX",
      Math.floor(timeRemainingForExp / 1000)
    );
    res.status(200).json(req.tokenData);
  } catch (error) {
    console.error(error);
  }
});
