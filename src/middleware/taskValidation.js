const { body, param, validationResult } = require("express-validator");

const taskCreationValidation = [
  body("title", "Title is required").notEmpty(),
  body("status", "Status field should be either open, inprogress or completed").isIn([
    "open",
    "inprogress",
    "completed",
  ]),
];

const taskUpdationValidation = [
  param("id", "id must be a integer").isInt(),
  body("title", "Title is required").notEmpty(),
  body("description", "description is required").notEmpty(),
  body("status", "Status field should be either open, inprogress or completed").isIn([
    "open",
    "inprogress",
    "completed",
  ]),
];

const taskIdValidation = [param("id", "id must be a integer").isInt()];

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
  taskCreationValidation,
  taskUpdationValidation,
  validate,
  taskIdValidation,
};
