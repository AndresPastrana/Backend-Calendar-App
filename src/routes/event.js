const { Router, request, response } = require("express");
const { requireAuth, validartoken } = require("../middlewares/validar-token");
const {
  getAllEvents,
  getOneEvent,
  insertEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const { fieldsValid } = require("../middlewares/fieldsValid");
const { header, param, body } = require("express-validator");
const { isISODate } = require("../helpers/validate-date");

const router = new Router();

router.all("*", [
  header("x-token", "token is required").notEmpty(),
  fieldsValid,
  validartoken,
]);

router.get("/", getAllEvents);
router.get(
  "/:id",
  [param("id").notEmpty().isMongoId(), fieldsValid],
  getOneEvent
);
router.post(
  "/new",
  [
    body("startDate", "sartDate a is required").notEmpty().custom(isISODate),
    body("endDate", "endDate is required").notEmpty().custom(isISODate),
    body("title", "title is required").notEmpty(),
    body("notes", "notes is required").notEmpty(),
  ],
  fieldsValid,
  insertEvent
);
router.put(
  "/update/:id",
  [
    param("id").notEmpty().isMongoId(),
    body("startDate", "endDate", "notes"),
    fieldsValid,
  ],
  updateEvent
);
router.delete(
  "/delete/:id",
  [param("id").notEmpty().isMongoId(), fieldsValid],
  deleteEvent
);

module.exports = router;
