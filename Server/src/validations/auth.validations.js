const { body } = require("express-validator");

const validateData = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .trim()
    .toLowerCase(),
  body("passwordHash")
    .isStrongPassword()
    .withMessage("Enter a strong password"),
  body("firstName").trim().notEmpty().withMessage("FirstName is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLowercase()
    .withMessage("username must be lowercase"),
];
