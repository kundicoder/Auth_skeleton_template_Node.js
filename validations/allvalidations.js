const { body } = require("express-validator");

const userRegistrationValidate = [
  body("fullname")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
  body("email").isEmail().withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
  body("role")
    .optional()
    .isString()
    .withMessage("Role should be string")
    .isIn(["Admin", "Staff"])
    .withMessage("Role entered is invalid"),
];

const userLoginValidate = [
  body("email").isEmail().withMessage("Provide valid email"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters"),
];
module.exports = {
    userRegistrationValidate, userLoginValidate
  };