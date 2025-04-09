const { body } = require("express-validator");

const signupDataValidations = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .trim()
    .toLowerCase(),
  body("passwordHash")
    .isStrongPassword()
    .withMessage("Enter a strong password")
    .isString()
    .withMessage("password must be in string")
    .isLength({ min: 6 })
    .withMessage("Minimum length of password must be 6"),
  body("firstName").trim().notEmpty().withMessage("FirstName is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLowercase()
    .withMessage("username must be lowercase"),
];

const loginDataValidation = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email")
    .trim()
    .toLowerCase(),
  body("password")
    .isString()
    .withMessage("Password must be String")
    .isLength({ min: 6 })
    .withMessage("minimum length of password is 6"),
];

module.exports = { signupDataValidations };
