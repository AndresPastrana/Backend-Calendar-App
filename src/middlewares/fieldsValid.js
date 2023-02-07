const { validationResult } = require("express-validator");
const fieldsValid = (req, resp, next) => {
  // Handle error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = { fieldsValid };
