const { check, validationResult } = require("express-validator");

exports.validationsignin = [
  check("payload.email").isEmail().withMessage("valid Email is required"),
];
exports.validationsignup = [
  check("payload.firstName").notEmpty().withMessage("please fill firstName"),
  check("payload.lastName").notEmpty().withMessage("please fill lastName"),
  check("payload.userName").notEmpty().withMessage("please fill userName"),
  check("payload.email").notEmpty().withMessage("please fill Email"),
  check("payload.email").isEmail().withMessage("valid Email is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
