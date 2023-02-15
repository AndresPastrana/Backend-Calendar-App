const { Router } = require("express");
const { login, register, refresh, getUsers } = require("../controllers/auth");
const { check, header } = require("express-validator");
const { fieldsValid } = require("../middlewares/fieldsValid");
const { validartoken } = require("../middlewares/validar-token");
const router = new Router();

router.post(
  "/login",
  [
    check("email", "Not a valid email").isEmail(),
    check("password", "The passsowrd is required").exists(),
    check("password", "The passsowrd lenght sould be 1 or greather").notEmpty(),
    fieldsValid,
  ],
  login
);
router.get(
  "/refresh",
  [
    header("x-token", "Access token is required").notEmpty(),
    fieldsValid,
    validartoken,
  ],
  refresh
);
router.post(
  "/register",
  [
    check("username", "Invalid username").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("password", "Passowrd is required").notEmpty(),
    check(
      "password",
      "Weak password, Try using numbers,letters, and special signs"
    ).isStrongPassword(),
    fieldsValid,
  ],
  register
);

router.get("/users", getUsers);
module.exports = router;
