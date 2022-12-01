const express = require("express");
const router = express.Router();

const storeCategorieController = require("../../controllers/storeCategorie.controllers");

router.post("/", storeCategorieController.create);
router.get("/", storeCategorieController.findAll);
router.get("/:identifier", storeCategorieController.findById);
router.put("/:identifier", storeCategorieController.put);
router.delete("/:identifier", storeCategorieController.delete);

module.exports = router;