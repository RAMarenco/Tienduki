const express = require("express");
const router = express.Router();

const orderStateController = require("../../controllers/orderState.controllers");

router.post("/", orderStateController.create);
router.get("/", orderStateController.findAll);
router.get("/:identifier", orderStateController.findById);
router.delete("/:identifier", orderStateController.delete);
router.put("/:identifier", orderStateController.put);

module.exports = router;