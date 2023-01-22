const { Router } = require("express");
const {
  getAllProviders,
  getOneProvider,
  postProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/provider");
const router = new Router();

router.get("/", getAllProviders);
router.get("/:id", getOneProvider);
router.post("/", postProvider);
router.put("/:id", updateProvider);
router.delete("/:id", deleteProvider);

module.exports = router;
