const { Router } = require("express");
const {
  getAllClients,
  getOneClient,
  postClient,
  updateClient,
  deleteClient,
} = require("../controllers/client");
const router = new Router();

router.get("/", getAllClients);
router.get("/:id", getOneClient);
router.post("/", postClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
