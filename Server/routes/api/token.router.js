const express = require("express");
const router = express.Router();

const tokenController = require("../../controllers/token.controllers");

router.post("/", tokenController.create);
router.get("/", tokenController.findAll);
router.get("/:identifier", tokenController.findById);
router.put("/:identifier", tokenController.put);
router.delete("/:identifier", tokenController.delete);

module.exports = router;