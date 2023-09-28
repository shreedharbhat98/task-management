const { body, validationResult } = require("express-validator");

const signupValidationRules = [
  body("name", "Name is required").notEmpty(),
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

const loginValidationRules = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  signupValidationRules,
  validate,
  loginValidationRules,
};
