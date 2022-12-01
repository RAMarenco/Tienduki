const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/cart.controllers");

router.post("/", cartController.create);
router.get("/", cartController.findAll);
router.get("/:identifier", cartController.findById);
router.delete("/:identifier", cartController.delete);
router.put("/:identifier", cartController.put);

module.exports = router;