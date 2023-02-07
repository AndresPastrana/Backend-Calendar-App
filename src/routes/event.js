const { Router } = require("express");
const {
  getAllEvents,
  getOneEvent,
  insertEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const router = new Router();

// router.all('*', requireAuthentication, loadUser)

router.get("/", getAllEvents);
router.get("/:id", getOneEvent);
router.post("/new", insertEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
