const { validationResult } = require("express-validator");
const UserModel = require("../models/user.model");

module.exports.signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, passwordHash, username } = req.body;
    if (!firstName || !lastName || !email || !passwordHash || !username)
      throw new Error("All fields are required");
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const isUserAlreadyExists = await UserModel.findOne({
      $or: [{email}, {username}],
    });

    if (isUserAlreadyExists) throw new Error("User Already Exists");

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      passwordHash,
      username,
    });

    res.status(201).json({ data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
